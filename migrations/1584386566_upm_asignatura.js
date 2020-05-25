require('dotenv').config();

let UpmAsignatura = artifacts.require("UpmAsignatura");

// hay que poner la dirección 9 de Ganache, la última
let addrCoordinador = '0xe0d905A75a49B44b239e4A973e68Ac35793BccCE';
//let addrCoordinador = process.env.REACT_APP_ADDR_COORD_DEPLOYER_ASIGNATURA;

console.log('addrCoordinador', addrCoordinador);

module.exports = function(deployer) {
	deployer.deploy(UpmAsignatura,
		addrCoordinador, 	// coordinador
		"Prueba 1",			// nombre asignatura
		"2019-2020",		// curso academico
		"COVID-19",			// codigo asignatura
		"Teleco",			// titulacion
		3,					// numero de creditos
		1,					// semestre
		3,					// curso de la carrera
		0					// tipo asignatura (0=obligatoria, 1=optativa)
	);
};