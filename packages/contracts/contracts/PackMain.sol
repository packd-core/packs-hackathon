// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "@openzeppelin/contracts/utils/Address.sol";

import "./interfaces/IERC6551Registry.sol";
import "./interfaces/IERC6551Account.sol";
import "./interfaces/IERC6551Executable.sol";

import "./PackNFT.sol";
import "./ClaimData.sol";
import "./lib/SignatureValidator.sol";

/**
 * @title PackMain
 * @dev This is the primary contract for the Pack protocol. It handles the creation, management, and execution of packs.
 */
contract PackMain is PackNFT, Ownable {
    // ---------- Events ---------------------
    /**
     * @dev Emitted when a new pack is created
     */
    event PackCreated(
        uint256 indexed tokenId,
        address owner,
        address[] modules,
        bytes[] moduleData
    );
    /**
     * @dev Emitted when a pack is revoked
     */
    event PackRevoked(uint256 indexed tokenId, address owner);
    /**
     * @dev Emitted when a pack is opened
     */
    event PackOpened(uint256 indexed tokenId, address claimer);

    // ---------- Errors ---------------------
    error InvalidEthValue();
    error OnlyOwnerOf(uint256 tokenId);
    error TokenNotInExpectedState(uint256 tokenId);
    error EtherTransferFailed();
    error InvalidRefundValue();
    error InvalidAddress();
    error InvalidLengthOfData(uint256 modulesLength, uint256 moduleDataLength);
    error ModulesNotWhitelisted(address modules);

    // ---------- Constants -------------------
    uint256 public constant VERSION = 1;
    uint256 public constant CALL_OPERATION = 0; // Only call operations are supported for ERC6551

    // ---------- ERC6551-related ------------
    IERC6551Registry public immutable registry;
    address public immutable implementation;
    uint256 public immutable registryChainId;
    uint256 public immutable salt;

    mapping(uint256 => address) public claimPublicKey;
    mapping(uint256 => address[]) public packModules;

    // Modules whitelist
    mapping(address => bool) public modulesWhitelist;

    /**
     * @dev Initializes the PackMain contract
     * @param initialOwner_ The address that will be set as the initial owner of the contract
     * @param baseTokenURI_ The base URI that will be used for all token URIs
     * @param name_ The name of the NFT token
     * @param symbol_ The symbol of the NFT token
     * @param registry_ ERC6551 registry contract address
     * @param implementation_ ERC6551 implementation contract address
     * @param registryChainId_ The chain ID of the network, to prevent cross-chain replay attacks
     * @param salt_ A random value used to ensure the uniqueness of the contract's address
     * @param modulesWhitelist_ An array of addresses that will be initially whitelisted as valid modules
     */
    constructor(
        address initialOwner_,
        string memory baseTokenURI_,
        string memory name_,
        string memory symbol_,
        address registry_,
        address implementation_,
        uint256 registryChainId_,
        uint256 salt_,
        address[] memory modulesWhitelist_
    ) PackNFT(baseTokenURI_, name_, symbol_) Ownable(initialOwner_) {
        // Check that the registry and implementation are not the zero address
        if (registry_ == address(0) || implementation_ == address(0)) {
            revert InvalidAddress();
        }

        // Set ERC6551-related params
        registry = IERC6551Registry(registry_);
        implementation = implementation_;
        registryChainId = registryChainId_;
        salt = salt_;

        // Set the modules whitelist
        setModulesWhitelist(modulesWhitelist_, true);
    }

    /**
     * @dev Modifier to check if the sender is the owner of the token
     * @param tokenId The ID of the token to check ownership of
     */
    modifier onlyOwnerOf(uint256 tokenId) {
        if (ownerOf(tokenId) != msg.sender) {
            revert OnlyOwnerOf(tokenId);
        }
        _;
    }

    /**
     * @dev Modifier to check if the token is in the desired state
     * @param tokenId The ID of the token to check the state of
     * @param desiredState Struct, the desired state of the token
     */
    modifier tokenInState(uint256 tokenId, PackState desiredState) {
        if (packState[tokenId] != desiredState) {
            revert TokenNotInExpectedState(tokenId);
        }
        _;
    }

    /**
     * @dev Function to pack a new NFT. This function is responsible for creating a new NFT and assigning it to the owner.
     * This function also creates a new account for the NFT and transfers some ETH to the new account.
     * Finally, it loops through the modules and executes the data.
     * @param to_ The address to which the new NFT will be assigned.
     * @param claimPublicKey_ The public key that will be associated with the claim of the new NFT.
     * @param modules The modules that will be associated with the new NFT. These modules must be whitelisted.
     * @param moduleData The data that the modules will use to execute their logic.
     * @notice The ETH sent with this function will be transferred to the new account.
     * @notice The modules and moduleData arrays must be the same length.
     */
    function pack(
        address to_,
        address claimPublicKey_,
        address[] calldata modules,
        bytes[] calldata moduleData
    ) public payable returns (uint256 tokenId, address newAccount) {
        // Check that the modules are whitelisted
        for (uint256 i = 0; i < modules.length; i++) {
            if (!modulesWhitelist[modules[i]]) {
                revert ModulesNotWhitelisted(modules[i]);
            }
        }
        // Need to check that the modules and moduleData are the same length
        if (modules.length != moduleData.length) {
            revert InvalidLengthOfData(modules.length, moduleData.length);
        }
        // Pack needs ETH to be minted
        if (msg.value == 0) {
            revert InvalidEthValue();
        }

        // Mint the Pack
        tokenId = _mintPack(to_);

        // Set params
        claimPublicKey[tokenId] = claimPublicKey_;
        packModules[tokenId] = modules;

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

        // Loop through the modules and execute the data
        for (uint256 i = 0; i < modules.length; i++) {
            Address.functionDelegateCall(
                modules[i],
                abi.encodeWithSignature(
                    "onCreate(uint256,address,bytes)",
                    tokenId,
                    newAccount,
                    moduleData[i]
                )
            );
        }

        emit PackCreated(tokenId, to_, modules, moduleData);
    }

    /**
     * @dev This function revokes a pack. It is only callable by the owner of the pack and only if the pack is in the 'Created' state.
     * @param tokenId_ The unique identifier of the pack to be revoked.
     * @param moduleData The data associated with the pack's modules.
     * @notice The moduleData array must be the same length as the modules array.
     */
    function revoke(
        uint256 tokenId_,
        bytes[] calldata moduleData
    ) public onlyOwnerOf(tokenId_) tokenInState(tokenId_, PackState.Created) {
        // Check that the moduleData is the same length as the modules
        if (moduleData.length != packModules[tokenId_].length) {
            revert InvalidLengthOfData(
                packModules[tokenId_].length,
                moduleData.length
            );
        }

        _revokePack(tokenId_);

        // Send ETH to owner
        address payable thisAccount = payable(account(tokenId_));
        uint256 value = thisAccount.balance;
        _executeTransfer(thisAccount, msg.sender, value);

        // Loop through the modules and execute the data
        for (uint256 i = 0; i < packModules[tokenId_].length; i++) {
            Address.functionDelegateCall(
                packModules[tokenId_][i],
                abi.encodeWithSignature(
                    "onRevoke(uint256,address,bytes)",
                    tokenId_,
                    thisAccount,
                    moduleData[i]
                )
            );
        }

        emit PackRevoked(tokenId_, msg.sender);
    }

    /**
     * @dev Function to open a pack
     * @param data The data associated with the pack to be opened.
     * @param moduleData The data associated with the pack's modules.
     * @notice The moduleData array must be the same length as the modules array.
     * @notice This is normally sent by a relayer, so the relayer will be refunded the refundValue.
     */
    function open(
        ClaimData memory data,
        bytes[] calldata moduleData
    ) public tokenInState(data.tokenId, PackState.Created) {
        // Checks for valid signatures
        _validateSignatures(data);
        // Check that the refund value is not greater than the maximum refund value
        if (data.refundValue > data.maxRefundValue) {
            revert InvalidRefundValue();
        }

        // Set state to Opened
        _openPack(data.tokenId);

        // Loop through the modules and execute the data
        for (uint256 i = 0; i < packModules[data.tokenId].length; i++) {
            Address.functionDelegateCall(
                packModules[data.tokenId][i],
                abi.encodeWithSignature(
                    "onOpen(uint256,address,address,bytes)",
                    data.tokenId,
                    account(data.tokenId),
                    data.claimer,
                    moduleData[i]
                )
            );
        }

        // Transfer the ETH from the account to the owner and refund the relayer
        _transferAndRefund(data);

        emit PackOpened(data.tokenId, msg.sender);
    }

    /**
     * @dev Function to set the modules whitelist
     * @param modules An array of addresses representing the modules to be whitelisted
     * @param value A boolean value indicating whether the modules should be whitelisted (true) or not (false)
     * @notice This function can only be called by the owner of the contract
     */
    function setModulesWhitelist(
        address[] memory modules,
        bool value
    ) public onlyOwner {
        for (uint256 i = 0; i < modules.length; i++) {
            modulesWhitelist[modules[i]] = value;
        }
    }

    /**
     * @dev This function returns the account associated with a specific token.
     * @param tokenId The unique identifier of the token whose associated account is to be returned.
     * @return Returns the address of the account associated with the given tokenId.
     */
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

    /**
     * @dev This is an internal function that handles the transfer of ETH from the account to the owner and refunds the relayer.
     * @param data This is a memory structure that contains all the necessary data for the transfer and refund operation.
     */
    function _transferAndRefund(ClaimData memory data) internal {
        // Refund the relayer
        address payable thisAccount = payable(account(data.tokenId));
        _executeTransfer(thisAccount, msg.sender, data.refundValue);
        // Transfer the rest to the claimer
        uint256 value = thisAccount.balance;
        _executeTransfer(thisAccount, data.claimer, value);
    }

    /**
     * @dev This is an internal function that is used to execute a transfer operation.
     * @param accountAddress The address of the account from which the transfer will be made.
     * @param recipient The address of the recipient who will receive the transfer.
     * @param value The amount of ETH that will be transferred.
     */
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

    /**
     * @dev This is an internal function that validates the signatures associated with a claim.
     * It uses the SignatureValidator to check the signatures against the claim data, registry chain ID, salt, contract address, and public key associated with the token ID.
     * @param data The claim data to validate.
     */
    function _validateSignatures(ClaimData memory data) internal view {
        SignatureValidator.validateSignatures(
            data,
            registryChainId,
            salt,
            address(this),
            claimPublicKey[data.tokenId]
        );
    }
}
