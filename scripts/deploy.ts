import hre from 'hardhat';
const {ethers} = hre;

async function main() {
    const MyToken = await ethers.getContractFactory("MyToken");
    const token = await MyToken.deploy();
    await token.waitForDeployment();
    
    const address = await token.getAddress();
    console.log("MyToken deployed to: ", address);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
