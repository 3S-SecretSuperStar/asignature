import React from 'react';

import {newContextComponents} from "drizzle-react-components";

import {jsonInterface} from '../../../utils/varios.js';

import AsignaturaListaNotas from './AsignaturaListaNotas';
import AsignaturaAnadirNota from './AsignaturaAnadirNota';
import AsignaturaEliminarNota from './AsignaturaEliminarNota';

const {ContractData} = newContextComponents;

class AsignaturaNotas extends React.Component {

	state = {
		ready: false,
	};

	componentDidMount() {
		this.setState({ready: true});
	}

	componentDidUpdate() {
		
	}

	render() {
		const {drizzle, drizzleState, contractName, isOwner, isCoordinador, isProfesor, isAlumno} = this.props;
		console.log('AsignaturaNotas - render - this.props:', this.props);

		const instanceState = drizzleState.contracts[contractName];
		if (!this.state.ready || !instanceState || !instanceState.initialized) {
			return <span>Initializing...</span>;
		}

		const hayAlgunAlumno = this.props.numAlumnos > 0;
		const hayAlgunaEvaluacion = this.props.numEvaluaciones > 0;
		const hayAlgunaNota = this.props.numNotas > 0;

		let listaNotas = [];
		listaNotas = <AsignaturaListaNotas	drizzle={drizzle}
											drizzleState={drizzleState}
											contractName={this.props.contractName}
											miDireccion={this.props.miDireccion}
											owner={this.props.owner}
											coordinador={this.props.coordinador}
											alumnosLength={this.props.alumnosLength}
											numAlumnos={this.props.numAlumnos}
											profesoresLength={this.props.profesoresLength}
											numProfesores={this.props.numProfesores}
											numEvaluaciones={this.props.numEvaluaciones}
											numNotas={this.props.numNotas}
											isOwner={isOwner}
											isCoordinador={isCoordinador}
											isProfesor={isProfesor}
											isAlumno={isAlumno} />;

		let anadirNota = [];
		if (!hayAlgunAlumno && !hayAlgunaEvaluacion && (isOwner || isCoordinador || isProfesor)) {
			anadirNota = <p>No se puede añadir una nota porque no hay alumnos ni evaluaciones</p>
		} else if (!hayAlgunAlumno && (isOwner || isCoordinador || isProfesor)) {
			anadirNota = <p>No se puede añadir una nota porque no hay ningún alumno</p>
		} else if (!hayAlgunaEvaluacion && (isOwner || isCoordinador || isProfesor)) {
			anadirNota = <p>No se puede añadir una nota porque no hay ninguna evaluación</p>
		} else if (hayAlgunAlumno && hayAlgunaEvaluacion && (isOwner || isCoordinador || isProfesor)) {
			anadirNota = <AsignaturaAnadirNota	drizzle={drizzle}
												drizzleState={drizzleState}
												contractName={this.props.contractName}
												miDireccion={this.props.miDireccion}
												owner={this.props.owner}
												coordinador={this.props.coordinador}
												alumnosLength={this.props.alumnosLength}
												numAlumnos={this.props.numAlumnos}
												profesoresLength={this.props.profesoresLength}
												numProfesores={this.props.numProfesores}
												numEvaluaciones={this.props.numEvaluaciones}
												numNotas={this.props.numNotas} />
		}

		let eliminarNota = [];
		if (hayAlgunaNota && (isOwner || isCoordinador || isProfesor)) {
			eliminarNota = <AsignaturaEliminarNota 	drizzle={drizzle}
													drizzleState={drizzleState}
													contractName={this.props.contractName}
													miDireccion={this.props.miDireccion}
													owner={this.props.owner}
													coordinador={this.props.coordinador}
													alumnosLength={this.props.alumnosLength}
													numAlumnos={this.props.numAlumnos}
													profesoresLength={this.props.profesoresLength}
													numProfesores={this.props.numProfesores}
													numEvaluaciones={this.props.numEvaluaciones}
													numNotas={this.props.numNotas} />
		}

		if (isOwner || isCoordinador || isProfesor) {
			return (
				<>
					<h3>Notas</h3>
					<p>Nombre del contrato: {contractName}</p>

					{listaNotas}

					{anadirNota}

					{eliminarNota}
				</>
			);
		} else {
			return (<></>);
		}

	}
}

export default AsignaturaNotas;