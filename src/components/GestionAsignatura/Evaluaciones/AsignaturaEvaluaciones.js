import React from 'react';

import {newContextComponents} from "drizzle-react-components";

import {jsonInterface} from '../../../utils/varios.js';

import AsignaturaListaEvaluaciones from './AsignaturaListaEvaluaciones';
import AsignaturaAnadirEvaluacion from './AsignaturaAnadirEvaluacion';

const {ContractData} = newContextComponents;

class AsignaturaEvaluaciones extends React.Component {

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
		console.log('AsignaturaEvaluaciones - render - this.props:', this.props);

		const instanceState = drizzleState.contracts[contractName];
		if (!this.state.ready || !instanceState || !instanceState.initialized) {
			return <span>Initializing...</span>;
		}

		let anadirEvaluacion = [];
		if (this.props.isOwner || this.props.isCoordinador || this.props.isProfesor) {
			anadirEvaluacion = <AsignaturaAnadirEvaluacion 	drizzle={drizzle}
															drizzleState={drizzleState}
															contractName={this.props.contractName}
															miDireccion={this.props.miDireccion}
															owner={this.props.owner}
															coordinador={this.props.coordinador}
															alumnosLength={this.props.alumnosLength}
															numAlumnos={this.props.numAlumnos}
															profesoresLength={this.props.profesoresLength}
															numProfesores={this.props.numProfesores}
															evaluacionesLength={this.props.evaluacionesLength}
															numEvaluaciones={this.props.numEvaluaciones}
															numNotas={this.props.numNotas} />;
		}

		return (
			<>
				<h3>Evaluaciones creadas</h3>
				<p>Nombre del contrato: {contractName}</p>

				<AsignaturaListaEvaluaciones	drizzle={drizzle}
												drizzleState={drizzleState}
												contractName={this.props.contractName}
												miDireccion={this.props.miDireccion}
												owner={this.props.owner}
												coordinador={this.props.coordinador}
												alumnosLength={this.props.alumnosLength}
												numAlumnos={this.props.numAlumnos}
												profesoresLength={this.props.profesoresLength}
												numProfesores={this.props.numProfesores}
												evaluacionesLength={this.props.evaluacionesLength}
												numEvaluaciones={this.props.numEvaluaciones}
												numNotas={this.props.numNotas} />

				{anadirEvaluacion}
			</>
		);
	}
}

export default AsignaturaEvaluaciones;