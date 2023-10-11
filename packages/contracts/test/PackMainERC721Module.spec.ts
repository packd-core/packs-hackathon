import { expect } from "chai";
import hre, { ethers } from "hardhat";
import type { Signer } from "ethers";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

import type { PackMain, ERC721Module, ERC721Mock } from "../typechain-types";

import { KeySignManager } from "../utils/keySignManager";
import { getSystemConfig } from "../utils/deployConfig";
import { createPack } from "../utils/testUtils";
import { deploySystem } from "../scripts/deploy";
import {
  ClaimData,
  generateMintData,
  generateRevokeData,
  generateClaimData,
} from "../utils/erc721moduleData";
import { getCommonSigners } from "../utils/signers";

const systemConfig = getSystemConfig(hre);

describe("PackMain, ERC721Module", function () {
  // This fixture deploys the contract and returns it
  const setup = async () => {
    // Get signers
    const { alice, bob, deployer, relayer } = await getCommonSigners(hre);

    // ERC6551 Related contracts
    const { packMain, erc721MockA, erc721Module } = await deploySystem(
      hre,
      deployer,
      systemConfig
    );

    // Set PackMain address in KeySignManager
    const keySignManager = new KeySignManager(
      systemConfig.packConfig.registryChainId,
      systemConfig.packConfig.salt,
      await packMain.getAddress()
    );

    return {
      packMain,
      alice,
      bob,
      deployer,
      keySignManager,
      relayer,
      erc721MockA,
      erc721Module,
    };
  };

  const mintPackWithERC721 = async (
    value: bigint,
    alice: Signer,
    packMain: PackMain,
    erc721Module: ERC721Module,
    erc721Mock: ERC721Mock,
    keySignManager: KeySignManager
  ) => {
    const tokenId = 0;
    await erc721Mock.mint(await alice.getAddress(), tokenId);
    const mockInstance = erc721Mock.connect(alice);
    await mockInstance.approve(await packMain.getAddress(), tokenId);

    const modules = [await erc721Module.getAddress()];
    const moduleData = await generateMintData([
      [await erc721Mock.getAddress(), BigInt(tokenId)],
    ]);

    const { packInstance, claimPrivateKey } = await createPack(
      packMain,
      alice,
      keySignManager,
      value,
      modules,
      [moduleData]
    );
    return { packInstance, alice, claimPrivateKey, erc721Mock };
  };

  describe("ERC721 Module, 1 token", function () {
    it("Should mint a new pack, with erc721MockA", async function () {
      const value = ethers.parseEther("1");

      const { packMain, alice, keySignManager, erc721MockA, erc721Module } =
        await loadFixture(setup);

      const aliceBalanceBefore = await ethers.provider.getBalance(
        alice.address
      );

      // Mint a new pack using createPack function
      const { packInstance } = await mintPackWithERC721(
        value,
        alice,
        packMain,
        erc721Module,
        erc721MockA,
        keySignManager
      );

      // Check correct state
      expect(await packInstance.packState(0)).to.equal(1); // 1 is the enum value for Created
      expect(await packInstance.ownerOf(0)).to.equal(alice.address);

      // Check pack eth balance
      const accountAddress = await packInstance.account(0);
      const ethBalanceAccount =
        await ethers.provider.getBalance(accountAddress);
      expect(ethBalanceAccount).to.equal(value);
      const aliceBalanceAfter = await ethers.provider.getBalance(alice.address);
      expect(aliceBalanceAfter).to.lte(aliceBalanceBefore);

      // Check pack erc721 balance
      const erc721BalanceAccount = await erc721MockA.balanceOf(accountAddress);
      expect(erc721BalanceAccount).to.equal(1);
      const aliceBalanceERC721After = await erc721MockA.balanceOf(
        alice.address
      );
      expect(aliceBalanceERC721After).to.equal(0);
    });
    it("Should revoke a pack", async function () {
      const value = ethers.parseEther("1");
      const tokenId = BigInt(0);
      const { packMain, alice, keySignManager, erc721MockA, erc721Module } =
        await loadFixture(setup);

      // Mint a new pack using createPack function
      const { packInstance } = await mintPackWithERC721(
        value,
        alice,
        packMain,
        erc721Module,
        erc721MockA,
        keySignManager
      );

      // Check correct state
      expect(await packInstance.packState(0)).to.equal(1); // 1 is the enum value for Created

      const revokeData = await generateRevokeData([
        [await erc721MockA.getAddress(), tokenId],
      ]);

      // Revoke pack
      await packInstance.revoke(0, [revokeData]);
      expect(await packInstance.packState(0)).to.equal(3); // 3 is the enum value for Revoked

      // Check that the erc721 tokens are back in the owner's account
      const aliceBalaceOf = await erc721MockA.balanceOf(alice.address);
      expect(aliceBalaceOf).to.equal(1);
      const ownerOf = await erc721MockA.ownerOf(tokenId);
      expect(ownerOf).to.equal(alice.address);
    });
    it("Should open a pack", async function () {
      const value = ethers.parseEther("1");
      const tokenId = BigInt(0);
      const {
        packMain,
        alice,
        bob,
        keySignManager,
        erc721MockA,
        erc721Module,
      } = await loadFixture(setup);

      // Mint a new pack using createPack function
      const { packInstance, claimPrivateKey } = await mintPackWithERC721(
        value,
        alice,
        packMain,
        erc721Module,
        erc721MockA,
        keySignManager
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

      const moduleData = await generateClaimData([
        [await erc721MockA.getAddress(), tokenId],
      ]);

      // Change account to bob
      const packInstanceBob = packMain.connect(bob);
      await packInstanceBob.open(claimData, [moduleData]);

      // Check correct state
      expect(await packInstanceBob.packState(0)).to.equal(2); // 2 is the enum value for Opened

      // Check that the erc721 token is in the claimer's account
      const bobBalaceOf = await erc721MockA.balanceOf(bob.address);
      expect(bobBalaceOf).to.equal(1);
      const ownerOf = await erc721MockA.ownerOf(tokenId);
      expect(ownerOf).to.equal(bob.address);

      // Nothing in the pack nor alice
      const accountAddress = await packInstance.account(0);
      const erc721BalanceAccount = await erc721MockA.balanceOf(accountAddress);
      expect(erc721BalanceAccount).to.equal(0);
      const aliceBalanceERC721After = await erc721MockA.balanceOf(
        alice.address
      );
      expect(aliceBalanceERC721After).to.equal(0);
    });
  });
  describe.skip("RelayClaim tests, with ERC721 Module", function () {
    it("Should open a pack, some gas reimburstments", async function () {
      const value = ethers.parseEther("1");
      const maxRefundValue = ethers.parseEther("0.1");
      const {
        packMain,
        alice,
        bob,
        relayer,
        keySignManager,
        erc20Module,
        erc20MockA,
      } = await loadFixture(setup);

      // Mint a new pack using createPack function
      const { packInstance, claimPrivateKey } = await mintPackWithERC20(
        value,
        alice,
        packMain,
        erc20Module,
        [{ mock: erc20MockA, value }],
        keySignManager
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
        refundValue: BigInt(0),
        maxRefundValue: maxRefundValue,
      };

      const bobBalanceBefore = await ethers.provider.getBalance(bob.address);

      const moduleData = await generateClaimData([
        await erc20MockA.getAddress(),
      ]);

      // Change account to relayer
      const packInstanceRelayer = packMain.connect(relayer);
      await packInstanceRelayer.open(claimData, [moduleData]);

      // Check correct state
      expect(await packInstanceRelayer.packState(0)).to.equal(2); // 2 is the enum value for Opened

      // Check balances
      const accountAddress = await packInstanceRelayer.account(0);
      const ethBalanceAccount =
        await ethers.provider.getBalance(accountAddress);
      expect(ethBalanceAccount).to.equal(0);
      const bobBalanceAfter = await ethers.provider.getBalance(bob.address);
      expect(bobBalanceAfter).to.gt(bobBalanceBefore);

      // Check that the erc20 tokens are in the claimer's account
      const erc20BalanceAccount = await erc20MockA.balanceOf(accountAddress);
      expect(erc20BalanceAccount).to.equal(0);
      const bobBalanceERC20After = await erc20MockA.balanceOf(bob.address);
      expect(bobBalanceERC20After).to.equal(value);
    });
    it.skip("Should not open a pack, relayer tries to steal pack content", async function () {
      // TODO: Relayer could change the moduleData to send other valueless tokens to claimer
    });
  });
  describe.skip("ERC721 Module, 2 tokens", function () {
    it("Should mint a new pack, with erc20MockA and erc20MockB", async function () {
      const valueA = ethers.parseEther("1");
      const valueB = ethers.parseEther("2");
      const {
        packMain,
        alice,
        keySignManager,
        erc20Module,
        erc20MockA,
        erc20MockB,
      } = await loadFixture(setup);

      // Mint a new pack using createPack function
      const { packInstance } = await mintPackWithERC20(
        valueA + valueB,
        alice,
        packMain,
        erc20Module,
        [
          { mock: erc20MockA, value: valueA },
          { mock: erc20MockB, value: valueB },
        ],
        keySignManager
      );

      // Check correct state
      expect(await packInstance.packState(0)).to.equal(1); // 1 is the enum value for Created
      expect(await packInstance.ownerOf(0)).to.equal(alice.address);

      // Check pack eth balance
      const accountAddress = await packInstance.account(0);
      const ethBalanceAccount =
        await ethers.provider.getBalance(accountAddress);
      expect(ethBalanceAccount).to.equal(valueA + valueB);

      // Check pack erc20 balance
      const erc20BalanceAccountA = await erc20MockA.balanceOf(accountAddress);
      expect(erc20BalanceAccountA).to.equal(valueA);
      const erc20BalanceAccountB = await erc20MockB.balanceOf(accountAddress);
      expect(erc20BalanceAccountB).to.equal(valueB);
    });
    it("Should revoke a pack", async function () {
      const valueA = ethers.parseEther("1");
      const valueB = ethers.parseEther("2");
      const {
        packMain,
        alice,
        keySignManager,
        erc20Module,
        erc20MockA,
        erc20MockB,
      } = await loadFixture(setup);

      // Mint a new pack using createPack function
      const { packInstance } = await mintPackWithERC20(
        valueA + valueB,
        alice,
        packMain,
        erc20Module,
        [
          { mock: erc20MockA, value: valueA },
          { mock: erc20MockB, value: valueB },
        ],
        keySignManager
      );

      const accountAddress = await packInstance.account(0);

      // Check correct state
      expect(await packInstance.packState(0)).to.equal(1); // 1 is the enum value for Created
      // Check pack erc20 balance
      const erc20BalanceAccountA = await erc20MockA.balanceOf(accountAddress);
      expect(erc20BalanceAccountA).to.equal(valueA);
      const erc20BalanceAccountB = await erc20MockB.balanceOf(accountAddress);
      expect(erc20BalanceAccountB).to.equal(valueB);

      const revokeData = await generateRevokeData([
        await erc20MockA.getAddress(),
        await erc20MockB.getAddress(),
      ]);

      // Revoke pack
      await packInstance.revoke(0, [revokeData]);
      expect(await packInstance.packState(0)).to.equal(3); // 3 is the enum value for Revoked

      // Check ERC20 balances
      const erc20BalanceAccountAAfter =
        await erc20MockA.balanceOf(accountAddress);
      expect(erc20BalanceAccountAAfter).to.equal(0);
      const erc20BalanceAccountBAfter =
        await erc20MockB.balanceOf(accountAddress);
      expect(erc20BalanceAccountBAfter).to.equal(0);

      // Check that the erc20 tokens are back in the owner's account
      const aliceBalanceERC20AfterA = await erc20MockA.balanceOf(alice.address);
      expect(aliceBalanceERC20AfterA).to.equal(valueA);
      const aliceBalanceERC20AfterB = await erc20MockB.balanceOf(alice.address);
      expect(aliceBalanceERC20AfterB).to.equal(valueB);
    });
    it("Should open a pack", async function () {
      const valueA = ethers.parseEther("1");
      const valueB = ethers.parseEther("2");
      const {
        packMain,
        alice,
        bob,
        keySignManager,
        erc20Module,
        erc20MockA,
        erc20MockB,
      } = await loadFixture(setup);

      // Mint a new pack using createPack function
      const { packInstance, claimPrivateKey } = await mintPackWithERC20(
        valueA + valueB,
        alice,
        packMain,
        erc20Module,
        [
          { mock: erc20MockA, value: valueA },
          { mock: erc20MockB, value: valueB },
        ],
        keySignManager
      );

      // Check correct state
      expect(await packInstance.packState(0)).to.equal(1); // 1 is the enum value for Created

      // Check balances
      const accountAddress = await packInstance.account(0);
      const ethBalanceAccount =
        await ethers.provider.getBalance(accountAddress);
      expect(ethBalanceAccount).to.equal(valueA + valueB);

      // Check that the erc20 tokens are in the pack
      const erc20BalanceAccountA = await erc20MockA.balanceOf(accountAddress);
      expect(erc20BalanceAccountA).to.equal(valueA);
      const erc20BalanceAccountB = await erc20MockB.balanceOf(accountAddress);
      expect(erc20BalanceAccountB).to.equal(valueB);

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

      const moduleData = await generateClaimData([
        await erc20MockA.getAddress(),
        await erc20MockB.getAddress(),
      ]);

      // Change account to bob
      const packInstanceBob = packMain.connect(bob);
      await packInstanceBob.open(claimData, [moduleData]);

      // Check correct state
      expect(await packInstanceBob.packState(0)).to.equal(2); // 2 is the enum value for Opened

      // Check erc20 balances
      const erc20BalanceAccountAAfter =
        await erc20MockA.balanceOf(accountAddress);
      expect(erc20BalanceAccountAAfter).to.equal(0);
      const erc20BalanceAccountBAfter =
        await erc20MockB.balanceOf(accountAddress);
      expect(erc20BalanceAccountBAfter).to.equal(0);

      // Check erc20 balances for claimer
      const bobBalanceERC20AfterA = await erc20MockA.balanceOf(bob.address);
      expect(bobBalanceERC20AfterA).to.equal(valueA);
      const bobBalanceERC20AfterB = await erc20MockB.balanceOf(bob.address);
      expect(bobBalanceERC20AfterB).to.equal(valueB);
    });
  });
});
