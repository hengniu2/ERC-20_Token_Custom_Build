import * as dotenv from 'dotenv';
import { Contract, JsonRpcProvider, formatUnits } from 'ethers';
dotenv.config();

const { SEPOLIA_RPC_URL, TOKEN_ADDRESS } = process.env;

const TOKEN_ABI = [
    "event Transfer(address indexed from, address indexed to, uint256 value)",
    "function decimals() view returns (uint8)",
];

async function notify(address: string, direction: "IN" | "OUT", amount: string) {
    console.log(`[ALERT] ${direction} ${amount} tokens ${direction == "IN" ? "to" : "from"} ${address}`);
}

async function main() {
    if(!SEPOLIA_RPC_URL) throw new Error("Missing SEPOLIA_RPC_URL in .env");
    if(!TOKEN_ADDRESS) throw new Error("Missing TOKEN_ADDRESS in .env");

    const provider = new JsonRpcProvider(SEPOLIA_RPC_URL);
    const token = new Contract(TOKEN_ADDRESS, TOKEN_ABI, provider);

    const decimals: number = await token.decimals();

    token.on("Transfer", async (from: string, to: string, value: bigint, event: any) => {
        const human = formatUnits(value, decimals);

        await notify(from, "OUT", human);
        await notify(to, "IN", human);
        console.log(
            `Transfer ${human} | from ${from} -> to ${to} | tx ${event.log.transactionHash}`
        );
    });

    console.log("Listening for transfers on", TOKEN_ADDRESS);
}

main().catch(console.error);