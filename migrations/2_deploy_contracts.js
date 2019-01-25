var HealthId = artifacts.require("./HealthId.sol");
var LibraryDemo = artifacts.require("./LibraryDemo.sol");

module.exports = function (deployer) {
  deployer.deploy(LibraryDemo).then(function () {
    return deployer.link(LibraryDemo, HealthId).then(function () {
      return deployer.deploy(HealthId);
    })
  });
};
