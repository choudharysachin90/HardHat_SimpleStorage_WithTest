const { ethers, run, network } = require("hardhat");

async function main() {
  const contractFactory = await ethers.getContractFactory("SimpleStorage");

  const contract = await contractFactory.deploy();
  await contract.deployed();
  console.log(`Contract deployed at : ${contract.address}`);

  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    await contract.deployTransaction.wait(5);
    await verify(contract.address, []);
  }

  const favNum = await contract.getFavNUmber();
  console.log(`current fav number is : ${favNum}`);

  const transactionResponse = await contract.setValue("5");
  const transactionReceipt = await transactionResponse.wait(1);

  const newFavNumber = await contract.getFavNUmber();
  console.log(`current fav number is : ${newFavNumber}`);

  //console.log(network.config);
}

async function verify(contractAddress, args) {
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("already verified");
    } else {
      console.log(e);
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
