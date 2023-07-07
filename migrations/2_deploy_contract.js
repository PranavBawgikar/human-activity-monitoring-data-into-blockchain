const YourContract = artifacts.require("MyContract");

module.exports = function(deployer) {
  deployer.deploy(YourContract);
};
