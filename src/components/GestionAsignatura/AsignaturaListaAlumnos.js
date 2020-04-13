import React from 'react';

import {newContextComponents} from "drizzle-react-components";

import {crearObjetoFromFormData} from '../../utils/funciones.js';

const {ContractData} = newContextComponents;

class AsignaturaListaAlumnos extends React.Component {

	state = {
		ready: false,
		alumnosAddrsKeys: []
	};

	componentDidMount() {
		this.setState({
			ready: true,
		});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts[this.props.contractName];
		if (!instanceState || !instanceState.initialized) return;

		const instance = drizzle.contracts[this.props.contractName];

		let changed = false;

		let {
			alumnosAddrsKeys
		} = JSON.parse(JSON.stringify(this.state));

		for (let i = alumnosAddrsKeys.length; i < this.props.alumnosLength; i++) {
			alumnosAddrsKeys[i] = instance.methods.listaAlumnos.cacheCall(i);
			changed = true;
		}

		if (changed) {
			this.setState({
				alumnosAddrsKeys,
			});
		}

	}

	eliminarAlumno = (event) => {
		event.preventDefault();

		// obtener valores del formulario
		const formData = new FormData(event.target);
		let objFormData = crearObjetoFromFormData(formData);
		console.log(objFormData);
		let {addrEthAlum} = objFormData;

		console.log("Has pulasdo el botón para eliminar el alumno", addrEthAlum);

		// coger drizzle y drizzleState
		const {drizzle, drizzleState} = this.props;
		const instance = drizzle.contracts[this.props.contractName];

		// eliminar alumno
		const txId = instance.methods.borrarAlumnoAddr.cacheSend(
			addrEthAlum
		);
	}

	render() {
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts[this.props.contractName];
		if (!this.state.ready || !instanceState || !instanceState.initialized) {
			return <span>Initializing...</span>;
		}

		let tbodyListaAlumnos = [];
		for (let i = 0; i < this.props.alumnosLength; i++) {
			let addrEthAlum = instanceState.listaAlumnos[this.state.alumnosAddrsKeys[i]];
			addrEthAlum = addrEthAlum ? addrEthAlum.value : "";

			if (addrEthAlum != "" && addrEthAlum != "0x0000000000000000000000000000000000000000") {
				tbodyListaAlumnos[i] = (
					<ContractData	key={i}
									drizzle={drizzle}
									drizzleState={drizzleState}
									contract={"UpmAlumnos"}
									method={"mapAlumnosAddr"}
									methodArgs={[addrEthAlum]}
									render={(alumno) => (
										<tr>
											<td>{alumno.addrEthAlum}</td>
											<td>{alumno.nombre}</td>
											<td>{alumno.apellidos}</td>
											<td>{alumno.correoUpm}</td>
											<td>
												<form onSubmit={this.eliminarAlumno}>
													<input type="hidden" value={addrEthAlum} name="addrEthAlum" />
													<button type="submit">Eliminar alumno</button>
												</form>
											</td>
										</tr>
									)}
					/>
				);
			}
		}

		return (
			<>
				<h3>Lista de alumnos creados</h3>

				<p>{this.props.alumnosLength} alumnosLength</p>
				<p>{this.props.numAlumnos} alumnos</p>

				<table>
					<thead>
						<tr>
							<th>Dirección</th>
							<th>Nombre</th>
							<th>Apellidos</th>
							<th>Correo</th>
							<th>Eliminar</th>
						</tr>
					</thead>
					<tbody>
						{tbodyListaAlumnos}
					</tbody>
				</table>
			</>
		);
	}

}

export default AsignaturaListaAlumnos;