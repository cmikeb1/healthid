const path = require("path");
//const HDWalletProvider = require("./client/node_modules/truffle-hdwallet-provider");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*" // Match any network id
    },
    // "rinkeby-infura": {
    //   provider: function () {
    //     return new HDWalletProvider("<mnemonic>", "https://rinkeby.infura.io/v3/<key>")
    //   },
    //   network_id: 4,
    //   gas: 4700000
    // },
  }
};
