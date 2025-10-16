import hre from "hardhat";
const { ethers } = hre;

async function main() {
  const [signer] = await ethers.getSigners();
  console.log("Deployer:", await signer.getAddress());
  console.log("Balance (ETH):", ethers.formatEther(await ethers.provider.getBalance(signer.address)));
  console.log("Chain ID:", (await ethers.provider.getNetwork()).chainId);
}
main().catch((e)=>{console.error(e);process.exit(1);});
