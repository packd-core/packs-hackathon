// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ERC721Mock is ERC721 {
    constructor() ERC721("MockToken", "MTK") {}

    function mint(address account, uint256 amount) external {
        _safeMint(account, amount);
    }
}
