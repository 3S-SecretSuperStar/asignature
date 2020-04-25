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
import {copyToClipboard} from '../../utils/funciones.js';

const {ContractData, AccountData} = newContextComponents;

const MiDireccionAsignatura = (props) => (
	<p>
		Mi dirección: {props.miDireccion}
		<button type="button" className="btn btn-outline-primary btn-copy" onClick={() => copyToClipboard(props.miDireccion)}>
			<i className="far fa-copy fa-lg"></i>
		</button>
		{
			props.isOwner
			?
			<span class="badge badge-primary">owner</span>
			:
			""
		}
		{
			props.isCoordinador
			?
			<span class="badge badge-secondary">coordinador</span>
			:
			""
		}
		{
			props.isProfesor
			?
			<span class="badge badge-success">profesor</span>
			:
			""
		}
		{
			props.isAlumno
			?
			<span class="badge badge-info">alumno</span>
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

		console.log('MainGestionAsignatura - componentWillUnmount - contratos vigilados:', Object.keys(this.props.drizzle.contracts));
	}

	render() {
		const {drizzle, drizzleState, addrEthAsig} = this.props;

		console.log('\n\n\n\n\n', this.props);

		console.log('MainGestionAsignatura - render - contratos vigilados:', Object.keys(this.props.drizzle.contracts));

		const instanceState = drizzleState.contracts[this.state.contractName];
		if (!this.state.ready || !instanceState || !instanceState.initialized) {
			return <span>Initializing...</span>;
		}

		// por alguna extraña razón, este método que suele funcionar devuelve siempre la dirección 0 de Ganache
		// ContractData llamando a miDireccion() también devuelve la dirección 0 de Ganache
		// AccountData, en cambio, sí que da la dirección buena con la que se está usando la dApp
		let miDireccion2 = instanceState.miDireccion[this.state.miDireccionKey];
		miDireccion2 = miDireccion2 ? miDireccion2.value : "0x0";
		console.log('MainGestionAsignatura - render - miDireccion2:', miDireccion2);

		/*let miDireccion = "0x0";
		if (drizzleState && drizzleState.accounts && Object.keys(drizzleState.accounts).length > 0) {
			miDireccion = drizzleState.accounts[0];
		}*/
		//let miDireccion = Object.keys(drizzleState.accounts).length > 0 ? drizzleState.accounts[0] : "0x0";
		let miDireccion = drizzleState.accounts[0];
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

		let isOwner = miDireccion === owner;
		console.log('MainGestionAsignatura - render - isOwner:', isOwner);

		let isOwner2 = instanceState.isOwner[this.state.isOwnerKey];
		isOwner2 = isOwner2 ? isOwner2.value : "0";
		console.log('MainGestionAsignatura - render - isOwner2:', isOwner2);

		let isCoordinador = miDireccion === coordinador;
		console.log('MainGestionAsignatura - render - isCoordinador:', isCoordinador);

		let isCoordinador2 = instanceState.isCoordinador[this.state.isCoordinadorKey];
		isCoordinador2 = isCoordinador2 ? isCoordinador2.value : "0";
		console.log('MainGestionAsignatura - render - isCoordinador2:', isCoordinador2);

		let isProfesor = instanceState.isProfesor[this.state.isProfesorKey];
		isProfesor = isProfesor ? isProfesor.value : "0";
		console.log('MainGestionAsignatura - render - isProfesor:', isProfesor);

		let isAlumno = instanceState.isAlumno[this.state.isAlumnoKey];
		isAlumno = isAlumno ? isAlumno.value : "0";
		console.log('MainGestionAsignatura - render - isAlumno:', isAlumno);

		console.log('MainGestionAsignatura - render - contratos vigilados:', Object.keys(drizzle.contracts));

		return (
			<>
				<h2>Gestión de la asignatura {addrEthAsig}</h2>

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