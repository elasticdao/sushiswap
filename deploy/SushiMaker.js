const { WETH } = require("@sushiswap/sdk")

module.exports = async function ({ ethers, getNamedAccounts, deployments }) {
  const { deploy } = deployments
  const { deployer, dev } = await getNamedAccounts()

  const chainId = await getChainId()

  const Factory = await deployments.get("UniswapV2Factory");
  const factory = new ethers.Contract(Factory.address, Factory.abi, ethers.provider.getSigner(deployer));
  const Bar = await deployments.get("SushiBar");
  const bar = new ethers.Contract(Bar.address, Bar.abi, ethers.provider.getSigner(deployer));
  const Sushi = await deployments.get("SushiToken");
  const sushi = new ethers.Contract(Sushi.address, Sushi.abi, ethers.provider.getSigner(deployer));

  let wethAddress;

  if (chainId === '420') {
    wethAddress = (await deployments.get("WETH9Mock")).address
  } else if (chainId in WETH) {
    wethAddress = WETH[chainId].address
  } else {
    throw Error("No WETH!")
  }

  await deploy("SushiMaker", {
    from: deployer,
    args: [factory.address, bar.address, sushi.address, wethAddress],
    log: true,
    deterministicDeployment: false
  })

  const Maker = await deployments.get("SushiMaker");
  const maker = new ethers.Contract(Maker.address, Maker.abi, ethers.provider.getSigner(deployer));
  if (await maker.owner() !== dev) {
    console.log("Setting maker owner")
    await (await maker.transferOwnership(dev, true, false)).wait()
  }

  // if (await factory.feeTo() !== address) {
  //   // Set FeeTo to maker
  //   console.log("Setting factory feeTo to maker address")
  //   await (await factory.connect(ethers.provider.getSigner(dev)).setFeeTo(address)).wait()
  // }
}

module.exports.tags = ["SushiMaker"]
module.exports.dependencies = ["UniswapV2Factory", "UniswapV2Router02", "SushiBar", "SushiToken"]