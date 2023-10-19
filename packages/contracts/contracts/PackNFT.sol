// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract PackNFT is ERC721, ERC721Enumerable {
    //
    // ----------- Enumerations ---------------
    // Represents the state of a Pack
    enum PackState {
        Empty, // Indicates that the pack has not been minted yet
        Created, // Indicates that the pack is newly minted and not yet opened or revoked
        Opened, // Indicates that the pack has been opened by a claimer
        Revoked // Indicates that the pack has been revoked by the owner
    }

    // ---------- Storage --------------------
    uint256 private _nextTokenId;
    string private _baseTokenURI;

    mapping(uint256 => PackState) public packState;
    mapping(uint256 => string) public packStateURIs;

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

    // overwrite the _safeMint function to set the state of the Pack
    function _mintPack(address to, uint256 tokenId) internal {
        tokenId = _nextTokenId++;
        _safeMint(to, tokenId);

        // Set state to Created
        packState[tokenId] = PackState.Created;
    }

    function _revokePack(uint256 tokenId) internal {
        _burn(tokenId);

        // Set state to Revoked
        packState[tokenId] = PackState.Revoked;
    }

    function _openPack(uint256 tokenId) internal {
        // Set state to Opened
        packState[tokenId] = PackState.Opened;
    }

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

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    // The following functions are overrides required by Solidity.

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
