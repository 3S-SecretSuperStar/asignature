import React from 'react';

import {newContextComponents} from "drizzle-react-components";

import {jsonInterface} from '../../../utils/varios.js';

import AsignaturaListaAlumnos from './AsignaturaListaAlumnos';
import AsignaturaAnadirAlumno from './AsignaturaAnadirAlumno';

const {ContractData} = newContextComponents;

class AsignaturaAlumnos extends React.Component {

	state = {
		ready: false,
	};

	componentDidMount() {
		this.setState({ready: true});
	}

	componentDidUpdate() {
		
	}

	render() {
		const {drizzle, drizzleState, contractName} = this.props;
		console.log('AsignaturaAlumnos - render - this.props:', this.props);

		const instanceState = drizzleState.contracts[contractName];
		if (!this.state.ready || !instanceState || !instanceState.initialized) {
			return <span>Initializing...</span>;
		}

		return (
			<>
				<h3>Alumnos de la asignatura</h3>
				<p>Nombre del contrato: {contractName}</p>

				<AsignaturaListaAlumnos	drizzle={drizzle}
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

				<AsignaturaAnadirAlumno drizzle={drizzle}
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
			</>
		);
	}
}

export default AsignaturaAlumnos;