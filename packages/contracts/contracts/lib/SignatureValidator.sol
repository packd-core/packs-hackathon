// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

import "../ClaimData.sol";

library SignatureValidator {
    error InvalidOwnerSignature();
    error InvalidClaimerSignature();

    function validateSignatures(
        ClaimData memory data,
        uint256 registryChainId,
        uint256 salt,
        address addr,
        address claimPublicKey
    ) internal view returns (bool) {
        bytes32 messageHashOwner = MessageHashUtils.toEthSignedMessageHash(
            keccak256(
                abi.encodePacked(
                    data.tokenId,
                    data.claimer,
                    registryChainId,
                    salt,
                    addr
                )
            )
        );

        if (
            !SignatureChecker.isValidSignatureNow(
                claimPublicKey,
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
                    addr
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

        return true;
    }
}
