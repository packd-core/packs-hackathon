// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ClaimData
 * @dev Struct for storing claim related data
 */
struct ClaimData {
    uint256 tokenId; // ID of the token
    bytes sigOwner; // Signature from the Pack owner
    address claimer; // Address of the claimer
    bytes sigClaimer; // Signature from the claimer
    uint256 refundValue; // Value to refund to the relayer
    uint256 maxRefundValue; // Maximum refundable value (to prevent over-refund)
}
