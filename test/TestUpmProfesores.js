let UpmProfesores = artifacts.require("UpmProfesores");

contract("UpmProfesores", accounts => {
	let upmProfesores;

	before(async () => {
		upmProfesores = await UpmProfesores.deployed();
		console.log("UpmProfesores =", upmProfesores.address);
	});

	it("El owner es quien ha desplegado el contrato", async () => {
		let owner = await upmProfesores.owner();
		let desplegador = accounts[0];
		assert.equal(owner, desplegador, "El owner debe ser quien ha desplegado el contrato.");
	});

	it("Al principio no hay ningún profesor registrado", async () => {
		let numProfesores = await upmProfesores.numProfesores();
		assert.equal(0, numProfesores, "El número de profesores debe ser 0.");
	});

	it("No se permite leer un profesor que no está creado", async () => {
        let addrEthProf = accounts[1];
        let errorMsg = "leerProfesorAddr - Profesor no creado.";
        let error = false;

        // comprobar que hay 0 profesores
		let numProfesores = await upmProfesores.numProfesores();
		assert.equal(0, numProfesores, "Todavía no debe haber ningún profesor registrado.");

        try {
            let profesor = await upmProfesores.leerProfesorAddr(addrEthProf);
        } catch(err) {
            error = err.toString().includes(errorMsg);
        } finally {
            assert.equal(true, error, "No se debería permitir leer un profesor que no está creado.");
        }
    });

    it("No se permite actualizar un profesor que no está creado", async () => {
		let addrEthProf = accounts[1];
		let indexProf = 0;
		let newNombreProf = "NewNombre";
		let newApellidosProf = "NewApellido1 NewApellido2";
		let newDniProf = "NN123456789A";
		let newCorreoUpmProf = "new.nombre.apellido1.apellido2@upm.es";
		let newTelefMovilProf = 700000000;
		let newFechaNacProf = 119413486326;
		let newIdUpmProf = "NN23458ab63d";
		let errorMsg = "actualizarProfesorAddr - Profesor no creado.";
        let error = false;

		// comprobar que hay 0 profesores
		let numProfesores = await upmProfesores.numProfesores();
		assert.equal(0, numProfesores, "Todavía no debe haber ningún profesor registrado.");

		try {
			await upmProfesores.actualizarProfesorAddr(addrEthProf, newNombreProf, newApellidosProf, newDniProf, newCorreoUpmProf, newTelefMovilProf, newFechaNacProf, newIdUpmProf);
		} catch(err) {
			error = err.toString().includes(errorMsg);
		} finally {
			assert.equal(true, error, "No se debería permitir actualizar un profesor que no está creado.");
		}
	});

	it("No se permite eliminar un profesor que no está creado", async () => {
		let addrEthProf = accounts[1];
		let errorMsg = "borrarProfesorAddr - Profesor no creado.";
        let error = false;

		// comprobar que hay 0 profesores
		let numProfesores = await upmProfesores.numProfesores();
		assert.equal(0, numProfesores, "Todavía no debe haber ningún profesor registrado.");

		try {
            await upmProfesores.borrarProfesorAddr(addrEthProf);
        } catch(err) {
            error = err.toString().includes(errorMsg);
        } finally {
            assert.equal(true, error, "No se debería permitir eliminar un profesor que no está creado.");
        }

	});

	it("No se permite crear un profesor a quien no es owner", async () => {
        let addrEthProf = accounts[1];
		let indexProf = 0;
		let nombreProf = "Nombre";
		let apellidosProf = "Apellido1 Apellido2";
		let dniProf = "123456789A";
		let correoUpmProf = "nombre.apellido1.apellido2@upm.es";
		let telefMovilProf = 600000000;
		let fechaNacProf = 789413486326;
		let idUpmProf = "23458ab63d";
        let notOwner = accounts[1];
        let errorMsg = "Sólo el owner puede hacer esta operación.";
        let error = false;

        // comprobar que hay 0 profesores
		let numProfesores = await upmProfesores.numProfesores();
		assert.equal(0, numProfesores, "Todavía no debe haber ningún profesor registrado.");

        // intentar crear un profesor
        try {
            await upmProfesores.crearProfesor(addrEthProf, nombreProf, apellidosProf, dniProf, correoUpmProf, telefMovilProf, fechaNacProf, idUpmProf, {from: notOwner});
        } catch(err) {
            error = err.toString().includes(errorMsg);
        } finally {
            assert.equal(true, error, "Alguien que no es el owner no debería poder crear un profesor.");
        }

        // comprobar que sigue habiendo 0 profesores
        numProfesores = await upmProfesores.numProfesores();
        assert.equal(0, numProfesores, "Todavía no debe haber ningún profesor registrado.");
    });

	it("Se crea correctamente un profesor", async () => {
		let addrEthProf = accounts[1];
		let indexProf = 0;
		let nombreProf = "Nombre";
		let apellidosProf = "Apellido1 Apellido2";
		let dniProf = "123456789A";
		let correoUpmProf = "nombre.apellido1.apellido2@upm.es";
		let telefMovilProf = 600000000;
		let fechaNacProf = 789413486326;
		let idUpmProf = "23458ab63d";

		// comprobar que hay 0 profesores
		let numProfesores = await upmProfesores.numProfesores();
		assert.equal(0, numProfesores, "Todavía no debe haber ningún profesor registrado.");

		// crear profesor
		await upmProfesores.crearProfesor(addrEthProf, nombreProf, apellidosProf, dniProf, correoUpmProf, telefMovilProf, fechaNacProf, idUpmProf);

		// comprobar que hay 1 profesor
		numProfesores = await upmProfesores.numProfesores();
		assert.equal(1, numProfesores, "Debe haber un profesor registrado.");
		
		// obtener profesor creado
		let profesor = await upmProfesores.mapProfesoresAddr(addrEthProf);

		// comprobar campos
		assert.equal(addrEthProf, profesor.addrEthProf, "La dirección del profesor debe coincidir.");
		assert.equal(indexProf, profesor.indexProf, "El índice del profesor debe coincidir.");
		assert.equal(nombreProf, profesor.nombre, "El nombre del profesor debe coincidir.");
		assert.equal(apellidosProf, profesor.apellidos, "Los apellidos del profesor deben coincidir.");
		assert.equal(dniProf, profesor.dni, "El DNI del profesor debe coincidir.");
		assert.equal(correoUpmProf, profesor.correoUpm, "El correo del profesor debe coincidir.");
		assert.equal(telefMovilProf, profesor.telefMovil, "El teléfono movil del profesor debe coincidir.");
		assert.equal(fechaNacProf, profesor.fechaNac, "La fecha de nacimiento del profesor debe coincidir.");
		assert.equal(idUpmProf, profesor.idUpm, "El id de la UPM del profesor debe coincidir.");
	});

	it("No se permite volver a crear un profesor que ya está creado", async () => {
		let addrEthProf = accounts[1];
		let indexProf = 0;
		let nombreProf = "Nombre";
		let apellidosProf = "Apellido1 Apellido2";
		let dniProf = "123456789A";
		let correoUpmProf = "nombre.apellido1.apellido2@upm.es";
		let telefMovilProf = 600000000;
		let fechaNacProf = 789413486326;
		let idUpmProf = "23458ab63d";
		let errorMsg = "crearProfesor - Profesor ya creado.";
		let error = false;

		// comprobar que hay 1 profesor
		let numProfesores = await upmProfesores.numProfesores();
		assert.equal(1, numProfesores, "Debe haber un profesor registrado.");

		// intentar crear profesor ya creado
        try {
            await upmProfesores.crearProfesor(addrEthProf, nombreProf, apellidosProf, dniProf, correoUpmProf, telefMovilProf, fechaNacProf, idUpmProf);
        } catch(err) {
            error = err.toString().includes(errorMsg);
        } finally {
            assert.equal(true, error, "No se debería permitir crear un profesor que ya ha sido creado.");
        }

		// comprobar que sigue habiendo 1 profesor
		numProfesores = await upmProfesores.numProfesores();
		assert.equal(1, numProfesores, "Debe seguir habiendo un profesor registrado.");
	});

	it("Se lee correctamente un profesor creado", async () => {
		let addrEthProf = accounts[1];
		let indexProf = 0;
		let nombreProf = "Nombre";
		let apellidosProf = "Apellido1 Apellido2";
		let dniProf = "123456789A";
		let correoUpmProf = "nombre.apellido1.apellido2@upm.es";
		let telefMovilProf = 600000000;
		let fechaNacProf = 789413486326;
		let idUpmProf = "23458ab63d";

		let profesor = await upmProfesores.leerProfesorAddr(addrEthProf);

		assert.equal(indexProf, profesor._indexProf, "El índice del profesor debe coincidir.");
		assert.equal(nombreProf, profesor._nombre, "El nombre del profesor debe coincidir.");
		assert.equal(apellidosProf, profesor._apellidos, "Los apellidos del profesor deben coincidir.");
		assert.equal(dniProf, profesor._dni, "El DNI del profesor debe coincidir.");
		assert.equal(correoUpmProf, profesor._correoUpm, "El correo del profesor debe coincidir.");
		assert.equal(telefMovilProf, profesor._telefMovil, "El teléfono movil del profesor debe coincidir.");
		assert.equal(fechaNacProf, profesor._fechaNac, "La fecha de nacimiento del profesor debe coincidir.");
		assert.equal(idUpmProf, profesor._idUpm, "El id de la UPM del profesor debe coincidir.");
	});

	it("No se permite actualizar un profesor a quien no es owner", async () => {
        let addrEthProf = accounts[1];
		let indexProf = 0;
		let newNombreProf = "NewNombre";
		let newApellidosProf = "NewApellido1 NewApellido2";
		let newDniProf = "NN123456789A";
		let newCorreoUpmProf = "new.nombre.apellido1.apellido2@upm.es";
		let newTelefMovilProf = 700000000;
		let newFechaNacProf = 119413486326;
		let newIdUpmProf = "NN23458ab63d";
        let notOwner = accounts[1];
        let errorMsg = "Sólo el owner puede hacer esta operación.";
        let error = false;

        // comprobar que hay 1 profesor
        let numProfesores = await upmProfesores.numProfesores();
        assert.equal(1, numProfesores, "Debe seguir habiendo un profesor registrado.");

        // intentar actualizar un profesor
        try {
            await upmProfesores.actualizarProfesorAddr(addrEthProf, newNombreProf, newApellidosProf, newDniProf, newCorreoUpmProf, newTelefMovilProf, newFechaNacProf, newIdUpmProf, {from: notOwner});
        } catch(err) {
            error = err.toString().includes(errorMsg);
        } finally {
            assert.equal(true, error, "Alguien que no es el owner no debería poder actualizar un profesor.");
        }
    });

	it("Se actualiza correctamente un profesor", async () => {
		let addrEthProf = accounts[1];
		let indexProf = 0;
		let newNombreProf = "NewNombre";
		let newApellidosProf = "NewApellido1 NewApellido2";
		let newDniProf = "NN123456789A";
		let newCorreoUpmProf = "new.nombre.apellido1.apellido2@upm.es";
		let newTelefMovilProf = 700000000;
		let newFechaNacProf = 119413486326;
		let newIdUpmProf = "NN23458ab63d";

		// actualizar profesor
		await upmProfesores.actualizarProfesorAddr(addrEthProf, newNombreProf, newApellidosProf, newDniProf, newCorreoUpmProf, newTelefMovilProf, newFechaNacProf, newIdUpmProf);

		// comprobar que hay 1 profesor
		let numProfesores = await upmProfesores.numProfesores();
		assert.equal(1, numProfesores, "Debe seguir habiendo un profesor registrado.");
		
		// obtener profesor creado
		let profesor = await upmProfesores.mapProfesoresAddr(addrEthProf);

		// comprobar campos
		assert.equal(addrEthProf, profesor.addrEthProf, "La dirección del profesor debe coincidir.");
		assert.equal(indexProf, profesor.indexProf, "El índice del profesor debe coincidir.");
		assert.equal(newNombreProf, profesor.nombre, "El nombre del profesor debe coincidir.");
		assert.equal(newApellidosProf, profesor.apellidos, "Los apellidos del profesor deben coincidir.");
		assert.equal(newDniProf, profesor.dni, "El DNI del profesor debe coincidir.");
		assert.equal(newCorreoUpmProf, profesor.correoUpm, "El correo del profesor debe coincidir.");
		assert.equal(newTelefMovilProf, profesor.telefMovil, "El teléfono movil del profesor debe coincidir.");
		assert.equal(newFechaNacProf, profesor.fechaNac, "La fecha de nacimiento del profesor debe coincidir.");
		assert.equal(newIdUpmProf, profesor.idUpm, "El id de la UPM del profesor debe coincidir.");
	});

	it("No se permite borrar un profesor a quien no es owner", async () => {
        let addrEthProf = accounts[1];
        let notOwner = accounts[1];
        let errorMsg = "Sólo el owner puede hacer esta operación.";
        let error = false;

        // comprobar que todavía hay 1 profesor
		let numProfesores = await upmProfesores.numProfesores();
		assert.equal(1, numProfesores, "Debe seguir habiendo un profesor registrado.");

        // intentar borrar un profesor
        try {
            await upmProfesores.borrarProfesorAddr(addrEthProf, {from: notOwner});
        } catch(err) {
            error = err.toString().includes(errorMsg);
        } finally {
            assert.equal(true, error, "Alguien que no es el owner no debería poder borrar un alumno.");
        }

        // comprobar que todavia hay 1 profesor
        numProfesores = await upmProfesores.numProfesores();
        assert.equal(1, numProfesores, "Debe seguir habiendo un profesor registrado.");
    });

	it("Se borra correctamente un profesor", async () => {
		let addrEthProf = accounts[1];

		// comprobar que todavía hay 1 profesor
		let numProfesores = await upmProfesores.numProfesores();
		assert.equal(1, numProfesores, "Debe seguir habiendo un profesor registrado.");

		// borrar profesor
		await upmProfesores.borrarProfesorAddr(addrEthProf);

		// comprobar que hay 0 profesores
		numProfesores = await upmProfesores.numProfesores();
		assert.equal(0, numProfesores, "No debe haber ningún profesor registrado.");
	});

	it("No se permite actualizar el owner a quien no es owner", async () => {
		let desplegador = accounts[0];
		let newOwner = accounts[1];
		let errorMsg = "Sólo el owner puede hacer esta operación.";
		let error = false;

		// comprobar el owner actual
		let owner = await upmProfesores.owner();
		assert.equal(desplegador, owner, "El owner debe ser quien ha desplegado el contrato.");

		// intentar actualizar el owner
		try {
			await upmProfesores.actualizarOwner(newOwner, {from: newOwner});
		} catch(err) {
			error = err.toString().includes(errorMsg);
		} finally {
			assert.equal(true, error, "Alguien que no es el owner no debería poder actualizar el owner.");
		}

		// comprobar que el owner no se ha actualizado
		let newOwnerAct = await upmProfesores.owner();
		assert.equal(desplegador, newOwnerAct, "El owner se ha actualizado y no tendría que haber ocurrido.");
	});

	it("El owner actualiza correctamente el owner", async () => {
		let newOwner = accounts[1];

		// comprobar el owner actual
		let owner = await upmProfesores.owner();
		let desplegador = accounts[0];
		assert.equal(desplegador, owner, "El owner debe ser quien ha desplegado el contrato.");

		// actualizar owner
		await upmProfesores.actualizarOwner(newOwner);

		// comprobar que el owner se ha actualizado
		let newOwnerAct = await upmProfesores.owner();
		assert.equal(newOwner, newOwnerAct, "El owner no se ha actualizado correctamente.");
	});

	/*it("", async () => {
		assert.equal(expected, actual, msg);
	});*/
});