// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IPackModule {
    // Events
    event Created(uint256 tokenId, address account);
    event Opened(uint256 tokenId, address account);
    event Revoked(uint256 tokenId, address account);

    // Lifecycle functions
    function onCreate(
        uint256 tokenId,
        address account,
        bytes calldata additionalData
    ) external payable;

    function onOpen(
        uint256 tokenId,
        address account,
        address claimer,
        bytes calldata additionalData
    ) external;

    function onRevoke(
        uint256 tokenId,
        address account,
        bytes calldata additionalData
    ) external;
}
