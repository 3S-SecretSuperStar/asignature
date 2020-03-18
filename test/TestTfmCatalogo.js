let TfmCatalogo = artifacts.require("TfmCatalogo");

contract("TfmCatalogo", accounts => {
	let tfmCatalogo;

	before(async () => {
		tfmCatalogo = await TfmCatalogo.deployed();
		console.log("TfmCatalogo =", tfmCatalogo.address);
	});

	it("El owner es quien ha desplegado el contrato.", async () => {
		let owner = await tfmCatalogo.owner();
		let desplegador = accounts[0];
		assert.equal(owner, desplegador, "El owner debe ser quien ha desplegado el contrato.");
	});

	it("Al principio no hay ninguna asignatura registrada.", async () => {
		let asignaturasLength = await tfmCatalogo.asignaturasLength();
		let numAsignaturas = await tfmCatalogo.numAsignaturas();
		assert.equal(0, asignaturasLength, "No debe haber ninguna asignatura registrada.");
		assert.equal(0, numAsignaturas, "El numero de asignaturas debe ser 0.");
	});

	it("Se añade correctamente una asignatura", async () => {
		let addrContractAsignatura = "0x2435d30697Abd49564fF34bd005C468401D4dDF4";

		// comprobar que hay 0 asignaturas
		let numAsignaturas = await tfmCatalogo.numAsignaturas();
		assert.equal(0, numAsignaturas, "Todavia no debe haber ninguna asignatura registrada.");

		// añadir asignatura
		await tfmCatalogo.anadirAsignatura(addrContractAsignatura);

		// comprobar que hay 1 asignatura
		numAsignaturas = await tfmCatalogo.numAsignaturas();
		assert.equal(1, numAsignaturas, "Debe haber una asignatura registrada.");
	});

	it("Se lee correctamente una asignatura", async () => {
		let addrContractAsignatura = "0x2435d30697Abd49564fF34bd005C468401D4dDF4";

		let asignaturaIndex = await tfmCatalogo.mapAsignaturas(addrContractAsignatura);
		//console.log(addrContractAsignatura);
		//console.log(asignaturaIndex.toNumber());
		let resultadoArray = await tfmCatalogo.listaAsignaturas(asignaturaIndex);
		//console.log(resultadoArray);

		assert.equal(addrContractAsignatura, resultadoArray);
	});

	it("Se borra correctamente una asignatura", async () => {
		let addrContractAsignatura = "0x2435d30697Abd49564fF34bd005C468401D4dDF4";

		// comprobar que todavia hay 1 asignatura
		let numAsignaturas = await tfmCatalogo.numAsignaturas();
		assert.equal(1, numAsignaturas, "Debe haber una asignatura registrada.");

		// borrar asignatura
		await tfmCatalogo.eliminarAsignatura(addrContractAsignatura);

		// comprobar que hay 0 asignaturas
		numAsignaturas = await tfmCatalogo.numAsignaturas();
		assert.equal(0, numAsignaturas, "No debe haber ninguna asignatura registrada.");
	});

	/*
	it("Se lee una asignatura una vez borrada", async () => {
		console.log();
		let addrContractAsignatura = "0x2435d30697Abd49564fF34bd005C468401D4dDF4";

		let asignaturaIndex = await tfmCatalogo.mapAsignaturas(addrContractAsignatura);
		console.log(addrContractAsignatura);
		console.log(asignaturaIndex.toNumber());
		let resultadoArray = await tfmCatalogo.listaAsignaturas(asignaturaIndex);
		console.log(resultadoArray);
	});
	*/

	/*it("", async () => {
		assert.equal(expected, actual, msg);
	});*/
});