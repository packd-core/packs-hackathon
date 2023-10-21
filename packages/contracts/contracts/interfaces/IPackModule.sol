// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IPackModule {
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
