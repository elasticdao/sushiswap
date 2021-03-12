// // hardhat.config.ts

// import 'dotenv/config'
// import "@nomiclabs/hardhat-etherscan";
// import "@nomiclabs/hardhat-solhint";
// import "@tenderly/hardhat-tenderly";
// import "@nomiclabs/hardhat-waffle";
// import "hardhat-abi-exporter";
// import "hardhat-deploy";
// import "hardhat-deploy-ethers";
// import "hardhat-gas-reporter";
// import "hardhat-spdx-license-identifier";
// import "hardhat-typechain";
// import "hardhat-watcher";
// import "solidity-coverage";

// import "./tasks";

// import { HardhatUserConfig } from "hardhat/types";
// import { removeConsoleLog } from "hardhat-preprocessor";

// const accounts = {
//   mnemonic: process.env.TEST_MNEMONIC,
// }

// const config: HardhatUserConfig = {
//   abiExporter: {
//     path: "./abi",
//     clear: false,
//     flat: true,
//     // only: [],
//     // except: []
//   },
//   defaultNetwork: "hardhat",
//   etherscan: {
//     apiKey: process.env.ETHERSCAN_API_KEY,
//   },
//   gasReporter: {
//     coinmarketcap: process.env.COINMARKETCAP_API_KEY,
//     currency: "USD",
//     enabled: process.env.REPORT_GAS === "true",
//     excludeContracts: ["contracts/mocks/", "contracts/libraries/"],
//   },
//   mocha: {
//     timeout: 20000,
//   },
//   namedAccounts: {
//     deployer: {
//       default: 0
//     },
//     dev: {
//       // Default to 1
//       default: 1,
//       // dev address mainnet
//       // 1: "",
//     }
//   },
//   networks: {
//     edaoTestnet: {
//       url: 'https://node.edao.app',
//       chainId: 420,
//       accounts: {
//         mnemonic: process.env.TESTNET_SEED,
//         count: 10,
//       },
//     },
//   },
//   paths: {
//     artifacts: "artifacts",
//     cache: "cache",
//     deploy: "deploy",
//     deployments: "deployments",
//     imports: "imports",
//     sources: "contracts",
//     tests: "test",
//   },
//   preprocess: {
//     eachLine: removeConsoleLog((bre) => bre.network.name !== "hardhat" && bre.network.name !== "localhost"),
//   },
//   solidity: {
//     compilers: [
//       {
//         version: "0.6.12",
//         settings: {
//           optimizer: {
//             enabled: true,
//             runs: 200,
//           },
//         },
//       },
//     ],
//   },
//   spdxLicenseIdentifier: {
//     overwrite: false,
//     runOnCompile: true,
//   },
//   tenderly: {
//     project: process.env.TENDERLY_PROJECT!,
//     username: process.env.TENDERLY_USERNAME!,
//   },
//   typechain: {
//     outDir: "types",
//     target: "ethers-v5",
//   },
//   watcher: {
//     compile: {
//       tasks: ["compile"],
//       files: ["./contracts"],
//       verbose: true,
//     },
//   },
// }

// export default config;

/* eslint no-undef: 0 */
require('dotenv').config();

require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers');
require('hardhat-gas-reporter');
require('@nomiclabs/hardhat-etherscan');
require('hardhat-deploy');
// require('hardhat-contract-sizer');
require('solidity-coverage');

const ETHERSCAN_API_KEY = process.env.ETHERSCAN || '';
const TESTNET_SEED = process.env.TESTNET_SEED || '';

// Config
module.exports = {
  defaultNetwork: 'hardhat',
  solidity: {
    version: '0.6.12',
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  // contractSizer: {
  //   alphaSort: true,
  //   runOnCompile: true,
  // },
  networks: {
    hardhat: {
      gasPrice: 0,
      blockGasLimit: 100000000,
      allowUnlimitedContractSize: true,
    },
    coverage: {
      url: 'http://127.0.0.1:8555',
    },
    edaoTestnet: {
      url: 'https://node.edao.app',
      chainId: 420,
      accounts: {
        mnemonic: TESTNET_SEED,
        count: 10,
      },
    },
  },
  gasReporter: {
    src: 'src',
    artifactType: 'hardhat-v1',
    coinmarketcap: 'a69aea8b-8dce-45e5-ab8e-0e4577f27efd',
    currency: 'USD',
    showTimeSpent: 'true',
    // enabled: (process.env.REPORT_GAS) ? true : false
  },
  etherscan: {
    url: 'https://api.etherscan.io/api',
    apiKey: ETHERSCAN_API_KEY,
  },
  paths: {
    artifacts: "artifacts",
    cache: "cache",
    deploy: "deploy",
    deployments: "deployments",
    imports: "imports",
    sources: "contracts",
    tests: "test",
  },
  namedAccounts: {
    deployer: {
      default: 0
    },
    dev: {
      // Default to 1
      default: 1,
      // dev address mainnet
      // 1: "",
    }
  },
  mocha: {
    timeout: 60000,
  },
};
