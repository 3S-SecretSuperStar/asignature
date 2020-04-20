import React from 'react';

import {Redirect} from "react-router-dom";

import {newContextComponents} from "drizzle-react-components";

import {timestampToDateString} from '../../utils/funciones.js';

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
			eliminarProfesor = <button onClick={() => this.eliminarProfesor(this.props.addrEthProf)}>Eliminar</button>;
		}

		return (
			<>
				<h3>Profesor {this.props.addrEthProf}</h3>

				<table>
					<tbody>
						<tr>
							<td>Nombre</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={"UpmProfesores"}
												method={"mapProfesoresAddr"}
												methodArgs={[this.props.addrEthProf]}
												render={(profesor) => (
													<>{profesor.nombre}</>
												)} />
							</td>
						</tr>

						<tr>
							<td>Apellidos</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={"UpmProfesores"}
												method={"mapProfesoresAddr"}
												methodArgs={[this.props.addrEthProf]}
												render={(profesor) => (
													<>{profesor.apellidos}</>
												)} />
							</td>
						</tr>

						<tr>
							<td>DNI</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={"UpmProfesores"}
												method={"mapProfesoresAddr"}
												methodArgs={[this.props.addrEthProf]}
												render={(profesor) => (
													<>{profesor.dni}</>
												)} />
							</td>
						</tr>

						<tr>
							<td>Correo UPM</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={"UpmProfesores"}
												method={"mapProfesoresAddr"}
												methodArgs={[this.props.addrEthProf]}
												render={(profesor) => (
													<>{profesor.correoUpm}</>
												)} />
							</td>
						</tr>

						<tr>
							<td>Teléfono móvil</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={"UpmProfesores"}
												method={"mapProfesoresAddr"}
												methodArgs={[this.props.addrEthProf]}
												render={(profesor) => (
													<>{profesor.telefMovil}</>
												)} />
							</td>
						</tr>

						<tr>
							<td>Fecha de nacimiento</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={"UpmProfesores"}
												method={"mapProfesoresAddr"}
												methodArgs={[this.props.addrEthProf]}
												render={(profesor) => (
													<>{profesor.fechaNac ? timestampToDateString(profesor.fechaNac) : ""}</>
												)} />
							</td>
						</tr>

						<tr>
							<td>Id de la UPM</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={"UpmProfesores"}
												method={"mapProfesoresAddr"}
												methodArgs={[this.props.addrEthProf]}
												render={(profesor) => (
													<>{profesor.idUpm}</>
												)} />
							</td>
						</tr>
					</tbody>
				</table>
				
				{eliminarProfesor}

				{this.renderRedirect()}

			</>
		);
	}

}

export default MostrarProfesor;