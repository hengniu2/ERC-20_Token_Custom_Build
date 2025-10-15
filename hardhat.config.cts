import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import * as dotenv from 'dotenv';
// import { solidity } from 'hardhat';
// import { ethers } from 'ethers';
dotenv.config();

const { SEPOLIA_RPC_URL, PRIVATE_KEY, ETHEREUM_API_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: '0.8.24',
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL || "",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: ETHEREUM_API_KEY || "",
  },
};

export default config;