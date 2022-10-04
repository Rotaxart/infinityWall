// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const [ac1, ac2] = await ethers.getSigners();

  const Wall = await hre.ethers.getContractFactory("Wall");
  const wall = await Wall.deploy(0,"testName", ac1.address);
  const WallFactory = await hre.ethers.getContractFactory("WallFactory");
  const wallFactory = await WallFactory.deploy();
  
  await wall.deployed();
  await wallFactory.deployed();

  console.log(
    `wall deployed to ${wall.address}
    factory deployed to ${wallFactory.address}`
  );

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
