const HealthId = artifacts.require("./HealthId.sol");

contract("HealthId", accounts => {

  const owner = accounts[0];

  it("...should allow the user to create a new account.", async () => {
    const healthIdInstance = await HealthId.deployed();


    const name = "First M. Last";
    const bloodType = 0;
    const organDonor = true;
    const birthYear = 1980;
    const birthMonth = 1;
    const birthDay = 1;

    // Create new account
    await healthIdInstance.newAccount(name, bloodType, organDonor, birthYear, birthMonth, birthDay);

    // Get created account
    const newAccount = await healthIdInstance.accounts.call(owner);

    assert.equal(newAccount.owner, owner, "The owner of the new account should be the contract that created it.");
  });
});
