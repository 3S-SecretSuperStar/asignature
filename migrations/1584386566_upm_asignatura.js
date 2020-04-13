require('dotenv').config();

let UpmAsignatura = artifacts.require("UpmAsignatura");

let addrCoordinador = process.env.ADDR_COORD_DEPLOYER_ASIGNATURA;

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