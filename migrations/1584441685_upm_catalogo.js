let UpmCatalogo = artifacts.require("UpmCatalogo");

module.exports = function(deployer) {
	deployer.deploy(UpmCatalogo);
};