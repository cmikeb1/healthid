pragma solidity ^0.5.0;

contract HealthId {

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

    modifier verifyAccountDoesNotExist(){require(accounts[msg.sender].owner == address(0)); _;}

    event AccountCreated(address owner, string name);

    function newAccount(string memory _name, BloodType _bloodType, bool _organDonor, uint _birthYear, uint _birthMonth, uint _birthDay) public verifyAccountDoesNotExist() {
        emit AccountCreated(msg.sender, _name);
        accounts[msg.sender] = Account({owner: msg.sender, name : _name, bloodType : _bloodType, organDonor : _organDonor, birthYear : _birthYear, birthMonth : _birthMonth, birthDay : _birthDay});
    }
}
