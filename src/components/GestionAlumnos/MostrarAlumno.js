import React from 'react';

import {Redirect} from "react-router-dom";

import {newContextComponents} from "drizzle-react-components";

import {timestampToDateString, copyToClipboard} from '../../utils/funciones.js';

const {ContractData} = newContextComponents;

class MostrarAlumno extends React.Component {

	state = {
		ready: false,
		miDireccionKey: null,
		ownerKey: null,

		// https://stackoverflow.com/questions/50793148/how-to-redirect-to-a-new-page-from-a-function-in-react
		redirect: false,
	};

	componentDidMount() {
		this.setState({
			ready: true,
		});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts.UpmAlumnos;
		if (!instanceState || !instanceState.initialized) return;

		const instance = drizzle.contracts.UpmAlumnos;

		let changed = false;

		let {
			miDireccionKey, ownerKey,
		} = JSON.parse(JSON.stringify(this.state));

		if (!miDireccionKey) {
            miDireccionKey = instance.methods.miDireccion.cacheCall();
            changed = true;
        }

		if (!ownerKey) {
			ownerKey = instance.methods.owner.cacheCall();
			changed = true;
		}

		if (changed) {
			this.setState({
				miDireccionKey,
				ownerKey,
			});
		}

	}

	renderRedirect = () => {
		if (this.state.redirect) {
			return <Redirect to="/gestion-alumnos" />
		}
	}

	eliminarAlumno = (addrEthAlum) => {
		console.log("Has pulsado el botón para eliminar el alumno", addrEthAlum);

		const instance = this.props.drizzle.contracts.UpmAlumnos;

		const txId = instance.methods.borrarAlumnoAddr.cacheSend(
			addrEthAlum,
			{from: this.props.miDireccion}
		);

		this.setState({redirect: true});
	}

	render() {
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts.UpmAlumnos;
		if (!this.state.ready || !instanceState || !instanceState.initialized) {
			return <span>Initializing...</span>;
		}

		let eliminarAlumno = [];
		if (this.props.miDireccion === this.props.owner) {
			eliminarAlumno = 	<div className="card-footer">
									<button className="btn btn-danger btn-delete" onClick={() => this.eliminarAlumno(this.props.addrEthAlum)}>
										Eliminar alumno
									</button>
								</div>;
		}

		return (
			<>
				<div className="card">
					<div className="card-header">
						<h4>
							Alumno {this.props.addrEthAlum}
							<button type="button" className="btn btn-outline-primary btn-copy" onClick={() => copyToClipboard(this.props.addrEthAlum)}>
								<i className="far fa-copy fa-lg"></i>
							</button>
						</h4>
					</div>

					<div className="card-body">
						<ul className="list-group list-group-flush">
							<li className="list-group-item">
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={"UpmAlumnos"}
												method={"mapAlumnosAddr"}
												methodArgs={[this.props.addrEthAlum]}
												render={(alumno) => (
													<span>
														<strong>Nombre y apellidos:</strong> {alumno.nombre + " "}
													</span>
												)} />
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={"UpmAlumnos"}
												method={"mapAlumnosAddr"}
												methodArgs={[this.props.addrEthAlum]}
												render={(alumno) => (
													<span>
														{alumno.apellidos}
													</span>
												)} />
							</li>

							<li className="list-group-item">
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={"UpmAlumnos"}
												method={"mapAlumnosAddr"}
												methodArgs={[this.props.addrEthAlum]}
												render={(alumno) => (
													<span>
														<strong>DNI:</strong> {alumno.dni}
													</span>
												)} />
							</li>

							<li className="list-group-item">
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={"UpmAlumnos"}
												method={"mapAlumnosAddr"}
												methodArgs={[this.props.addrEthAlum]}
												render={(alumno) => (
													<span>
														<strong>Correo UPM:</strong> {alumno.correoUpm}
													</span>
												)} />
							</li>

							<li className="list-group-item">
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={"UpmAlumnos"}
												method={"mapAlumnosAddr"}
												methodArgs={[this.props.addrEthAlum]}
												render={(alumno) => (
													<span>
														<strong>Teléfono móvil:</strong> {alumno.telefMovil}
													</span>
												)} />
							</li>

							<li className="list-group-item">
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={"UpmAlumnos"}
												method={"mapAlumnosAddr"}
												methodArgs={[this.props.addrEthAlum]}
												render={(alumno) => (
													<span>
														<strong>Fecha de nacimiento:</strong> {alumno.fechaNac ? timestampToDateString(alumno.fechaNac) : ""}
													</span>
												)} />
							</li>

							<li className="list-group-item">
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={"UpmAlumnos"}
												method={"mapAlumnosAddr"}
												methodArgs={[this.props.addrEthAlum]}
												render={(alumno) => (
													<span>
														<strong>Id UPM:</strong> {alumno.idUpm}
													</span>
												)} />
							</li>
						</ul>
					</div>

					{eliminarAlumno}
				</div>

				{this.renderRedirect()}
			</>
		);
	}

}

export default MostrarAlumno;