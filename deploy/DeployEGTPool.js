// Defining bytecode and abi from original contract on mainnet to ensure bytecode matches and it produces the same pair code hash
const { bytecode, abi } = require('../deployments/mainnet/UniswapV2Factory.json')

module.exports = async function ({ ethers, getNamedAccounts, deployments, getChainId }) {
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()

  const UniswapV2Factory = await deployments.get("UniswapV2Factory");
  const uniswapV2Factory = new ethers.Contract(UniswapV2Factory.address, UniswapV2Factory.abi, ethers.provider.getSigner(deployer));
  const WETH = await deployments.get("WETH9Mock");
  const pair = await uniswapV2Factory.createPair(WETH.address, "0x33Fdb575368330F92a08dA84f50C07E667B294F2", { gasLimit: 3000000 });

  console.log('SushiSwap: Pair Deployed', await pair.wait());
}

module.exports.tags = ["DeployEGTPool"]
module.exports.dependencies = ["UniswapV2Factory", "UniswapV2Router02", "SushiToken", "Mock"]