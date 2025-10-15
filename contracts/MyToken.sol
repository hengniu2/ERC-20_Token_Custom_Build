// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20Permit, Ownable {
  constructor() ERC20("ClearDemo Token", "CLRD") ERC20Permit("ClearDemo Token") {
    _mint(msg.sender, 1_000_000 * 10 ** decimals());
  }

  function mint(address to, uint256 amount) external onlyOwner {
    _mint(to, amount);
  }
}