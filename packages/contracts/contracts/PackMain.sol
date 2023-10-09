// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

import "./interfaces/IERC6551Registry.sol";
import "./interfaces/IERC6551Account.sol";
import "./interfaces/IERC6551Executable.sol";

import "./PackNFT.sol";

contract PackMain is PackNFT, Ownable {
    // ---------- Events ---------------------
    event PackCreated(
        uint256 indexed tokenId,
        address owner,
        address[] modules
    );
    event PackRevoked(uint256 indexed tokenId, address owner);
    event PackOpened(uint256 indexed tokenId, address claimer);

    // ---------- Errors ---------------------
    error InvalidEthValue();
    error OnlyOwnerOf(uint256 tokenId);
    error TokenNotInExpectedState(uint256 tokenId);
    error EtherTransferFailed();
    error InvalidOwnerSignature();
    error InvalidClaimerSignature();

    // ---------- Struct Definitions ---------
    // Contains information required to claim a Pack
    struct ClaimData {
        uint256 tokenId;
        bytes sigOwner; // Signature from the Pack owner
        address claimer; // Address of the claimer
        bytes sigClaimer; // Signature from the claimer
        uint256 refundValue; // Value to refund to the relayer
        uint256 maxRefundValue; // Maximum refundable value (to prevent over-refund)
    }

    // ---------- Constants -------------------
    uint256 public constant VERSION = 1;
    uint256 public constant CALL_OPERATION = 0; // Only call operations are supported for ERC6551

    // ---------- ERC6551-related ------------
    IERC6551Registry public immutable registry;
    address public immutable implementation;
    uint256 public immutable registryChainId;
    uint256 public immutable salt;

    mapping(uint256 => address) public claimPublicKey;

    constructor(
        address initialOwner_,
        string memory baseTokenURI_,
        string memory name_,
        string memory symbol_,
        address registry_,
        address implementation_,
        uint256 registryChainId_,
        uint256 salt_
    ) PackNFT(baseTokenURI_, name_, symbol_) Ownable(initialOwner_) {
        registry = IERC6551Registry(registry_);
        implementation = implementation_;
        registryChainId = registryChainId_;
        salt = salt_;
    }

    modifier onlyOwnerOf(uint256 tokenId) {
        if (ownerOf(tokenId) != msg.sender) {
            revert OnlyOwnerOf(tokenId);
        }
        _;
    }

    modifier tokenInState(uint256 tokenId, PackState desiredState) {
        if (packState[tokenId] != desiredState) {
            revert TokenNotInExpectedState(tokenId);
        }
        _;
    }

    function pack(
        address to_,
        address claimPublicKey_
    ) public payable returns (uint256 tokenId, address newAccount) {
        if (msg.value == 0) {
            revert InvalidEthValue();
        }

        // Mint the Pack
        _mintPack(to_, tokenId);

        // Set the claim public key
        claimPublicKey[tokenId] = claimPublicKey_;

        // Create the account for the NFT
        newAccount = registry.createAccount(
            implementation,
            registryChainId,
            address(this),
            tokenId,
            salt,
            "" // initData
        );

        // Transfer some ETH to newAccount
        (bool successE, ) = payable(newAccount).call{value: msg.value}("");
        if (!successE) {
            revert EtherTransferFailed();
        }

        // TODO: Replace this with proper modules from params
        address[] memory emptyModules = new address[](0);
        emit PackCreated(tokenId, to_, emptyModules);
    }

    function revoke(
        uint256 tokenId_
    ) public onlyOwnerOf(tokenId_) tokenInState(tokenId_, PackState.Created) {
        _revokePack(tokenId_);

        // Send ETH to owner
        address payable thisAccount = payable(account(tokenId_));
        uint256 value = thisAccount.balance;
        _executeTransfer(thisAccount, msg.sender, value);

        emit PackRevoked(tokenId_, msg.sender);
    }

    function open(
        ClaimData memory data
    ) public tokenInState(data.tokenId, PackState.Created) {
        // Checks for valid signatures
        _validateSignatures(data);

        // Set state to Opened
        _openPack(data.tokenId);

        // Send ETH to claimer
        address payable thisAccount = payable(account(data.tokenId));
        uint256 value = thisAccount.balance;
        _executeTransfer(thisAccount, msg.sender, value);

        emit PackOpened(data.tokenId, msg.sender);
    }

    function account(uint256 tokenId) public view returns (address) {
        return
            registry.account(
                implementation,
                registryChainId,
                address(this),
                tokenId,
                salt
            );
    }

    function _executeTransfer(
        address payable accountAddress,
        address recipient,
        uint256 value
    ) internal {
        bytes memory data = abi.encodeWithSignature(
            "transfer(address,uint256)",
            recipient,
            value
        );

        IERC6551Executable(accountAddress).execute(
            recipient,
            value,
            data,
            CALL_OPERATION
        );
    }

    function _validateSignatures(ClaimData memory data) internal view {
        bytes32 messageHashOwner = MessageHashUtils.toEthSignedMessageHash(
            keccak256(
                abi.encodePacked(
                    data.tokenId,
                    data.claimer,
                    registryChainId,
                    salt,
                    address(this)
                )
            )
        );

        if (
            !SignatureChecker.isValidSignatureNow(
                claimPublicKey[data.tokenId],
                messageHashOwner,
                data.sigOwner
            )
        ) {
            revert InvalidOwnerSignature();
        }

        bytes32 messageHashClaimer = MessageHashUtils.toEthSignedMessageHash(
            keccak256(
                abi.encodePacked(
                    data.tokenId,
                    data.maxRefundValue,
                    registryChainId,
                    salt,
                    address(this)
                )
            )
        );

        if (
            !SignatureChecker.isValidSignatureNow(
                data.claimer,
                messageHashClaimer,
                data.sigClaimer
            )
        ) {
            revert InvalidClaimerSignature();
        }
    }
}
