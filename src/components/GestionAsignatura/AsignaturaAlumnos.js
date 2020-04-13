import React from 'react';

import {newContextComponents} from "drizzle-react-components";

import {jsonInterface} from '../../utils/varios.js';

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
										contractName={this.props.contractName} />

				<AsignaturaAnadirAlumno drizzle={drizzle}
										drizzleState={drizzleState}
										contractName={this.props.contractName} />
			</>
		);
	}
}

export default AsignaturaAlumnos;