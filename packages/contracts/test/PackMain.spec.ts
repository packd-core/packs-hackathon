import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

const packConfig = {
  baseTokenURI: "baseTokenURI",
  name: "PackMain",
  symbol: "PCK",
};

describe("PackMain", function () {
  // This fixture deploys the contract and returns it
  const setup = async () => {
    // Get signers
    const signers = await ethers.getSigners();
    const deployer = signers[0];
    const alice = signers[1];
    const bob = signers[2];

    // Deploy contract
    const PackMain = await ethers.getContractFactory("PackMain");
    const packMain = await PackMain.deploy(
      deployer.address,
      packConfig.baseTokenURI,
      packConfig.name,
      packConfig.symbol
    );
    return { packMain, alice, bob, deployer };
  };

  it("Should be deployed", async function () {
    const { packMain, deployer } = await loadFixture(setup);
    expect(await packMain.getAddress()).to.be.properAddress;
    expect(await packMain.name()).to.equal(packConfig.name);
    expect(await packMain.symbol()).to.equal(packConfig.symbol);
    // TODO: Check baseTokenURI
    expect(await packMain.owner()).to.equal(deployer.address);
  });

  it("Should mint a new pack", async function () {
    const { packMain, alice } = await loadFixture(setup);
    const packInstance = packMain.connect(alice);
    await packInstance.pack(alice.address, { value: ethers.parseEther("1") });

    expect(await packMain.packState(0)).to.equal(1); // 1 is the enum value for Created
    expect(await packMain.ownerOf(0)).to.equal(alice.address);
  });

  it("Should not mint a new pack without ETH", async function () {
    const { packMain, alice } = await loadFixture(setup);
    const packInstance = packMain.connect(alice);
    await expect(
      packInstance.pack(alice.address)
    ).to.be.revertedWithCustomError(packMain, "InvalidEthValue");
  });

  it("Should revoke a pack", async function () {
    const { packMain, alice } = await loadFixture(setup);
    const packInstance = packMain.connect(alice);
    await packInstance.pack(alice.address, { value: ethers.parseEther("1") });
    expect(await packInstance.packState(0)).to.equal(1); // 1 is the enum value for Created
    // Pack is really created
    await packInstance.revoke(0);
    expect(await packInstance.packState(0)).to.equal(3); // 3 is the enum value for Revoked
  });
  it("Should not revoke a pack if not owner", async function () {
    const { packMain, alice, bob } = await loadFixture(setup);
    const packInstance = packMain.connect(alice);
    await packInstance.pack(alice.address, { value: ethers.parseEther("1") });
    expect(await packInstance.packState(0)).to.equal(1); // 1 is the enum value for Created
    // Pack is really created

    const packInstanceBob = packMain.connect(bob);
    await expect(packInstanceBob.revoke(0)).to.be.revertedWithCustomError(
      packMain,
      "OnlyOwnerOf"
    );
  });

  it("Should open a pack", async function () {
    const { packMain, alice, bob } = await loadFixture(setup);
    let packInstance = packMain.connect(alice);
    await packInstance.pack(alice.address, { value: ethers.parseEther("1") });
    expect(await packInstance.packState(0)).to.equal(1); // 1 is the enum value for Created

    // Change account to bob
    packInstance = packMain.connect(bob);
    await packInstance.open(0);
    expect(await packInstance.packState(0)).to.equal(2); // 2 is the enum value for Opened
  });
});
