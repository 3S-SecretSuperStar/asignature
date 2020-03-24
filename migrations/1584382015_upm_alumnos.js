let UpmAlumnos = artifacts.require("UpmAlumnos");

module.exports = function(deployer) {
	deployer.deploy(UpmAlumnos);
};