pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/HealthId.sol";

contract TestHealthId {

  function testNewAccount() public {
    HealthId healthId = HealthId(DeployedAddresses.HealthId());
  }

}
