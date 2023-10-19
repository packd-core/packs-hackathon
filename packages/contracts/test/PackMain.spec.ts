import { expect } from "chai";
import hre, { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

import { KeySignManager } from "../utils/keySignManager";
import { getSystemConfig } from "../utils/deployConfig";
import { createPack } from "../utils/testUtils";
import { deploySystem } from "../scripts/deploy";
import { ClaimData } from "../utils/erc20moduleData";
import { getCommonSigners } from "../utils/signers";

const systemConfig = getSystemConfig(hre);

describe("PackMain", function () {
  // This fixture deploys the contract and returns it
  const setup = async () => {
    // Get signers
    const { alice, bob, deployer, relayer } = await getCommonSigners(hre);

    // ERC6551 Related contracts
    const { packMain } = await deploySystem(hre, deployer, systemConfig);

    // Set PackMain address in KeySignManager
    const keySignManager = new KeySignManager(
      systemConfig.packConfig.registryChainId,
      systemConfig.packConfig.salt,
      await packMain.getAddress()
    );

    return { packMain, alice, bob, deployer, keySignManager, relayer };
  };

  it("Should be deployed", async function () {
    const { packMain, deployer } = await loadFixture(setup);
    expect(await packMain.getAddress()).to.be.properAddress;
    expect(await packMain.name()).to.equal(systemConfig.packConfig.name);
    expect(await packMain.symbol()).to.equal(systemConfig.packConfig.symbol);
    // TODO: Check baseTokenURI
    expect(await packMain.owner()).to.equal(deployer.address);
  });
  describe("SelfClaim tests", function () {
    it("Should mint a new pack", async function () {
      const value = 1;
      const { packMain, alice, keySignManager } = await loadFixture(setup);

      const aliceBalanceBefore = await ethers.provider.getBalance(
        alice.address
      );

      // Mint a new pack using createPack function
      const { packInstance } = await createPack(
        packMain,
        alice,
        keySignManager,
        value
      );

      // Check correct state
      expect(await packInstance.packState(0)).to.equal(1); // 1 is the enum value for Created
      expect(await packInstance.ownerOf(0)).to.equal(alice.address);

      // Check pack eth balance
      const accountAddress = await packInstance.account(0);
      const ethBalanceAccount =
        await ethers.provider.getBalance(accountAddress);
      expect(ethBalanceAccount).to.equal(ethers.parseEther(value.toString()));
      const aliceBalanceAfter = await ethers.provider.getBalance(alice.address);
      expect(aliceBalanceAfter).to.lte(aliceBalanceBefore);
    });
    it("Should not mint a new pack without ETH", async function () {
      const { packMain, alice, keySignManager } = await loadFixture(setup);

      // Mint pack without ETH
      const value = 0;
      await expect(
        createPack(packMain, alice, keySignManager, value)
      ).to.be.revertedWithCustomError(packMain, "InvalidEthValue");
    });
    it("Should not mint a new pack with a non-whitelisted Module", async function () {
      const { packMain, alice, keySignManager } = await loadFixture(setup);

      // Mint pack with a non-whitelisted Module
      const value = 1;
      await expect(
        createPack(packMain, alice, keySignManager, value, [ethers.ZeroAddress])
      ).to.be.revertedWithCustomError(packMain, "ModulesNotWhitelisted");
    });
    it("Should whitelist a new Module", async function () {
      const { packMain, alice, keySignManager } = await loadFixture(setup);

      // whitelist a new Module
      await packMain.setModulesWhitelist([ethers.ZeroAddress], true);

      // Check that is whitelisted
      expect(await packMain.modulesWhitelist(ethers.ZeroAddress)).to.equal(
        true
      );

      // Mint pack with a non-whitelisted Module
      const value = 1;

      // Should still fail but not with the error of modules not whitelisted
      await expect(
        createPack(packMain, alice, keySignManager, value, [ethers.ZeroAddress])
      ).to.be.revertedWithCustomError(packMain, "InvalidLengthOfData");
    });

    it("Should revoke a pack", async function () {
      const value = 1;
      const { packMain, alice, keySignManager } = await loadFixture(setup);

      // Mint a new pack using createPack function
      const { packInstance } = await createPack(
        packMain,
        alice,
        keySignManager,
        value
      );

      // Check correct state
      expect(await packInstance.packState(0)).to.equal(1); // 1 is the enum value for Created

      const aliceBalanceBefore = await ethers.provider.getBalance(
        alice.address
      );

      // Revoke pack
      await packInstance.revoke(0, []);
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
      const value = 1;
      const { packInstance } = await createPack(
        packMain,
        alice,
        keySignManager,
        value
      );
      expect(await packInstance.packState(0)).to.equal(1); // 1 is the enum value for Created
      // Pack is really created

      const packInstanceBob = packMain.connect(bob);
      await expect(packInstanceBob.revoke(0, [])).to.be.revertedWithCustomError(
        packMain,
        "OnlyOwnerOf"
      );
    });
    it("Should open a pack", async function () {
      const value = 1;
      const { packMain, alice, bob, keySignManager } = await loadFixture(setup);

      // Mint a new pack using createPack function
      const { packInstance, claimPrivateKey } = await createPack(
        packMain,
        alice,
        keySignManager,
        value
      );

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
      const packInstanceBob = packMain.connect(bob);
      await packInstanceBob.open(claimData, []);

      // Check correct state
      expect(await packInstanceBob.packState(0)).to.equal(2); // 2 is the enum value for Opened

      // Check balances
      const accountAddress = await packInstanceBob.account(0);
      const ethBalanceAccount =
        await ethers.provider.getBalance(accountAddress);
      expect(ethBalanceAccount).to.equal(0);
      const bobBalanceAfter = await ethers.provider.getBalance(bob.address);
      expect(bobBalanceAfter).to.gt(bobBalanceBefore);
    });
  });
  describe("RelayClaim tests", function () {
    it("Should open a pack, 0 gas reimburstments", async function () {
      const value = 1;
      const { packMain, alice, bob, relayer, keySignManager } =
        await loadFixture(setup);

      // Mint a new pack using createPack function
      const { packInstance, claimPrivateKey } = await createPack(
        packMain,
        alice,
        keySignManager,
        value
      );

      // Check correct state
      expect(await packInstance.packState(0)).to.equal(1); // 1 is the enum value for Created

      // Create SigOwner
      const { claimSignature: sigOwner } =
        await keySignManager.generateClaimSignature(
          claimPrivateKey,
          ["uint256", "address"],
          [0, bob.address]
        );
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

      const bobBalanceBefore = await ethers.provider.getBalance(bob.address);

      // Change account to relayer
      const packInstanceRelayer = packMain.connect(relayer);
      await packInstanceRelayer.open(claimData, []);

      // Check correct state
      expect(await packInstanceRelayer.packState(0)).to.equal(2); // 2 is the enum value for Opened

      // Check balances
      const accountAddress = await packInstanceRelayer.account(0);
      const ethBalanceAccount =
        await ethers.provider.getBalance(accountAddress);
      expect(ethBalanceAccount).to.equal(0);
      const bobBalanceAfter = await ethers.provider.getBalance(bob.address);
      expect(bobBalanceAfter).to.gt(bobBalanceBefore);
    });
    it("Should open a pack, some gas reimburstmentsn to relayer", async function () {
      const value = 1;
      const maxRefundValue = ethers.parseEther("0.1");
      const { packMain, alice, bob, relayer, keySignManager } =
        await loadFixture(setup);

      // Mint a new pack using createPack function
      const { packInstance, claimPrivateKey } = await createPack(
        packMain,
        alice,
        keySignManager,
        value
      );

      // Check correct state
      expect(await packInstance.packState(0)).to.equal(1); // 1 is the enum value for Created

      // Create SigOwner
      const { claimSignature: sigOwner } =
        await keySignManager.generateClaimSignature(
          claimPrivateKey,
          ["uint256", "address"],
          [0, bob.address]
        );

      const { claimSignature: sigClaimer } =
        await keySignManager.generateClaimSignature(
          bob,
          ["uint256", "uint256"],
          [0, maxRefundValue]
        );

      const claimData: ClaimData = {
        tokenId: 0,
        sigOwner: sigOwner,
        claimer: bob.address,
        sigClaimer: sigClaimer,
        refundValue: maxRefundValue,
        maxRefundValue: maxRefundValue,
      };

      // Get balances before
      const bobBalanceBefore = await ethers.provider.getBalance(bob.address);
      const relayerBalanceBefore = await ethers.provider.getBalance(
        relayer.address
      );

      // Change account to relayer
      const packInstanceRelayer = packMain.connect(relayer);
      await packInstanceRelayer.open(claimData, []);

      // Check correct state
      expect(await packInstanceRelayer.packState(0)).to.equal(2); // 2 is the enum value for Opened

      // Check balances
      const accountAddress = await packInstanceRelayer.account(0);
      const ethBalanceAccount =
        await ethers.provider.getBalance(accountAddress);
      expect(ethBalanceAccount).to.equal(0);
      const bobBalanceAfter = await ethers.provider.getBalance(bob.address);
      expect(bobBalanceAfter).to.gt(bobBalanceBefore);
      const relayerBalanceAfter = await ethers.provider.getBalance(
        relayer.address
      );
      expect(relayerBalanceAfter).to.gt(relayerBalanceBefore);
    });

    it("Should not open a pack, gas reimburstmentsn to relayer is too high", async function () {
      const value = 1;
      const maxRefundValue = ethers.parseEther("0.1");
      const { packMain, alice, bob, relayer, keySignManager } =
        await loadFixture(setup);

      // Mint a new pack using createPack function
      const { packInstance, claimPrivateKey } = await createPack(
        packMain,
        alice,
        keySignManager,
        value
      );

      // Check correct state
      expect(await packInstance.packState(0)).to.equal(1); // 1 is the enum value for Created

      // Create SigOwner
      const { claimSignature: sigOwner } =
        await keySignManager.generateClaimSignature(
          claimPrivateKey,
          ["uint256", "address"],
          [0, bob.address]
        );

      const { claimSignature: sigClaimer } =
        await keySignManager.generateClaimSignature(
          bob,
          ["uint256", "uint256"],
          [0, maxRefundValue]
        );

      const claimData: ClaimData = {
        tokenId: 0,
        sigOwner: sigOwner,
        claimer: bob.address,
        sigClaimer: sigClaimer,
        refundValue: maxRefundValue + BigInt(1),
        maxRefundValue: maxRefundValue,
      };

      // Change account to relayer
      const packInstanceRelayer = packMain.connect(relayer);
      await expect(
        packInstanceRelayer.open(claimData, [])
      ).to.be.revertedWithCustomError(packMain, "InvalidRefundValue");
    });
    it("Should not open a pack, relayer tries to steal pack content", async function () {
      const value = 1;
      const maxRefundValue = ethers.parseEther("0.1");

      const { packMain, alice, bob, relayer, keySignManager } =
        await loadFixture(setup);

      // Mint a new pack using createPack function
      const { packInstance, claimPrivateKey } = await createPack(
        packMain,
        alice,
        keySignManager,
        value
      );

      // Check correct state
      expect(await packInstance.packState(0)).to.equal(1); // 1 is the enum value for Created

      // Create SigOwner
      const { claimSignature: sigOwner } =
        await keySignManager.generateClaimSignature(
          claimPrivateKey,
          ["uint256", "address"],
          [0, bob.address]
        );

      const { claimSignature: sigClaimer } =
        await keySignManager.generateClaimSignature(
          bob,
          ["uint256", "uint256"],
          [0, maxRefundValue]
        );

      const claimData: ClaimData = {
        tokenId: 0,
        sigOwner: sigOwner,
        claimer: relayer.address,
        sigClaimer: sigClaimer,
        refundValue: maxRefundValue,
        maxRefundValue: maxRefundValue,
      };

      // Change account to relayer
      const packInstanceRelayer = packMain.connect(relayer);
      await expect(
        packInstanceRelayer.open(claimData, [])
      ).to.be.revertedWithCustomError(packMain, "InvalidOwnerSignature");
    });
  });
});
