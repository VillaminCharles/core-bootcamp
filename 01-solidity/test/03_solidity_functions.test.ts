import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("SolidityFunctions", function () {
  async function deploy() {
    const [account1] = await hre.ethers.getSigners();

    const SolidityFunctions = await hre.ethers.getContractFactory(
      "SolidityFunctions"
    );
    const INITIAL_BALANCE = 1_000_000;

    const ctcSolidityFunctions = await SolidityFunctions.deploy(
      INITIAL_BALANCE
    );

    return { ctcSolidityFunctions, account1 };
  }

  describe("Deployment", function () {
    it("should call constructor", async function () {
      const { ctcSolidityFunctions } = await loadFixture(deploy);
      expect(ctcSolidityFunctions).not.to.be.undefined;
    });

    it("should add balance", async function () {
      const { ctcSolidityFunctions } = await loadFixture(deploy);

      await ctcSolidityFunctions.addBalance(1_000_000);
      const balance = await ctcSolidityFunctions.getBalance();
      console.log("Balance after addition:", balance.toString());
    });

    it("calculator charan", async function () {
      const { ctcSolidityFunctions } = await loadFixture(deploy);

      let balance = await ctcSolidityFunctions.getBalance();
      console.log("Initial balance:", balance.toString());

      // Addition
      await ctcSolidityFunctions.calculator(1, 25_000);
      balance = await ctcSolidityFunctions.getBalance();
      console.log("Balance after addition:", balance.toString());

      // Ensure balance is sufficient before subtraction
      if (balance >= 25_000) {
        await ctcSolidityFunctions.calculator(2, 25_000);
        balance = await ctcSolidityFunctions.getBalance();
        console.log("Balance after subtraction:", balance.toString());
      } else {
        console.log("Skipping subtraction: Insufficient balance.");
      }

      // Multiplication
      await ctcSolidityFunctions.calculator(3, 25_000);
      balance = await ctcSolidityFunctions.getBalance();
      console.log("Balance after multiplication:", balance.toString());

      // Ensure we are not dividing by zero
      if (balance >= 25_000) {
        await ctcSolidityFunctions.calculator(4, 25_000);
        balance = await ctcSolidityFunctions.getBalance();
        console.log("Balance after division:", balance.toString());
      } else {
        console.log("Skipping division: Balance too low.");
      }
    });
  });
});
