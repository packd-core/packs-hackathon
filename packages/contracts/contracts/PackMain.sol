// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PackMain is ERC721, ERC721Enumerable, Ownable {
    //
    // ----------- Enumerations ---------------
    // Represents the state of a Pack
    enum PackState {
        Empty, // Indicates that the pack has not been minted yet
        Created, // Indicates that the pack is newly minted and not yet opened or revoked
        Opened, // Indicates that the pack has been opened by a claimer
        Revoked // Indicates that the pack has been revoked by the owner
    }

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

    // ---------- Constants -------------------
    uint256 public constant VERSION = 1;

    // ---------- Storage --------------------
    uint256 private _nextTokenId;
    string private _baseTokenURI;

    mapping(uint256 => PackState) public packState;

    constructor(
        address initialOwner_,
        string memory baseTokenURI_,
        string memory name_,
        string memory symbol_
    ) ERC721(name_, symbol_) Ownable(initialOwner_) {
        _baseTokenURI = baseTokenURI_;
    }

    function pack(address to) public payable returns (uint256 tokenId) {
        if (msg.value == 0) {
            revert InvalidEthValue();
        }
        tokenId = _nextTokenId++;
        _safeMint(to, tokenId);

        // Set state to Created
        packState[tokenId] = PackState.Created;
    }

    // TODO: custom error
    function revoke(uint256 tokenId) public {
        if (ownerOf(tokenId) != msg.sender) {
            revert OnlyOwnerOf(tokenId);
        }
        _burn(tokenId);

        // Set state to Revoked
        packState[tokenId] = PackState.Revoked;
    }

    function open(uint256 tokenId) public {
        require(
            packState[tokenId] == PackState.Created,
            "PackMain: not created"
        );

        // Set state to Opened
        packState[tokenId] = PackState.Opened;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        // Get state of the Pack
        PackState state = packState[tokenId];

        // Return the URI based on the state of the Pack
        if (state == PackState.Created) {
            return string(abi.encodePacked(_baseURI(), "created"));
        } else if (state == PackState.Opened) {
            return string(abi.encodePacked(_baseURI(), "opened"));
        } else if (state == PackState.Revoked) {
            return string(abi.encodePacked(_baseURI(), "revoked"));
        } else {
            revert("PackdMain: invalid state");
        }
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
