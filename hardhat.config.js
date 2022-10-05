require("@nomicfoundation/hardhat-toolbox");

const ALCHEMY_API_KEY = "xVMyzJmkUPhnzCCFRoXNnlMdaewzlxSW";

// Replace this private key with your Goerli account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const GOERLI_PRIVATE_KEY = "037be633bd53dc8e8738ef624f02c71a888a6683490dc5ec4a535af563a05f36";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: "2NN552UNF5TIIZYUPZXFH59M85I66JYBEM",
  },

};
