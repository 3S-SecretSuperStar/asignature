import React from 'react';

import AsignaturaListaProfesores from './AsignaturaListaProfesores';
import AsignaturaAnadirProfesor from './AsignaturaAnadirProfesor';

import NavbarAsignatura from '../NavbarAsignatura';

class AsignaturaProfesores extends React.Component {

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

		let anadirProfesor = [];
		if (this.props.isOwner || this.props.isCoordinador) {
			anadirProfesor = <AsignaturaAnadirProfesor 	drizzle={drizzle}
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
									active={"profesores"} />

				<div className="card">
					<div className="card-header">
                        <h4>
                            Profesores de la asignatura
                        </h4>
                    </div>

                    <div className="card-body">
						<AsignaturaListaProfesores	drizzle={drizzle}
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
				
				{anadirProfesor}


			</>
		);
	}
}

export default AsignaturaProfesores;