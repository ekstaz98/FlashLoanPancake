import "dotenv/config"
import { HardhatUserConfig } from "hardhat/types"
import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-ethers"
import "hardhat-deploy"
import "@typechain/hardhat"
import "hardhat-abi-exporter"
import "@nomiclabs/hardhat-etherscan"
import "@openzeppelin/hardhat-upgrades"
import "solidity-coverage"
import "hardhat-gas-reporter"
import "./tasks"

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    solidity: {
        compilers: [
            {
                version: "0.8.12",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },
    paths: {
        tests: "./tests",
        artifacts: "./build/artifacts",
        cache: "./build/cache",
        deployments: "./build/deployments",
    },
    typechain: {
        outDir: "./build/typechain",
    },
    gasReporter: {
        currency: "USD",
        coinmarketcap: process.env.COINMARKETCAP_API_KEY,
        token: process.env.TOKEN,
        gasPriceApi: process.env.GAS_PRICE_API,
        enabled: process.env.REPORT_GAS === "true" ? true : false,
        maxMethodDiff: 10,
    },
    networks: {
        hardhat: {
            accounts: {
                mnemonic: process.env.MNEMONIC,
            },
            allowUnlimitedContractSize: true,
            forking: {
                url: process.env.FORKING_URL as string,
                blockNumber: process.env.BLOCK_NUMBER ? +process.env.BLOCK_NUMBER : 1
            },
        },
        localhost: {
            url: "http://127.0.0.1:8545",
            accounts: {
                mnemonic: process.env.MNEMONIC,
            },
            forking: {
                url: process.env.FORKING_URL as string,
                blockNumber: process.env.BLOCK_NUMBER ? +process.env.BLOCK_NUMBER : 1
            },
        },
        testnetBNB: {
            url: "https://data-seed-prebsc-1-s1.binance.org:8545",
            chainId: 97,
            accounts: {
                mnemonic: process.env.MNEMONIC
            }
        },
        mainnetBNB: {
            url: "https://bsc-dataseed.binance.org/",
            chainId: 56,
            accounts: {
                mnemonic: process.env.MNEMONIC
            }
        },
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY || "API_KEY_WEB",
    },
    abiExporter: {
        path: "./build/abis",
        runOnCompile: true,
        clear: true,
        flat: true,
        only: [],
        spacing: 2,
        pretty: false,
    },
}

export default config
