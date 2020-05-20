import React from 'react';

import AsignaturaListaEvaluaciones from './AsignaturaListaEvaluaciones';
import AsignaturaAnadirEvaluacion from './AsignaturaAnadirEvaluacion';

import NavbarAsignatura from '../NavbarAsignatura';

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
		const {drizzle, drizzleState, contractName, isOwner, isCoordinador, isProfesor} = this.props;

		const instanceState = drizzleState.contracts[contractName];
		if (!this.state.ready || !instanceState || !instanceState.initialized) {
			return <span>Initializing...</span>;
		}

		let anadirEvaluacion = [];
		if (isOwner || isCoordinador || isProfesor) {
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
									active={"evaluaciones"} />

				<div className="card">
					<div className="card-header">
                        <h4>
                            Evaluaciones
                        </h4>
                    </div>

                    <div className="card-body">
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
														numNotas={this.props.numNotas}
														isOwner={this.props.isOwner}
														isCoordinador={this.props.isCoordinador}
														isProfesor={this.props.isProfesor}
														isAlumno={this.props.isAlumno} />
                    </div>
                </div>

				{anadirEvaluacion}
			</>
		);
	}
}

export default AsignaturaEvaluaciones;