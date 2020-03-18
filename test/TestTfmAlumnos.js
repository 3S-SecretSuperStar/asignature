let TfmAlumnos = artifacts.require("TfmAlumnos");

contract("TfmAlumnos", accounts => {
	let tfmAlumnos;

	before(async () => {
		tfmAlumnos = await TfmAlumnos.deployed();
		console.log("TfmAlumnos =", tfmAlumnos.address);
	});

	it("El owner es quien ha desplegado el contrato.", async () => {
		let owner = await tfmAlumnos.owner();
		let desplegador = accounts[0];
		assert.equal(owner, desplegador, "El owner debe ser quien ha desplegado el contrato.");
	});

	it("Al principio no hay ningun alumno registrado.", async () => {
		let alumnosLength = await tfmAlumnos.alumnosLength();
		let numAlumnos = await tfmAlumnos.numAlumnos();
		assert.equal(0, alumnosLength, "No debe haber ningun alumno registrado.");
		assert.equal(0, numAlumnos, "El numero de alumnos debe ser 0.");
	});

	it("Se crea correctamente un alumno.", async () => {
		let addrEthAlum = accounts[1];
		let indexAlum = 0;
		let nombreAlum = "Nombre";
		let apellidosAlum = "Apellido1 Apellido2";
		let dniAlum = "123456789A";
		let correoUpmAlum = "nombre.apellido1.apellido2@alumnos.upm.es";
		let telefMovilAlum = 600000000;
		let fechaNacAlum = 789413486326;
		let idUpmAlum = "23458ab63d";

		// comprobar que hay 0 alumnos
		let numAlumnos = await tfmAlumnos.numAlumnos();
		assert.equal(0, numAlumnos, "Todavia no debe haber ningun alumno registrado.");

		// crear alumno
		await tfmAlumnos.crearAlumno(addrEthAlum, nombreAlum, apellidosAlum, dniAlum, correoUpmAlum, telefMovilAlum, fechaNacAlum, idUpmAlum);

		// comprobar que hay 1 alumno
		numAlumnos = await tfmAlumnos.numAlumnos();
		assert.equal(1, numAlumnos, "Debe haber un alumno registrado.");
		
		// obtener alumno creado
		let alumno = await tfmAlumnos.mapAlumnosAddr(addrEthAlum);

		// comprobar campos
		assert.equal(addrEthAlum, alumno.addrEthAlum, "La direccion del alumno debe coincidir.");
		assert.equal(indexAlum, alumno.indexAlum, "El indice del alumno debe coincidir.");
		assert.equal(nombreAlum, alumno.nombre, "El nombre del alumno debe coincidir.");
		assert.equal(apellidosAlum, alumno.apellidos, "Los apellidos del alumno deben coincidir.");
		assert.equal(dniAlum, alumno.dni, "El DNI del alumno debe coincidir.");
		assert.equal(correoUpmAlum, alumno.correoUpm, "El correo del alumno debe coincidir.");
		assert.equal(telefMovilAlum, alumno.telefMovil, "El telefono movil del alumno debe coincidir.");
		assert.equal(fechaNacAlum, alumno.fechaNac, "La fecha de nacimiento del alumno debe coincidir.");
		assert.equal(idUpmAlum, alumno.idUpm, "El id de la UPM del alumno debe coincidir.");
		assert.equal(true, alumno.existsAlum, "El alumno debe existir.");
	});

	it("Se lee correctamente un alumno creado", async () => {
		let addrEthAlum = accounts[1];
		let indexAlum = 0;
		let nombreAlum = "Nombre";
		let apellidosAlum = "Apellido1 Apellido2";
		let dniAlum = "123456789A";
		let correoUpmAlum = "nombre.apellido1.apellido2@alumnos.upm.es";
		let telefMovilAlum = 600000000;
		let fechaNacAlum = 789413486326;
		let idUpmAlum = "23458ab63d";

		let alumno = await tfmAlumnos.leerAlumnoAddr(addrEthAlum);

		assert.equal(indexAlum, alumno._indexAlum, "El indice del alumno debe coincidir.");
		assert.equal(nombreAlum, alumno._nombre, "El nombre del alumno debe coincidir.");
		assert.equal(apellidosAlum, alumno._apellidos, "Los apellidos del alumno deben coincidir.");
		assert.equal(dniAlum, alumno._dni, "El DNI del alumno debe coincidir.");
		assert.equal(correoUpmAlum, alumno._correoUpm, "El correo del alumno debe coincidir.");
		assert.equal(telefMovilAlum, alumno._telefMovil, "El telefono movil del alumno debe coincidir.");
		assert.equal(fechaNacAlum, alumno._fechaNac, "La fecha de nacimiento del alumno debe coincidir.");
		assert.equal(idUpmAlum, alumno._idUpm, "El id de la UPM del alumno debe coincidir.");
	});

	it("Se actualiza correctamente un alumno", async () => {
		let addrEthAlum = accounts[1];
		let indexAlum = 0;
		let newNombreAlum = "NewNombre";
		let newApellidosAlum = "NewApellido1 NewApellido2";
		let newDniAlum = "NN123456789A";
		let newCorreoUpmAlum = "new.nombre.apellido1.apellido2@alumnos.upm.es";
		let newTelefMovilAlum = 700000000;
		let newFechaNacAlum = 119413486326;
		let newIdUpmAlum = "NN23458ab63d";

		// comprobar que hay 1 alumno
		let numAlumnos = await tfmAlumnos.numAlumnos();
		assert.equal(1, numAlumnos, "Debe seguir habiendo un alumno registrado.");
		
		// actualizar alumno
		await tfmAlumnos.actualizarAlumnoAddr(addrEthAlum, newNombreAlum, newApellidosAlum, newDniAlum, newCorreoUpmAlum, newTelefMovilAlum, newFechaNacAlum, newIdUpmAlum);
		
		// obtener alumno actualizado
		let alumno = await tfmAlumnos.mapAlumnosAddr(addrEthAlum);

		// comprobar campos
		assert.equal(addrEthAlum, alumno.addrEthAlum, "La direccion del alumno debe coincidir.");
		assert.equal(indexAlum, alumno.indexAlum, "El indice del alumno debe coincidir.");
		assert.equal(newNombreAlum, alumno.nombre, "El nombre del alumno debe coincidir.");
		assert.equal(newApellidosAlum, alumno.apellidos, "Los apellidos del alumno deben coincidir.");
		assert.equal(newDniAlum, alumno.dni, "El DNI del alumno debe coincidir.");
		assert.equal(newCorreoUpmAlum, alumno.correoUpm, "El correo del alumno debe coincidir.");
		assert.equal(newTelefMovilAlum, alumno.telefMovil, "El telefono movil del alumno debe coincidir.");
		assert.equal(newFechaNacAlum, alumno.fechaNac, "La fecha de nacimiento del alumno debe coincidir.");
		assert.equal(newIdUpmAlum, alumno.idUpm, "El id de la UPM del alumno debe coincidir.");
		assert.equal(true, alumno.existsAlum, "El alumno debe existir.");
	});

	it("Se borra correctamente un alumno", async () => {
		let addrEthAlum = accounts[1];

		// comprobar que todavia hay 1 alumno
		let numAlumnos = await tfmAlumnos.numAlumnos();
		assert.equal(1, numAlumnos, "Debe seguir habiendo un alumno registrado.");

		// borrar alumno
		await tfmAlumnos.borrarAlumnoAddr(addrEthAlum);

		// comprobar que hay 0 alumnos
		numAlumnos = await tfmAlumnos.numAlumnos();

		assert.equal(0, numAlumnos, "No debe haber ningun alumno registrado.");
	});

	/*it("", async () => {
		assert.equal(expected, actual, msg);
	});*/
});