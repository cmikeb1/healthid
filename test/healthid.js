const HealthId = artifacts.require("./HealthId.sol");

contract("HealthId", accounts => {

  const owner = accounts[0];

  const ERROR_PREFIX = "Returned error: VM Exception while processing transaction: ";


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Tests for basic CRUD on a HealthID
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * This test covers the base functionality of a user creating a new healthId.  It will verify that a user can indeed
   * publish the indicated health details to the blockchian.
   */
  it("...should allow the user to create a HealthID.", async () => {
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
    const newHealthId = await healthIdInstance.accounts.call(owner);

    assert.equal(newHealthId.owner, owner, "The owner of the new HealthID should be the contract that created it.");
    assert.equal(newHealthId.name, name, "The new new HealthId should have the proper name.");
    assert.equal(newHealthId.bloodType, bloodType, "The new new HealthId should have the proper bloodType.");
    assert.equal(newHealthId.organDonor, organDonor, "The new new HealthId should have the proper organDonor.");
    assert.equal(newHealthId.birthYear, birthYear, "The new new HealthId should have the proper birthYear.");
    assert.equal(newHealthId.birthMonth, birthMonth, "The new new HealthId should have the proper birthMonth.");
    assert.equal(newHealthId.birthDay, birthDay, "The new account new HealthId have the proper birthDay.");
  });

  /**
   * This test verifies that a user who already has a HealthId cannot create a new one.
   */
  it("...should not allow the creation of a new HealthID if one has already been created for this account.", async () => {
    const healthIdInstance = await HealthId.deployed();

    const name = "First M. Last";
    const bloodType = 0;
    const organDonor = true;
    const birthYear = 1980;
    const birthMonth = 1;
    const birthDay = 1;

    // Create new account
    try {
      await healthIdInstance.newAccount(name, bloodType, organDonor, birthYear, birthMonth, birthDay);
    } catch (error) {
      assert(error, "Expected error when attempting to create an account twice.");
      assert(error.message.startsWith(ERROR_PREFIX + "revert"), "Expected a revert error, but got message " + error.message);
    }
  });


  /**
   * This verifies that a user can update their HealthId.
   */
  it("...should allow the user to update their HealthID.", async () => {
    const healthIdInstance = await HealthId.deployed();

    const newName = "F. Middle Last";
    const newBloodType = 1;
    const newOrganDonor = false;
    const newBirthYear = 1981;
    const newBirthMonth = 2;
    const newBirthDay = 2;

    // Create new account
    await healthIdInstance.updateAccount(newName, newBloodType, newOrganDonor, newBirthYear, newBirthMonth, newBirthDay);

    // Get created account
    const updatedHealthId = await healthIdInstance.accounts.call(owner);

    assert.equal(updatedHealthId.name, newName, "The new newHealthId should have the proper name.");
    assert.equal(updatedHealthId.bloodType, newBloodType, "The new newHealthId should have the proper bloodType.");
    assert.equal(updatedHealthId.organDonor, newOrganDonor, "The new newHealthId should have the proper organDonor.");
    assert.equal(updatedHealthId.birthYear, newBirthYear, "The new newHealthId should have the proper birthYear.");
    assert.equal(updatedHealthId.birthMonth, newBirthMonth, "The new account should have the proper birthMonth.");
    assert.equal(updatedHealthId.birthDay, newBirthDay, "The new account should have the proper birthDay.");
  });

  /**
   * This test verifies that a user can look up their own HealthId, using the publicly available accounts mapping.
   */
  it("...should allow the user to look up their own HealthID.", async () => {
    const healthIdInstance = await HealthId.deployed();

    const name = "F. Middle Last";
    const bloodType = 1;
    const organDonor = false;
    const birthYear = 1981;
    const birthMonth = 2;
    const birthDay = 2;

    // Get created account
    const lookedUpHealthId = await healthIdInstance.accounts.call(owner);

    assert.equal(lookedUpHealthId.owner, owner, "The owner of the new HealthID should be the contract that created it.");
    assert.equal(lookedUpHealthId.name, name, "The new new HealthId should have the proper name.");
    assert.equal(lookedUpHealthId.bloodType, bloodType, "The new new HealthId should have the proper bloodType.");
    assert.equal(lookedUpHealthId.organDonor, organDonor, "The new new HealthId should have the proper organDonor.");
    assert.equal(lookedUpHealthId.birthYear, birthYear, "The new new HealthId should have the proper birthYear.");
    assert.equal(lookedUpHealthId.birthMonth, birthMonth, "The new new HealthId should have the proper birthMonth.");
    assert.equal(lookedUpHealthId.birthDay, birthDay, "The new account new HealthId have the proper birthDay.");
  });


  /**
   * This test verifies that any user can look up any other users HealthId, using the publicly available accounts mapping.
   */
  it("...should allow any user to look up any HealthID.", async () => {
    const healthIdInstance = await HealthId.deployed();

    const name = "F. Middle Last";
    const bloodType = 1;
    const organDonor = false;
    const birthYear = 1981;
    const birthMonth = 2;
    const birthDay = 2;

    // Get created account, making the call from an account that IS NOT the owner of the HealthId being looked up.
    const lookedUpHealthId = await healthIdInstance.accounts.call(owner, {from: accounts[1]});

    assert.equal(lookedUpHealthId.owner, owner, "The owner of the new HealthID should be the contract that created it.");
    assert.equal(lookedUpHealthId.name, name, "The new new HealthId should have the proper name.");
    assert.equal(lookedUpHealthId.bloodType, bloodType, "The new new HealthId should have the proper bloodType.");
    assert.equal(lookedUpHealthId.organDonor, organDonor, "The new new HealthId should have the proper organDonor.");
    assert.equal(lookedUpHealthId.birthYear, birthYear, "The new new HealthId should have the proper birthYear.");
    assert.equal(lookedUpHealthId.birthMonth, birthMonth, "The new new HealthId should have the proper birthMonth.");
    assert.equal(lookedUpHealthId.birthDay, birthDay, "The new account new HealthId have the proper birthDay.");
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Tests for short circuit design pattern
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * This test verifies that the contract creator can toggle the "stopped" state on and off.
   */
  it("...should allow the owner to toggle the stopped state.", async () => {
    const healthIdInstance = await HealthId.deployed();

    // verify initial state is NOT stopped
    let currentStoppedState = await healthIdInstance.stopped.call();
    assert.equal(currentStoppedState, false, "The initial state of the contract should be NOT stopped.");

    // admin toggles state to stopped
    await healthIdInstance.toggleContractActive();
    currentStoppedState = await healthIdInstance.stopped.call();
    assert.equal(currentStoppedState, true, "The contract should not be toggled to stopped.");

    // admin toggles state back to NOT stopped
    await healthIdInstance.toggleContractActive();
    currentStoppedState = await healthIdInstance.stopped.call();
    assert.equal(currentStoppedState, false, "The contract should not be toggled to stopped.");
  });

  /**
   * This test verifies that accounts that are not the contract creator cannot toggle to short circuit.
   */
  it("...should not allow a non-owner to toggle stopped state.", async () => {
    const healthIdInstance = await HealthId.deployed();

    // verify initial state is NOT stopped
    let currentStoppedState = await healthIdInstance.stopped.call();
    assert.equal(currentStoppedState, false, "The initial state of the contract should be NOT stopped.");

    // non admin attempts to toggle state
    try {
      await healthIdInstance.toggleContractActive({from: accounts[1]});
    } catch (error){
      assert(error, "Expected error when non owner attempts to toggle stopped state.");
      assert(error.message.startsWith(ERROR_PREFIX + "revert"), "Expected a revert error, but got message " + error.message);
    }
  });


  /**
   * This test verifies that the newAccount and updateAccount functions cannot be called when the contract has been
   * short-circuited.
   */
  it("...should not allow new or updated HealthIds when stop is toggled on.", async () => {
    const healthIdInstance = await HealthId.deployed();

    // verify initial state is NOT stopped
    let currentStoppedState = await healthIdInstance.stopped.call();
    assert.equal(currentStoppedState, false, "The initial state of the contract should be NOT stopped.");

    // admin toggles state to stopped
    await healthIdInstance.toggleContractActive();
    currentStoppedState = await healthIdInstance.stopped.call();
    assert.equal(currentStoppedState, true, "The contract should not be toggled to stopped.");

    // user attempts to create healthid
    const name = "First M. Last";
    const bloodType = 0;
    const organDonor = true;
    const birthYear = 1980;
    const birthMonth = 1;
    const birthDay = 1;

    try {
      await healthIdInstance.newAccount(name, bloodType, organDonor, birthYear, birthMonth, birthDay);
    } catch (error) {
      assert(error, "Expected error when user attempts to create account on a stopped contract.");
      assert(error.message.startsWith(ERROR_PREFIX + "revert"), "Expected a revert error, but got message " + error.message);
    }

    try {
      await healthIdInstance.updateAccount(name, bloodType, organDonor, birthYear, birthMonth, birthDay);
    } catch (error) {
      assert(error, "Expected error when user attempts to update account on a stopped contract.");
      assert(error.message.startsWith(ERROR_PREFIX + "revert"), "Expected a revert error, but got message " + error.message);
    }

    // admin toggles state back to NOT stopped
    await healthIdInstance.toggleContractActive();
    currentStoppedState = await healthIdInstance.stopped.call();
    assert.equal(currentStoppedState, false, "The contract should not be toggled to stopped.");
  });


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Tests for library demo integration
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * This test calls the runLibraryDemo function, to demonstrate the contract is using a library.  This demo function
   * uses a condenses version of the SafeMath library, implementing subtraction.  Inputting two numbers, it should return
   * the difference between those numbers.
   */
  it("...should call the library demo function to find the difference between two inputs.", async () => {
    const healthIdInstance = await HealthId.deployed();

    const x = 10;
    const y = 6;
    const expectedDifference = 4;

    // Run the library demo function
    const actualDifference = await healthIdInstance.runLibraryDemo(x, y);

    assert.equal(actualDifference, expectedDifference, "The expected difference should match the actual difference.");
  });

});
