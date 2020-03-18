let TfmProfesores = artifacts.require("TfmProfesores");

module.exports = function(deployer) {
	deployer.deploy(TfmProfesores);
};