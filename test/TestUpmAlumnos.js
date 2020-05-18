let UpmAlumnos = artifacts.require("UpmAlumnos");

contract("UpmAlumnos", accounts => {
	let upmAlumnos;

	before(async () => {
		upmAlumnos = await UpmAlumnos.deployed();
		console.log("UpmAlumnos =", upmAlumnos.address);
	});

	it("El owner es quien ha desplegado el contrato.", async () => {
		let owner = await upmAlumnos.owner();
		let desplegador = accounts[0];
		assert.equal(owner, desplegador, "El owner debe ser quien ha desplegado el contrato.");
	});

	it("Al principio no hay ningún alumno registrado.", async () => {
		let numAlumnos = await upmAlumnos.numAlumnos();
		assert.equal(0, numAlumnos, "El número de alumnos debe ser 0.");
	});

	it("No se permite leer un alumno que no está creado", async () => {
		let addrEthAlum = accounts[1];
		let errorMsg = "leerAlumnoAddr - Alumno no creado.";
		let error = false;

		let numAlumnos = await upmAlumnos.numAlumnos();
		assert.equal(0, numAlumnos, "Todavía no debe haber ningún alumno registrado.");

		try {
			let alumno = await upmAlumnos.leerAlumnoAddr(addrEthAlum);
		} catch(err) {
			error = err.toString().includes(errorMsg);
		} finally {
			assert.equal(true, error, "No se debería permitir leer un alumno que no está creado.");
		}
	});

	it("No se permite actualizar un alumno que no está creado", async () => {
		let addrEthAlum = accounts[1];
		let indexAlum = 0;
		let newNombreAlum = "NewNombre";
		let newApellidosAlum = "NewApellido1 NewApellido2";
		let newDniAlum = "NN123456789A";
		let newCorreoUpmAlum = "new.nombre.apellido1.apellido2@alumnos.upm.es";
		let newTelefMovilAlum = 700000000;
		let newFechaNacAlum = 119413486326;
		let newIdUpmAlum = "NN23458ab63d";
		let errorMsg = "actualizarAlumnoAddr - Alumno no creado.";
		let error = false;

		let numAlumnos = await upmAlumnos.numAlumnos();
		assert.equal(0, numAlumnos, "Todavía no debe haber ningún alumno registrado.");

		try {
			await upmAlumnos.actualizarAlumnoAddr(addrEthAlum, newNombreAlum, newApellidosAlum, newDniAlum, newCorreoUpmAlum, newTelefMovilAlum, newFechaNacAlum, newIdUpmAlum);
		} catch(err) {
			error = err.toString().includes(errorMsg);
		} finally {
			assert.equal(true, error, "No se debería permitir actualizar un alumno que no está creado.");
		}
	});

	it("No se permite eliminar un alumno que no está creado", async () => {
		let addrEthAlum = accounts[1];
		let errorMsg = "borrarAlumnoAddr - Alumno no creado.";
		let error = false;

		let numAlumnos = await upmAlumnos.numAlumnos();
		assert.equal(0, numAlumnos, "Todavía no debe haber ningún alumno registrado.");

		try {
			await upmAlumnos.borrarAlumnoAddr(addrEthAlum);
		} catch(err) {
			error = err.toString().includes(errorMsg);
		} finally {
			assert.equal(true, error, "No se debería permitir eliminar un alumno que no está creado.");
		}
	});

	it("No se permite crear un alumno a quien no es owner", async () => {
		let addrEthAlum = accounts[1];
		let indexAlum = 0;
		let nombreAlum = "Nombre";
		let apellidosAlum = "Apellido1 Apellido2";
		let dniAlum = "123456789A";
		let correoUpmAlum = "nombre.apellido1.apellido2@alumnos.upm.es";
		let telefMovilAlum = 600000000;
		let fechaNacAlum = 789413486326;
		let idUpmAlum = "23458ab63d";
		let notOwner = accounts[1];
		let errorMsg = "Sólo el owner puede hacer esta operación.";
		let error = false;

		let numAlumnos = await upmAlumnos.numAlumnos();
		assert.equal(0, numAlumnos, "Todavía no debe haber ningún alumno registrado.");

		try {
			await upmAlumnos.crearAlumno(addrEthAlum, nombreAlum, apellidosAlum, dniAlum, correoUpmAlum, telefMovilAlum, fechaNacAlum, idUpmAlum, {from: notOwner});
		} catch(err) {
			error = err.toString().includes(errorMsg);
		} finally {
			assert.equal(true, error, "Alguien que no es el owner no debería poder crear un alumno.");
		}

		numAlumnos = await upmAlumnos.numAlumnos();
		assert.equal(0, numAlumnos, "Todavía no debe haber ningún alumno registrado.");
	});

	it("El owner crea correctamente un alumno.", async () => {
		let addrEthAlum = accounts[1];
		let indexAlum = 0;
		let nombreAlum = "Nombre";
		let apellidosAlum = "Apellido1 Apellido2";
		let dniAlum = "123456789A";
		let correoUpmAlum = "nombre.apellido1.apellido2@alumnos.upm.es";
		let telefMovilAlum = 600000000;
		let fechaNacAlum = 789413486326;
		let idUpmAlum = "23458ab63d";

		let numAlumnos = await upmAlumnos.numAlumnos();
		assert.equal(0, numAlumnos, "Todavia no debe haber ningún alumno registrado.");

		await upmAlumnos.crearAlumno(addrEthAlum, nombreAlum, apellidosAlum, dniAlum, correoUpmAlum, telefMovilAlum, fechaNacAlum, idUpmAlum);

		numAlumnos = await upmAlumnos.numAlumnos();
		assert.equal(1, numAlumnos, "Debe haber un alumno registrado.");
		
		let alumno = await upmAlumnos.mapAlumnosAddr(addrEthAlum);

		assert.equal(addrEthAlum, alumno.addrEthAlum, "La dirección del alumno debe coincidir.");
		assert.equal(indexAlum, alumno.indexAlum, "El índice del alumno debe coincidir.");
		assert.equal(nombreAlum, alumno.nombre, "El nombre del alumno debe coincidir.");
		assert.equal(apellidosAlum, alumno.apellidos, "Los apellidos del alumno deben coincidir.");
		assert.equal(dniAlum, alumno.dni, "El DNI del alumno debe coincidir.");
		assert.equal(correoUpmAlum, alumno.correoUpm, "El correo del alumno debe coincidir.");
		assert.equal(telefMovilAlum, alumno.telefMovil, "El teléfono movil del alumno debe coincidir.");
		assert.equal(fechaNacAlum, alumno.fechaNac, "La fecha de nacimiento del alumno debe coincidir.");
		assert.equal(idUpmAlum, alumno.idUpm, "El id de la UPM del alumno debe coincidir.");
	});

	it("No se permite volver a crear un alumno que ya está creado", async () => {
		let addrEthAlum = accounts[1];
		let indexAlum = 0;
		let nombreAlum = "Nombre";
		let apellidosAlum = "Apellido1 Apellido2";
		let dniAlum = "123456789A";
		let correoUpmAlum = "nombre.apellido1.apellido2@alumnos.upm.es";
		let telefMovilAlum = 600000000;
		let fechaNacAlum = 789413486326;true
		let idUpmAlum = "23458ab63d";
		let errorMsg = "crearAlumno - Alumno ya creado.";
		let error = false;

		let numAlumnos = await upmAlumnos.numAlumnos();
		assert.equal(1, numAlumnos, "Debe haber un alumno registrado.");

		try {
			await upmAlumnos.crearAlumno(addrEthAlum, nombreAlum, apellidosAlum, dniAlum, correoUpmAlum, telefMovilAlum, fechaNacAlum, idUpmAlum);
		} catch(err) {
			error = err.toString().includes(errorMsg);
		} finally {
			assert.equal(true, error, "No se debería permitir crear un alumno que ya ha sido creado.");
		}

		numAlumnos = await upmAlumnos.numAlumnos();
		assert.equal(1, numAlumnos, "Debe seguir habiendo un alumno registrado.");
	});

	it("El owner lee correctamente un alumno creado", async () => {
		let addrEthAlum = accounts[1];
		let indexAlum = 0;
		let nombreAlum = "Nombre";
		let apellidosAlum = "Apellido1 Apellido2";
		let dniAlum = "123456789A";
		let correoUpmAlum = "nombre.apellido1.apellido2@alumnos.upm.es";
		let telefMovilAlum = 600000000;
		let fechaNacAlum = 789413486326;
		let idUpmAlum = "23458ab63d";

		let alumno = await upmAlumnos.leerAlumnoAddr(addrEthAlum);

		assert.equal(indexAlum, alumno._indexAlum, "El índice del alumno debe coincidir.");
		assert.equal(nombreAlum, alumno._nombre, "El nombre del alumno debe coincidir.");
		assert.equal(apellidosAlum, alumno._apellidos, "Los apellidos del alumno deben coincidir.");
		assert.equal(dniAlum, alumno._dni, "El DNI del alumno debe coincidir.");
		assert.equal(correoUpmAlum, alumno._correoUpm, "El correo del alumno debe coincidir.");
		assert.equal(telefMovilAlum, alumno._telefMovil, "El teléfono movil del alumno debe coincidir.");
		assert.equal(fechaNacAlum, alumno._fechaNac, "La fecha de nacimiento del alumno debe coincidir.");
		assert.equal(idUpmAlum, alumno._idUpm, "El id de la UPM del alumno debe coincidir.");
	});

	it("No se permite actualizar un alumno a quien no es owner", async () => {
		let addrEthAlum = accounts[1];
		let indexAlum = 0;
		let newNombreAlum = "NewNombre";
		let newApellidosAlum = "NewApellido1 NewApellido2";
		let newDniAlum = "NN123456789A";
		let newCorreoUpmAlum = "new.nombre.apellido1.apellido2@alumnos.upm.es";
		let newTelefMovilAlum = 700000000;
		let newFechaNacAlum = 119413486326;
		let newIdUpmAlum = "NN23458ab63d";
		let notOwner = accounts[1];
		let errorMsg = "Sólo el owner puede hacer esta operación.";
		let error = false;

		let numAlumnos = await upmAlumnos.numAlumnos();
		assert.equal(1, numAlumnos, "Debe seguir habiendo un alumno registrado.");

		try {
			await upmAlumnos.actualizarAlumnoAddr(addrEthAlum, newNombreAlum, newApellidosAlum, newDniAlum, newCorreoUpmAlum, newTelefMovilAlum, newFechaNacAlum, newIdUpmAlum, {from: notOwner});
		} catch(err) {
			error = err.toString().includes(errorMsg);
		} finally {
			assert.equal(true, error, "Alguien que no es el owner no debería poder actualizar un alumno.");
		}
	});

	it("El owner actualiza correctamente un alumno", async () => {
		let addrEthAlum = accounts[1];
		let indexAlum = 0;
		let newNombreAlum = "NewNombre";
		let newApellidosAlum = "NewApellido1 NewApellido2";
		let newDniAlum = "NN123456789A";
		let newCorreoUpmAlum = "new.nombre.apellido1.apellido2@alumnos.upm.es";
		let newTelefMovilAlum = 700000000;
		let newFechaNacAlum = 119413486326;
		let newIdUpmAlum = "NN23458ab63d";

		let numAlumnos = await upmAlumnos.numAlumnos();
		assert.equal(1, numAlumnos, "Debe seguir habiendo un alumno registrado.");
		
		await upmAlumnos.actualizarAlumnoAddr(addrEthAlum, newNombreAlum, newApellidosAlum, newDniAlum, newCorreoUpmAlum, newTelefMovilAlum, newFechaNacAlum, newIdUpmAlum);
		
		let alumno = await upmAlumnos.mapAlumnosAddr(addrEthAlum);

		assert.equal(addrEthAlum, alumno.addrEthAlum, "La dirección del alumno debe coincidir.");
		assert.equal(indexAlum, alumno.indexAlum, "El índice del alumno debe coincidir.");
		assert.equal(newNombreAlum, alumno.nombre, "El nombre del alumno debe coincidir.");
		assert.equal(newApellidosAlum, alumno.apellidos, "Los apellidos del alumno deben coincidir.");
		assert.equal(newDniAlum, alumno.dni, "El DNI del alumno debe coincidir.");
		assert.equal(newCorreoUpmAlum, alumno.correoUpm, "El correo del alumno debe coincidir.");
		assert.equal(newTelefMovilAlum, alumno.telefMovil, "El teléfono movil del alumno debe coincidir.");
		assert.equal(newFechaNacAlum, alumno.fechaNac, "La fecha de nacimiento del alumno debe coincidir.");
		assert.equal(newIdUpmAlum, alumno.idUpm, "El id de la UPM del alumno debe coincidir.");
	});

	it("No se permite borrar un alumno a quien no es owner", async () => {
		let addrEthAlum = accounts[1];
		let notOwner = accounts[1];
		let errorMsg = "Sólo el owner puede hacer esta operación.";
		let error = false;

		let numAlumnos = await upmAlumnos.numAlumnos();
		assert.equal(1, numAlumnos, "Debe seguir habiendo un alumno registrado.");

		try {
			await upmAlumnos.borrarAlumnoAddr(addrEthAlum, {from: notOwner});
		} catch(err) {
			error = err.toString().includes(errorMsg);
		} finally {
			assert.equal(true, error, "Alguien que no es el owner no debería poder borrar un alumno.");
		}

		numAlumnos = await upmAlumnos.numAlumnos();
		assert.equal(1, numAlumnos, "Debe seguir habiendo un alumno registrado.");
	});

	it("El owner borra correctamente un alumno", async () => {
		let addrEthAlum = accounts[1];

		let numAlumnos = await upmAlumnos.numAlumnos();
		assert.equal(1, numAlumnos, "Debe seguir habiendo un alumno registrado.");

		await upmAlumnos.borrarAlumnoAddr(addrEthAlum);

		numAlumnos = await upmAlumnos.numAlumnos();
		assert.equal(0, numAlumnos, "No debe haber ningún alumno registrado.");
	});

	it("No se permite actualizar el owner a quien no es owner", async () => {
		let desplegador = accounts[0];
		let newOwner = accounts[1];
		let errorMsg = "Sólo el owner puede hacer esta operación.";
		let error = false;

		let owner = await upmAlumnos.owner();
		assert.equal(desplegador, owner, "El owner debe ser quien ha desplegado el contrato.");

		try {
			await upmAlumnos.actualizarOwner(newOwner, {from: newOwner});
		} catch(err) {
			error = err.toString().includes(errorMsg);
		} finally {
			assert.equal(true, error, "Alguien que no es el owner no debería poder actualizar el owner.");
		}

		let newOwnerAct = await upmAlumnos.owner();
		assert.equal(desplegador, newOwnerAct, "El owner se ha actualizado y no tendría que haber ocurrido.");
	});

	it("El owner actualiza correctamente el owner", async () => {
		let newOwner = accounts[1];

		let owner = await upmAlumnos.owner();
		let desplegador = accounts[0];
		assert.equal(desplegador, owner, "El owner debe ser quien ha desplegado el contrato.");

		await upmAlumnos.actualizarOwner(newOwner);

		let newOwnerAct = await upmAlumnos.owner();
		assert.equal(newOwner, newOwnerAct, "El owner no se ha actualizado correctamente.");
	});

	/*it("", async () => {
		assert.equal(expected, actual, msg);
	});*/
});