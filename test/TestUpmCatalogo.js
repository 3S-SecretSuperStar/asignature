let UpmCatalogo = artifacts.require("UpmCatalogo");

contract("UpmCatalogo", accounts => {
	let upmCatalogo;
	let addrContractAsignatura = "0x2435d30697Abd49564fF34bd005C468401D4dDF4";
	let addrContractAsignaturaNoCreada = "0xa24014A288E451550A80A528446B8daDD6053896";

	before(async () => {
		upmCatalogo = await UpmCatalogo.deployed();
		console.log("UpmCatalogo =", upmCatalogo.address);
	});

	it("El owner es quien ha desplegado el contrato.", async () => {
		let owner = await upmCatalogo.owner();
		let desplegador = accounts[0];
		assert.equal(owner, desplegador, "El owner debe ser quien ha desplegado el contrato.");
	});

	it("Al principio no hay ninguna asignatura registrada.", async () => {
		let numAsignaturas = await upmCatalogo.numAsignaturas();
		assert.equal(0, numAsignaturas, "El numero de asignaturas debe ser 0.");
	});

	it("No se permite eliminar una asignatura cuando todavía no se ha creado ninguna", async () => {
        let errorMsg = "eliminarAsignatura - No hay Asignaturas creadas.";
        let error = false;

        // comprobar que hay 0 asignaturas
		let numAsignaturas = await upmCatalogo.numAsignaturas();
		assert.equal(0, numAsignaturas, "Todavía no debe haber ninguna asignatura registrada.");

        try {
            await upmCatalogo.eliminarAsignatura(addrContractAsignaturaNoCreada);
        } catch(err) {
            error = err.toString().includes(errorMsg);
        } finally {
            assert.equal(true, error, "No se debería permitir eliminar una asignatura cuando todavía no se ha creado ninguna.");
        }
    });

    it("No se permite añadir una asignatura a quien no es owner", async () => {
        let nombreAMostrar = "Nombre a mostrar";
        let notOwner = accounts[1];
        let errorMsg = "Sólo el owner puede hacer esta operación.";
        let error = false;

        // comprobar que hay 0 asignaturas
		let numAsignaturas = await upmCatalogo.numAsignaturas();
		assert.equal(0, numAsignaturas, "Todavía no debe haber ninguna asignatura registrada.");

        // intentar añadir una asignatura
        try {
            await upmCatalogo.anadirAsignatura(addrContractAsignatura, nombreAMostrar, {from: notOwner});
        } catch(err) {
            error = err.toString().includes(errorMsg);
        } finally {
            assert.equal(true, error, "Alguien que no es el owner no debería poder añadir una asignatura.");
        }

        // comprobar que sigue habiendo 0 asignaturas
        numAsignaturas = await upmCatalogo.numAsignaturas();
        assert.equal(0, numAsignaturas, "Todavía no debe haber ninguna asignatura registrada.");
    });

	it("Se añade correctamente una asignatura", async () => {
		let nombreAMostrar = "Nombre a mostrar";

		// comprobar que hay 0 asignaturas
		let numAsignaturas = await upmCatalogo.numAsignaturas();
		assert.equal(0, numAsignaturas, "Todavía no debe haber ninguna asignatura registrada.");

		// añadir asignatura
		await upmCatalogo.anadirAsignatura(addrContractAsignatura, nombreAMostrar);

		// comprobar que hay 1 asignatura
		numAsignaturas = await upmCatalogo.numAsignaturas();
		assert.equal(1, numAsignaturas, "Debe haber una asignatura registrada.");
	});

	it("No se permite volver a añadir una asignatura que ya está creada", async () => {
		let nombreAMostrar = "Nombre a mostrar";
		let errorMsg = "anadirAsignatura - Asignatura ya creada.";
        let error = false;

		// comprobar que hay 1 asignaturas
		let numAsignaturas = await upmCatalogo.numAsignaturas();
		assert.equal(1, numAsignaturas, "Debe haber una asignatura registrada.");


		// intentar añadir asignatura ya creada
        try {
            await upmCatalogo.anadirAsignatura(addrContractAsignatura, nombreAMostrar);
        } catch(err) {
            error = err.toString().includes(errorMsg);
        } finally {
            assert.equal(true, error, "No se debería permitir añadir una asignatura que ya ha sido creada.");
        }

		// comprobar que sigue habiendo 1 asignatura
		numAsignaturas = await upmCatalogo.numAsignaturas();
		assert.equal(1, numAsignaturas, "Debe seguir habiendo una asignatura registrada.");
	});

	it("Se lee correctamente una asignatura", async () => {
		let asignaturaIndex = await upmCatalogo.mapAsignaturas(addrContractAsignatura);
		let resultadoArray = await upmCatalogo.listaAsignaturas(asignaturaIndex.indexArray.toNumber());

		assert.equal(addrContractAsignatura, resultadoArray);
	});

	it("No se permite eliminar una asignatura que no está creada", async () => {
        let errorMsg = "eliminarAsignatura - Asignatura no creada.";
        let error = false;

        // comprobar que hay 1 asignatura
		let numAsignaturas = await upmCatalogo.numAsignaturas();
		assert.equal(1, numAsignaturas, "Debe haber una asignatura registrada.");

        try {
            await upmCatalogo.eliminarAsignatura(addrContractAsignaturaNoCreada);
        } catch(err) {
            error = err.toString().includes(errorMsg);
        } finally {
            assert.equal(true, error, "No se debería permitir eliminar una asignatura que no está creada.");
        }
    });

    it("No se permite borrar una asignatura a quien no es owner", async () => {
        let notOwner = accounts[1];
        let errorMsg = "Sólo el owner puede hacer esta operación.";
        let error = false;

        // comprobar que todavía hay 1 asignatura
		let numAsignaturas = await upmCatalogo.numAsignaturas();
		assert.equal(1, numAsignaturas, "Debe seguir habiendo una asignatura registrada.");

        // intentar borrar una asignatura
        try {
            await upmCatalogo.eliminarAsignatura(addrContractAsignatura, {from: notOwner});
        } catch(err) {
            error = err.toString().includes(errorMsg);
        } finally {
            assert.equal(true, error, "Alguien que no es el owner no debería poder borrar una asignatura.");
        }

        // comprobar que todavía hay 1 asignatura
		numAsignaturas = await upmCatalogo.numAsignaturas();
		assert.equal(1, numAsignaturas, "Debe seguir habiendo una asignatura registrada.");
    });

	it("Se borra correctamente una asignatura", async () => {
		// comprobar que todavía hay 1 asignatura
		let numAsignaturas = await upmCatalogo.numAsignaturas();
		assert.equal(1, numAsignaturas, "Debe haber una asignatura registrada.");

		// borrar asignatura
		await upmCatalogo.eliminarAsignatura(addrContractAsignatura);

		// comprobar que hay 0 asignaturas
		numAsignaturas = await upmCatalogo.numAsignaturas();
		assert.equal(0, numAsignaturas, "No debe haber ninguna asignatura registrada.");
	});

	it("No se permite actualizar el owner a quien no es owner", async () => {
		let desplegador = accounts[0];
		let newOwner = accounts[1];
		let errorMsg = "Sólo el owner puede hacer esta operación.";
		let error = false;

		// comprobar el owner actual
		let owner = await upmCatalogo.owner();
		assert.equal(desplegador, owner, "El owner debe ser quien ha desplegado el contrato.");

		// intentar actualizar el owner
		try {
			await upmCatalogo.actualizarOwner(newOwner, {from: newOwner});
		} catch(err) {
			error = err.toString().includes(errorMsg);
		} finally {
			assert.equal(true, error, "Alguien que no es el owner no debería poder actualizar el owner.");
		}

		// comprobar que el owner no se ha actualizado
		let newOwnerAct = await upmCatalogo.owner();
		assert.equal(desplegador, newOwnerAct, "El owner se ha actualizado y no tendría que haber ocurrido.");
	});

	it("El owner actualiza correctamente el owner", async () => {
		let newOwner = accounts[1];

		// comprobar el owner actual
		let owner = await upmCatalogo.owner();
		let desplegador = accounts[0];
		assert.equal(desplegador, owner, "El owner debe ser quien ha desplegado el contrato.");

		// actualizar owner
		await upmCatalogo.actualizarOwner(newOwner);

		// comprobar que el owner se ha actualizado
		let newOwnerAct = await upmCatalogo.owner();
		assert.equal(newOwner, newOwnerAct, "El owner no se ha actualizado correctamente.");
	});

	/*
	it("Se lee una asignatura una vez borrada", async () => {
		console.log();
		let addrContractAsignatura = "0x2435d30697Abd49564fF34bd005C468401D4dDF4";

		let asignaturaIndex = await upmCatalogo.mapAsignaturas(addrContractAsignatura);
		console.log(addrContractAsignatura);
		console.log(asignaturaIndex.toNumber());
		let resultadoArray = await upmCatalogo.listaAsignaturas(asignaturaIndex);
		console.log(resultadoArray);
	});
	*/

	/*it("", async () => {
		assert.equal(expected, actual, msg);
	});*/
});