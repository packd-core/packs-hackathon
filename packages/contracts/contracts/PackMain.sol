// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

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

    // ---------- Constants -------------------
    uint256 public constant VERSION = 1;

    constructor(
        address initialOwner_,
        string memory baseTokenURI_,
        string memory name_,
        string memory symbol_
    ) PackNFT(baseTokenURI_, name_, symbol_) Ownable(initialOwner_) {}

    function pack(address to) public payable returns (uint256 tokenId) {
        if (msg.value == 0) {
            revert InvalidEthValue();
        }

        _mintPack(to, tokenId);
    }

    // TODO: custom error
    function revoke(uint256 tokenId) public {
        if (ownerOf(tokenId) != msg.sender) {
            revert OnlyOwnerOf(tokenId);
        }

        _revokePack(tokenId);

        // Send ETH to owner
        payable(msg.sender).transfer(address(this).balance);
    }

    function open(uint256 tokenId) public {
        require(
            packState[tokenId] == PackState.Created,
            "PackMain: not created"
        );

        _openPack(tokenId);

        // Send ETH to claimer
        payable(msg.sender).transfer(address(this).balance);
    }
}
