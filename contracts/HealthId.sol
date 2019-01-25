pragma solidity ^0.5.0;

import "./LibraryDemo.sol";


/** @title HealthId. */
contract HealthId {

    // pull in the demo library and attach it to uint, this allows the contract to call the library function .minus on
    // any uint.
    using LibraryDemo for uint;

    // short-circuit is enabled when 'stopped' is set to true
    bool public stopped = false;

    // holder for the user allowed to toggle the stopped state, in the constructor this is defined as the account
    // who created this contract
    address private admin;

    // data structure holding all created HealthIds
    mapping(address => Account) public accounts;

    // definition of what data a HealthId holds
    struct Account {
        address owner;
        string name;
        BloodType bloodType;
        bool organDonor;
        uint birthYear;
        uint birthMonth;
        uint birthDay;
    }

    // enumeration defining the 8 common blood types, used in the Account struct
    enum BloodType {
        Aplus, Oplus, Bplus, ABplus, Aneg, Oneg, Bneg, ABneg
    }

    // used to ensure an account is not created twice
    modifier verifyAccountDoesNotExist(){
        require(accounts[msg.sender].owner == address(0));
        _;
    }

    // used to verify only the contract creator can run certain methods
    modifier isAdmin() {
        require(msg.sender == admin);
        _;
    }

    // part of the short-circuit design pattern, stopping execution of a method when stopped is toggled on
    modifier stopInEmergency {
        require(!stopped);
        _;
    }

    // a couple of events to track account CRUD operations
    event AccountCreated(address owner, string name);
    event AccountUpdated(address owner, string name);

    // assign the contract creator as the admin
    constructor() public {
        admin = msg.sender;
    }

    /**
     *  @dev Creates a new HealthID
     *  @param _name The name of the user to whom the HealthID belongs.
     *  @param _bloodType The blood type of the user to whom the HealthID belongs.
     *  @param _organDonor The organ donor status of the user to whom the HealthID belongs, true indicates the user IS a donor.
     *  @param _birthYear The birth year of the user to whom the HealthID belongs.
     *  @param _birthMonth The birth month of the user to whom the HealthID belongs.
     *  @param _birthDay The birth day of the month of the user to whom the HealthID belongs.
     */
    function newAccount(string memory _name, BloodType _bloodType, bool _organDonor, uint _birthYear, uint _birthMonth, uint _birthDay) public verifyAccountDoesNotExist() stopInEmergency() {
        emit AccountCreated(msg.sender, _name);
        accounts[msg.sender] = Account({owner : msg.sender, name : _name, bloodType : _bloodType, organDonor : _organDonor, birthYear : _birthYear, birthMonth : _birthMonth, birthDay : _birthDay});
    }

    /**
     *  @dev Updates an existing HealthID
     *  @param _name The name of the user to whom the HealthID belongs.
     *  @param _bloodType The blood type of the user to whom the HealthID belongs.
     *  @param _organDonor The organ donor status of the user to whom the HealthID belongs, true indicates the user IS a donor.
     *  @param _birthYear The birth year of the user to whom the HealthID belongs.
     *  @param _birthMonth The birth month of the user to whom the HealthID belongs.
     *  @param _birthDay The birth day of the month of the user to whom the HealthID belongs.
     */
    function updateAccount(string memory _name, BloodType _bloodType, bool _organDonor, uint _birthYear, uint _birthMonth, uint _birthDay) public stopInEmergency() {
        emit AccountUpdated(msg.sender, _name);
        accounts[msg.sender] = Account({owner : msg.sender, name : _name, bloodType : _bloodType, organDonor : _organDonor, birthYear : _birthYear, birthMonth : _birthMonth, birthDay : _birthDay});
    }

    /**
      *  @dev Allows the contract creator to stop use of this contract.
      */
    function toggleContractActive() isAdmin public {
        stopped = !stopped;
    }

    /**
      *  @dev Allows the contract creator to stop use of this contract.
      */
    function runLibraryDemo(uint x, uint y) public pure returns (uint difference) {
        return x.minus(y);
    }
}
