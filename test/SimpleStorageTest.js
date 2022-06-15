const { inputToConfig } = require("@ethereum-waffle/compiler");
const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorageTest", async function () {
  let simpleStorageFactory, contract;
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    contract = await simpleStorageFactory.deploy();
    contract.deployTransaction.wait(1);
  });

  it("Validate the existing number is 0", async function () {
    const favNumer = await contract.getFavNUmber();
    assert.equal(favNumer.toString(), "0", "Number doesn't match");
  });

  it("Validate updation of new number", async function () {
    const transactionResponse = await contract.setValue("5");
    await transactionResponse.wait(1);
    const newfavNumer = await contract.getFavNUmber();
    assert.equal(newfavNumer.toString(), "5", "Number doesn't match");
  });

  it("Validate Add people working", async function () {
    const emptyArrayOfPeople = await contract.AllRecordOfPeople.length;
    assert.equal(
      emptyArrayOfPeople.toString(),
      "0",
      "Already there are entries in array before adding new"
    );

    const transactionResponse = await contract.AddPeople("Sachin", "3");
    await transactionResponse.wait(1);
    const oneEntryArrayOfPeople = await contract.AllRecordOfPeople(0);
    console.log(`Name is : ${oneEntryArrayOfPeople.name}`);
    console.log(`Fav number is :${oneEntryArrayOfPeople.favNumber} `);
    assert.equal(
      oneEntryArrayOfPeople.name,
      "Sachin",
      "Mismatch count post adding"
    );

    assert.equal(
      oneEntryArrayOfPeople.favNumber,
      "3",
      "Mismatch count post adding"
    );
  });
});
