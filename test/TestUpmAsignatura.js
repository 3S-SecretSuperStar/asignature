let UpmAsignatura = artifacts.require("UpmAsignatura");

contract("UpmAsignatura", accounts => {
	let upmAsignatura;

	let desplegador = accounts[0];
	let addrEthProf = accounts[1];
	let addrEthProf2 = accounts[2];
	let addrEthAlum = accounts[3];
	let addrEthAlum2 = accounts[4];
	let addrEthAlum3 = accounts[5];
	let newOwner = accounts[6];
	let newCoordinador = accounts[8];
	let coordinador = accounts[9];

	before(async() => {
		upmAsignatura = await UpmAsignatura.deployed();
		console.log("UpmAsignatura =", upmAsignatura.address);
	});

	it("1El owner es quien ha desplegado el contrato.", async () => {
		let owner = await upmAsignatura.owner();
		assert.equal(owner, desplegador, "El owner debe ser quien ha desplegado el contrato.");
	});

	it("2Comprobar que, de todas las cuentas, sólo la 0 es owner", async () => {
		let isOwner1 = await upmAsignatura.isOwner({from: desplegador});
		assert.equal(true, isOwner1, "El que ha desplegado el contrato debería ser owner.");

		let isOwner2 = await upmAsignatura.isOwner({from: addrEthProf});
		assert.equal(false, isOwner2, "addrEthProf no debería ser owner.");

		let isOwner3 = await upmAsignatura.isOwner({from: addrEthProf2});
		assert.equal(false, isOwner3, "addrEthProf2 no debería ser owner.");

		let isOwner4 = await upmAsignatura.isOwner({from: addrEthAlum});
		assert.equal(false, isOwner4, "addrEthAlum no debería ser owner.");

		let isOwner5 = await upmAsignatura.isOwner({from: addrEthAlum2});
		assert.equal(false, isOwner5, "addrEthAlum2 no debería ser owner.");

		let isOwner6 = await upmAsignatura.isOwner({from: addrEthAlum3});
		assert.equal(false, isOwner6, "addrEthAlum3 no debería ser owner.");

		let isOwner7 = await upmAsignatura.isOwner({from: newOwner});
		assert.equal(false, isOwner7, "newOwner no debería ser owner.");

		let isOwner8 = await upmAsignatura.isOwner({from: newCoordinador});
		assert.equal(false, isOwner8, "newCoordinador no debería ser owner.");

		let isOwner9 = await upmAsignatura.isOwner({from: coordinador});
		assert.equal(false, isOwner9, "coordinador no debería ser owner.");
	});

	it("3Comprobar que, de todas las cuentas, sólo la 9 es coordinador", async () => {
		let isCoordinador1 = await upmAsignatura.isCoordinador({from: desplegador});
		assert.equal(false, isCoordinador1, "El que ha desplegado el contrato no debería ser coordinador.");

		let isCoordinador2 = await upmAsignatura.isCoordinador({from: addrEthProf});
		assert.equal(false, isCoordinador2, "addrEthProf no debería ser coordinador.");

		let isCoordinador3 = await upmAsignatura.isCoordinador({from: addrEthProf2});
		assert.equal(false, isCoordinador3, "addrEthProf2 no debería ser coordinador.");

		let isCoordinador4 = await upmAsignatura.isCoordinador({from: addrEthAlum});
		assert.equal(false, isCoordinador4, "addrEthAlum no debería ser coordinador.");

		let isCoordinador5 = await upmAsignatura.isCoordinador({from: addrEthAlum2});
		assert.equal(false, isCoordinador5, "addrEthAlum2 no debería ser coordinador.");

		let isCoordinador6 = await upmAsignatura.isCoordinador({from: addrEthAlum3});
		assert.equal(false, isCoordinador6, "addrEthAlum3 no debería ser coordinador.");

		let isCoordinador7 = await upmAsignatura.isCoordinador({from: newOwner});
		assert.equal(false, isCoordinador7, "newOwner no debería ser coordinador.");

		let isCoordinador8 = await upmAsignatura.isCoordinador({from: newCoordinador});
		assert.equal(false, isCoordinador8, "newCoordinador no debería ser coordinador.");

		let isCoordinador9 = await upmAsignatura.isCoordinador({from: coordinador});
		assert.equal(true, isCoordinador9, "coordinador debería ser coordinador.");
	});

	it("4Los valores iniciales son los correctos.", async () => {
		let nombreAsignatura = "Prueba 1";
		let cursoAcademico = "2019-2020";
		let codigoAsignatura = "COVID-19";
		let titulacion = "Teleco";
		let numCreditos = 3;
		let semestre = 1;
		let cursoAno = 3;
		let tipoAsignatura = 0;

		let coordinadorAct = await upmAsignatura.coordinador();
		let nombreAsignaturaAct = await upmAsignatura.nombreAsignatura();
		let cursoAcademicoAct = await upmAsignatura.cursoAcademico();
		let codigoAsignaturaAct = await upmAsignatura.codigoAsignatura();
		let titulacionAct = await upmAsignatura.titulacion();
		let numCreditosAct = await upmAsignatura.numCreditos();
		let semestreAct = await upmAsignatura.semestre();
		let cursoAnoAct = await upmAsignatura.cursoAno();
		let tipoAsignaturaAct = await upmAsignatura.tipoAsignatura();

		assert.equal(coordinador, coordinadorAct, "El coordinador no coincide.");
		assert.equal(nombreAsignatura, nombreAsignaturaAct, "El nombre de la asignatura no coincide.");
		assert.equal(cursoAcademico, cursoAcademicoAct, "El curso académico no coincide.");
		assert.equal(codigoAsignatura, codigoAsignaturaAct, "El codigo de la asignatura no coincide.");
		assert.equal(titulacion, titulacionAct, "La titulación no coincide.");
		assert.equal(numCreditos, numCreditosAct, "El número de créditos no coincide.");
		assert.equal(semestre, semestreAct, "El semestre no coincide.");
		assert.equal(cursoAno, cursoAnoAct, "El curso no coincide.");
		assert.equal(tipoAsignatura, tipoAsignaturaAct, "El tipo de asignatura no coincide.");

		let numAlumnos = await upmAsignatura.numAlumnos();
		let numProfesores = await upmAsignatura.numProfesores();
		let numEvaluaciones = await upmAsignatura.numEvaluaciones();
		let numNotas = await upmAsignatura.numNotas();

		assert.equal(0, numAlumnos, "No debe haber ningún alumno registrado.");
		assert.equal(0, numProfesores, "No debe haber ningún profesor registrado.");
		assert.equal(0, numEvaluaciones, "No debe haber ninguna evaluación creada.");
		assert.equal(0, numNotas, "No debe haber ninguna nota creada.");
	});

	it("5No se permite eliminar un profesor que no está creado", async () => {
		let errorMsg = "eliminarProfesor - No hay Profesores creados.";
        let error = false;

        let numProfesores = await upmAsignatura.numProfesores();
		assert.equal(0, numProfesores, "Todavía no debe haber ningún profesor añadido.");

		try {
            let tx = await upmAsignatura.eliminarProfesor(addrEthProf);
        } catch(err) {
            error = err.toString().includes(errorMsg);
        } finally {
            assert.equal(true, error, "No se debería permitir eliminar un profesor que no está creado.");
        }
	});

	it("6Comprobar que, de todas las cuentas, ninguna es profesor", async () => {
		let isProfesor1 = await upmAsignatura.isProfesor({from: desplegador});
		assert.equal(false, isProfesor1, "El que ha desplegado el contrato no debería ser profesor.");

		let isProfesor2 = await upmAsignatura.isProfesor({from: addrEthProf});
		assert.equal(false, isProfesor2, "addrEthProf no debería ser profesor.");

		let isProfesor3 = await upmAsignatura.isProfesor({from: addrEthProf2});
		assert.equal(false, isProfesor3, "addrEthProf2 no debería ser profesor.");

		let isProfesor4 = await upmAsignatura.isProfesor({from: addrEthAlum});
		assert.equal(false, isProfesor4, "addrEthAlum no debería ser profesor.");

		let isProfesor5 = await upmAsignatura.isProfesor({from: addrEthAlum2});
		assert.equal(false, isProfesor5, "addrEthAlum2 no debería ser profesor.");

		let isProfesor6 = await upmAsignatura.isProfesor({from: addrEthAlum3});
		assert.equal(false, isProfesor6, "addrEthAlum3 no debería ser profesor.");

		let isProfesor7 = await upmAsignatura.isProfesor({from: newOwner});
		assert.equal(false, isProfesor7, "newOwner no debería ser profesor.");

		let isProfesor8 = await upmAsignatura.isProfesor({from: newCoordinador});
		assert.equal(false, isProfesor8, "newCoordinador no debería ser profesor.");

		let isProfesor9 = await upmAsignatura.isProfesor({from: coordinador});
		assert.equal(false, isProfesor9, "coordinador no debería ser profesor.");
	});

	it("7No se permite crear un profesor a quien no es owner ni coordinador", async () => {
        let errorMsg = "Sólo el owner o el coordinador pueden hacer esta operación.";
        let error = false;

		let numProfesores = await upmAsignatura.numProfesores();
		assert.equal(0, numProfesores, "Todavía no debe haber ningún profesor registrado.");

        try {
            await upmAsignatura.anadirProfesor(addrEthProf, {from: newOwner});
        } catch(err) {
            error = err.toString().includes(errorMsg);
        } finally {
            assert.equal(true, error, "Alguien que no es el owner o el coordinador no debería poder crear un profesor.");
        }

        numProfesores = await upmAsignatura.numProfesores();
        assert.equal(0, numProfesores, "Todavía no debe haber ningún profesor registrado.");
    });

	it("8El owner crea correctamente un profesor", async() => {
		let numProfesores = await upmAsignatura.numProfesores();
		assert.equal(0, numProfesores, "Todavía no debe haber ningún profesor registrado.");

		let tx = await upmAsignatura.anadirProfesor(addrEthProf, {from: desplegador});

		numProfesores = await upmAsignatura.numProfesores();
		assert.equal(1, numProfesores, "Debe haber un profesor registrado.");

		let indexProf = await upmAsignatura.mapProfesores(addrEthProf);
		let profesor = await upmAsignatura.listaProfesores(indexProf);

		assert.equal(addrEthProf, profesor, "La dirección del profesor creado por el owner debe coincidir.")
	});

	it("9Tras crear un profesor, comprobar que, de todas las cuentas, sólo la 1 es profesor", async () => {
		let isProfesor1 = await upmAsignatura.isProfesor({from: desplegador});
		assert.equal(false, isProfesor1, "El que ha desplegado el contrato no debería ser profesor.");

		let isProfesor2 = await upmAsignatura.isProfesor({from: addrEthProf});
		assert.equal(true, isProfesor2, "Ahora addrEthProf sí debería ser profesor.");

		let isProfesor3 = await upmAsignatura.isProfesor({from: addrEthProf2});
		assert.equal(false, isProfesor3, "addrEthProf2 no debería ser profesor.");

		let isProfesor4 = await upmAsignatura.isProfesor({from: addrEthAlum});
		assert.equal(false, isProfesor4, "addrEthAlum no debería ser profesor.");

		let isProfesor5 = await upmAsignatura.isProfesor({from: addrEthAlum2});
		assert.equal(false, isProfesor5, "addrEthAlum2 no debería ser profesor.");

		let isProfesor6 = await upmAsignatura.isProfesor({from: addrEthAlum3});
		assert.equal(false, isProfesor6, "addrEthAlum3 no debería ser profesor.");

		let isProfesor7 = await upmAsignatura.isProfesor({from: newOwner});
		assert.equal(false, isProfesor7, "newOwner no debería ser profesor.");

		let isProfesor8 = await upmAsignatura.isProfesor({from: newCoordinador});
		assert.equal(false, isProfesor8, "newCoordinador no debería ser profesor.");

		let isProfesor9 = await upmAsignatura.isProfesor({from: coordinador});
		assert.equal(false, isProfesor9, "coordinador no debería ser profesor.");
	});

	it("10El coordinador crea correctamente un profesor", async() => {
		let numProfesores = await upmAsignatura.numProfesores();
		assert.equal(1, numProfesores, "Debe haber un profesor registrado.");

		let tx = await upmAsignatura.anadirProfesor(addrEthProf2, {from: coordinador});

		numProfesores = await upmAsignatura.numProfesores();
		assert.equal(2, numProfesores, "Debe haber dos profesores registrados.");

		let indexProf = await upmAsignatura.mapProfesores(addrEthProf2);
		let profesor = await upmAsignatura.listaProfesores(indexProf);

		assert.equal(addrEthProf2, profesor, "La dirección del profesor creado por el coordinador debe coincidir.")
	});

	it("11Tras crear un segundo profesor, comprobar que, de todas las cuentas, sólo la 1 y 2 son profesores", async () => {
		let isProfesor1 = await upmAsignatura.isProfesor({from: desplegador});
		assert.equal(false, isProfesor1, "El que ha desplegado el contrato no debería ser profesor.");

		let isProfesor2 = await upmAsignatura.isProfesor({from: addrEthProf});
		assert.equal(true, isProfesor2, "Ahora addrEthProf sí debería ser profesor.");

		let isProfesor3 = await upmAsignatura.isProfesor({from: addrEthProf2});
		assert.equal(true, isProfesor3, "Ahora addrEthProf2 sí debería ser profesor.");

		let isProfesor4 = await upmAsignatura.isProfesor({from: addrEthAlum});
		assert.equal(false, isProfesor4, "addrEthAlum no debería ser profesor.");

		let isProfesor5 = await upmAsignatura.isProfesor({from: addrEthAlum2});
		assert.equal(false, isProfesor5, "addrEthAlum2 no debería ser profesor.");

		let isProfesor6 = await upmAsignatura.isProfesor({from: addrEthAlum3});
		assert.equal(false, isProfesor6, "addrEthAlum3 no debería ser profesor.");

		let isProfesor7 = await upmAsignatura.isProfesor({from: newOwner});
		assert.equal(false, isProfesor7, "newOwner no debería ser profesor.");

		let isProfesor8 = await upmAsignatura.isProfesor({from: newCoordinador});
		assert.equal(false, isProfesor8, "newCoordinador no debería ser profesor.");

		let isProfesor9 = await upmAsignatura.isProfesor({from: coordinador});
		assert.equal(false, isProfesor9, "coordinador no debería ser profesor.");
	});

	it("12Comprobar inicialmente que, de todas las cuentas, ninguna es alumno", async () => {
		let isAlumno1 = await upmAsignatura.isAlumno({from: desplegador});
		assert.equal(false, isAlumno1, "El que ha desplegado el contrato no debería ser alumno.");

		let isAlumno2 = await upmAsignatura.isAlumno({from: addrEthProf});
		assert.equal(false, isAlumno2, "addrEthProf no debería ser alumno.");

		let isAlumno3 = await upmAsignatura.isAlumno({from: addrEthProf2});
		assert.equal(false, isAlumno3, "addrEthProf2 no debería ser alumno.");

		let isAlumno4 = await upmAsignatura.isAlumno({from: addrEthAlum});
		assert.equal(false, isAlumno4, "addrEthAlum no debería ser alumno.");

		let isAlumno5 = await upmAsignatura.isAlumno({from: addrEthAlum2});
		assert.equal(false, isAlumno5, "addrEthAlum2 no debería ser alumno.");

		let isAlumno6 = await upmAsignatura.isAlumno({from: addrEthAlum3});
		assert.equal(false, isAlumno6, "addrEthAlum3 no debería ser alumno.");

		let isAlumno7 = await upmAsignatura.isAlumno({from: newOwner});
		assert.equal(false, isAlumno7, "newOwner no debería ser alumno.");

		let isAlumno8 = await upmAsignatura.isAlumno({from: newCoordinador});
		assert.equal(false, isAlumno8, "newCoordinador no debería ser alumno.");

		let isAlumno9 = await upmAsignatura.isAlumno({from: coordinador});
		assert.equal(false, isAlumno9, "coordinador no debería ser alumno.");
	});

	it("13No se permite crear un alumno a quien no es owner ni coordinador ni profesor", async () => {
        let errorMsg = "Sólo el owner, el coordinador o un profesor pueden hacer esta operación.";
        let error = false;

		let numAlumnos = await upmAsignatura.numAlumnos();
		assert.equal(0, numAlumnos, "Todavía no debe haber ningún alumno registrado.");

        try {
            await upmAsignatura.anadirAlumno(addrEthAlum, {from: newOwner});
        } catch(err) {
            error = err.toString().includes(errorMsg);
        } finally {
            assert.equal(true, error, "Alguien que no es el owner o el coordinador o un profesor no debería poder crear un alumno.");
        }

        numAlumnos = await upmAsignatura.numAlumnos();
        assert.equal(0, numAlumnos, "Todavía no debe haber ningún alumno registrado.");
    });

	it("14El owner crea correctamente un alumno", async() => {
		let numAlumnos = await upmAsignatura.numAlumnos();
		assert.equal(0, numAlumnos, "Todavía no debe haber ningún alumno registrado.");

		let tx = await upmAsignatura.anadirAlumno(addrEthAlum, {from: desplegador});

		numAlumnos = await upmAsignatura.numAlumnos();
		assert.equal(1, numAlumnos, "Debe haber un alumno registrado.");

		let indexAlum = await upmAsignatura.mapAlumnos(addrEthAlum);
		let alumno = await upmAsignatura.listaAlumnos(indexAlum);

		assert.equal(addrEthAlum, alumno, "La dirección del alumno creado por el owner debe coincidir.")
	});

	it("15Tras crear un alumno, comprobar que, de todas las cuentas, sólo la 3 es alumno", async () => {
		let isAlumno1 = await upmAsignatura.isAlumno({from: desplegador});
		assert.equal(false, isAlumno1, "El que ha desplegado el contrato no debería ser alumno.");

		let isAlumno2 = await upmAsignatura.isAlumno({from: addrEthProf});
		assert.equal(false, isAlumno2, "addrEthProf no debería ser alumno.");

		let isAlumno3 = await upmAsignatura.isAlumno({from: addrEthProf2});
		assert.equal(false, isAlumno3, "addrEthProf2 no debería ser alumno.");

		let isAlumno4 = await upmAsignatura.isAlumno({from: addrEthAlum});
		assert.equal(true, isAlumno4, "Ahora addrEthAlum sí debería ser alumno.");

		let isAlumno5 = await upmAsignatura.isAlumno({from: addrEthAlum2});
		assert.equal(false, isAlumno5, "addrEthAlum2 no debería ser alumno.");

		let isAlumno6 = await upmAsignatura.isAlumno({from: addrEthAlum3});
		assert.equal(false, isAlumno6, "addrEthAlum3 no debería ser alumno.");

		let isAlumno7 = await upmAsignatura.isAlumno({from: newOwner});
		assert.equal(false, isAlumno7, "newOwner no debería ser alumno.");

		let isAlumno8 = await upmAsignatura.isAlumno({from: newCoordinador});
		assert.equal(false, isAlumno8, "newCoordinador no debería ser alumno.");

		let isAlumno9 = await upmAsignatura.isAlumno({from: coordinador});
		assert.equal(false, isAlumno9, "coordinador no debería ser alumno.");
	});

	it("16El coordinador crea correctamente un alumno", async() => {
		let numAlumnos = await upmAsignatura.numAlumnos();
		assert.equal(1, numAlumnos, "Debe haber un alumno registrado.");

		let tx = await upmAsignatura.anadirAlumno(addrEthAlum2, {from: coordinador});

		numAlumnos = await upmAsignatura.numAlumnos();
		assert.equal(2, numAlumnos, "Debe haber dos alumnos registrados.");

		let indexAlum = await upmAsignatura.mapAlumnos(addrEthAlum2);
		let alumno = await upmAsignatura.listaAlumnos(indexAlum);

		assert.equal(addrEthAlum2, alumno, "La dirección del alumno creado por el coordinador debe coincidir.")
	});

	it("17Tras crear un segundo alumno, comprobar que, de todas las cuentas, sólo la 3 y 4 son alumnos", async () => {
		let isAlumno1 = await upmAsignatura.isAlumno({from: desplegador});
		assert.equal(false, isAlumno1, "El que ha desplegado el contrato no debería ser alumno.");

		let isAlumno2 = await upmAsignatura.isAlumno({from: addrEthProf});
		assert.equal(false, isAlumno2, "addrEthProf no debería ser alumno.");

		let isAlumno3 = await upmAsignatura.isAlumno({from: addrEthProf2});
		assert.equal(false, isAlumno3, "addrEthProf2 no debería ser alumno.");

		let isAlumno4 = await upmAsignatura.isAlumno({from: addrEthAlum});
		assert.equal(true, isAlumno4, "Ahora addrEthAlum sí debería ser alumno.");

		let isAlumno5 = await upmAsignatura.isAlumno({from: addrEthAlum2});
		assert.equal(true, isAlumno5, "Ahora addrEthAlum2 sí debería ser alumno.");

		let isAlumno6 = await upmAsignatura.isAlumno({from: addrEthAlum3});
		assert.equal(false, isAlumno6, "addrEthAlum3 no debería ser alumno.");

		let isAlumno7 = await upmAsignatura.isAlumno({from: newOwner});
		assert.equal(false, isAlumno7, "newOwner no debería ser alumno.");

		let isAlumno8 = await upmAsignatura.isAlumno({from: newCoordinador});
		assert.equal(false, isAlumno8, "newCoordinador no debería ser alumno.");

		let isAlumno9 = await upmAsignatura.isAlumno({from: coordinador});
		assert.equal(false, isAlumno9, "coordinador no debería ser alumno.");
	});

	it("18Un profesor crea correctamente un alumno", async() => {
		let numAlumnos = await upmAsignatura.numAlumnos();
		assert.equal(2, numAlumnos, "Debe haber dos alumnos registrados.");

		let tx = await upmAsignatura.anadirAlumno(addrEthAlum3, {from: addrEthProf});

		numAlumnos = await upmAsignatura.numAlumnos();
		assert.equal(3, numAlumnos, "Debe haber tres alumnos registrados.");

		let indexAlum = await upmAsignatura.mapAlumnos(addrEthAlum3);
		let alumno = await upmAsignatura.listaAlumnos(indexAlum);

		assert.equal(addrEthAlum3, alumno, "La dirección del alumno creado por un profesor debe coincidir.")
	});

	it("19Tras crear un tercer alumno, comprobar que, de todas las cuentas, sólo la 3, 4 y 5 son alumnos", async () => {
		let isAlumno1 = await upmAsignatura.isAlumno({from: desplegador});
		assert.equal(false, isAlumno1, "El que ha desplegado el contrato no debería ser alumno.");

		let isAlumno2 = await upmAsignatura.isAlumno({from: addrEthProf});
		assert.equal(false, isAlumno2, "addrEthProf no debería ser alumno.");

		let isAlumno3 = await upmAsignatura.isAlumno({from: addrEthProf2});
		assert.equal(false, isAlumno3, "addrEthProf2 no debería ser alumno.");

		let isAlumno4 = await upmAsignatura.isAlumno({from: addrEthAlum});
		assert.equal(true, isAlumno4, "Ahora addrEthAlum sí debería ser alumno.");

		let isAlumno5 = await upmAsignatura.isAlumno({from: addrEthAlum2});
		assert.equal(true, isAlumno5, "Ahora addrEthAlum2 sí debería ser alumno.");

		let isAlumno6 = await upmAsignatura.isAlumno({from: addrEthAlum3});
		assert.equal(true, isAlumno6, "Ahora addrEthAlum3 sí debería ser alumno.");

		let isAlumno7 = await upmAsignatura.isAlumno({from: newOwner});
		assert.equal(false, isAlumno7, "newOwner no debería ser alumno.");

		let isAlumno8 = await upmAsignatura.isAlumno({from: newCoordinador});
		assert.equal(false, isAlumno8, "newCoordinador no debería ser alumno.");

		let isAlumno9 = await upmAsignatura.isAlumno({from: coordinador});
		assert.equal(false, isAlumno9, "coordinador no debería ser alumno.");
	});

	it("20No se permite crear una evaluación a quien no es owner ni coordinador ni profesor", async () => {
		let nombre = "Prueba";
		let index = 0;
		let fecha = 86146456;
		let obligatoria = 1;
		let notaMinima = 40;
		let porcAportacion = 25;
		let tipoConvocatoria = 0; // 0=OrdinariaContinua, 1=OrdinariaFinal, 2=Extraordinaria
        let errorMsg = "Sólo el owner, el coordinador o un profesor pueden hacer esta operación.";
        let error = false;

		let numEvaluaciones = await upmAsignatura.numEvaluaciones();
		assert.equal(0, numEvaluaciones, "Todavía no debe haber ninguna evaluación creada.");

        try {
            await upmAsignatura.crearEvaluacion(nombre, fecha, obligatoria, notaMinima, porcAportacion, tipoConvocatoria, {from: newOwner});
        } catch(err) {
            error = err.toString().includes(errorMsg);
        } finally {
            assert.equal(true, error, "Alguien que no es el owner o el coordinador o un profesor no debería poder crear una evaluación.");
        }

        numEvaluaciones = await upmAsignatura.numEvaluaciones();
        assert.equal(0, numEvaluaciones, "Todavía no debe haber ninguna evaluación creada");
    });

	it("21Un profesor crea correctamente una evaluación", async () => {
		let nombre = "Prueba";
		let index = 0;
		let fecha = 86146456;
		let obligatoria = 1;
		let notaMinima = 40;
		let porcAportacion = 25;
		let tipoConvocatoria = 0; // 0=OrdinariaContinua, 1=OrdinariaFinal, 2=Extraordinaria

		let numEvaluaciones = await upmAsignatura.numEvaluaciones();
		assert.equal(0, numEvaluaciones, "Todavía no debe haber ninguna evaluación creada.");

		let tx = await upmAsignatura.crearEvaluacion(nombre, fecha, obligatoria, notaMinima, porcAportacion, tipoConvocatoria, {from: addrEthProf});

		numEvaluaciones = await upmAsignatura.numEvaluaciones();
		assert.equal(1, numEvaluaciones, "Debe haber una evaluación creada.");

		let evaluacion = await upmAsignatura.listaEvaluaciones(0);

		assert.equal(index, evaluacion.indexEvaluacion, "El índice de la evaluación debe coincidir.");
		assert.equal(nombre, evaluacion.nombre, "El nombre de la evaluación debe coincidir.");
		assert.equal(fecha, evaluacion.fecha, "La fecha de la evaluación debe coincidir.");
		assert.equal(obligatoria, evaluacion.obligatoria, "La obligatoriedad de la evaluación debe coincidir.");
		assert.equal(notaMinima, evaluacion.notaMinima, "La nota mínima de la evaluación debe coincidir.");
		assert.equal(porcAportacion, evaluacion.porcAportacion, "El porcentaje de aportación de la evaluación debe coincidir.");
		assert.equal(tipoConvocatoria, evaluacion.tipoConvocatoria, "El tipo de convocatoria de la evaluación debe coincidir.");
	});

	it("22Un profesor lee correctamente una evaluación", async() => {
		let nombre = "Prueba";
		let index = 0;
		let fecha = 86146456;
		let obligatoria = 1;
		let notaMinima = 40;
		let porcAportacion = 25;
		let tipoConvocatoria = 0; // 0=OrdinariaContinua, 1=OrdinariaFinal, 2=Extraordinaria

		let numEvaluaciones = await upmAsignatura.numEvaluaciones();
		assert.equal(1, numEvaluaciones, "Debe haber una evaluación creada.");

		let evaluacion = await upmAsignatura.leerEvaluacion(0, {from: addrEthProf});

		assert.equal(nombre, evaluacion._nombre, "El nombre de la evaluación debe coincidir.");
		assert.equal(fecha, evaluacion._fecha, "La fecha de la evaluación debe coincidir.");
		assert.equal(obligatoria, evaluacion._obligatoria, "La obligatoriedad de la evaluación debe coincidir.");
		assert.equal(notaMinima, evaluacion._notaMinima, "La nota minima de la evaluación debe coincidir.");
		assert.equal(porcAportacion, evaluacion._porcAportacion, "El porcentaje de aportacion de la evaluación debe coincidir.");
		assert.equal(tipoConvocatoria, evaluacion._tipoConvocatoria, "El tipo de convocatoria de la evaluación debe coincidir.");
	});

	it("23Un profesor actualiza correctamente una evaluación", async () => {
		let newNombre = "NewPrueba";
		let index = 0;
		let newFecha = 77146456;
		let newObligatoria = 0;
		let newNotaMinima = 30;
		let newPorcAportacion = 50;
		let newTipoConvocatoria = 1; // 0=OrdinariaContinua, 1=OrdinariaFinal, 2=Extraordinaria

		let numEvaluaciones = await upmAsignatura.numEvaluaciones();
		assert.equal(1, numEvaluaciones, "Debe haber una evaluación creada.");

		await upmAsignatura.actualizarEvaluacion(index, newNombre, newFecha, newObligatoria, newNotaMinima, newPorcAportacion, newTipoConvocatoria, {from: addrEthProf});

		let evaluacion = await upmAsignatura.listaEvaluaciones(0);

		assert.equal(index, evaluacion.indexEvaluacion, "El índice de la evaluación debe coincidir.");
		assert.equal(newNombre, evaluacion.nombre, "El nombre de la evaluación debe coincidir.");
		assert.equal(newFecha, evaluacion.fecha, "La fecha de la evaluación debe coincidir.");
		assert.equal(newObligatoria, evaluacion.obligatoria, "La obligatoriedad de la evaluación debe coincidir.");
		assert.equal(newNotaMinima, evaluacion.notaMinima, "La nota mínima de la evaluación debe coincidir.");
		assert.equal(newPorcAportacion, evaluacion.porcAportacion, "El porcentaje de aportación de la evaluación debe coincidir.");
		assert.equal(newTipoConvocatoria, evaluacion.tipoConvocatoria, "El tipo de convocatoria de la evaluación debe coincidir.");
	});

	it("24No se permite crear una nota a quien no es owner ni coordinador ni profesor", async () => {
		let indexEval = 0;
		let tipoNota = 1;			// 0=NoPresentado, 1=Normal, 2=MatriculaHonor
		let calificacion = 80;
        let errorMsg = "Sólo el owner, el coordinador o un profesor pueden hacer esta operación.";
        let error = false;

		let numNotas = await upmAsignatura.numNotas();
		assert.equal(0, numNotas, "Todavía no debe haber ninguna nota creada.");

        try {
            await upmAsignatura.crearNota(addrEthAlum, indexEval, tipoNota, calificacion, {from: newOwner});
        } catch(err) {
            error = err.toString().includes(errorMsg);
        } finally {
            assert.equal(true, error, "Alguien que no es el owner o el coordinador o un profesor no debería poder crear una nota.");
        }

        numNotas = await upmAsignatura.numNotas();
        assert.equal(0, numNotas, "Todavía no debe haber ninguna nota creada");
    });

	it("25Un profesor crea correctamente una nota", async() => {
		let indexEval = 0;
		let tipoNota = 1;			// 0=NoPresentado, 1=Normal, 2=MatriculaHonor
		let calificacion = 80;

		let numNotas = await upmAsignatura.numNotas();
		assert.equal(0, numNotas, "No debe haber ninguna nota creada.");

		let tx = await upmAsignatura.crearNota(addrEthAlum, indexEval, tipoNota, calificacion, {from: addrEthProf});

		numNotas = await upmAsignatura.numNotas();
		assert.equal(1, numNotas, "Debe haber una nota creada.");

		let nota = await upmAsignatura.mapNotas(addrEthAlum, indexEval);

		assert.equal(tipoNota, nota.tipoNota, "El tipo de nota debe coincidir.");
		assert.equal(calificacion, nota.calificacion, "La calificación debe coincidir.");
		assert.equal(true, nota.existsNota, "La nota debe existir.");
	});

	it("26Un profesor lee correctamente una nota", async () => {
		let indexEval = 0;
		let tipoNota = 1;			// 0=NoPresentado, 1=Normal, 2=MatriculaHonor
		let calificacion = 80;

		let numNotas = await upmAsignatura.numNotas();
		assert.equal(1, numNotas, "Debe haber una nota creada.");

		let nota = await upmAsignatura.leerNota(addrEthAlum, indexEval, {from: addrEthProf});

		assert.equal(tipoNota, nota._tipoNota, "El tipo de nota debe coincidir.");
		assert.equal(calificacion, nota._calificacion, "La calificación debe coincidir.");
	});

	it("27Un alumno lee correctamente su nota", async () => {
		let indexEval = 0;
		let tipoNota = 1;			// 0=NoPresentado, 1=Normal, 2=MatriculaHonor
		let calificacion = 80;

		let numNotas = await upmAsignatura.numNotas();
		assert.equal(1, numNotas, "Debe haber una nota creada.");

		let nota = await upmAsignatura.leerMiNota(indexEval, {from: addrEthAlum});

		assert.equal(tipoNota, nota._tipoNota, "El tipo de nota debe coincidir.");
		assert.equal(calificacion, nota._calificacion, "La calificación debe coincidir.");
	});

	it("28Un profesor actualiza correctamente una nota", async () => {
		let indexEval = 0;
		let newTipoNota = 1;			// 0=NoPresentado, 1=Normal, 2=MatriculaHonor
		let newCalificacion = 70;

		let numNotas = await upmAsignatura.numNotas();
		assert.equal(1, numNotas, "Debe haber una nota creada.");

		await upmAsignatura.actualizarNota(addrEthAlum, indexEval, newTipoNota, newCalificacion, {from: addrEthProf});

		let nota = await upmAsignatura.mapNotas(addrEthAlum, indexEval);

		assert.equal(newTipoNota, nota.tipoNota, "El tipo de nota debe coincidir.");
		assert.equal(newCalificacion, nota.calificacion, "La calificación debe coincidir.");
		assert.equal(true, nota.existsNota, "La nota debe existir.");
	});

	it("29Un profesor elimina correctamente una nota", async () => {
		let indexEval = 0;

		let numNotas = await upmAsignatura.numNotas();
		assert.equal(1, numNotas, "Debe haber una nota creada.");

		let tx = await upmAsignatura.borrarNota(addrEthAlum, indexEval, {from: addrEthProf});

		numNotas = await upmAsignatura.numNotas();
		assert.equal(0, numNotas, "No debe haber ninguna nota registrada.");
	});

	it("30No se permite actualizar el coordinador a quien no es owner ni coordinador.", async () => {
		let errorMsg = "Sólo el owner o el coordinador pueden hacer esta operación.";
        let error = false;

		let coordInicial = await upmAsignatura.coordinador();
		assert.equal(coordinador, coordInicial, "El coordinador inicial no coincide.");

		try {
            await upmAsignatura.actualizarCoordinador(newCoordinador, {from: addrEthProf});
        } catch(err) {
            error = err.toString().includes(errorMsg);
        } finally {
            assert.equal(true, error, "Alguien que no es el owner o el coordinador no debería poder actualizar el owner.");
        }

		let coordActualizado = await upmAsignatura.coordinador();
		assert.equal(coordinador, coordActualizado, "No se debería haber actualizado el coordinador.");
	});

	it("31El coordinador actualiza correctamente el coordinador", async () => {
		let coordInicial = await upmAsignatura.coordinador();
		assert.equal(coordinador, coordInicial, "El coordinador inicial no coincide.");

		await upmAsignatura.actualizarCoordinador(newCoordinador, {from: coordinador});

		let coordActualizado = await upmAsignatura.coordinador();
		assert.equal(newCoordinador, coordActualizado, "El coordinador actualizado no coincide.");
	});

	it("32Tras actualizar el coordinador, comprobar que, de todas las cuentas, sólo la 8 es coordinador", async () => {
		let isCoordinador1 = await upmAsignatura.isCoordinador({from: desplegador});
		assert.equal(false, isCoordinador1, "El que ha desplegado el contrato no debería ser coordinador (II).");

		let isCoordinador2 = await upmAsignatura.isCoordinador({from: addrEthProf});
		assert.equal(false, isCoordinador2, "addrEthProf no debería ser coordinador (II).");

		let isCoordinador3 = await upmAsignatura.isCoordinador({from: addrEthProf2});
		assert.equal(false, isCoordinador3, "addrEthProf2 no debería ser coordinador (II).");

		let isCoordinador4 = await upmAsignatura.isCoordinador({from: addrEthAlum});
		assert.equal(false, isCoordinador4, "addrEthAlum no debería ser coordinador (II).");

		let isCoordinador5 = await upmAsignatura.isCoordinador({from: addrEthAlum2});
		assert.equal(false, isCoordinador5, "addrEthAlum2 no debería ser coordinador (II).");

		let isCoordinador6 = await upmAsignatura.isCoordinador({from: addrEthAlum3});
		assert.equal(false, isCoordinador6, "addrEthAlum3 no debería ser coordinador (II).");

		let isCoordinador7 = await upmAsignatura.isCoordinador({from: newOwner});
		assert.equal(false, isCoordinador7, "newOwner no debería ser coordinador (II).");

		let isCoordinador8 = await upmAsignatura.isCoordinador({from: newCoordinador});
		assert.equal(true, isCoordinador8, "Ahora newCoordinador sí debería ser coordinador (II).");

		let isCoordinador9 = await upmAsignatura.isCoordinador({from: coordinador});
		assert.equal(false, isCoordinador9, "El que ha sido designado coordinador en el despliegue ya no debería ser coordinador (II).");
	});

	it("33No se permite eliminar un alumno a quien no es owner ni coordinador ni profesor", async () => {
		let errorMsg = "Sólo el owner, el coordinador o un profesor pueden hacer esta operación.";
        let error = false;

		let numAlumnos = await upmAsignatura.numAlumnos();
		assert.equal(3, numAlumnos, "Todavía debe haber tres alumnos registrados.");

        try {
            let tx = await upmAsignatura.eliminarAlumno(addrEthAlum3, {from: addrEthAlum});
        } catch(err) {
            error = err.toString().includes(errorMsg);
        } finally {
            assert.equal(true, error, "Alguien que no es el owner o el coordinador o un profesor no debería poder eliminar un alumno.");
        }

        numAlumnos = await upmAsignatura.numAlumnos();
		assert.equal(3, numAlumnos, "Todavía debe haber tres alumnos registrados.");
    });

	it("34Un profesor puede eliminar correctamente un alumno", async () => {
		let numAlumnos = await upmAsignatura.numAlumnos();
		assert.equal(3, numAlumnos, "Todavía debe haber tres alumnos registrados.");

		let tx = await upmAsignatura.eliminarAlumno(addrEthAlum3, {from: addrEthProf});

		numAlumnos = await upmAsignatura.numAlumnos();
		assert.equal(2, numAlumnos, "Todavía debe haber dos alumnos registrados.");
	});

	it("35Tras eliminar uno de los tres alumnos, comprobar que, de todas las cuentas, sólo la 3 y la 4 son alumnos", async () => {
		let isAlumno1 = await upmAsignatura.isAlumno({from: desplegador});
		assert.equal(false, isAlumno1, "El que ha desplegado el contrato no debería ser alumno.");

		let isAlumno2 = await upmAsignatura.isAlumno({from: addrEthProf});
		assert.equal(false, isAlumno2, "addrEthProf no debería ser alumno.");

		let isAlumno3 = await upmAsignatura.isAlumno({from: addrEthProf2});
		assert.equal(false, isAlumno3, "addrEthProf2 no debería ser alumno.");

		let isAlumno4 = await upmAsignatura.isAlumno({from: addrEthAlum});
		assert.equal(true, isAlumno4, "addrEthAlum ya no debería ser alumno.");

		let isAlumno5 = await upmAsignatura.isAlumno({from: addrEthAlum2});
		assert.equal(true, isAlumno5, "addrEthAlum2 no debería ser alumno.");

		let isAlumno6 = await upmAsignatura.isAlumno({from: addrEthAlum3});
		assert.equal(false, isAlumno6, "addrEthAlum3 no debería ser alumno.");

		let isAlumno7 = await upmAsignatura.isAlumno({from: newOwner});
		assert.equal(false, isAlumno7, "newOwner no debería ser alumno.");

		let isAlumno8 = await upmAsignatura.isAlumno({from: newCoordinador});
		assert.equal(false, isAlumno8, "newCoordinador no debería ser alumno.");

		let isAlumno9 = await upmAsignatura.isAlumno({from: coordinador});
		assert.equal(false, isAlumno9, "coordinador no debería ser alumno.");
	});

	it("36No se permite eliminar un profesor a quien no es owner ni coordinador", async () => {
		let errorMsg = "Sólo el owner o el coordinador pueden hacer esta operación.";
        let error = false;

		let numProfesores = await upmAsignatura.numProfesores();
		assert.equal(2, numProfesores, "Todavía debe haber dos profesores registrados.");

        try {
            let tx = await upmAsignatura.eliminarProfesor(addrEthProf2, {from: addrEthAlum});
        } catch(err) {
            error = err.toString().includes(errorMsg);
        } finally {
            assert.equal(true, error, "Alguien que no es el owner o el coordinador no debería poder eliminar un profesor.");
        }

        numProfesores = await upmAsignatura.numProfesores();
		assert.equal(2, numProfesores, "Todavía debe haber dos profesores registrados.");
    });

	it("37El coordinador elimina correctamente un profesor", async () => {
		let numProfesores = await upmAsignatura.numProfesores();
		assert.equal(2, numProfesores, "Todavía debe haber dos profesores registrados.");

		let tx = await upmAsignatura.eliminarProfesor(addrEthProf2, {from: newCoordinador});

		numProfesores = await upmAsignatura.numProfesores();
		assert.equal(1, numProfesores, "Todavía debe haber un profesor registrado.");
	});

	it("38Tras eliminar uno de los dos profesores, comprobar que, de todas las cuentas, sólo la 1 es profesor", async () => {
		let isProfesor1 = await upmAsignatura.isProfesor({from: desplegador});
		assert.equal(false, isProfesor1, "El que ha desplegado el contrato no debería ser profesor.");

		let isProfesor2 = await upmAsignatura.isProfesor({from: addrEthProf});
		assert.equal(true, isProfesor2, "addrEthProf ya no debería ser profesor.");

		let isProfesor3 = await upmAsignatura.isProfesor({from: addrEthProf2});
		assert.equal(false, isProfesor3, "addrEthProf2 sí debería seguir siendo profesor.");

		let isProfesor4 = await upmAsignatura.isProfesor({from: addrEthAlum});
		assert.equal(false, isProfesor4, "addrEthAlum no debería ser profesor.");

		let isProfesor5 = await upmAsignatura.isProfesor({from: addrEthAlum2});
		assert.equal(false, isProfesor5, "addrEthAlum2 no debería ser profesor.");

		let isProfesor6 = await upmAsignatura.isProfesor({from: addrEthAlum3});
		assert.equal(false, isProfesor6, "addrEthAlum3 no debería ser profesor.");

		let isProfesor7 = await upmAsignatura.isProfesor({from: newOwner});
		assert.equal(false, isProfesor7, "newOwner no debería ser profesor.");

		let isProfesor8 = await upmAsignatura.isProfesor({from: newCoordinador});
		assert.equal(false, isProfesor8, "newCoordinador no debería ser profesor.");

		let isProfesor9 = await upmAsignatura.isProfesor({from: coordinador});
		assert.equal(false, isProfesor9, "coordinador no debería ser profesor.");
	});

	it("39No se permite actualizar el owner a quien no es owner", async () => {
        let errorMsg = "Sólo el owner puede hacer esta operación.";
        let error = false;

        let owner = await upmAsignatura.owner();
        assert.equal(desplegador, owner, "El owner debe ser quien ha desplegado el contrato.");

        try {
            await upmAsignatura.actualizarOwner(newOwner, {from: newOwner});
        } catch(err) {
            error = err.toString().includes(errorMsg);
        } finally {
            assert.equal(true, error, "Alguien que no es el owner no debería poder actualizar el owner.");
        }

        let newOwnerAct = await upmAsignatura.owner();
        assert.equal(desplegador, newOwnerAct, "El owner se ha actualizado y no tendría que haber ocurrido.");
    });

    it("40El owner actualiza correctamente el owner", async () => {
        let owner = await upmAsignatura.owner();
        assert.equal(desplegador, owner, "El owner debe ser quien ha desplegado el contrato.");

        await upmAsignatura.actualizarOwner(newOwner, {from: desplegador});

        let newOwnerAct = await upmAsignatura.owner();
        assert.equal(newOwner, newOwnerAct, "El owner no se ha actualizado correctamente.");
    });

    it("41Tras actualizar el owner, comprobar que, de todas las cuentas, sólo la 6 es owner", async () => {
		let isOwner1 = await upmAsignatura.isOwner({from: desplegador});
		assert.equal(false, isOwner1, "El que ha desplegado el contrato ya no debería ser owner (II).");

		let isOwner2 = await upmAsignatura.isOwner({from: addrEthProf});
		assert.equal(false, isOwner2, "addrEthProf no debería ser owner (II).");

		let isOwner3 = await upmAsignatura.isOwner({from: addrEthProf2});
		assert.equal(false, isOwner3, "addrEthProf2 no debería ser owner (II).");

		let isOwner4 = await upmAsignatura.isOwner({from: addrEthAlum});
		assert.equal(false, isOwner4, "addrEthAlum no debería ser owner (II).");

		let isOwner5 = await upmAsignatura.isOwner({from: addrEthAlum2});
		assert.equal(false, isOwner5, "addrEthAlum2 no debería ser owner (II).");

		let isOwner6 = await upmAsignatura.isOwner({from: addrEthAlum3});
		assert.equal(false, isOwner6, "addrEthAlum3 no debería ser owner (II).");

		let isOwner7 = await upmAsignatura.isOwner({from: newOwner});
		assert.equal(true, isOwner7, "Ahora newOwner sí debería ser owner (II).");

		let isOwner8 = await upmAsignatura.isOwner({from: newCoordinador});
		assert.equal(false, isOwner8, "newCoordinador no debería ser owner (II).");

		let isOwner9 = await upmAsignatura.isOwner({from: coordinador});
		assert.equal(false, isOwner9, "coordinador no debería ser owner (II).");
	});

	/*it("", async () => {
		assert.equal(expected, actual, msg);
	});*/
});