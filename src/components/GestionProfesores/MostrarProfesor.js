import React from 'react';

import {Redirect} from "react-router-dom";

import {newContextComponents} from "drizzle-react-components";

import {timestampToDateString, copyToClipboard} from '../../utils/funciones.js';

const {ContractData} = newContextComponents;

class MostrarProfesor extends React.Component {

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

		const instanceState = drizzleState.contracts.UpmProfesores;
		if (!instanceState || !instanceState.initialized) return;

		const instance = drizzle.contracts.UpmProfesores;

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
			return <Redirect to="/gestion-profesores" />
		}
	}

	eliminarProfesor = (addrEthProf) => {
		const instance = this.props.drizzle.contracts.UpmProfesores;

		instance.methods.borrarProfesorAddr.cacheSend(
			addrEthProf,
			{from: this.props.miDireccion}
		);

		this.setState({redirect: true});
	}

	render() {
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts.UpmProfesores;
		if (!this.state.ready || !instanceState || !instanceState.initialized) {
			return <span>Initializing...</span>;
		}

		let eliminarProfesor = [];
		if (this.props.miDireccion === this.props.owner) {
			eliminarProfesor = 	<div className="card-footer">
									<button className="btn btn-danger btn-delete eliminar-big" onClick={() => this.eliminarProfesor(this.props.addrEthProf)}>
										Eliminar profesor
									</button>
								</div>;
		}

		return (
			<>
				<div className="card">
                    <div className="card-header">
                        <h4>
                        	Profesor <span className="code">{this.props.addrEthProf}</span>
                        	<button type="button" className="btn btn-outline-primary btn-copy" onClick={() => copyToClipboard(this.props.addrEthProf)}>
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
															contract={"UpmProfesores"}
															method={"mapProfesoresAddr"}
															methodArgs={[this.props.addrEthProf]}
															render={(profesor) => (
																<span>
																	{profesor.nombre + " " + profesor.apellidos}
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
															contract={"UpmProfesores"}
															method={"mapProfesoresAddr"}
															methodArgs={[this.props.addrEthProf]}
															render={(profesor) => (
																<span>
																	{profesor.dni}
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
															contract={"UpmProfesores"}
															method={"mapProfesoresAddr"}
															methodArgs={[this.props.addrEthProf]}
															render={(profesor) => (
																<span>
																	{profesor.correoUpm}
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
															contract={"UpmProfesores"}
															method={"mapProfesoresAddr"}
															methodArgs={[this.props.addrEthProf]}
															render={(profesor) => (
																<span>
																	{profesor.telefMovil}
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
												contract={"UpmProfesores"}
												method={"mapProfesoresAddr"}
												methodArgs={[this.props.addrEthProf]}
												render={(profesor) => (
													<span>
														{profesor.fechaNac ? timestampToDateString(profesor.fechaNac) : ""}
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
															contract={"UpmProfesores"}
															method={"mapProfesoresAddr"}
															methodArgs={[this.props.addrEthProf]}
															render={(profesor) => (
																<span>
																	{profesor.idUpm}
																</span>
															)} />
										</div>
									</div>
								</li>
							</div>
						</ul>
					</div>

                    {eliminarProfesor}

                </div>

                {this.renderRedirect()}
			</>
		);
	}

}

export default MostrarProfesor;