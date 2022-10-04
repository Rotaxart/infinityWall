const { expect } = require("chai");



describe("Wall", async function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.

  
  async function deployOneYearLockFixture() {
    const [ac1, ac2] = await ethers.getSigners();

    const Wall = await hre.ethers.getContractFactory("Wall");
    const wall = await Wall.deploy(0, "testName", ac1.address);
    const WallFactory = await hre.ethers.getContractFactory("WallFactory");
    const wallFactory = await WallFactory.deploy();

    await wall.deployed();
    await wallFactory.deployed();

    console.log`wall deployed to ${wall.address}
      factory deployed to ${wallFactory.address}`;

    return { wall, wallFactory, acc1, acc2 };
  }

  it("name should be correct", async () => {
    const [ac1, ac2] = await ethers.getSigners();
    const Wall = await hre.ethers.getContractFactory("Wall");
    const wall = await Wall.deploy(0, "testName", ac1.address);
    const WallFactory = await hre.ethers.getContractFactory("WallFactory");
    const wallFactory = await WallFactory.deploy();
    await wall.deployed();
    await wallFactory.deployed();

    const name = await wall.name();
    expect(name === "testName");
  });

   it("message is correct", async () =>{
    const [ac1, ac2] = await ethers.getSigners();
    const Wall = await hre.ethers.getContractFactory("Wall");
    const wall = await Wall.deploy(0, "testName", ac1.address);
    const WallFactory = await hre.ethers.getContractFactory("WallFactory");
    const wallFactory = await WallFactory.deploy();
    await wall.deployed();
    await wallFactory.deployed();

    await wall.setMessage("test")
    const message = await wall.messages(0);
    expect(message.message === "test")
   })
});
