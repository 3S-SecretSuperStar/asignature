import React from 'react';

import {Redirect} from "react-router-dom";

import {newContextComponents} from "drizzle-react-components";

import {crearObjetoFromFormData} from '../../utils/funciones.js';

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

	eliminarAlumno = (event) => {
		event.preventDefault();

		// obtener valores del formulario
		const formData = new FormData(event.target);
		let objFormData = crearObjetoFromFormData(formData);
		console.log(objFormData);
		let {addrEthAlum} = objFormData;

		console.log("Has pulsado el botón para eliminar el alumno", addrEthAlum);

		// coger drizzle y drizzleState
		const {drizzle, drizzleState} = this.props;
		const instance = drizzle.contracts.UpmAlumnos;

		// eliminar alumno
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

		return (
			<>
				<h3>Alumno {this.props.addrEthAlum}</h3>

				<table>
					<tbody>
						<tr>
							<td>Nombre</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={"UpmAlumnos"}
												method={"mapAlumnosAddr"}
												methodArgs={[this.props.addrEthAlum]}
												render={(alumno) => (
													<>{alumno.nombre}</>
												)} />
							</td>
						</tr>

						<tr>
							<td>Apellidos</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={"UpmAlumnos"}
												method={"mapAlumnosAddr"}
												methodArgs={[this.props.addrEthAlum]}
												render={(alumno) => (
													<>{alumno.apellidos}</>
												)} />
							</td>
						</tr>

						<tr>
							<td>DNI</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={"UpmAlumnos"}
												method={"mapAlumnosAddr"}
												methodArgs={[this.props.addrEthAlum]}
												render={(alumno) => (
													<>{alumno.dni}</>
												)} />
							</td>
						</tr>

						<tr>
							<td>Correo UPM</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={"UpmAlumnos"}
												method={"mapAlumnosAddr"}
												methodArgs={[this.props.addrEthAlum]}
												render={(alumno) => (
													<>{alumno.correoUpm}</>
												)} />
							</td>
						</tr>

						<tr>
							<td>Teléfono móvil</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={"UpmAlumnos"}
												method={"mapAlumnosAddr"}
												methodArgs={[this.props.addrEthAlum]}
												render={(alumno) => (
													<>{alumno.telefMovil}</>
												)} />
							</td>
						</tr>

						<tr>
							<td>Fecha de nacimiento</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={"UpmAlumnos"}
												method={"mapAlumnosAddr"}
												methodArgs={[this.props.addrEthAlum]}
												render={(alumno) => (
													<>{alumno.fechaNac} (ToDo)</>
												)} />
							</td>
						</tr>

						<tr>
							<td>Id de la UPM</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={"UpmAlumnos"}
												method={"mapAlumnosAddr"}
												methodArgs={[this.props.addrEthAlum]}
												render={(alumno) => (
													<>{alumno.idUpm}</>
												)} />
							</td>
						</tr>
					</tbody>
				</table>
				
				<form onSubmit={this.eliminarAlumno}>
					<input type="hidden" value={this.props.addrEthAlum} name="addrEthAlum" />
					<button type="submit">Eliminar alumno</button>
				</form>

				{this.renderRedirect()}

			</>
		);
	}

}

export default MostrarAlumno;