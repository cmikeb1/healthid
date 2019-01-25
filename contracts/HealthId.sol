pragma solidity ^0.5.0;

import "./LibraryDemo.sol";

contract HealthId {

    using LibraryDemo for uint;

    bool public stopped = false;
    address private admin;

    mapping(address => Account) public accounts;

    struct Account {
        address owner;
        string name;
        BloodType bloodType;
        bool organDonor;
        uint birthYear;
        uint birthMonth;
        uint birthDay;
    }

    enum BloodType {
        Aplus, Oplus, Bplus, ABplus, Aneg, Oneg, Bneg, ABneg
    }

    modifier verifyAccountDoesNotExist(){
        require(accounts[msg.sender].owner == address(0));
        _;
    }

    modifier isAdmin() {
        require(msg.sender == admin);
        _;
    }

    modifier stopInEmergency {
        require(!stopped);
        _;
    }

    event AccountCreated(address owner, string name);
    event AccountUpdated(address owner, string name);

    constructor() public {
        admin = msg.sender;
    }

    function newAccount(string memory _name, BloodType _bloodType, bool _organDonor, uint _birthYear, uint _birthMonth, uint _birthDay) public verifyAccountDoesNotExist() stopInEmergency() {
        emit AccountCreated(msg.sender, _name);
        accounts[msg.sender] = Account({owner : msg.sender, name : _name, bloodType : _bloodType, organDonor : _organDonor, birthYear : _birthYear, birthMonth : _birthMonth, birthDay : _birthDay});
    }

    function updateAccount(string memory _name, BloodType _bloodType, bool _organDonor, uint _birthYear, uint _birthMonth, uint _birthDay) public stopInEmergency() {
        emit AccountUpdated(msg.sender, _name);
        accounts[msg.sender] = Account({owner : msg.sender, name : _name, bloodType : _bloodType, organDonor : _organDonor, birthYear : _birthYear, birthMonth : _birthMonth, birthDay : _birthDay});
    }

    function toggleContractActive() isAdmin public {
        stopped = !stopped;
    }

    function runLibraryDemo(uint x, uint y) public pure returns (uint difference) {
        return x.minus(y);
    }
}
