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

	it("El owner es quien ha desplegado el contrato.", async () => {
		let owner = await upmAsignatura.owner();
		assert.equal(owner, desplegador, "El owner debe ser quien ha desplegado el contrato.");
	});

	it("Comprobar si las cuentas son owner", async () => {
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

	it("Comprobar si las cuentas son coordinador", async () => {
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

	it("Los valores iniciales son los correctos.", async () => {
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

		assert.equal(0, numAlumnos, "No debe haber ningún alumno registrado.");
		assert.equal(0, numProfesores, "No debe haber ningún profesor registrado.");
		assert.equal(0, numEvaluaciones, "No debe haber ninguna evaluación creada.");
	});

	it("Comprobar inicialmente si las cuentas son profesor", async () => {
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

	it("El owner crea correctamente un profesor", async() => {
		// comprobar que hay 0 profesores
		let numProfesores = await upmAsignatura.numProfesores();
		assert.equal(0, numProfesores, "Todavía no debe haber ningún profesor registrado.");

		// crear profesor
		let tx = await upmAsignatura.anadirProfesor(addrEthProf, {from: desplegador});

		// comprobar que hay 1 profesor
		numProfesores = await upmAsignatura.numProfesores();
		assert.equal(1, numProfesores, "Debe haber un profesor registrado.");

		// obtener profesor creado
		let indexProf = await upmAsignatura.mapProfesores(addrEthProf);
		let profesor = await upmAsignatura.listaProfesores(indexProf);

		// comprobar campos
		assert.equal(addrEthProf, profesor, "La dirección del profesor creado por el owner debe coincidir.")
	});

	it("Tras crear un profesor, comprobar si las cuentas son profesor", async () => {
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

	it("El coordinador crea correctamente un profesor", async() => {
		// comprobar que hay 1 profesor
		let numProfesores = await upmAsignatura.numProfesores();
		assert.equal(1, numProfesores, "Debe haber un profesor registrado.");

		// crear profesor
		let tx = await upmAsignatura.anadirProfesor(addrEthProf2, {from: coordinador});

		// comprobar que hay 2 profesores
		numProfesores = await upmAsignatura.numProfesores();
		assert.equal(2, numProfesores, "Debe haber dos profesores registrados.");

		// obtener profesor creado
		let indexProf = await upmAsignatura.mapProfesores(addrEthProf2);
		let profesor = await upmAsignatura.listaProfesores(indexProf);

		// comprobar campos
		assert.equal(addrEthProf2, profesor, "La dirección del profesor creado por el coordinador debe coincidir.")
	});

	it("Tras crear otro profesor, comprobar si las cuentas son profesor", async () => {
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

	it("Comprobar inicialmente si las cuentas son alumno", async () => {
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

	it("El owner crea correctamente un alumno", async() => {
		// comprobar que hay 0 alumnos
		let numAlumnos = await upmAsignatura.numAlumnos();
		assert.equal(0, numAlumnos, "Todavía no debe haber ningún alumno registrado.");

		// crear alumno
		let tx = await upmAsignatura.anadirAlumno(addrEthAlum, {from: desplegador});
		//console.log(tx);

		// comprobar que hay 1 alumno
		numAlumnos = await upmAsignatura.numAlumnos();
		assert.equal(1, numAlumnos, "Debe haber un alumno registrado.");

		// obtener alumno creado
		let indexAlum = await upmAsignatura.mapAlumnos(addrEthAlum);
		let alumno = await upmAsignatura.listaAlumnos(indexAlum);

		// comprobar campos
		assert.equal(addrEthAlum, alumno, "La dirección del alumno creado por el owner debe coincidir.")
	});

	it("Tras crear un alumno, comprobar de nuevo si las cuentas son alumno", async () => {
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

	it("El owner crea correctamente una evaluación", async () => {
		let nombre = "Prueba";
		let index = 0;
		let fecha = 86146456;
		let obligatoria = 1;
		let notaMinima = 40;
		let porcAportacion = 25;
		let tipoConvocatoria = 0; // 0=OrdinariaContinua, 1=OrdinariaFinal, 2=Extraordinaria

		// comprobar que hay 0 evaluaciones
		let numEvaluaciones = await upmAsignatura.numEvaluaciones();
		assert.equal(0, numEvaluaciones, "Todavía no debe haber ninguna evaluación creada.");

		// crear evaluacion
		let tx = await upmAsignatura.crearEvaluacion(nombre, fecha, obligatoria, notaMinima, porcAportacion, tipoConvocatoria, {from: desplegador});

		// comprobar que hay 1 evaluación
		numEvaluaciones = await upmAsignatura.numEvaluaciones();
		assert.equal(1, numEvaluaciones, "Debe haber una evaluación creada.");

		// obtener evaluación creada
		let evaluacion = await upmAsignatura.listaEvaluaciones(0);

		// comprobar campos
		assert.equal(index, evaluacion.indexEvaluacion, "El índice de la evaluación debe coincidir.");
		assert.equal(nombre, evaluacion.nombre, "El nombre de la evaluación debe coincidir.");
		assert.equal(fecha, evaluacion.fecha, "La fecha de la evaluación debe coincidir.");
		assert.equal(obligatoria, evaluacion.obligatoria, "La obligatoriedad de la evaluación debe coincidir.");
		assert.equal(notaMinima, evaluacion.notaMinima, "La nota mínima de la evaluación debe coincidir.");
		assert.equal(porcAportacion, evaluacion.porcAportacion, "El porcentaje de aportación de la evaluación debe coincidir.");
		assert.equal(tipoConvocatoria, evaluacion.tipoConvocatoria, "El tipo de convocatoria de la evaluación debe coincidir.");
	});

	it("El owner lee correctamente una evaluación", async() => {
		let nombre = "Prueba";
		let index = 0;
		let fecha = 86146456;
		let obligatoria = 1;
		let notaMinima = 40;
		let porcAportacion = 25;
		let tipoConvocatoria = 0; // 0=OrdinariaContinua, 1=OrdinariaFinal, 2=Extraordinaria

		// comprobar que hay 1 evaluación
		let numEvaluaciones = await upmAsignatura.numEvaluaciones();
		assert.equal(1, numEvaluaciones, "Debe haber una evaluación creada.");

		// obtener evaluación creada
		let evaluacion = await upmAsignatura.leerEvaluacion(0, {from: desplegador});

		// comprobar campos
		assert.equal(nombre, evaluacion._nombre, "El nombre de la evaluación debe coincidir.");
		assert.equal(fecha, evaluacion._fecha, "La fecha de la evaluación debe coincidir.");
		assert.equal(obligatoria, evaluacion._obligatoria, "La obligatoriedad de la evaluación debe coincidir.");
		assert.equal(notaMinima, evaluacion._notaMinima, "La nota minima de la evaluación debe coincidir.");
		assert.equal(porcAportacion, evaluacion._porcAportacion, "El porcentaje de aportacion de la evaluación debe coincidir.");
		assert.equal(tipoConvocatoria, evaluacion._tipoConvocatoria, "El tipo de convocatoria de la evaluación debe coincidir.");
	});

	it("El owner actualiza correctamente una evaluación", async () => {
		// datos
		let newNombre = "NewPrueba";
		let index = 0;
		let newFecha = 77146456;
		let newObligatoria = 0;
		let newNotaMinima = 30;
		let newPorcAportacion = 50;
		let newTipoConvocatoria = 1; // 0=OrdinariaContinua, 1=OrdinariaFinal, 2=Extraordinaria

		// comprobar que hay 1 evaluacion
		let numEvaluaciones = await upmAsignatura.numEvaluaciones();
		assert.equal(1, numEvaluaciones, "Debe haber una evaluación creada.");

		// actualizar evaluación
		await upmAsignatura.actualizarEvaluacion(index, newNombre, newFecha, newObligatoria, newNotaMinima, newPorcAportacion, newTipoConvocatoria, {from: desplegador});

		// obtener evaluación actualizada
		let evaluacion = await upmAsignatura.listaEvaluaciones(0);

		// comprobar campos
		assert.equal(index, evaluacion.indexEvaluacion, "El índice de la evaluación debe coincidir.");
		assert.equal(newNombre, evaluacion.nombre, "El nombre de la evaluación debe coincidir.");
		assert.equal(newFecha, evaluacion.fecha, "La fecha de la evaluación debe coincidir.");
		assert.equal(newObligatoria, evaluacion.obligatoria, "La obligatoriedad de la evaluación debe coincidir.");
		assert.equal(newNotaMinima, evaluacion.notaMinima, "La nota mínima de la evaluación debe coincidir.");
		assert.equal(newPorcAportacion, evaluacion.porcAportacion, "El porcentaje de aportación de la evaluación debe coincidir.");
		assert.equal(newTipoConvocatoria, evaluacion.tipoConvocatoria, "El tipo de convocatoria de la evaluación debe coincidir.");
	});

	it("El owner crea correctamente una nota", async() => {
		// datos
		let indexEval = 0;
		let tipoNota = 1;			// 0=NoPresentado, 1=Normal, 2=MatriculaHonor
		let calificacion = 80;

		// comprobar que hay 0 notas
		let numNotas = await upmAsignatura.numNotas();
		assert.equal(0, numNotas, "No debe haber ninguna nota creada.");

		// crear nota
		let tx = await upmAsignatura.crearNota(addrEthAlum, indexEval, tipoNota, calificacion, {from: desplegador});
		//console.log(tx);

		// comprobar que hay 1 nota
		numNotas = await upmAsignatura.numNotas();
		assert.equal(1, numNotas, "Debe haber una nota creada.");

		// obtener nota creada
		let nota = await upmAsignatura.mapNotas(addrEthAlum, indexEval);

		// comprobar campos
		assert.equal(tipoNota, nota.tipoNota, "El tipo de nota debe coincidir.");
		assert.equal(calificacion, nota.calificacion, "La calificación debe coincidir.");
		assert.equal(true, nota.existsNota, "La nota debe existir.");
	});

	it("El owner lee correctamente una nota", async () => {
		// datos
		let indexEval = 0;
		let tipoNota = 1;			// 0=NoPresentado, 1=Normal, 2=MatriculaHonor
		let calificacion = 80;

		// comprobar que hay 1 nota
		let numNotas = await upmAsignatura.numNotas();
		assert.equal(1, numNotas, "Debe haber una nota creada.");

		// leer nota
		let nota = await upmAsignatura.leerNota(addrEthAlum, indexEval, {from: desplegador});

		// comprobar campos
		assert.equal(tipoNota, nota._tipoNota, "El tipo de nota debe coincidir.");
		assert.equal(calificacion, nota._calificacion, "La calificación debe coincidir.");
	});

	it("Un alumno lee correctamente su nota", async () => {
		// datos
		let indexEval = 0;
		let tipoNota = 1;			// 0=NoPresentado, 1=Normal, 2=MatriculaHonor
		let calificacion = 80;

		// comprobar que hay 1 nota
		let numNotas = await upmAsignatura.numNotas();
		assert.equal(1, numNotas, "Debe haber una nota creada.");

		// leer nota
		let nota = await upmAsignatura.leerMiNota(indexEval, {from: addrEthAlum});

		// comprobar campos
		assert.equal(tipoNota, nota._tipoNota, "El tipo de nota debe coincidir.");
		assert.equal(calificacion, nota._calificacion, "La calificación debe coincidir.");
	});
	

	it("El owner actualiza correctamente una nota", async () => {
		// datos
		let indexEval = 0;
		let newTipoNota = 1;			// 0=NoPresentado, 1=Normal, 2=MatriculaHonor
		let newCalificacion = 70;

		// comprobar que hay 1 nota
		let numNotas = await upmAsignatura.numNotas();
		assert.equal(1, numNotas, "Debe haber una nota creada.");

		// actualizar nota
		await upmAsignatura.actualizarNota(addrEthAlum, indexEval, newTipoNota, newCalificacion, {from: desplegador});

		// obtener nota actualizada
		let nota = await upmAsignatura.mapNotas(addrEthAlum, indexEval);

		// comprobar campos
		assert.equal(newTipoNota, nota.tipoNota, "El tipo de nota debe coincidir.");
		assert.equal(newCalificacion, nota.calificacion, "La calificación debe coincidir.");
		assert.equal(true, nota.existsNota, "La nota debe existir.");
	});

	it("El owner elimina correctamente una nota", async () => {
		let indexEval = 0;

		// comprobar que hay 1 nota
		let numNotas = await upmAsignatura.numNotas();
		assert.equal(1, numNotas, "Debe haber una nota creada.");

		// eliminar nota
		let tx = await upmAsignatura.borrarNota(addrEthAlum, indexEval, {from: desplegador});

		// comprobar que hay 0 alumnos
		numNotas = await upmAsignatura.numNotas();
		assert.equal(0, numNotas, "No debe haber ninguna nota registrada.");
	});

	it("No se permite actualizar el coordinador a un profesor", async () => {
		let errorMsg = "Sólo el owner o el coordinador pueden hacer esta operación.";
        let error = false;

		// comprobar el coordinador inicial
		let coordInicial = await upmAsignatura.coordinador();
		assert.equal(coordinador, coordInicial, "El coordinador inicial no coincide.");

		// comprobar que hay 2 profesores
		let numProfesores = await upmAsignatura.numProfesores();
		assert.equal(2, numProfesores, "Debe haber dos profesores.");

		// intentar actualizar coordinador siendo profesor
		try {
            await upmAsignatura.actualizarCoordinador(newCoordinador, {from: addrEthProf});
        } catch(err) {
            error = err.toString().includes(errorMsg);
        } finally {
            assert.equal(true, error, "Alguien que no es el owner no debería poder actualizar el owner.");
        }

		// comprobar que no se ha actualizado el coordinador
		let coordActualizado = await upmAsignatura.coordinador();
		assert.equal(coordinador, coordActualizado, "No se debería haber actualizado el coordinador.");
	});

	it("El owner actualiza correctamente el coordinador", async () => {
		// comprobar el coordinador inicial
		let coordInicial = await upmAsignatura.coordinador();
		assert.equal(coordinador, coordInicial, "El coordinador inicial no coincide.");

		// actualizar coordinador
		await upmAsignatura.actualizarCoordinador(newCoordinador);

		// comprobar el coordinador actualizado
		let coordActualizado = await upmAsignatura.coordinador();
		assert.equal(newCoordinador, coordActualizado, "El coordinador actualizado no coincide.");
	});

	it("Tras actualizar el coordinador, comprobar de nuevo si las cuentas son coordinador", async () => {
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

	it("Se elimina correctamente un alumno", async () => {
		// comprobar que hay 1 alumno
		let numAlumnos = await upmAsignatura.numAlumnos();
		assert.equal(1, numAlumnos, "Todavía debe haber un alumno registrado.");

		// eliminar alumno
		let tx = await upmAsignatura.eliminarAlumno(addrEthAlum);

		// comprobar que hay 0 alumnos
		numAlumnos = await upmAsignatura.numAlumnos();
		assert.equal(0, numAlumnos, "No debe haber ningún alumno registrado.");
	});

	it("Tras eliminar un alumno, comprobar de nuevo si las cuentas son alumno", async () => {
		let isAlumno1 = await upmAsignatura.isAlumno({from: desplegador});
		assert.equal(false, isAlumno1, "El que ha desplegado el contrato no debería ser alumno.");

		let isAlumno2 = await upmAsignatura.isAlumno({from: addrEthProf});
		assert.equal(false, isAlumno2, "addrEthProf no debería ser alumno.");

		let isAlumno3 = await upmAsignatura.isAlumno({from: addrEthProf2});
		assert.equal(false, isAlumno3, "addrEthProf2 no debería ser alumno.");

		let isAlumno4 = await upmAsignatura.isAlumno({from: addrEthAlum});
		assert.equal(false, isAlumno4, "addrEthAlum ya no debería ser alumno.");

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

	// eliminar profesor
	it("Se elimina correctamente un profesor", async () => {
		// comprobar que hay 2 profesores
		let numProfesores = await upmAsignatura.numProfesores();
		assert.equal(2, numProfesores, "Todavía debe haber dos profesores registrados.");

		// eliminar profesor
		let tx = await upmAsignatura.eliminarProfesor(addrEthProf);

		// comprobar que todavía hay 1 profesor
		numProfesores = await upmAsignatura.numProfesores();
		assert.equal(1, numProfesores, "Todavía debe haber un profesor registrado.");
	});

	it("Tras eliminar uno de los profesores, comprobar si las cuentas son profesor", async () => {
		let isProfesor1 = await upmAsignatura.isProfesor({from: desplegador});
		assert.equal(false, isProfesor1, "El que ha desplegado el contrato no debería ser profesor.");

		let isProfesor2 = await upmAsignatura.isProfesor({from: addrEthProf});
		assert.equal(false, isProfesor2, "addrEthProf ya no debería ser profesor.");

		let isProfesor3 = await upmAsignatura.isProfesor({from: addrEthProf2});
		assert.equal(true, isProfesor3, "addrEthProf2 sí debería seguir siendo profesor.");

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

	it("No se permite actualizar el owner a quien no es owner", async () => {
        let errorMsg = "Sólo el owner puede hacer esta operación.";
        let error = false;

        // comprobar el owner actual
        let owner = await upmAsignatura.owner();
        assert.equal(desplegador, owner, "El owner debe ser quien ha desplegado el contrato.");

        // intentar actualizar el owner
        try {
            await upmAsignatura.actualizarOwner(newOwner, {from: newOwner});
        } catch(err) {
            error = err.toString().includes(errorMsg);
        } finally {
            assert.equal(true, error, "Alguien que no es el owner no debería poder actualizar el owner.");
        }

        // comprobar que el owner no se ha actualizado
        let newOwnerAct = await upmAsignatura.owner();
        assert.equal(desplegador, newOwnerAct, "El owner se ha actualizado y no tendría que haber ocurrido.");
    });

    it("El owner actualiza correctamente el owner", async () => {
        // comprobar el owner actual
        let owner = await upmAsignatura.owner();
        assert.equal(desplegador, owner, "El owner debe ser quien ha desplegado el contrato.");

        // actualizar owner
        await upmAsignatura.actualizarOwner(newOwner, {from: desplegador});

        // comprobar que el owner se ha actualizado
        let newOwnerAct = await upmAsignatura.owner();
        assert.equal(newOwner, newOwnerAct, "El owner no se ha actualizado correctamente.");
    });

    it("Comprobar de nuevo si las cuentas son owner", async () => {
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