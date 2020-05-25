let UpmAlumnos = artifacts.require("UpmAlumnos");
let UpmProfesores = artifacts.require("UpmProfesores");
let UpmCatalogo = artifacts.require("UpmCatalogo");

module.exports = function(deployer) {
	deployer.deploy(UpmAlumnos);
	deployer.deploy(UpmProfesores);
	deployer.deploy(UpmCatalogo);
};