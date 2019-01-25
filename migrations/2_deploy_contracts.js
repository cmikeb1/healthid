var HealthId = artifacts.require("./HealthId.sol");
var LibraryDemo = artifacts.require("./LibraryDemo.sol");

module.exports = function (deployer) {
  deployer.deploy(LibraryDemo);
  deployer.link(LibraryDemo, HealthId);
  deployer.deploy(HealthId);
};
