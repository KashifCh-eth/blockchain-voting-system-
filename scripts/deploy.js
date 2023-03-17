const hre = require("hardhat");

async function main() {
  const BlockchainVoting = await hre.ethers.getContractFactory(
    "BlockchainVoting"
  );
  const contract = await BlockchainVoting.deploy();

  await contract.deployed();

  console.log(`ContractAddress : ${contract.address}`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
