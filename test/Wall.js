const { expect, assert } = require("chai");

describe("Wall", async () => {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.

  async function deployFactory() {
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
    await wall.deployed();

    const name = await wall.name();
    // console.log({name})

    assert(name === "testName", "not correct");
  });

  it("message is correct", async () => {
    const [ac1, ac2] = await ethers.getSigners();
    const Wall = await hre.ethers.getContractFactory("Wall");
    const wall = await Wall.deploy(0, "testName", ac1.address);
    await wall.deployed();

    await wall.setMessage("test");
    const message = await wall.messages(0);
    assert(message.message === "test", "not correct");
  });

  it("minDonate changed", async () => {
    const [ac1, ac2] = await ethers.getSigners();
    const Wall = await hre.ethers.getContractFactory("Wall");
    const wall = await Wall.deploy(0, "testName", ac1.address);
    await wall.deployed();

    await wall.setMinDonate(10);
    const newValue = await wall.minDonate();
    assert(newValue.toNumber() === 10, "value not changed");
  });

  it("Owner modifer work correctly", async () => {
    const [ac1, ac2] = await ethers.getSigners();
    const Wall = await hre.ethers.getContractFactory("Wall");
    const wall = await Wall.deploy(0, "testName", ac1.address);
    await wall.deployed();
    try{
      await wall.connect(ac2).setMinDonate(10);
    }catch(error){};
    const newValue = await wall.minDonate();
    assert(newValue.toNumber() === 0, "value changed");
  });

  it("min donate works correctly", async () => {
    const [ac1, ac2] = await ethers.getSigners();
    const Wall = await hre.ethers.getContractFactory("Wall");
    const wall = await Wall.deploy(100, "testName", ac1.address);
    await wall.deployed();
    try {
      await wall.setMessage("test1", { value: 101 });
    } catch (error) {
      console.error(error);
      assert(false, "101");
    }
    try {
      await wall.setMessage("test2", { value: 100 });
    } catch (error) {
      console.error(error);
      assert(false, "100");
    }
    try {
      await wall.setMessage("test3", { value: 99 });
      assert(false, "99");
    } catch (error) {}
  });
});

describe("WallFactory", async () => {
  it("New contract created", async () => {
    const [ac1, ac2] = await ethers.getSigners();
    const Wall = await hre.ethers.getContractFactory("Wall");
    const wall = await Wall.deploy(0, "testName", ac1.address);
    const WallFactory = await hre.ethers.getContractFactory("WallFactory");
    const wallFactory = await WallFactory.deploy();

    await wallFactory.createNewWall(0, "test");
    const newWall = await wallFactory.walls(0);
    assert(newWall);
  });

  it("msg.sender is owner", async () => {
    const [ac1, ac2] = await ethers.getSigners();
    const Wall = await hre.ethers.getContractFactory("Wall");
    const wall = await Wall.deploy(0, "testName", ac1.address);
    const WallFactory = await hre.ethers.getContractFactory("WallFactory");
    const wallFactory = await WallFactory.deploy();
    await wallFactory.createNewWall(0, "test");
    const NewWall = await wallFactory.walls(0);
    const newWall = await Wall.attach(NewWall);
    const owner = await newWall.owner();
    assert(owner === ac1.address);
  });

  it("withdraw sucsess", async () => {
    const provider = ethers.provider;
    const [ac1, ac2, ac3] = await ethers.getSigners();
    const Wall = await hre.ethers.getContractFactory("Wall");
    const wall = await Wall.deploy(0, "testName", ac1.address);
    const WallFactory = await hre.ethers.getContractFactory("WallFactory");
    const wallFactory = await WallFactory.deploy();
    await wallFactory.connect(ac2).createNewWall(0, "test");
    const NewWall = await wallFactory.walls(0);
    const newWall = await Wall.attach(NewWall);
    const owner = await newWall.owner();

    const prevBalance1 = await provider.getBalance(ac1.address);
    const prevBalance2 = await provider.getBalance(ac2.address);

    await newWall
      .connect(ac3)
      .setMessage("test", { value: ethers.utils.parseEther("1000.0") });
    await newWall.connect(ac2).withdraw();

    const balance1 = await provider.getBalance(ac1.address);
    const balance2 = await provider.getBalance(ac2.address);

    assert(
      ethers.utils.formatEther(balance1.sub(prevBalance1)) > 9 &&
        ethers.utils.formatEther(balance2.sub(prevBalance2)) > 989
    );
  });

  it("Owner modifer work correctly", async () => {
    const provider = ethers.provider;
    const [ac1, ac2, ac3] = await ethers.getSigners();
    const Wall = await hre.ethers.getContractFactory("Wall");
    const wall = await Wall.deploy(0, "testName", ac1.address);
    const WallFactory = await hre.ethers.getContractFactory("WallFactory");
    const wallFactory = await WallFactory.deploy();
    await wallFactory.connect(ac2).createNewWall(0, "test");
    const NewWall = await wallFactory.walls(0);
    const newWall = await Wall.attach(NewWall);
    const owner = await newWall.owner();

    const prevBalance1 = await provider.getBalance(ac1.address);
    const prevBalance2 = await provider.getBalance(ac2.address);

    await newWall
      .connect(ac3)
      .setMessage("Owner modifer", { value: ethers.utils.parseEther("1000.0") });
    try{
      await newWall.connect(ac1).withdraw();
      assert(false, "must revert")
    } catch(error){
      
    }
    
    
  });
});
