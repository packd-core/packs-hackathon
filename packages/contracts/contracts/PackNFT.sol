// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

/**
 * @title PackNFT
 * @dev This contract inherits from ERC721 and ERC721Enumerable. It represents a Pack NFT and includes functions for minting, revoking and opening packs.
 */
contract PackNFT is ERC721, ERC721Enumerable {
    //
    // ----------- Enumerations ---------------
    /**
     * @dev Represents the state of a Pack
     * Empty: Indicates that the pack has not been minted yet
     * Created: Indicates that the pack is newly minted and not yet opened or revoked
     * Opened: Indicates that the pack has been opened by a claimer
     * Revoked: Indicates that the pack has been revoked by the owner
     */
    enum PackState {
        Empty,
        Created,
        Opened,
        Revoked
    }

    // ---------- Storage --------------------
    uint256 private _nextTokenId;
    string private _baseTokenURI;

    mapping(uint256 => PackState) public packState;
    mapping(uint256 => string) public packStateURIs;

    // Store creation block number for each token
    mapping(uint256 => uint256) public creationBlock;

    /**
     * @dev Constructor for the PackNFT contract
     * @param baseTokenURI_ The base URI for the token
     * @param name_ The name of the token
     * @param symbol_ The symbol of the token
     */
    constructor(
        string memory baseTokenURI_,
        string memory name_,
        string memory symbol_
    ) ERC721(name_, symbol_) {
        _baseTokenURI = baseTokenURI_;

        // Initialize the mapping
        packStateURIs[uint(PackState.Created)] = "created";
        packStateURIs[uint(PackState.Opened)] = "opened";
        packStateURIs[uint(PackState.Revoked)] = "revoked";
    }

    /**
     * @dev Internal function to mint a pack and set its state to Created
     * @param to The address to mint the pack to
     * @return tokenId The ID of the newly minted pack
     */
    function _mintPack(address to) internal returns (uint256 tokenId) {
        tokenId = _nextTokenId++;
        _safeMint(to, tokenId);

        // Set state to Created
        packState[tokenId] = PackState.Created;

        // Set creation block number
        creationBlock[tokenId] = block.number;
    }

    /**
     * @dev Internal function to revoke a pack and set its state to Revoked
     * @param tokenId The ID of the pack to revoke
     */
    function _revokePack(uint256 tokenId) internal {
        _burn(tokenId);

        // Set state to Revoked
        packState[tokenId] = PackState.Revoked;
    }

    /**
     * @dev Internal function to open a pack and set its state to Opened
     * @param tokenId The ID of the pack to open
     */
    function _openPack(uint256 tokenId) internal {
        // Set state to Opened
        packState[tokenId] = PackState.Opened;
    }

    /**
     * @dev Function to get the URI of a token based on its state
     * @param tokenId The ID of the token
     * @return The URI of the token
     */
    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        // Get state of the Pack
        PackState state = packState[tokenId];

        // Check if the state exists in the mapping
        string memory stateURI = packStateURIs[uint(state)];
        require(bytes(stateURI).length > 0, "PackdMain: invalid state");

        // Return the URI based on the state of the Pack
        return string(abi.encodePacked(_baseURI(), stateURI));
    }

    /**
     * @dev Function to get the base URI of the token
     * @return The base URI of the token
     */
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    // The following functions are overrides required by Solidity.

    /**
     * @dev Internal function to update the state of a token
     * @param to The address to update the token to
     * @param tokenId The ID of the token
     * @param auth The address authorized to update the token
     * @return The address of the updated token
     */
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    /**
     * @dev Internal function to increase the balance of an account
     * @param account The address of the account
     * @param value The amount to increase the balance by
     */
    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    /**
     * @dev Function to check if the contract supports an interface
     * @param interfaceId The ID of the interface
     * @return A boolean indicating whether the contract supports the interface
     */
    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
