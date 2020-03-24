let UpmProfesores = artifacts.require("UpmProfesores");

module.exports = function(deployer) {
	deployer.deploy(UpmProfesores);
};