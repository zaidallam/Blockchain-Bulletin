const BlockchainBulletin = artifacts.require("BlockchainBulletin");

module.exports = function (deployer) {
  deployer.deploy(BlockchainBulletin);
};
