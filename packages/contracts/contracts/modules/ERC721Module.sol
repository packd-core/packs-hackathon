// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../interfaces/IERC6551Executable.sol";

import "../interfaces/IPackModule.sol";

/**
 * @title ERC721Module
 * @dev This contract handles the creation, opening, and revocation of ERC721 tokens in a pack.
 */
contract ERC721Module is IPackModule {
    //
    uint256 public constant CALL_OPERATION = 0; // Only call operations are supported for ERC6551
    uint256 public constant CALL_VALUE = 0; // No value is sent with the call

    /**
     * @dev Struct to hold data for tokens on creation, opening, and revocation of a pack.
     * @param tokenAddress The address of the ERC721 token.
     * @param tokenId The ID of the token to be included in the pack.
     */
    struct AdditionalData {
        address tokenAddress;
        uint256 tokenId;
    }

    // Lifecycle functions
    /**
     * @dev Function to handle token transfers on creation of a pack.
     * @param account The address of the account creating the pack.
     * @param additionalData The data for the tokens to be included in the pack.
     */
    function onCreate(
        uint256 /* tokenId */,
        address account,
        bytes calldata additionalData
    ) external payable override {
        // unpack data

        AdditionalData[] memory tokensData = abi.decode(
            additionalData,
            (AdditionalData[])
        );

        // Iterate over the array of TokenData objects
        for (uint256 i = 0; i < tokensData.length; i++) {
            IERC721(tokensData[i].tokenAddress).transferFrom(
                msg.sender,
                account,
                tokensData[i].tokenId
            );
        }

        return;
    }

    /**
     * @dev Function to handle token transfers on opening of a pack.
     * @param account The address of the account opening the pack.
     * @param claimer The address of the account claiming the pack.
     * @param additionalData The data for the tokens to be claimed from the pack.
     */
    function onOpen(
        uint256 /* tokenId */,
        address account,
        address claimer,
        bytes calldata additionalData
    ) external override {
        // unpack data
        AdditionalData[] memory tokensData = abi.decode(
            additionalData,
            (AdditionalData[])
        );

        // Iterate over the array of TokenData objects
        for (uint256 i = 0; i < tokensData.length; i++) {
            IERC6551Executable(payable(account)).execute(
                tokensData[i].tokenAddress,
                CALL_VALUE,
                abi.encodeWithSignature(
                    "safeTransferFrom(address,address,uint256)",
                    account,
                    claimer,
                    tokensData[i].tokenId
                ),
                CALL_OPERATION
            );
        }

        return;
    }

    /**
     * @dev Function to handle token transfers on revocation of a pack.
     * @param account The address of the account revoking the pack.
     * @param additionalData The data for the tokens to be revoked from the pack.
     */
    function onRevoke(
        uint256 /* tokenId */,
        address account,
        bytes calldata additionalData
    ) external override {
        // unpack data
        AdditionalData[] memory tokensData = abi.decode(
            additionalData,
            (AdditionalData[])
        );

        // Iterate over the array of TokenData objects
        for (uint256 i = 0; i < tokensData.length; i++) {
            IERC6551Executable(payable(account)).execute(
                tokensData[i].tokenAddress,
                CALL_VALUE,
                abi.encodeWithSignature(
                    "safeTransferFrom(address,address,uint256)",
                    account,
                    msg.sender,
                    tokensData[i].tokenId
                ),
                CALL_OPERATION
            );
        }

        return;
    }
}
