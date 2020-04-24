import React from 'react';

import {newContextComponents} from "drizzle-react-components";

import AsignaturaListaAlumnos from './AsignaturaListaAlumnos';
import AsignaturaAnadirAlumno from './AsignaturaAnadirAlumno';

import NavbarAsignatura from '../NavbarAsignatura';

import {jsonInterface} from '../../../utils/varios.js';


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

		const instanceState = drizzleState.contracts[contractName];
		if (!this.state.ready || !instanceState || !instanceState.initialized) {
			return <span>Initializing...</span>;
		}

		let anadirAlumno = [];
		if (this.props.isOwner || this.props.isCoordinador || this.props.isProfesor) {
			anadirAlumno =	<AsignaturaAnadirAlumno drizzle={drizzle}
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
													isOwner={this.props.isOwner}
													isCoordinador={this.props.isCoordinador}
													isProfesor={this.props.isProfesor}
													isAlumno={this.props.isAlumno} />;
		}

		return (
			<>
				<NavbarAsignatura	addrEthAsig={this.props.addrEthAsig}
									isOwner={this.props.isOwner}
									isCoordinador={this.props.isCoordinador}
									isProfesor={this.props.isProfesor}
									isAlumno={this.props.isAlumno}
									active={"alumnos"} />

				<div className="card">
					<div className="card-header">
                        <h4>
                            Alumnos de la asignatura
                        </h4>
                    </div>

                    <div className="card-body">
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
												numNotas={this.props.numNotas}
												isOwner={this.props.isOwner}
												isCoordinador={this.props.isCoordinador}
												isProfesor={this.props.isProfesor}
												isAlumno={this.props.isAlumno} />
                    </div>
				</div>

				{anadirAlumno}
			</>
		);
	}
}

export default AsignaturaAlumnos;