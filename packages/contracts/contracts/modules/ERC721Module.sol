// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../interfaces/IERC6551Executable.sol";

import "../interfaces/IPackModule.sol";

import "hardhat/console.sol";

contract ERC721Module is IPackModule {
    //
    uint256 public constant CALL_OPERATION = 0; // Only call operations are supported for ERC6551
    uint256 public constant CALL_VALUE = 0; // No value is sent with the call

    struct OnCreateData {
        tokenData[] tokens;
    }

    struct tokenData {
        address tokenAddress;
        uint256[] id;
    }

    struct OnRevokeData {
        address[] tokenAddresses;
        uint256[][] ids;
    }

    struct OnClaimData {
        address[] tokenAddresses;
        uint256[][] ids;
    }

    // Lifecycle functions
    function onCreate(
        uint256 tokenId,
        address account,
        bytes calldata additionalData
    ) external payable override {
        // unpack data
        console.log("Received Data in Contract");
        console.logBytes(additionalData);
        console.log("onCreate");
        OnCreateData memory tokensData = abi.decode(
            additionalData,
            (OnCreateData)
        );
        // console.log("tokensData.length", tokensData.length);

        // // Iterate over the array of TokenData objects
        // for (uint256 i = 0; i < tokensData.length; i++) {
        //     OnCreateData memory tokenData = tokensData[i];

        //     // Iterate over the array of token addresses and corresponding ids
        //     for (uint256 j = 0; j < tokenData.tokenAddresses.length; j++) {
        //         // Iterate over the array of ids for each token address
        //         for (uint256 k = 0; k < tokenData.ids[j].length; k++) {
        //             IERC721(tokenData.tokenAddresses[j]).transferFrom(
        //                 msg.sender,
        //                 account,
        //                 tokenData.ids[j][k]
        //             );
        //         }
        //     }
        // }

        emit Created(tokenId, account);
        return;
    }

    function onOpen(
        uint256 tokenId,
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

            // Iterate over the array of token addresses and corresponding ids
            for (uint256 j = 0; j < tokenData.tokenAddresses.length; j++) {
                // Iterate over the array of ids for each token address
                for (uint256 k = 0; k < tokenData.ids[j].length; k++) {
                    IERC6551Executable(payable(account)).execute(
                        tokenData.tokenAddresses[j],
                        CALL_VALUE,
                        abi.encodeWithSignature(
                            "safeTransferFrom(address,address,uint256)",
                            account,
                            claimer,
                            tokenData.ids[j][k]
                        ),
                        CALL_OPERATION
                    );
                }
            }
        }
        emit Opened(tokenId, account);
        return;
    }

    function onRevoke(
        uint256 tokenId,
        address account,
        bytes calldata additionalData
    ) external override {
        // unpack data
        OnRevokeData[] memory tokensData = abi.decode(
            additionalData,
            (OnRevokeData[])
        );

        for (uint256 i = 0; i < tokensData.length; i++) {
            OnRevokeData memory tokenData = tokensData[i];

            // Iterate over the array of token addresses and corresponding ids
            for (uint256 j = 0; j < tokenData.tokenAddresses.length; j++) {
                // Iterate over the array of ids for each token address
                for (uint256 k = 0; k < tokenData.ids[j].length; k++) {
                    IERC6551Executable(payable(account)).execute(
                        tokenData.tokenAddresses[j],
                        CALL_VALUE,
                        abi.encodeWithSignature(
                            "safeTransferFrom(address,address,uint256)",
                            account,
                            msg.sender,
                            tokenData.ids[j][k]
                        ),
                        CALL_OPERATION
                    );
                }
            }
        }

        emit Revoked(tokenId, account);
        return;
    }
}
