let TfmProfesores = artifacts.require("TfmProfesores");

contract("TfmProfesores", accounts => {
	let tfmProfesores;

	before(async () => {
		tfmProfesores = await TfmProfesores.deployed();
		console.log("TfmProfesores =", tfmProfesores.address);
	});

	it("El owner es quien ha desplegado el contrato.", async () => {
		let owner = await tfmProfesores.owner();
		let desplegador = accounts[0];
		assert.equal(owner, desplegador, "El owner debe ser quien ha desplegado el contrato.");
	});

	it("Al principio no hay ningun profesor registrado.", async () => {
		let profesoresLength = await tfmProfesores.profesoresLength();
		let numProfesores = await tfmProfesores.numProfesores();
		assert.equal(0, profesoresLength, "No debe haber ningun profesor registrado.");
		assert.equal(0, numProfesores, "El numero de profesores debe ser 0.");
	});

	it("Se crea correctamente un profesor.", async () => {
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
		let numProfesores = await tfmProfesores.numProfesores();
		assert.equal(0, numProfesores, "Todavia no debe haber ningun profesor registrado.");

		// crear profesor
		await tfmProfesores.crearProfesor(addrEthProf, nombreProf, apellidosProf, dniProf, correoUpmProf, telefMovilProf, fechaNacProf, idUpmProf);

		// comprobar que hay 1 profesor
		numProfesores = await tfmProfesores.numProfesores();
		assert.equal(1, numProfesores, "Debe haber un profesor registrado.");
		
		// obtener profesor creado
		let profesor = await tfmProfesores.mapProfesoresAddr(addrEthProf);

		// comprobar campos
		assert.equal(addrEthProf, profesor.addrEthProf, "La direccion del profesor debe coincidir.");
		assert.equal(indexProf, profesor.indexProf, "El indice del profesor debe coincidir.");
		assert.equal(nombreProf, profesor.nombre, "El nombre del profesor debe coincidir.");
		assert.equal(apellidosProf, profesor.apellidos, "Los apellidos del profesor deben coincidir.");
		assert.equal(dniProf, profesor.dni, "El DNI del profesor debe coincidir.");
		assert.equal(correoUpmProf, profesor.correoUpm, "El correo del profesor debe coincidir.");
		assert.equal(telefMovilProf, profesor.telefMovil, "El telefono movil del profesor debe coincidir.");
		assert.equal(fechaNacProf, profesor.fechaNac, "La fecha de nacimiento del profesor debe coincidir.");
		assert.equal(idUpmProf, profesor.idUpm, "El id de la UPM del profesor debe coincidir.");
		assert.equal(true, profesor.existsProf, "El profesor debe existir.");
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

		let profesor = await tfmProfesores.leerProfesorAddr(addrEthProf);

		assert.equal(indexProf, profesor._indexProf, "El indice del profesor debe coincidir.");
		assert.equal(nombreProf, profesor._nombre, "El nombre del profesor debe coincidir.");
		assert.equal(apellidosProf, profesor._apellidos, "Los apellidos del profesor deben coincidir.");
		assert.equal(dniProf, profesor._dni, "El DNI del profesor debe coincidir.");
		assert.equal(correoUpmProf, profesor._correoUpm, "El correo del profesor debe coincidir.");
		assert.equal(telefMovilProf, profesor._telefMovil, "El telefono movil del profesor debe coincidir.");
		assert.equal(fechaNacProf, profesor._fechaNac, "La fecha de nacimiento del profesor debe coincidir.");
		assert.equal(idUpmProf, profesor._idUpm, "El id de la UPM del profesor debe coincidir.");
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

		// crear profesor
		await tfmProfesores.actualizarProfesorAddr(addrEthProf, newNombreProf, newApellidosProf, newDniProf, newCorreoUpmProf, newTelefMovilProf, newFechaNacProf, newIdUpmProf);

		// comprobar que hay 1 profesor
		let numProfesores = await tfmProfesores.numProfesores();
		assert.equal(1, numProfesores, "Debe seguir habiendo un profesor registrado.");
		
		// obtener profesor creado
		let profesor = await tfmProfesores.mapProfesoresAddr(addrEthProf);

		// comprobar campos
		assert.equal(addrEthProf, profesor.addrEthProf, "La direccion del profesor debe coincidir.");
		assert.equal(indexProf, profesor.indexProf, "El indice del profesor debe coincidir.");
		assert.equal(newNombreProf, profesor.nombre, "El nombre del profesor debe coincidir.");
		assert.equal(newApellidosProf, profesor.apellidos, "Los apellidos del profesor deben coincidir.");
		assert.equal(newDniProf, profesor.dni, "El DNI del profesor debe coincidir.");
		assert.equal(newCorreoUpmProf, profesor.correoUpm, "El correo del profesor debe coincidir.");
		assert.equal(newTelefMovilProf, profesor.telefMovil, "El telefono movil del profesor debe coincidir.");
		assert.equal(newFechaNacProf, profesor.fechaNac, "La fecha de nacimiento del profesor debe coincidir.");
		assert.equal(newIdUpmProf, profesor.idUpm, "El id de la UPM del profesor debe coincidir.");
		assert.equal(true, profesor.existsProf, "El profesor debe existir.");
	});

	it("Se borra correctamente un profesor", async () => {
		let addrEthProf = accounts[1];

		// comprobar que todavia hay 1 profesor
		let numProfesores = await tfmProfesores.numProfesores();
		console.log("numProfesores = " + numProfesores);
		assert.equal(1, numProfesores, "Debe seguir habiendo un profesor registrado.");

		// borrar profesor
		await tfmProfesores.borrarProfesorAddr(addrEthProf);

		// comprobar que hay 0 profesores
		numProfesores = await tfmProfesores.numProfesores();
		console.log("numProfesores = " + numProfesores);
		assert.equal(0, numProfesores, "No debe haber ningun profesor registrado.");
	});

	/*it("", async () => {
		assert.equal(expected, actual, msg);
	});*/
});