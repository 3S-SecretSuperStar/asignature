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
		const {drizzle, drizzleState, contractName} = this.props;
		console.log('AsignaturaNotas - render - this.props:', this.props);

		const instanceState = drizzleState.contracts[contractName];
		if (!this.state.ready || !instanceState || !instanceState.initialized) {
			return <span>Initializing...</span>;
		}

		let anadirNota = [];
		if (this.props.isOwner || this.props.isCoordinador || this.props.isProfesor) {
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
		if (this.props.isOwner || this.props.isCoordinador || this.props.isProfesor) {
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

		return (
			<>
				<h3>Notas creadas</h3>
				<p>Nombre del contrato: {contractName}</p>

				<AsignaturaListaNotas	drizzle={drizzle}
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

				{anadirNota}

				{eliminarNota}
			</>
		);
	}
}

export default AsignaturaNotas;