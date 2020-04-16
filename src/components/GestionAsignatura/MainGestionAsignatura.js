import React from 'react';

import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";

import {newContextComponents} from "drizzle-react-components";

import AsignaturaDatos from './Datos/AsignaturaDatos';
import AsignaturaAlumnos from './Alumnos/AsignaturaAlumnos';
import AsignaturaProfesores from './Profesores/AsignaturaProfesores';
import AsignaturaEvaluaciones from './Evaluaciones/AsignaturaEvaluaciones';
import AsignaturaNotas from './Notas/AsignaturaNotas';
import AsignaturaMisNotas from './Notas/AsignaturaMisNotas';

import {jsonInterface} from '../../utils/varios.js';

require('dotenv').config();

const NavBar = (props) => (
    <nav>
		<Link to={`/gestion-asignatura/${props.addrEthAsig}/datos-asignatura`}>Datos de la asignatura</Link>&nbsp;&nbsp;&nbsp;
		<Link to={`/gestion-asignatura/${props.addrEthAsig}/alumnos`}>Alumnos</Link>&nbsp;&nbsp;&nbsp;
		<Link to={`/gestion-asignatura/${props.addrEthAsig}/profesores`}>Profesores</Link>&nbsp;&nbsp;&nbsp;
		<Link to={`/gestion-asignatura/${props.addrEthAsig}/evaluaciones`}>Evaluaciones</Link>&nbsp;&nbsp;&nbsp;
		<Link to={`/gestion-asignatura/${props.addrEthAsig}/notas`}>Notas</Link>&nbsp;&nbsp;&nbsp;
		{props.isAlumno
			?
		<Link to={`/gestion-asignatura/${props.addrEthAsig}/mis-notas`}>Mis notas</Link>
			: 
		<Link to={`/gestion-asignatura/${props.addrEthAsig}/mis-notas`}>Mis notas (no es alumno)</Link>
		}
	</nav>
);

class MainGestionAsignatura extends React.Component {

	state = {
		ready: false,
		contractName: "UpmAsignatura-" + this.props.addrEthAsig,
		miDireccionKey: null,
		ownerKey: null,
		coordinadorKey: null,
		alumnosLengthKey: null,
		numAlumnosKey: null,
		profesoresLengthKey: null,
		numProfesoresKey: null,
		evaluacionesLengthKey: null,
		numEvaluacionesKey: null,
		numNotasKey: null,
		isOwnerKey: null,
		isCoordinadorKey: null,
		isProfesorKey: null,
		isAlumnoKey: null,
	};

	anadirContratoDinamicamente() {
		const contractConfig = {
			contractName: this.state.contractName,
			web3Contract: new this.props.drizzle.web3.eth.Contract(
				jsonInterface,				// abi
				this.props.addrEthAsig		// address del contrato UpmAsignatura desplegado
			)
		};
		const events = [];
		if (!this.props.drizzle.contracts[this.state.contractName]) {
			this.props.drizzle.addContract(contractConfig, events);
		}
	}

	eliminarContratoDinamicamente() {
		const contractName = "UpmAsignatura-" + this.props.addrEthAsig;
		this.props.drizzle.deleteContract(this.state.contractName);
	}

	componentDidMount() {
		this.setState({ready: true});

		// añadir dinámicamente contrato a vigilar
		this.anadirContratoDinamicamente();

		console.log('MainGestionAsignatura - componentDidMount - contratos vigilados:', Object.keys(this.props.drizzle.contracts));
	}

	componentDidUpdate() {
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts[this.state.contractName];
		if (!instanceState || !instanceState.initialized) return;

		const instance = drizzle.contracts[this.state.contractName];

		let changed = false;

		let {
			miDireccionKey, ownerKey, coordinadorKey, alumnosLengthKey, numAlumnosKey, profesoresLengthKey, numProfesoresKey,
			evaluacionesLengthKey, numEvaluacionesKey, numNotasKey, isOwnerKey, isCoordinadorKey, isProfesorKey, isAlumnoKey
		} = JSON.parse(JSON.stringify(this.state));

		if (!miDireccionKey) {
			miDireccionKey = instance.methods.miDireccion.cacheCall();
			changed = true;
		}

		if (!ownerKey) {
			ownerKey = instance.methods.owner.cacheCall();
			changed = true;
		}

		if (!coordinadorKey) {
			coordinadorKey = instance.methods.coordinador.cacheCall();
			changed = true;
		}

		if (!alumnosLengthKey) {
			alumnosLengthKey = instance.methods.alumnosLength.cacheCall();
			changed = true;
		}

		if (!numAlumnosKey) {
			numAlumnosKey = instance.methods.numAlumnos.cacheCall();
			changed = true;
		}

		if (!profesoresLengthKey) {
			profesoresLengthKey = instance.methods.profesoresLength.cacheCall();
			changed = true;
		}

		if (!numProfesoresKey) {
			numProfesoresKey = instance.methods.numProfesores.cacheCall();
			changed = true;
		}

		if (!evaluacionesLengthKey) {
			evaluacionesLengthKey = instance.methods.evaluacionesLength.cacheCall();
			changed = true;
		}

		if (!numEvaluacionesKey) {
			numEvaluacionesKey = instance.methods.numEvaluaciones.cacheCall();
			changed = true;
		}

		if (!numNotasKey) {
			numNotasKey = instance.methods.numNotas.cacheCall();
			changed = true;
		}

		if (!isOwnerKey) {
			isOwnerKey = instance.methods.isOwner.cacheCall();
			changed = true;
		}

		if (!isCoordinadorKey) {
			isCoordinadorKey = instance.methods.isCoordinador.cacheCall();
			changed = true;
		}

		if (!isProfesorKey) {
		isProfesorKey = instance.methods.isProfesor.cacheCall();
			changed = true;
		}

		if (!isAlumnoKey) {
			isAlumnoKey = instance.methods.isAlumno.cacheCall();
			changed = true;
		}

		if (changed) {
			this.setState({
				miDireccionKey,
				ownerKey,
				coordinadorKey,
				alumnosLengthKey,
				numAlumnosKey,
				profesoresLengthKey,
				numProfesoresKey,
				evaluacionesLengthKey,
				numEvaluacionesKey,
				numNotasKey,
				isOwnerKey,
				isCoordinadorKey,
				isProfesorKey,
				isAlumnoKey
			});
		}
		
	}

	componentWillUnmount() {
		this.eliminarContratoDinamicamente();

		console.log('MainGestionAsignatura - componentWillUnmount - contratos vigilados:', Object.keys(this.props.drizzle.contracts));
	}

	render() {
		const {drizzle, drizzleState, addrEthAsig} = this.props;

		console.log('MainGestionAsignatura - render - contratos vigilados:', Object.keys(this.props.drizzle.contracts));

		const instanceState = drizzleState.contracts[this.state.contractName];
		if (!this.state.ready || !instanceState || !instanceState.initialized) {
			return <span>Initializing...</span>;
		}

		let miDireccion = instanceState.miDireccion[this.state.miDireccionKey];
		miDireccion = miDireccion ? miDireccion.value :"0x0";
		console.log('MainGestionAsignatura - render - miDireccion:', miDireccion);

		let owner = instanceState.owner[this.state.ownerKey];
		owner = owner ? owner.value : "0x0";
		console.log('MainGestionAsignatura - render - owner:', owner);

		let coordinador = instanceState.coordinador[this.state.coordinadorKey];
		coordinador = coordinador ? coordinador.value : "0x0";
		console.log('MainGestionAsignatura - render - coordinador:', coordinador);

		let alumnosLength = instanceState.alumnosLength[this.state.alumnosLengthKey];
		alumnosLength = alumnosLength ? alumnosLength.value : "0";
		//console.log('MainGestionAsignatura - render - alumnosLength:', alumnosLength);

		let numAlumnos = instanceState.numAlumnos[this.state.numAlumnosKey];
		numAlumnos = numAlumnos ? numAlumnos.value : "0";
		//console.log('MainGestionAsignatura - render - numAlumnos:', numAlumnos);

		let profesoresLength = instanceState.profesoresLength[this.state.profesoresLengthKey];
		profesoresLength = profesoresLength ? profesoresLength.value : "0";
		//console.log('MainGestionAsignatura - render - profesoresLength:', profesoresLength);

		let numProfesores = instanceState.numProfesores[this.state.numProfesoresKey];
		numProfesores = numProfesores ? numProfesores.value : "0";
		//console.log('MainGestionAsignatura - render - numProfesores:', numProfesores);

		let evaluacionesLength = instanceState.evaluacionesLength[this.state.evaluacionesLengthKey];
		evaluacionesLength = evaluacionesLength ? evaluacionesLength.value : "0";
		//console.log('MainGestionAsignatura - render - evaluacionesLength:', evaluacionesLength);

		let numEvaluaciones = instanceState.numEvaluaciones[this.state.numEvaluacionesKey];
		numEvaluaciones = numEvaluaciones ? numEvaluaciones.value : "0";
		//console.log('MainGestionAsignatura - render - numEvaluaciones:', numEvaluaciones);

		let numNotas = instanceState.numNotas[this.state.numNotasKey];
		numNotas = numNotas ? numNotas.value : "0";
		//console.log('MainGestionAsignatura - render - numNotas:', numNotas);

		let isOwner = instanceState.isOwner[this.state.isOwnerKey];
		isOwner = isOwner ? isOwner.value : "0";
		//console.log('MainGestionAsignatura - render - isOwner:', isOwner);

		let isCoordinador = instanceState.isCoordinador[this.state.isCoordinadorKey];
		isCoordinador = isCoordinador ? isCoordinador.value : "0";
		//console.log('MainGestionAsignatura - render - isCoordinador:', isCoordinador);

		let isProfesor = instanceState.isProfesor[this.state.isProfesorKey];
		isProfesor = isProfesor ? isProfesor.value : "0";
		//console.log('MainGestionAsignatura - render - isProfesor:', isProfesor);

		let isAlumno = instanceState.isAlumno[this.state.isAlumnoKey];
		isAlumno = isAlumno ? isAlumno.value : "0";
		//console.log('MainGestionAsignatura - render - isAlumno:', isAlumno);

		//console.log('MainGestionAsignatura - render - contratos vigilados:', Object.keys(drizzle.contracts));

		return (
			<Router>
				<h2>Gestión de la asignatura {addrEthAsig}</h2>
				<p>Mi dirección: {miDireccion} {miDireccion === owner ? "(owner)" : "(no owner)"}</p>
				
				<NavBar addrEthAsig={addrEthAsig} isAlumno={isAlumno} />

				<Route path="/gestion-asignatura/:addrEthAsig/datos-asignatura">
					<AsignaturaDatos	drizzle={drizzle}
										drizzleState={drizzleState}
										contractName={this.state.contractName}
										miDireccion={miDireccion}
										owner={owner}
										coordinador={coordinador}
										alumnosLength={alumnosLength}
										numAlumnos={numAlumnos}
										profesoresLength={profesoresLength}
										numProfesores={numProfesores}
										evaluacionesLength={evaluacionesLength}
										numEvaluaciones={numEvaluaciones}
										numNotas={numNotas}
										isOwner={isOwner}
										isCoordinador={isCoordinador}
										isProfesor={isProfesor}
										isAlumno={isAlumno} />
                </Route>

                <Route path="/gestion-asignatura/:addrEthAsig/alumnos">
					<AsignaturaAlumnos	drizzle={drizzle}
										drizzleState={drizzleState}
										contractName={this.state.contractName}
										miDireccion={miDireccion}
										owner={owner}
										coordinador={coordinador}
										alumnosLength={alumnosLength}
										numAlumnos={numAlumnos}
										profesoresLength={profesoresLength}
										numProfesores={numProfesores}
										evaluacionesLength={evaluacionesLength}
										numEvaluaciones={numEvaluaciones}
										numNotas={numNotas}
										isOwner={isOwner}
										isCoordinador={isCoordinador}
										isProfesor={isProfesor}
										isAlumno={isAlumno} />
                </Route>

                <Route path="/gestion-asignatura/:addrEthAsig/profesores">
					<AsignaturaProfesores	drizzle={drizzle}
											drizzleState={drizzleState}
											contractName={this.state.contractName}
											miDireccion={miDireccion}
											owner={owner}
											coordinador={coordinador}
											alumnosLength={alumnosLength}
											numAlumnos={numAlumnos}
											profesoresLength={profesoresLength}
											numProfesores={numProfesores}
											evaluacionesLength={evaluacionesLength}
											numEvaluaciones={numEvaluaciones}
											numNotas={numNotas}
											isOwner={isOwner}
											isCoordinador={isCoordinador}
											isProfesor={isProfesor}
											isAlumno={isAlumno} />
                </Route>

                <Route path="/gestion-asignatura/:addrEthAsig/evaluaciones">
					<AsignaturaEvaluaciones	drizzle={drizzle}
											drizzleState={drizzleState}
											contractName={this.state.contractName}
											miDireccion={miDireccion}
											owner={owner}
											coordinador={coordinador}
											alumnosLength={alumnosLength}
											numAlumnos={numAlumnos}
											profesoresLength={profesoresLength}
											numProfesores={numProfesores}
											evaluacionesLength={evaluacionesLength}
											numEvaluaciones={numEvaluaciones}
											numNotas={numNotas}
											isOwner={isOwner}
											isCoordinador={isCoordinador}
											isProfesor={isProfesor}
											isAlumno={isAlumno} />
                </Route>

                <Route path="/gestion-asignatura/:addrEthAsig/notas">
					<AsignaturaNotas	drizzle={drizzle}
										drizzleState={drizzleState}
										contractName={this.state.contractName}
										miDireccion={miDireccion}
										owner={owner}
										coordinador={coordinador}
										alumnosLength={alumnosLength}
										numAlumnos={numAlumnos}
										profesoresLength={profesoresLength}
										numProfesores={numProfesores}
										evaluacionesLength={evaluacionesLength}
										numEvaluaciones={numEvaluaciones}
										numNotas={numNotas}
										isOwner={isOwner}
										isCoordinador={isCoordinador}
										isProfesor={isProfesor}
										isAlumno={isAlumno} />
                </Route>

                <Route path="/gestion-asignatura/:addrEthAsig/mis-notas">
					<AsignaturaMisNotas	drizzle={drizzle}
										drizzleState={drizzleState}
										contractName={this.state.contractName}
										miDireccion={miDireccion}
										owner={owner}
										coordinador={coordinador}
										alumnosLength={alumnosLength}
										numAlumnos={numAlumnos}
										profesoresLength={profesoresLength}
										numProfesores={numProfesores}
										evaluacionesLength={evaluacionesLength}
										numEvaluaciones={numEvaluaciones}
										numNotas={numNotas}
										isOwner={isOwner}
										isCoordinador={isCoordinador}
										isProfesor={isProfesor}
										isAlumno={isAlumno} />
                </Route>

			</Router>
		);
	}
}

export default MainGestionAsignatura;