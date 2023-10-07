// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

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

    // ---------- Constants -------------------
    uint256 public constant VERSION = 1;

    // ---------- ERC6551-related ------------
    IERC6551Registry public immutable registry;
    address public immutable implementation;
    uint256 public immutable registryChainId;
    uint256 public immutable salt;

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
        address to
    ) public payable returns (uint256 tokenId, address newAccount) {
        if (msg.value == 0) {
            revert InvalidEthValue();
        }

        _mintPack(to, tokenId);

        // Initialize the Pack and create the account
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
        emit PackCreated(tokenId, to, emptyModules);
    }

    // TODO: custom error
    function revoke(
        uint256 tokenId
    ) public onlyOwnerOf(tokenId) tokenInState(tokenId, PackState.Created) {
        _revokePack(tokenId);

        // Send ETH to owner
        address payable thisAccount = payable(account(tokenId));
        uint256 value = thisAccount.balance;
        _executeTransfer(thisAccount, msg.sender, value);

        emit PackRevoked(tokenId, msg.sender);
    }

    function open(
        uint256 tokenId
    ) public tokenInState(tokenId, PackState.Created) {
        _openPack(tokenId);

        // Send ETH to claimer
        address payable thisAccount = payable(account(tokenId));
        uint256 value = thisAccount.balance;
        _executeTransfer(thisAccount, msg.sender, value);

        emit PackOpened(tokenId, msg.sender);
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
        uint256 operation = 0; // CALL
        IERC6551Executable(accountAddress).execute(
            recipient,
            value,
            data,
            operation
        );
    }
}
