import React from 'react';

import AsignaturaListaNotas from './AsignaturaListaNotas';
import AsignaturaAnadirNota from './AsignaturaAnadirNota';

import NavbarAsignatura from '../NavbarAsignatura';

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

		const instanceState = drizzleState.contracts[contractName];
		if (!this.state.ready || !instanceState || !instanceState.initialized) {
			return <span>Initializing...</span>;
		}

		const hayAlgunAlumno = this.props.numAlumnos > 0;
		const hayAlgunaEvaluacion = this.props.numEvaluaciones > 0;

		let anadirNota = [];
		if (!hayAlgunAlumno && !hayAlgunaEvaluacion && (isOwner || isCoordinador || isProfesor)) {
			anadirNota = <p>No se puede añadir una nota porque no hay alumnos ni evaluaciones</p>
		} else if (!hayAlgunAlumno && hayAlgunaEvaluacion && (isOwner || isCoordinador || isProfesor)) {
			anadirNota = <p>No se puede añadir una nota porque no hay ningún alumno</p>
		} else if (hayAlgunAlumno && !hayAlgunaEvaluacion && (isOwner || isCoordinador || isProfesor)) {
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
												numNotas={this.props.numNotas}
												isOwner={this.props.isOwner}
												isCoordinador={this.props.isCoordinador}
												isProfesor={this.props.isProfesor}
												isAlumno={this.props.isAlumno} />
		}

		if (isOwner || isCoordinador || isProfesor) {
			return (
				<>
					<NavbarAsignatura	addrEthAsig={this.props.addrEthAsig}
										isOwner={this.props.isOwner}
										isCoordinador={this.props.isCoordinador}
										isProfesor={this.props.isProfesor}
										isAlumno={this.props.isAlumno}
										active={"notas"} />

					<div className="card">
						<div className="card-header">
	                        <h4>
	                            Notas de la asignatura
	                        </h4>
	                    </div>

	                    <div className="card-body">
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
													numNotas={this.props.numNotas}
													isOwner={isOwner}
													isCoordinador={isCoordinador}
													isProfesor={isProfesor}
													isAlumno={isAlumno} />
	                    </div>
	                </div>

					{anadirNota}
				</>
			);
		} else {
			return (
				<NavbarAsignatura	addrEthAsig={this.props.addrEthAsig}
									isOwner={this.props.isOwner}
									isCoordinador={this.props.isCoordinador}
									isProfesor={this.props.isProfesor}
									isAlumno={this.props.isAlumno}
									active={"notas"} />
			);
		}

	}
}

export default AsignaturaNotas;