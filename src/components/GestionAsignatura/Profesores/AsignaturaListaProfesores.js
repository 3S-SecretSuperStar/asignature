import React from 'react';

import {newContextComponents} from "drizzle-react-components";

import {crearObjetoFromFormData} from '../../../utils/funciones.js';

const {ContractData} = newContextComponents;

class AsignaturaListaProfesores extends React.Component {

	state = {
		ready: false,
		profesoresAddrsKeys: []
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
			profesoresAddrsKeys
		} = JSON.parse(JSON.stringify(this.state));

		for (let i = profesoresAddrsKeys.length; i < this.props.profesoresLength; i++) {
			profesoresAddrsKeys[i] = instance.methods.listaProfesores.cacheCall(i);
			changed = true;
		}

		if (changed) {
			this.setState({
				profesoresAddrsKeys,
			});
		}

	}

	eliminarProfesor = (event) => {
		event.preventDefault();

		// obtener valores del formulario
		const formData = new FormData(event.target);
		let objFormData = crearObjetoFromFormData(formData);
		console.log(objFormData);
		let {addrEthProf} = objFormData;

		console.log("Has pulsado el botón para eliminar el profesor", addrEthProf);

		// coger drizzle y drizzleState
		const {drizzle, drizzleState} = this.props;
		const instance = drizzle.contracts[this.props.contractName];

		// eliminar profesor
		const txId = instance.methods.eliminarProfesor.cacheSend(
			addrEthProf,
			{from: this.props.miDireccion}
		);
	}

	render() {
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts[this.props.contractName];
		if (!this.state.ready || !instanceState || !instanceState.initialized) {
			return <span>Initializing...</span>;
		}

		let tbodyListaProfesores = [];
		for (let i = 0; i < this.props.profesoresLength; i++) {
			let addrEthProf = instanceState.listaProfesores[this.state.profesoresAddrsKeys[i]];
			addrEthProf = addrEthProf ? addrEthProf.value : "";

			if (addrEthProf != "" && addrEthProf != "0x0000000000000000000000000000000000000000") {
				tbodyListaProfesores[i] = (
					<ContractData	key={i}
									drizzle={drizzle}
									drizzleState={drizzleState}
									contract={"UpmProfesores"}
									method={"mapProfesoresAddr"}
									methodArgs={[addrEthProf]}
									render={(profesor) => (
										<tr>
											<td>{profesor.addrEthProf}</td>
											<td>{profesor.nombre}</td>
											<td>{profesor.apellidos}</td>
											<td>{profesor.correoUpm}</td>
											<td>
												<form onSubmit={this.eliminarProfesor}>
													<input type="hidden" value={addrEthProf} name="addrEthProf" />
													<button type="submit">Eliminar profesor</button>
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
				<h3>Lista de profesores añadidos</h3>

				<p>{this.props.profesoresLength} profesoresLength</p>
				<p>{this.props.numProfesores} profesores</p>

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
						{tbodyListaProfesores}
					</tbody>
				</table>
			</>
		);
	}

}

export default AsignaturaListaProfesores;