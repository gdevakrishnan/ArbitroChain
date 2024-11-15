// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import the OpenZeppelin ERC20 and IERC20 implementations
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// ERC20 contract for creating the Grull Token
contract GrullToken is ERC20 {
    string private constant tokenName = "GrullToken";
    string private constant tokenSymbol = "gt";
    uint256 private constant _initial_supply = 100 * (10**18);

    /*
     * Constructor initializes the token with a specified name and symbol
     * and mints the initial supply to the deployer's address.
     */
    constructor() ERC20(tokenName, tokenSymbol) {
        _mint(msg.sender, _initial_supply);
    }
}


// Grull Token Address: 0xE890f155432a67C6DE6db70fa2560fEd0a26934a