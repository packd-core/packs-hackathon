// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "../interfaces/IERC6551Executable.sol";

import "../interfaces/IPackModule.sol";

/**
 * @title ERC20Module
 * @dev This contract is a module for handling ERC20 tokens in packs.
 */
contract ERC20Module is IPackModule {
    //
    uint256 public constant CALL_OPERATION = 0; // Only call operations are supported for ERC6551
    uint256 public constant CALL_VALUE = 0; // No value is sent with the call

    /**
     * @dev Struct to hold data for tokens on creation of a pack.
     * @param tokenAddress The address of the ERC20 token.
     * @param amount The amount of the token to be included in the pack.
     */
    struct OnCreateData {
        address tokenAddress;
        uint256 amount;
    }

    /**
     * @dev Struct to hold data for tokens on revocation of a pack.
     * @param tokenAddress The address of the ERC20 token.
     */
    struct OnRevokeData {
        address tokenAddress;
    }

    /**
     * @dev Struct to hold data for tokens on claim of a pack.
     * @param tokenAddress The address of the ERC20 token.
     */
    struct OnClaimData {
        address tokenAddress;
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
        OnCreateData[] memory tokensData = abi.decode(
            additionalData,
            (OnCreateData[])
        );
        // Iterate over the array of TokenData objects
        for (uint256 i = 0; i < tokensData.length; i++) {
            OnCreateData memory tokenData = tokensData[i];

            SafeERC20.safeTransferFrom(
                IERC20(tokenData.tokenAddress),
                msg.sender,
                account,
                tokenData.amount
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
        OnClaimData[] memory tokensData = abi.decode(
            additionalData,
            (OnClaimData[])
        );

        // Iterate over the array of TokenData objects
        for (uint256 i = 0; i < tokensData.length; i++) {
            OnClaimData memory tokenData = tokensData[i];

            uint256 balance = IERC20(tokenData.tokenAddress).balanceOf(account);

            IERC6551Executable(payable(account)).execute(
                tokenData.tokenAddress,
                CALL_VALUE,
                abi.encodeWithSignature(
                    "transfer(address,uint256)",
                    claimer,
                    balance
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
        OnRevokeData[] memory tokensData = abi.decode(
            additionalData,
            (OnRevokeData[])
        );

        // Iterate over the array of TokenData objects
        for (uint256 i = 0; i < tokensData.length; i++) {
            OnRevokeData memory tokenData = tokensData[i];

            uint256 balance = IERC20(tokenData.tokenAddress).balanceOf(account);

            IERC6551Executable(payable(account)).execute(
                tokenData.tokenAddress,
                CALL_VALUE,
                abi.encodeWithSignature(
                    "transfer(address,uint256)",
                    msg.sender,
                    balance
                ),
                CALL_OPERATION
            );
        }

        return;
    }
}
