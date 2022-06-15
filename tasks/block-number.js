const { task } = require("hardhat/config");

task("block-number", " give the current block number").setAction(
  async (args, hre) => {
    const blocknumber = await hre.ethers.provider.getBlockNumber();
    console.log(blocknumber);
  }
);

module.exports = {};
