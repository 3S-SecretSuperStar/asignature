let TfmAsignatura = artifacts.require("TfmAsignatura");

module.exports = function(deployer) {
	deployer.deploy(TfmAsignatura,
		"0x2aF1eB15b58A994b94A8196263fd866C32637747", 	// coordinador
		"Prueba 1",		// nombre asignatura
		"2019-2020",	// curso academico
		"COVID-19",		// codigo asignatura
		3,				// numero de creditos
		1,				// semestre
		3,				// curso de la carrera
		0				// tipo asignatura (0=obligatoria, 1=optativa)
	);
};