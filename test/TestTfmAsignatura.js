let TfmAsignatura = artifacts.require("TfmAsignatura");

contract("TfmAsignatura", accounts => {
	let tfmAsignatura;

	before(async() => {
		tfmAsignatura = await TfmAsignatura.deployed();
		console.log("TfmAsignatura =", tfmAsignatura.address);
	});

	it("El owner es quien ha desplegado el contrato.", async () => {
		let owner = await tfmAsignatura.owner();
		let desplegador = accounts[0];
		assert.equal(owner, desplegador, "El owner debe ser quien ha desplegado el contrato.");
	});

	it("Los valores iniciales son los correctos.", async () => {
		let coordinador = "0x2aF1eB15b58A994b94A8196263fd866C32637747";
		let nombreAsignatura = "Prueba 1";
		let cursoAcademico = "2019-2020";
		let codigoAsignatura = "COVID-19";
		let numCreditos = 3;
		let semestre = 1;
		let cursoAno = 3;
		let tipoAsignatura = 0;

		let coordinadorAct = await tfmAsignatura.coordinador();
		let nombreAsignaturaAct = await tfmAsignatura.nombreAsignatura();
		let cursoAcademicoAct = await tfmAsignatura.cursoAcademico();
		let codigoAsignaturaAct = await tfmAsignatura.codigoAsignatura();
		let numCreditosAct = await tfmAsignatura.numCreditos();
		let semestreAct = await tfmAsignatura.semestre();
		let cursoAnoAct = await tfmAsignatura.cursoAno();
		let tipoAsignaturaAct = await tfmAsignatura.tipoAsignatura();

		assert.equal(coordinador, coordinadorAct, "El coordinador no coincide.");
		assert.equal(nombreAsignatura, nombreAsignaturaAct, "El nombre de la asignatura no coincide.");
		assert.equal(cursoAcademico, cursoAcademicoAct, "El curso academico no coincide.");
		assert.equal(codigoAsignatura, codigoAsignaturaAct, "El codigo de la asignatura no coincide.");
		assert.equal(numCreditos, numCreditosAct, "El numero de creditos no coincide.");
		assert.equal(semestre, semestreAct, "El semestre no coincide.");
		assert.equal(cursoAno, cursoAnoAct, "El curso no coincide.");
		assert.equal(tipoAsignatura, tipoAsignaturaAct, "El tipo de asignatura no coincide.");

		let numAlumnos = await tfmAsignatura.numAlumnos();
		let numProfesores = await tfmAsignatura.numProfesores();
		let numEvaluaciones = await tfmAsignatura.numEvaluaciones();

		assert.equal(0, numAlumnos, "No debe haber ningun alumno registrado.");
		assert.equal(0, numProfesores, "No debe haber ningun profesor registrado.");
		assert.equal(0, numEvaluaciones, "No debe haber ninguna evaluacion creada.");
	});

	// añadir profesor
	it("Se crea correctamente un profesor", async() => {
		let addrEthProf = accounts[1];

		// comprobar que hay 0 profesores
		let numProfesores = await tfmAsignatura.numProfesores();
		assert.equal(0, numProfesores, "Todavia no debe haber ningun profesor registrado.");

		// crear profesor
		let tx = await tfmAsignatura.anadirProfesor(addrEthProf);
		//console.log(tx);

		// comprobar que hay 1 profesor
		numProfesores = await tfmAsignatura.numProfesores();
		assert.equal(1, numProfesores, "Debe haber un profesor registrado.");

		// obtener profesor creado
		let indexProf = await tfmAsignatura.mapProfesores(addrEthProf);
		let profesor = await tfmAsignatura.listaProfesores(indexProf);

		// comprobar campos
		assert.equal(addrEthProf, profesor, "La direccion del profesor debe coincidir.")
	});

	// eliminar profesor
	it("Se elimina correctamente un profesor", async () => {
		let addrEthProf = accounts[1];

		// comprobar que hay 1 profesor
		let numProfesores = await tfmAsignatura.numProfesores();
		assert.equal(1, numProfesores, "Todavia debe haber un profesor registrado.");

		// eliminar profesor
		let tx = await tfmAsignatura.eliminarProfesor(addrEthProf);
		//console.log(tx);

		// comprobar que hay 0 profesores
		numProfesores = await tfmAsignatura.numProfesores();
		assert.equal(0, numProfesores, "No debe haber ningun profesor registrado.");
	});

	// añadir alumno
	it("Se crea correctamente un alumno", async() => {
		let addrEthAlum = accounts[1];

		// comprobar que hay 0 alumnos
		let numAlumnos = await tfmAsignatura.numAlumnos();
		assert.equal(0, numAlumnos, "Todavia no debe haber ningun alumno registrado.");

		// crear alumno
		let tx = await tfmAsignatura.anadirAlumno(addrEthAlum);
		//console.log(tx);

		// comprobar que hay 1 alumno
		numAlumnos = await tfmAsignatura.numAlumnos();
		assert.equal(1, numAlumnos, "Debe haber un alumno registrado.");

		// obtener alumno creado
		let indexAlum = await tfmAsignatura.mapAlumnos(addrEthAlum);
		let alumno = await tfmAsignatura.listaAlumnos(indexAlum);

		// comprobar campos
		assert.equal(addrEthAlum, alumno, "La direccion del alumno debe coincidir.")
	});

	// crear evaluacion
	it("Se crea correctamente una evaluacion", async () => {
		let nombre = "Prueba";
		let index = 0;
		let fecha = 86146456;
		let obligatoria = true;
		let notaMinima = 40;
		let porcAportacion = 25;
		let tipoConvocatoria = 0; // 0=OrdinariaContinua, 1=OrdinariaFinal, 2=Extraordinaria

		// comprobar que hay 0 evaluaciones
		let numEvaluaciones = await tfmAsignatura.numEvaluaciones();
		assert.equal(0, numEvaluaciones, "Todavia no debe haber ninguna evaluacion creada.");

		// crear evaluacion
		let tx = await tfmAsignatura.crearEvaluacion(nombre, fecha, obligatoria, notaMinima, porcAportacion, tipoConvocatoria);
		//console.log(tx);

		// comprobar que hay 1 evaluacion
		numEvaluaciones = await tfmAsignatura.numEvaluaciones();
		assert.equal(1, numEvaluaciones, "Debe haber una evaluacion creada.");

		// obtener evaluacion creada
		let evaluacion = await tfmAsignatura.listaEvaluaciones(0);
		//console.log(evaluacion);

		// comprobar campos
		assert.equal(index, evaluacion.indexEvaluacion, "El indice de la evaluacion debe coincidir.");
		assert.equal(nombre, evaluacion.nombre, "El nombre de la evaluacion debe coincidir.");
		assert.equal(fecha, evaluacion.fecha, "La fecha de la evaluacion debe coincidir.");
		assert.equal(obligatoria, evaluacion.obligatoria, "La obligatoriedad de la evaluacion debe coincidir.");
		assert.equal(notaMinima, evaluacion.notaMinima, "La nota minima de la evaluacion debe coincidir.");
		assert.equal(porcAportacion, evaluacion.porcAportacion, "El porcentaje de aportacion de la evaluacion debe coincidir.");
		assert.equal(tipoConvocatoria, evaluacion.tipoConvocatoria, "El tipo de convocatoria de la evaluacion debe coincidir.");
	});

	// leer evaluacion
	it("Se lee correctamente una evaluacion", async() => {
		let nombre = "Prueba";
		let index = 0;
		let fecha = 86146456;
		let obligatoria = true;
		let notaMinima = 40;
		let porcAportacion = 25;
		let tipoConvocatoria = 0; // 0=OrdinariaContinua, 1=OrdinariaFinal, 2=Extraordinaria

		// comprobar que hay 1 evaluacion
		let numEvaluaciones = await tfmAsignatura.numEvaluaciones();
		assert.equal(1, numEvaluaciones, "Debe haber una evaluacion creada.");

		// obtener evaluacion creada
		let evaluacion = await tfmAsignatura.leerEvaluacion(0);
		//console.log(evaluacion);

		// comprobar campos
		//assert.equal(index, evaluacion.indexEvaluacion, "El indice de la evaluacion debe coincidir.");
		assert.equal(nombre, evaluacion._nombre, "El nombre de la evaluacion debe coincidir.");
		assert.equal(fecha, evaluacion._fecha, "La fecha de la evaluacion debe coincidir.");
		assert.equal(obligatoria, evaluacion._obligatoria, "La obligatoriedad de la evaluacion debe coincidir.");
		assert.equal(notaMinima, evaluacion._notaMinima, "La nota minima de la evaluacion debe coincidir.");
		assert.equal(porcAportacion, evaluacion._porcAportacion, "El porcentaje de aportacion de la evaluacion debe coincidir.");
		assert.equal(tipoConvocatoria, evaluacion._tipoConvocatoria, "El tipo de convocatoria de la evaluacion debe coincidir.");
	});

	// actualizar evaluacion
	it("Se actualiza correctamente una evaluacion", async () => {
		// datos
		let newNombre = "NewPrueba";
		let index = 0;
		let newFecha = 77146456;
		let newObligatoria = false;
		let newNotaMinima = 30;
		let newPorcAportacion = 50;
		let newTipoConvocatoria = 1; // 0=OrdinariaContinua, 1=OrdinariaFinal, 2=Extraordinaria

		// comprobar que hay 1 evaluacion
		let numEvaluaciones = await tfmAsignatura.numEvaluaciones();
		assert.equal(1, numEvaluaciones, "Debe haber una evaluacion creada.");

		// actualizar evaluacion
		await tfmAsignatura.actualizarEvaluacion(index, newNombre, newFecha, newObligatoria, newNotaMinima, newPorcAportacion, newTipoConvocatoria);

		// obtener evaluacion actualizada
		let evaluacion = await tfmAsignatura.listaEvaluaciones(0);
		//console.log(evaluacion);

		// comprobar campos
		assert.equal(index, evaluacion.indexEvaluacion, "El indice de la evaluacion debe coincidir.");
		assert.equal(newNombre, evaluacion.nombre, "El nombre de la evaluacion debe coincidir.");
		assert.equal(newFecha, evaluacion.fecha, "La fecha de la evaluacion debe coincidir.");
		assert.equal(newObligatoria, evaluacion.obligatoria, "La obligatoriedad de la evaluacion debe coincidir.");
		assert.equal(newNotaMinima, evaluacion.notaMinima, "La nota minima de la evaluacion debe coincidir.");
		assert.equal(newPorcAportacion, evaluacion.porcAportacion, "El porcentaje de aportacion de la evaluacion debe coincidir.");
		assert.equal(newTipoConvocatoria, evaluacion.tipoConvocatoria, "El tipo de convocatoria de la evaluacion debe coincidir.");
	});

	// crear nota
	it("Se crea correctamente una nota", async() => {
		// datos
		let addrEthAlum = accounts[1];
		let tipoConvocatoria = 1;	// 0=OrdinariaContinua, 1=OrdinariaFinal, 2=Extraordinaria
		let indexEval = 0;
		let tipoNota = 1;			// 0=NoPresentado, 1=Normal, 2=MatriculaHonor
		let calificacion = 80;

		// comprobar que hay 0 notas
		let numNotas = await tfmAsignatura.numNotas();
		assert.equal(0, numNotas, "No debe haber ninguna nota creada.");

		// crear nota
		let tx = await tfmAsignatura.crearNota(addrEthAlum, tipoConvocatoria, indexEval, tipoNota, calificacion);
		//console.log(tx);

		// comprobar que hay 1 nota
		numNotas = await tfmAsignatura.numNotas();
		assert.equal(1, numNotas, "Debe haber una nota creada.");

		// obtener nota creada
		let nota = await tfmAsignatura.calificaciones(addrEthAlum, tipoConvocatoria, indexEval);

		// comprobar campos
		assert.equal(tipoNota, nota.tipoNota, "El tipo de nota debe coincidir.");
		assert.equal(calificacion, nota.calificacion, "La calificacion debe coincidir.");
		assert.equal(true, nota.existsNota, "La nota debe existir.");
	});

	// leer nota
	it("Se lee correctamente una nota", async () => {
		// datos
		let addrEthAlum = accounts[1];
		let tipoConvocatoria = 1;	// 0=OrdinariaContinua, 1=OrdinariaFinal, 2=Extraordinaria
		let indexEval = 0;
		let tipoNota = 1;			// 0=NoPresentado, 1=Normal, 2=MatriculaHonor
		let calificacion = 80;

		// comprobar que hay 1 nota
		let numNotas = await tfmAsignatura.numNotas();
		assert.equal(1, numNotas, "Debe haber una nota creada.");

		// leer nota
		let nota = await tfmAsignatura.leerNota(addrEthAlum, tipoConvocatoria, indexEval);
		//console.log(nota);

		// comprobar campos
		assert.equal(tipoNota, nota._tipoNota, "El tipo de nota debe coincidir.");
		assert.equal(calificacion, nota._calificacion, "La calificacion debe coincidir.");
	});

	// leer mi nota
	// DA ERROR EN let nota = await...
	/*
	it("Se lee correctamente mi nota", async () => {
		// datos
		let addrEthAlum = accounts[1];
		console.log(addrEthAlum);
		let tipoConvocatoria = 1;	// 0=OrdinariaContinua, 1=OrdinariaFinal, 2=Extraordinaria
		let indexEval = 0;
		let tipoNota = 1;			// 0=NoPresentado, 1=Normal, 2=MatriculaHonor
		let calificacion = 80;

		// comprobar que hay 1 nota
		let numNotas = await tfmAsignatura.numNotas();
		assert.equal(1, numNotas, "Debe haber una nota creada.");

		// leer nota
		let nota = await tfmAsignatura.leerNota(tipoConvocatoria, indexEval, {from: accounts[0]});

		// comprobar campos
		assert.equal(tipoNota, nota._tipoNota, "El tipo de nota debe coincidir.");
		assert.equal(calificacion, nota._calificacion, "La calificacion debe coincidir.");
	});
	*/

	// actualizar nota
	it("Se actualiza correctamente una nota", async () => {
		// datos
		let addrEthAlum = accounts[1];
		let tipoConvocatoria = 1;	// 0=OrdinariaContinua, 1=OrdinariaFinal, 2=Extraordinaria
		let indexEval = 0;
		let newTipoNota = 1;			// 0=NoPresentado, 1=Normal, 2=MatriculaHonor
		let newCalificacion = 70;

		// comprobar que hay 1 nota
		let numNotas = await tfmAsignatura.numNotas();
		assert.equal(1, numNotas, "Debe haber una nota creada.");

		// actualizar nota
		await tfmAsignatura.actualizarNota(addrEthAlum, tipoConvocatoria, indexEval, newTipoNota, newCalificacion);

		// obtener nota actualizada
		let nota = await tfmAsignatura.calificaciones(addrEthAlum, tipoConvocatoria, indexEval);
		//console.log(nota);

		// comprobar campos
		assert.equal(newTipoNota, nota.tipoNota, "El tipo de nota debe coincidir.");
		assert.equal(newCalificacion, nota.calificacion, "La calificacion debe coincidir.");
		assert.equal(true, nota.existsNota, "La nota debe existir.");
	});

	// borrar nota
	it("Se elimina correctamente una nota", async () => {
		let addrEthAlum = accounts[1];
		let tipoConvocatoria = 1;	// 0=OrdinariaContinua, 1=OrdinariaFinal, 2=Extraordinaria
		let indexEval = 0;

		// comprobar que hay 1 nota
		let numNotas = await tfmAsignatura.numNotas();
		assert.equal(1, numNotas, "Debe haber una nota creada.");

		// eliminar nota
		let tx = await tfmAsignatura.borrarNota(addrEthAlum, tipoConvocatoria, indexEval);
		//console.log(tx);

		// comprobar que hay 0 alumnos
		numNotas = await tfmAsignatura.numNotas();
		assert.equal(0, numNotas, "No debe haber ninguna nota registrada.");
	});

	// eliminar alumno
	it("Se elimina correctamente un alumno", async () => {
		let addrEthAlum = accounts[1];

		// comprobar que hay 1 alumno
		let numAlumnos = await tfmAsignatura.numAlumnos();
		assert.equal(1, numAlumnos, "Todavia debe haber un alumno registrado.");

		// eliminar alumno
		let tx = await tfmAsignatura.eliminarAlumno(addrEthAlum);
		//console.log(tx);

		// comprobar que hay 0 alumnos
		numAlumnos = await tfmAsignatura.numAlumnos();
		assert.equal(0, numAlumnos, "No debe haber ningun alumno registrado.");
	});
});