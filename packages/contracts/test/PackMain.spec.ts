import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { PackMain } from "../typechain-types";

const DEFAULT_CHAIN_ID = 1337;

const packConfig = {
  initBaseURI: "https://packd.io/",
  name: "PackMain",
  symbol: "PCK",
  registry: ethers.ZeroAddress,
  implementation: ethers.ZeroAddress,
  registryChainId: DEFAULT_CHAIN_ID,
  salt: 0,
};

describe("PackMain", function () {
  // This fixture deploys the contract and returns it
  const setup = async () => {
    // Get signers
    const signers = await ethers.getSigners();
    const deployer = signers[0];
    const alice = signers[1];
    const bob = signers[2];

    // ERC6551 Related contracts
    const PackAccount = await ethers
      .getContractFactory("PackAccount")
      .then((f) => f.deploy())
      .then((d) => d.waitForDeployment());
    const PackRegistry = await ethers
      .getContractFactory("PackRegistry")
      .then((f) => f.deploy())
      .then((d) => d.waitForDeployment());

    packConfig.registry = await PackRegistry.getAddress();
    packConfig.implementation = await PackAccount.getAddress();

    // Deploy PackMain
    const PackMain = await ethers.getContractFactory("PackMain");
    const packMain = await PackMain.deploy(
      deployer.address,
      packConfig.initBaseURI,
      packConfig.name,
      packConfig.symbol,
      packConfig.registry,
      packConfig.implementation,
      packConfig.registryChainId,
      packConfig.salt
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
    const value = ethers.parseEther("1");
    const { packMain, alice } = await loadFixture(setup);

    const aliceBalanceBefore = await ethers.provider.getBalance(alice.address);

    // Mint a new pack
    const packInstance = packMain.connect(alice);
    await packInstance.pack(alice.address, { value });

    // Check correct state
    expect(await packInstance.packState(0)).to.equal(1); // 1 is the enum value for Created
    expect(await packInstance.ownerOf(0)).to.equal(alice.address);

    // Check pack eth balance
    const accountAddress = await packInstance.account(0);
    const ethBalanceAccount = await ethers.provider.getBalance(accountAddress);
    expect(ethBalanceAccount).to.equal(value);
    const aliceBalanceAfter = await ethers.provider.getBalance(alice.address);
    expect(aliceBalanceAfter).to.lte(aliceBalanceBefore);
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

    // Check correct state
    expect(await packInstance.packState(0)).to.equal(1); // 1 is the enum value for Created

    const aliceBalanceBefore = await ethers.provider.getBalance(alice.address);

    // Revoke pack
    await packInstance.revoke(0);
    expect(await packInstance.packState(0)).to.equal(3); // 3 is the enum value for Revoked

    // Check pack eth balance
    const accountAddress = await packInstance.account(0);
    const ethBalanceAfter = await ethers.provider.getBalance(accountAddress);
    expect(ethBalanceAfter).to.equal(0);
    const aliceBalanceAfter = await ethers.provider.getBalance(alice.address);
    expect(aliceBalanceAfter).to.gt(aliceBalanceBefore);
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
    const value = ethers.parseEther("1");
    const { packMain, alice, bob } = await loadFixture(setup);

    // Mint a new pack
    let packInstance = packMain.connect(alice);
    await packInstance.pack(alice.address, { value });

    // Check correct state
    expect(await packInstance.packState(0)).to.equal(1); // 1 is the enum value for Created

    // Check balances
    const bobBalanceBefore = await ethers.provider.getBalance(bob.address);

    // Change account to bob
    packInstance = packMain.connect(bob);
    await packInstance.open(0);

    // Check correct state
    expect(await packInstance.packState(0)).to.equal(2); // 2 is the enum value for Opened

    // Check balances
    const accountAddress = await packInstance.account(0);
    const ethBalanceAccount = await ethers.provider.getBalance(accountAddress);
    expect(ethBalanceAccount).to.equal(0);
    const bobBalanceAfter = await ethers.provider.getBalance(bob.address);
    expect(bobBalanceAfter).to.gt(bobBalanceBefore);
  });
});
