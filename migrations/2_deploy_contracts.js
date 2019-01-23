var HealthId = artifacts.require("./HealthId.sol");

module.exports = function(deployer) {
  deployer.deploy(HealthId);
};
