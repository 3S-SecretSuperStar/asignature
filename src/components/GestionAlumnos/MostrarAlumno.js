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
		const instance = this.props.drizzle.contracts.UpmAlumnos;

		instance.methods.borrarAlumnoAddr.cacheSend(
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
									<button className="btn btn-danger btn-delete eliminar-big" onClick={() => this.eliminarAlumno(this.props.addrEthAlum)}>
										Eliminar alumno
									</button>
								</div>;
		}

		return (
			<>
				<div className="card">
					<div className="card-header">
						<h4>
							Alumno <span className="code">{this.props.addrEthAlum}</span>
							<button type="button" className="btn btn-outline-primary btn-copy" onClick={() => copyToClipboard(this.props.addrEthAlum)}>
								<i className="far fa-copy fa-lg"></i>
							</button>
						</h4>
					</div>

					<div className="card-body">
						<ul className="list-group list-group-flush">
							<div className="container">
								<li className="list-group-item">
									<div className="row">
										<div className="col-12 col-md-4 col-lg-3">
											<strong>Nombre y apellidos</strong>
										</div>
										<div className="col-12 col-md-8 col-lg-9">
											<ContractData 	drizzle={drizzle}
															drizzleState={drizzleState}
															contract={"UpmAlumnos"}
															method={"mapAlumnosAddr"}
															methodArgs={[this.props.addrEthAlum]}
															render={(alumno) => (
																<span>
																	{alumno.nombre + " " + alumno.apellidos}
																</span>
															)} />
										</div>
									</div>
								</li>

								<li className="list-group-item">
									<div className="row">
										<div className="col-12 col-md-4 col-lg-3">
											<strong>DNI</strong>
										</div>
										<div className="col-12 col-md-8 col-lg-9">
											<ContractData 	drizzle={drizzle}
															drizzleState={drizzleState}
															contract={"UpmAlumnos"}
															method={"mapAlumnosAddr"}
															methodArgs={[this.props.addrEthAlum]}
															render={(alumno) => (
																<span>
																	{alumno.dni}
																</span>
															)} />
										</div>
									</div>
								</li>

								<li className="list-group-item">
									<div className="row">
										<div className="col-12 col-md-4 col-lg-3">
											<strong>Correo UPM</strong>
										</div>
										<div className="col-12 col-md-8 col-lg-9">
											<ContractData 	drizzle={drizzle}
															drizzleState={drizzleState}
															contract={"UpmAlumnos"}
															method={"mapAlumnosAddr"}
															methodArgs={[this.props.addrEthAlum]}
															render={(alumno) => (
																<span>
																	{alumno.correoUpm}
																</span>
															)} />
										</div>
									</div>
								</li>

								<li className="list-group-item">
									<div className="row">
										<div className="col-12 col-md-4 col-lg-3">
											<strong>Móvil</strong>
										</div>
										<div className="col-12 col-md-8 col-lg-9">
											<ContractData 	drizzle={drizzle}
															drizzleState={drizzleState}
															contract={"UpmAlumnos"}
															method={"mapAlumnosAddr"}
															methodArgs={[this.props.addrEthAlum]}
															render={(alumno) => (
																<span>
																	{alumno.telefMovil}
																</span>
															)} />
										</div>
									</div>
								</li>

								<li className="list-group-item">
									<div className="row">
										<div className="col-12 col-md-4 col-lg-3">
											<strong>Fecha de nacimiento</strong>
										</div>
										<div className="col-12 col-md-8 col-lg-9">
											<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={"UpmAlumnos"}
												method={"mapAlumnosAddr"}
												methodArgs={[this.props.addrEthAlum]}
												render={(alumno) => (
													<span>
														{alumno.fechaNac ? timestampToDateString(alumno.fechaNac) : ""}
													</span>
												)} />
										</div>
									</div>
								</li>

								<li className="list-group-item">
									<div className="row">
										<div className="col-12 col-md-4 col-lg-3">
											<strong>Id UPM</strong>
										</div>
										<div className="col-12 col-md-8 col-lg-9">
											<ContractData 	drizzle={drizzle}
															drizzleState={drizzleState}
															contract={"UpmAlumnos"}
															method={"mapAlumnosAddr"}
															methodArgs={[this.props.addrEthAlum]}
															render={(alumno) => (
																<span>
																	{alumno.idUpm}
																</span>
															)} />
										</div>
									</div>
								</li>
							</div>
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