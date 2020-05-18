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

	it("No se permite eliminar una asignatura que no está creada", async () => {
        let errorMsg = "eliminarAsignatura - No hay Asignaturas creadas.";
        let error = false;

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

		let numAsignaturas = await upmCatalogo.numAsignaturas();
		assert.equal(0, numAsignaturas, "Todavía no debe haber ninguna asignatura registrada.");

        try {
            await upmCatalogo.anadirAsignatura(addrContractAsignatura, nombreAMostrar, {from: notOwner});
        } catch(err) {
            error = err.toString().includes(errorMsg);
        } finally {
            assert.equal(true, error, "Alguien que no es el owner no debería poder añadir una asignatura.");
        }

        numAsignaturas = await upmCatalogo.numAsignaturas();
        assert.equal(0, numAsignaturas, "Todavía no debe haber ninguna asignatura registrada.");
    });

	it("El owner añade correctamente una asignatura", async () => {
		let nombreAMostrar = "Nombre a mostrar";

		let numAsignaturas = await upmCatalogo.numAsignaturas();
		assert.equal(0, numAsignaturas, "Todavía no debe haber ninguna asignatura registrada.");

		await upmCatalogo.anadirAsignatura(addrContractAsignatura, nombreAMostrar);

		numAsignaturas = await upmCatalogo.numAsignaturas();
		assert.equal(1, numAsignaturas, "Debe haber una asignatura registrada.");

		let asignaturaConNombre = await upmCatalogo.mapAsignaturas(addrContractAsignatura);

		assert.equal(nombreAMostrar, asignaturaConNombre.nombreAMostrar, "El nombre a mostrar de la asignatura debe coincidir.");
	});

	it("No se permite volver a añadir una asignatura que ya está creada", async () => {
		let nombreAMostrar = "Nombre a mostrar";
		let errorMsg = "anadirAsignatura - Asignatura ya creada.";
        let error = false;

		let numAsignaturas = await upmCatalogo.numAsignaturas();
		assert.equal(1, numAsignaturas, "Debe haber una asignatura registrada.");

        try {
            await upmCatalogo.anadirAsignatura(addrContractAsignatura, nombreAMostrar);
        } catch(err) {
            error = err.toString().includes(errorMsg);
        } finally {
            assert.equal(true, error, "No se debería permitir añadir una asignatura que ya ha sido creada.");
        }

		numAsignaturas = await upmCatalogo.numAsignaturas();
		assert.equal(1, numAsignaturas, "Debe seguir habiendo una asignatura registrada.");
	});

	it("El owner lee correctamente una asignatura", async () => {
		let nombreAMostrar = "Nombre a mostrar";
		let asignaturaConNombre = await upmCatalogo.mapAsignaturas(addrContractAsignatura);
		let resultadoArray = await upmCatalogo.listaAsignaturas(asignaturaConNombre.indexArray.toNumber());

		assert.equal(addrContractAsignatura, resultadoArray);
		assert.equal(nombreAMostrar, asignaturaConNombre.nombreAMostrar);
	});

	it("No se permite eliminar una asignatura que no está creada", async () => {
        let errorMsg = "eliminarAsignatura - Asignatura no creada.";
        let error = false;

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

		let numAsignaturas = await upmCatalogo.numAsignaturas();
		assert.equal(1, numAsignaturas, "Debe seguir habiendo una asignatura registrada.");

        try {
            await upmCatalogo.eliminarAsignatura(addrContractAsignatura, {from: notOwner});
        } catch(err) {
            error = err.toString().includes(errorMsg);
        } finally {
            assert.equal(true, error, "Alguien que no es el owner no debería poder borrar una asignatura.");
        }

		numAsignaturas = await upmCatalogo.numAsignaturas();
		assert.equal(1, numAsignaturas, "Debe seguir habiendo una asignatura registrada.");
    });

	it("El owner borra correctamente una asignatura", async () => {
		let numAsignaturas = await upmCatalogo.numAsignaturas();
		assert.equal(1, numAsignaturas, "Debe haber una asignatura registrada.");

		await upmCatalogo.eliminarAsignatura(addrContractAsignatura);

		numAsignaturas = await upmCatalogo.numAsignaturas();
		assert.equal(0, numAsignaturas, "No debe haber ninguna asignatura registrada.");
	});

	it("No se permite actualizar el owner a quien no es owner", async () => {
		let desplegador = accounts[0];
		let newOwner = accounts[1];
		let errorMsg = "Sólo el owner puede hacer esta operación.";
		let error = false;

		let owner = await upmCatalogo.owner();
		assert.equal(desplegador, owner, "El owner debe ser quien ha desplegado el contrato.");

		try {
			await upmCatalogo.actualizarOwner(newOwner, {from: newOwner});
		} catch(err) {
			error = err.toString().includes(errorMsg);
		} finally {
			assert.equal(true, error, "Alguien que no es el owner no debería poder actualizar el owner.");
		}

		let newOwnerAct = await upmCatalogo.owner();
		assert.equal(desplegador, newOwnerAct, "El owner se ha actualizado y no tendría que haber ocurrido.");
	});

	it("El owner actualiza correctamente el owner", async () => {
		let newOwner = accounts[1];

		let owner = await upmCatalogo.owner();
		let desplegador = accounts[0];
		assert.equal(desplegador, owner, "El owner debe ser quien ha desplegado el contrato.");

		await upmCatalogo.actualizarOwner(newOwner);

		// comprobar que el owner se ha actualizado
		let newOwnerAct = await upmCatalogo.owner();
		assert.equal(newOwner, newOwnerAct, "El owner no se ha actualizado correctamente.");
	});

	/*it("", async () => {
		assert.equal(expected, actual, msg);
	});*/
});