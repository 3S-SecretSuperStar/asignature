import React from 'react';

import { Route } from "react-router-dom";

import AsignaturaDatos from './Datos/AsignaturaDatos';
import AsignaturaAlumnos from './Alumnos/AsignaturaAlumnos';
import AsignaturaProfesores from './Profesores/AsignaturaProfesores';
import AsignaturaEvaluaciones from './Evaluaciones/AsignaturaEvaluaciones';
import AsignaturaNotas from './Notas/AsignaturaNotas';
import AsignaturaMisNotas from './Notas/AsignaturaMisNotas';

import {jsonInterface} from '../../utils/varios.js';
import {copyToClipboard} from '../../utils/funciones.js';

const MiDireccionAsignatura = (props) => (
	<p>
		Mi dirección: <span className="code">{props.miDireccion}</span>
		<button type="button" className="btn btn-outline-primary btn-copy" onClick={() => copyToClipboard(props.miDireccion)}>
			<i className="far fa-copy fa-lg"></i>
		</button>
		{
			props.isOwner
			?
			<span className="badge badge-primary">owner</span>
			:
			""
		}
		{
			props.isCoordinador
			?
			<span className="badge badge-secondary">coordinador</span>
			:
			""
		}
		{
			props.isProfesor
			?
			<span className="badge badge-success">profesor</span>
			:
			""
		}
		{
			props.isAlumno
			?
			<span className="badge badge-info">alumno</span>
			:
			""
		}
	</p>
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
		const {drizzle} = this.props;
		const contractConfig = {
			contractName: this.state.contractName,
			web3Contract: new drizzle.web3.eth.Contract(
				jsonInterface,				// abi
				this.props.addrEthAsig		// address del contrato UpmAsignatura desplegado
			)
		};
		const events = [];
		if (!drizzle.contracts[this.state.contractName]) {
			drizzle.addContract(contractConfig, events);
		}
	}

	eliminarContratoDinamicamente() {
		this.props.drizzle.deleteContract(this.state.contractName);
	}

	componentDidMount() {
		this.setState({ready: true});

		this.anadirContratoDinamicamente();
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
			miDireccionKey = instance.methods.miDireccion.cacheCall({from: this.props.miDireccion});
			changed = true;
		}

		if (!ownerKey) {
			ownerKey = instance.methods.owner.cacheCall({from: this.props.miDireccion});
			changed = true;
		}

		if (!coordinadorKey) {
			coordinadorKey = instance.methods.coordinador.cacheCall({from: this.props.miDireccion});
			changed = true;
		}

		if (!alumnosLengthKey) {
			alumnosLengthKey = instance.methods.alumnosLength.cacheCall({from: this.props.miDireccion});
			changed = true;
		}

		if (!numAlumnosKey) {
			numAlumnosKey = instance.methods.numAlumnos.cacheCall({from: this.props.miDireccion});
			changed = true;
		}

		if (!profesoresLengthKey) {
			profesoresLengthKey = instance.methods.profesoresLength.cacheCall({from: this.props.miDireccion});
			changed = true;
		}

		if (!numProfesoresKey) {
			numProfesoresKey = instance.methods.numProfesores.cacheCall({from: this.props.miDireccion});
			changed = true;
		}

		if (!evaluacionesLengthKey) {
			evaluacionesLengthKey = instance.methods.evaluacionesLength.cacheCall({from: this.props.miDireccion});
			changed = true;
		}

		if (!numEvaluacionesKey) {
			numEvaluacionesKey = instance.methods.numEvaluaciones.cacheCall({from: this.props.miDireccion});
			changed = true;
		}

		if (!numNotasKey) {
			numNotasKey = instance.methods.numNotas.cacheCall({from: this.props.miDireccion});
			changed = true;
		}

		if (!isOwnerKey) {
			isOwnerKey = instance.methods.isOwner.cacheCall({from: this.props.miDireccion});
			changed = true;
		}

		if (!isCoordinadorKey) {
			isCoordinadorKey = instance.methods.isCoordinador.cacheCall({from: this.props.miDireccion});
			changed = true;
		}

		if (!isProfesorKey) {
		isProfesorKey = instance.methods.isProfesor.cacheCall({from: this.props.miDireccion});
			changed = true;
		}

		if (!isAlumnoKey) {
			isAlumnoKey = instance.methods.isAlumno.cacheCall({from: this.props.miDireccion});
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
	}

	render() {
		const {drizzle, drizzleState, addrEthAsig} = this.props;

		const instanceState = drizzleState.contracts[this.state.contractName];
		if (!this.state.ready || !instanceState || !instanceState.initialized) {
			return <span>Initializing...</span>;
		}

		let miDireccion = instanceState.miDireccion[this.state.miDireccionKey];
		miDireccion = miDireccion ? miDireccion.value : "0x0000000000000000000000000000000000000000";

		let owner = instanceState.owner[this.state.ownerKey];
		owner = owner ? owner.value : "0x0000000000000000000000000000000000000000";

		let coordinador = instanceState.coordinador[this.state.coordinadorKey];
		coordinador = coordinador ? coordinador.value : "0x0000000000000000000000000000000000000000";

		let alumnosLength = instanceState.alumnosLength[this.state.alumnosLengthKey];
		alumnosLength = alumnosLength ? alumnosLength.value : "0";

		let numAlumnos = instanceState.numAlumnos[this.state.numAlumnosKey];
		numAlumnos = numAlumnos ? numAlumnos.value : "0";

		let profesoresLength = instanceState.profesoresLength[this.state.profesoresLengthKey];
		profesoresLength = profesoresLength ? profesoresLength.value : "0";

		let numProfesores = instanceState.numProfesores[this.state.numProfesoresKey];
		numProfesores = numProfesores ? numProfesores.value : "0";

		let evaluacionesLength = instanceState.evaluacionesLength[this.state.evaluacionesLengthKey];
		evaluacionesLength = evaluacionesLength ? evaluacionesLength.value : "0";

		let numEvaluaciones = instanceState.numEvaluaciones[this.state.numEvaluacionesKey];
		numEvaluaciones = numEvaluaciones ? numEvaluaciones.value : "0";

		let numNotas = instanceState.numNotas[this.state.numNotasKey];
		numNotas = numNotas ? numNotas.value : "0";

		let isOwner = miDireccion === owner;

		let isCoordinador = miDireccion === coordinador;

		let isProfesor = instanceState.isProfesor[this.state.isProfesorKey];
		isProfesor = isProfesor ? isProfesor.value : "0";

		let isAlumno = instanceState.isAlumno[this.state.isAlumnoKey];
		isAlumno = isAlumno ? isAlumno.value : "0";

		return (
			<>
				<h2>Gestión de la asignatura</h2>

				<MiDireccionAsignatura	miDireccion={miDireccion}
										isOwner={isOwner}
										isCoordinador={isCoordinador}
										isProfesor={isProfesor}
										isAlumno={isAlumno} />

				<Route path="/gestion-asignatura/:addrEthAsig/datos-asignatura">
					<AsignaturaDatos	drizzle={drizzle}
										drizzleState={drizzleState}
										addrEthAsig={addrEthAsig}
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
										addrEthAsig={addrEthAsig}
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
											addrEthAsig={addrEthAsig}
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
											addrEthAsig={addrEthAsig}
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
										addrEthAsig={addrEthAsig}
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
										addrEthAsig={addrEthAsig}
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

			</>
		);
	}
}

export default MainGestionAsignatura;