// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../interfaces/IERC6551Executable.sol";

import "../interfaces/IPackModule.sol";

contract ERC721Module is IPackModule {
    //
    uint256 public constant CALL_OPERATION = 0; // Only call operations are supported for ERC6551
    uint256 public constant CALL_VALUE = 0; // No value is sent with the call

    struct AdditionalData {
        address tokenAddress;
        uint256 tokenId;
    }

    // Lifecycle functions
    function onCreate(
        uint256 tokenId,
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

        emit Opened(tokenId, account);
        return;
    }

    function onRevoke(
        uint256 tokenId,
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

        emit Revoked(tokenId, account);
        return;
    }
}
