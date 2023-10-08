import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

import { KeySignManager } from "../utils/keySignManager";

const DEFAULT_CHAIN_ID = 1337;

interface ClaimData {
  tokenId: number;
  sigOwner: string; // Signature from the Pack owner
  claimer: string; // Address of the claimer
  sigClaimer: string; // Signature from the claimer
  refundValue: bigint; // Value to refund to the relayer
  maxRefundValue: bigint; // Maximum refundable value (to prevent over-refund)
}

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

    // Set PackMain address in KeySignManager
    const keySignManager = new KeySignManager(
      packConfig.registryChainId,
      packConfig.salt,
      await packMain.getAddress()
    );

    return { packMain, alice, bob, deployer, keySignManager };
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
    const { packMain, alice, keySignManager } = await loadFixture(setup);

    const aliceBalanceBefore = await ethers.provider.getBalance(alice.address);

    // Mint a new pack
    const packInstance = packMain.connect(alice);
    const { claimPublicKey } = await keySignManager.generateClaimKey(
      alice,
      ["uint256"],
      [1]
    );
    await packInstance.pack(alice.address, claimPublicKey, { value });

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
    const { packMain, alice, keySignManager } = await loadFixture(setup);
    const packInstance = packMain.connect(alice);
    const { claimPublicKey } = await keySignManager.generateClaimKey(
      alice,
      ["uint256"],
      [1]
    );
    await expect(
      packInstance.pack(alice.address, claimPublicKey)
    ).to.be.revertedWithCustomError(packMain, "InvalidEthValue");
  });
  it("Should revoke a pack", async function () {
    const { packMain, alice, keySignManager } = await loadFixture(setup);
    const packInstance = packMain.connect(alice);
    const { claimPublicKey } = await keySignManager.generateClaimKey(
      alice,
      ["uint256"],
      [1]
    );
    await packInstance.pack(alice.address, claimPublicKey, {
      value: ethers.parseEther("1"),
    });

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
    const { packMain, alice, bob, keySignManager } = await loadFixture(setup);
    const packInstance = packMain.connect(alice);
    const { claimPublicKey } = await keySignManager.generateClaimKey(
      alice,
      ["uint256"],
      [1]
    );
    await packInstance.pack(alice.address, claimPublicKey, {
      value: ethers.parseEther("1"),
    });
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
    const { packMain, alice, bob, keySignManager } = await loadFixture(setup);
    const { claimPublicKey, claimPrivateKey } =
      await keySignManager.generateClaimKey(alice, ["uint256"], [1]);

    // Mint a new pack
    let packInstance = packMain.connect(alice);
    await packInstance.pack(alice.address, claimPublicKey, { value });

    // Check correct state
    expect(await packInstance.packState(0)).to.equal(1); // 1 is the enum value for Created

    // Check balances
    const bobBalanceBefore = await ethers.provider.getBalance(bob.address);

    // Create SigOwner
    const { claimSignature: sigOwner } =
      await keySignManager.generateClaimSignature(
        claimPrivateKey,
        ["uint256", "address"],
        [0, bob.address]
      );
    // Create SigClaimer
    const { claimSignature: sigClaimer } =
      await keySignManager.generateClaimSignature(
        bob,
        ["uint256", "uint256"],
        [0, 0]
      );

    const claimData: ClaimData = {
      tokenId: 0,
      sigOwner: sigOwner,
      claimer: bob.address,
      sigClaimer: sigClaimer,
      refundValue: BigInt(0),
      maxRefundValue: BigInt(0),
    };

    // Change account to bob
    packInstance = packMain.connect(bob);
    await packInstance.open(claimData);

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
