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

	it("Los valores iniciales son los correctos.", async () => {
		let nombreAsignatura = "Prueba 1";
		let cursoAcademico = "2019-2020";
		let codigoAsignatura = "COVID-19";
		let numCreditos = 3;
		let semestre = 1;
		let cursoAno = 3;
		let tipoAsignatura = 0;

		let coordinadorAct = await upmAsignatura.coordinador();
		let nombreAsignaturaAct = await upmAsignatura.nombreAsignatura();
		let cursoAcademicoAct = await upmAsignatura.cursoAcademico();
		let codigoAsignaturaAct = await upmAsignatura.codigoAsignatura();
		let numCreditosAct = await upmAsignatura.numCreditos();
		let semestreAct = await upmAsignatura.semestre();
		let cursoAnoAct = await upmAsignatura.cursoAno();
		let tipoAsignaturaAct = await upmAsignatura.tipoAsignatura();

		assert.equal(coordinador, coordinadorAct, "El coordinador no coincide.");
		assert.equal(nombreAsignatura, nombreAsignaturaAct, "El nombre de la asignatura no coincide.");
		assert.equal(cursoAcademico, cursoAcademicoAct, "El curso academico no coincide.");
		assert.equal(codigoAsignatura, codigoAsignaturaAct, "El codigo de la asignatura no coincide.");
		assert.equal(numCreditos, numCreditosAct, "El numero de creditos no coincide.");
		assert.equal(semestre, semestreAct, "El semestre no coincide.");
		assert.equal(cursoAno, cursoAnoAct, "El curso no coincide.");
		assert.equal(tipoAsignatura, tipoAsignaturaAct, "El tipo de asignatura no coincide.");

		let numAlumnos = await upmAsignatura.numAlumnos();
		let numProfesores = await upmAsignatura.numProfesores();
		let numEvaluaciones = await upmAsignatura.numEvaluaciones();

		assert.equal(0, numAlumnos, "No debe haber ningún alumno registrado.");
		assert.equal(0, numProfesores, "No debe haber ningún profesor registrado.");
		assert.equal(0, numEvaluaciones, "No debe haber ningúna evaluacion creada.");
	});

	it("El owner crea correctamente un profesor", async() => {
		// comprobar que hay 0 profesores
		let numProfesores = await upmAsignatura.numProfesores();
		assert.equal(0, numProfesores, "Todavía no debe haber ningún profesor registrado.");

		// crear profesor
		let tx = await upmAsignatura.anadirProfesor(addrEthProf, {from: desplegador});
		//console.log(tx);

		// comprobar que hay 1 profesor
		numProfesores = await upmAsignatura.numProfesores();
		assert.equal(1, numProfesores, "Debe haber un profesor registrado.");

		// obtener profesor creado
		let indexProf = await upmAsignatura.mapProfesores(addrEthProf);
		let profesor = await upmAsignatura.listaProfesores(indexProf);

		// comprobar campos
		assert.equal(addrEthProf, profesor, "La dirección del profesor debe coincidir.")
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
		assert.equal(addrEthProf2, profesor, "La dirección del profesor debe coincidir.")
	});

	// añadir alumno
	it("Se crea correctamente un alumno", async() => {
		// comprobar que hay 0 alumnos
		let numAlumnos = await upmAsignatura.numAlumnos();
		assert.equal(0, numAlumnos, "Todavía no debe haber ningún alumno registrado.");

		// crear alumno
		let tx = await upmAsignatura.anadirAlumno(addrEthAlum);
		//console.log(tx);

		// comprobar que hay 1 alumno
		numAlumnos = await upmAsignatura.numAlumnos();
		assert.equal(1, numAlumnos, "Debe haber un alumno registrado.");

		// obtener alumno creado
		let indexAlum = await upmAsignatura.mapAlumnos(addrEthAlum);
		let alumno = await upmAsignatura.listaAlumnos(indexAlum);

		// comprobar campos
		assert.equal(addrEthAlum, alumno, "La dirección del alumno debe coincidir.")
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
		let numEvaluaciones = await upmAsignatura.numEvaluaciones();
		assert.equal(0, numEvaluaciones, "Todavía no debe haber ningúna evaluacion creada.");

		// crear evaluacion
		let tx = await upmAsignatura.crearEvaluacion(nombre, fecha, obligatoria, notaMinima, porcAportacion, tipoConvocatoria);
		//console.log(tx);

		// comprobar que hay 1 evaluacion
		numEvaluaciones = await upmAsignatura.numEvaluaciones();
		assert.equal(1, numEvaluaciones, "Debe haber una evaluacion creada.");

		// obtener evaluacion creada
		let evaluacion = await upmAsignatura.listaEvaluaciones(0);
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
		let numEvaluaciones = await upmAsignatura.numEvaluaciones();
		assert.equal(1, numEvaluaciones, "Debe haber una evaluacion creada.");

		// obtener evaluacion creada
		let evaluacion = await upmAsignatura.leerEvaluacion(0);
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
		let numEvaluaciones = await upmAsignatura.numEvaluaciones();
		assert.equal(1, numEvaluaciones, "Debe haber una evaluacion creada.");

		// actualizar evaluacion
		await upmAsignatura.actualizarEvaluacion(index, newNombre, newFecha, newObligatoria, newNotaMinima, newPorcAportacion, newTipoConvocatoria);

		// obtener evaluacion actualizada
		let evaluacion = await upmAsignatura.listaEvaluaciones(0);
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
		let tipoConvocatoria = 1;	// 0=OrdinariaContinua, 1=OrdinariaFinal, 2=Extraordinaria
		let indexEval = 0;
		let tipoNota = 1;			// 0=NoPresentado, 1=Normal, 2=MatriculaHonor
		let calificacion = 80;

		// comprobar que hay 0 notas
		let numNotas = await upmAsignatura.numNotas();
		assert.equal(0, numNotas, "No debe haber ningúna nota creada.");

		// crear nota
		let tx = await upmAsignatura.crearNota(addrEthAlum, tipoConvocatoria, indexEval, tipoNota, calificacion);
		//console.log(tx);

		// comprobar que hay 1 nota
		numNotas = await upmAsignatura.numNotas();
		assert.equal(1, numNotas, "Debe haber una nota creada.");

		// obtener nota creada
		let nota = await upmAsignatura.mapNotas(addrEthAlum, tipoConvocatoria, indexEval);

		// comprobar campos
		assert.equal(tipoNota, nota.tipoNota, "El tipo de nota debe coincidir.");
		assert.equal(calificacion, nota.calificacion, "La calificacion debe coincidir.");
		assert.equal(true, nota.existsNota, "La nota debe existir.");
	});

	// leer nota
	it("Se lee correctamente una nota", async () => {
		// datos
		let tipoConvocatoria = 1;	// 0=OrdinariaContinua, 1=OrdinariaFinal, 2=Extraordinaria
		let indexEval = 0;
		let tipoNota = 1;			// 0=NoPresentado, 1=Normal, 2=MatriculaHonor
		let calificacion = 80;

		// comprobar que hay 1 nota
		let numNotas = await upmAsignatura.numNotas();
		assert.equal(1, numNotas, "Debe haber una nota creada.");

		// leer nota
		let nota = await upmAsignatura.leerNota(addrEthAlum, tipoConvocatoria, indexEval);

		// comprobar campos
		assert.equal(tipoNota, nota._tipoNota, "El tipo de nota debe coincidir.");
		assert.equal(calificacion, nota._calificacion, "La calificacion debe coincidir.");
	});

	// leer mi nota
	// DA ERROR EN let nota = await...
	/*
	it("Se lee correctamente mi nota", async () => {
		// datos
		let tipoConvocatoria = 1;	// 0=OrdinariaContinua, 1=OrdinariaFinal, 2=Extraordinaria
		let indexEval = 0;
		let tipoNota = 1;			// 0=NoPresentado, 1=Normal, 2=MatriculaHonor
		let calificacion = 80;

		// comprobar que hay 1 nota
		let numNotas = await upmAsignatura.numNotas();
		assert.equal(1, numNotas, "Debe haber una nota creada.");

		// leer nota
		let nota = await upmAsignatura.leerNota(tipoConvocatoria, indexEval, {from: addrEthAlum});

		// comprobar campos
		assert.equal(tipoNota, nota._tipoNota, "El tipo de nota debe coincidir.");
		assert.equal(calificacion, nota._calificacion, "La calificacion debe coincidir.");
	});
	*/

	// actualizar nota
	it("Se actualiza correctamente una nota", async () => {
		// datos
		let tipoConvocatoria = 1;	// 0=OrdinariaContinua, 1=OrdinariaFinal, 2=Extraordinaria
		let indexEval = 0;
		let newTipoNota = 1;			// 0=NoPresentado, 1=Normal, 2=MatriculaHonor
		let newCalificacion = 70;

		// comprobar que hay 1 nota
		let numNotas = await upmAsignatura.numNotas();
		assert.equal(1, numNotas, "Debe haber una nota creada.");

		// actualizar nota
		await upmAsignatura.actualizarNota(addrEthAlum, tipoConvocatoria, indexEval, newTipoNota, newCalificacion);

		// obtener nota actualizada
		let nota = await upmAsignatura.mapNotas(addrEthAlum, tipoConvocatoria, indexEval);

		// comprobar campos
		assert.equal(newTipoNota, nota.tipoNota, "El tipo de nota debe coincidir.");
		assert.equal(newCalificacion, nota.calificacion, "La calificacion debe coincidir.");
		assert.equal(true, nota.existsNota, "La nota debe existir.");
	});

	// borrar nota
	it("Se elimina correctamente una nota", async () => {
		let tipoConvocatoria = 1;	// 0=OrdinariaContinua, 1=OrdinariaFinal, 2=Extraordinaria
		let indexEval = 0;

		// comprobar que hay 1 nota
		let numNotas = await upmAsignatura.numNotas();
		assert.equal(1, numNotas, "Debe haber una nota creada.");

		// eliminar nota
		let tx = await upmAsignatura.borrarNota(addrEthAlum, tipoConvocatoria, indexEval);
		//console.log(tx);

		// comprobar que hay 0 alumnos
		numNotas = await upmAsignatura.numNotas();
		assert.equal(0, numNotas, "No debe haber ningúna nota registrada.");
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

	// eliminar alumno
	it("Se elimina correctamente un alumno", async () => {

		// comprobar que hay 1 alumno
		let numAlumnos = await upmAsignatura.numAlumnos();
		assert.equal(1, numAlumnos, "Todavía debe haber un alumno registrado.");

		// eliminar alumno
		let tx = await upmAsignatura.eliminarAlumno(addrEthAlum);
		//console.log(tx);

		// comprobar que hay 0 alumnos
		numAlumnos = await upmAsignatura.numAlumnos();
		assert.equal(0, numAlumnos, "No debe haber ningún alumno registrado.");
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
        await upmAsignatura.actualizarOwner(newOwner);

        // comprobar que el owner se ha actualizado
        let newOwnerAct = await upmAsignatura.owner();
        assert.equal(newOwner, newOwnerAct, "El owner no se ha actualizado correctamente.");
    });

	/*it("", async () => {
		assert.equal(expected, actual, msg);
	});*/
});