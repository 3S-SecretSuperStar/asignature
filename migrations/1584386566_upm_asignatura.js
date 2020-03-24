let UpmAsignatura = artifacts.require("UpmAsignatura");

let addrCoordinador = "0x39719fDb2835d968A706654C0591199d85bB49f6";

module.exports = function(deployer) {
	deployer.deploy(UpmAsignatura,
		addrCoordinador, 	// coordinador
		"Prueba 1",			// nombre asignatura
		"2019-2020",		// curso academico
		"COVID-19",			// codigo asignatura
		3,					// numero de creditos
		1,					// semestre
		3,					// curso de la carrera
		0					// tipo asignatura (0=obligatoria, 1=optativa)
	);
};