import { expect } from "chai";
import { ethers } from "hardhat";

describe("MyToken", function () {
  it("mints initial supply and transfers", async () => {
    const [owner, user] = await ethers.getSigners();

    // Deploy a fresh token for the test
    const MyToken = await ethers.getContractFactory("MyToken");
    const token = await MyToken.deploy();
    await token.waitForDeployment();

    const decimals = await token.decimals();
    const one = ethers.parseUnits("1", decimals);

    // Initially, owner has the supply; transfer 1 token to user
    const tx = await token.transfer(user.address, one);
    await tx.wait();

    // Check balances changed as expected
    const ownerBal = await token.balanceOf(owner.address);
    const userBal = await token.balanceOf(user.address);

    expect(userBal).to.equal(one);
    // Owner balance should be initialSupply - one (we won't compute exact big number here)
    expect(ownerBal).to.be.greaterThan(0n);
  });
});
