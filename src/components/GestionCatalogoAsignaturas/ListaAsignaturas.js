import React from 'react';

import {newContextComponents} from "drizzle-react-components";

import {crearObjetoFromFormData} from '../../utils/funciones.js';

const {ContractData} = newContextComponents;

class ListaAsignaturas extends React.Component {

	state = {
		ready: false,
		asignaturasAddrsKeys: []
	};

	componentDidMount() {
		this.setState({
			ready: true,
		});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts.UpmCatalogo;
		if (!instanceState || !instanceState.initialized) return;

		const instance = drizzle.contracts.UpmCatalogo;

		let changed = false;

		let {asignaturasAddrsKeys} = JSON.parse(JSON.stringify(this.state));

		for (let i = asignaturasAddrsKeys.length; i < this.props.asignaturasLength; i++) {
			asignaturasAddrsKeys[i] = instance.methods.listaAsignaturas.cacheCall(i);
			changed = true;
		}

		if (changed) {
			this.setState({
				asignaturasAddrsKeys,
			});
		}

	}

	eliminarAsignatura = (event) => {
		event.preventDefault();

		// obtener valores del formulario
		const formData = new FormData(event.target);
		let objFormData = crearObjetoFromFormData(formData);
		let {addrEthAsignatura} = objFormData;

		console.log("Has pulsado el botón para mandar eliminar la asignatura", addrEthAsignatura);

		// coger drizzle y drizzleState
		const {drizzle, drizzleState} = this.props;
		const instance = drizzle.contracts.UpmCatalogo;
		const instanceState = drizzleState.contracts.UpmCatalogo;

		// eliminar asignatura del catálogo
		const txId = instance.methods.eliminarAsignatura.cacheSend(addrEthAsignatura);

		// eliminar contrato dinámicamente
		//const contractName = "UpmAsignatura-" + addrEthAsignatura;
		//drizzle.deleteContract(contractName);
	}

	render() {
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts.UpmCatalogo;
		if (!this.state.ready || !instanceState || !instanceState.initialized) {
			return <span>Initializing...</span>;
		}

		let direccionesAsignaturasAnadidas = [];
		for (let i = 0; i < this.props.asignaturasLength; i++) {
			let asignaturaAddr = instanceState.listaAsignaturas[this.state.asignaturasAddrsKeys[i]];
			asignaturaAddr = asignaturaAddr ? asignaturaAddr.value : "";

			if (asignaturaAddr != "" && asignaturaAddr != "0x0000000000000000000000000000000000000000") {
				direccionesAsignaturasAnadidas.push(asignaturaAddr);
			}
		}
		console.log('ListaAsignaturas - render - direccionesAsignaturasAnadidas', direccionesAsignaturasAnadidas);

		console.log('ListaAsignaturas - render - contratos vigilados:', Object.keys(drizzle.contracts));

		let tbodyListaAsignaturas = [];
		for (let i in direccionesAsignaturasAnadidas) {
			let asignaturaAddr = direccionesAsignaturasAnadidas[i];
			tbodyListaAsignaturas[i] = (
				<tr>
					<td>{asignaturaAddr}</td>
					<td>ToDo</td>
					<td>
						<form onSubmit={this.eliminarAsignatura}>
							<input type="hidden" value={asignaturaAddr} name="addrEthAsignatura" />
							<button type="submit">Eliminar asignatura</button>
						</form>
					</td>
				</tr>
			);
		}

		/*for (let i = 0; i < this.props.asignaturasLength; i++) {
			let asignaturaAddr = instanceState.listaAsignaturas[this.state.asignaturasAddrsKeys[i]];
			asignaturaAddr = asignaturaAddr ? asignaturaAddr.value : "";

			if (asignaturaAddr != "" && asignaturaAddr != "0x0000000000000000000000000000000000000000") {
				tbodyListaAsignaturas[i] = (
					<tr>
						<td>{asignaturaAddr}</td>
						<td>ToDo</td>
						<td>
							<form onSubmit={this.eliminarAsignatura}>
								<input type="hidden" value={asignaturaAddr} name="addrEthAsignatura" />
								<button type="submit">Eliminar asignatura</button>
							</form>
						</td>
					</tr>
				);
			}
		}*/

		return (
			<>
				<h3>Lista de asignaturas</h3>

				<p>{this.props.asignaturasLength} asignaturasLength</p>
				<p>{this.props.numAsignaturas} numAsignaturas</p>

				<table>
					<thead>
						<tr>
							<th>Dirección</th>
							<th>Acceder</th>
							<th>Eliminar</th>
						</tr>
					</thead>
					<tbody>
						{tbodyListaAsignaturas}
					</tbody>
				</table>
			</>
		);
	}

}

export default ListaAsignaturas;