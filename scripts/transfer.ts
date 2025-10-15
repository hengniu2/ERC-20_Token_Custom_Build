import { ethers } from 'hardhat';

async function main() {
    const [ tokenAddr, to, amountStr ] = process.argv.slice(2);

    if(!tokenAddr || !to || !amountStr) {
        throw new Error("Usage: transfer.ts <TOKEN_ADDR> <TO_ADDR> <AMOUNT>");
    }

    const [signer] = await ethers.getSigners();

    const token = await ethers.getContractAt("MyToken", tokenAddr, signer);
    const decimals = await token.decimals();
    const amount = ethers.parseUnits(amountStr, decimals);

    const tx = await token.transfer(to, amount);
    console.log("Sent tx:", tx.hash);

    await tx.wait();
    console.log(`Transferred ${amountStr} tokens to ${to}`);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
