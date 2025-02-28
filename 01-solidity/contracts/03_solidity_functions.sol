// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "hardhat/console.sol";

contract SolidityFunctions {
    uint256 private balance;

    constructor(uint256 initialBalance) {
        balance = initialBalance;
    }

    function addBalance(uint256 toAddBalance) public {
        balance += toAddBalance;
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }

    function calculator(uint mode, uint256 amount) public {
        require(mode >= 1 && mode <= 4, "Invalid mode");

        if (mode == 1) {
            balance += amount;  // Addition
        } 
        else if (mode == 2) {
            require(balance >= amount, "Insufficient balance");  // Prevent underflow
            balance -= amount;  // Subtraction
        } 
        else if (mode == 3) {
            balance *= amount;  // Multiplication
        } 
        else if (mode == 4) {
            require(amount != 0, "Cannot divide by zero");  // Prevent division by zero
            balance /= amount;  // Division
        }
    }
}
