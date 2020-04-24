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
		console.log("Has pulsado el botón para eliminar el profesor", addrEthProf);

		const instance = this.props.drizzle.contracts.UpmProfesores;

		const txId = instance.methods.borrarProfesorAddr.cacheSend(
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
									<button className="btn btn-danger" onClick={() => this.eliminarProfesor(this.props.addrEthProf)}>
										<i className="fas fa-trash-alt fa-lg" style={{color: "red"}}></i>
										Eliminar profesor
									</button>
								</div>;
		}

		return (
			<>
				<div className="card">
                    <div className="card-header">
                        <h4>
                        	Profesor {this.props.addrEthProf}
                        	<button type="button" className="btn btn-outline-primary" onClick={() => copyToClipboard(this.props.addrEthProf)}>
								<i className="far fa-copy fa-lg"></i>
							</button>
                        	</h4>
                    </div>

                    <div className="card-body">
                    	<ul className="list-group list-group-flush">
                    		<li className="list-group-item">
                    			<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={"UpmProfesores"}
												method={"mapProfesoresAddr"}
												methodArgs={[this.props.addrEthProf]}
												render={(profesor) => (
													<span>
														<strong>Nombre y apellidos:</strong> {profesor.nombre + " "}
													</span>
												)} />
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={"UpmProfesores"}
												method={"mapProfesoresAddr"}
												methodArgs={[this.props.addrEthProf]}
												render={(profesor) => (
													<span>
														{profesor.apellidos}
													</span>
												)} />
                    		</li>

                    		<li className="list-group-item">
                    			<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={"UpmProfesores"}
												method={"mapProfesoresAddr"}
												methodArgs={[this.props.addrEthProf]}
												render={(profesor) => (
													<span>
														<strong>DNI:</strong> {profesor.dni}
													</span>
												)} />
                    		</li>

                    		<li className="list-group-item">
                    			<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={"UpmProfesores"}
												method={"mapProfesoresAddr"}
												methodArgs={[this.props.addrEthProf]}
												render={(profesor) => (
													<span>
														<strong>Correo UPM:</strong> {profesor.correoUpm}
													</span>
												)} />
                    		</li>

                    		<li className="list-group-item">
                    			<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={"UpmProfesores"}
												method={"mapProfesoresAddr"}
												methodArgs={[this.props.addrEthProf]}
												render={(profesor) => (
													<span>
														<strong>Teléfono móvil:</strong> {profesor.telefMovil}
													</span>
												)} />
                    		</li>

                    		<li className="list-group-item">
                    			<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={"UpmProfesores"}
												method={"mapProfesoresAddr"}
												methodArgs={[this.props.addrEthProf]}
												render={(profesor) => (
													<span>
														<strong>Fecha de nacimiento:</strong> {profesor.fechaNac ? timestampToDateString(profesor.fechaNac) : ""}
													</span>
												)} />
                    		</li>

                    		<li className="list-group-item">
                    			<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={"UpmProfesores"}
												method={"mapProfesoresAddr"}
												methodArgs={[this.props.addrEthProf]}
												render={(profesor) => (
													<span>
														<strong>Id UPM:</strong> {profesor.idUpm}
													</span>
												)} />
                    		</li>
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