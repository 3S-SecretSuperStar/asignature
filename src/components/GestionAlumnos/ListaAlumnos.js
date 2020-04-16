import React from 'react';

import {Link} from "react-router-dom";

import {newContextComponents} from "drizzle-react-components";

import {crearObjetoFromFormData} from '../../utils/funciones.js';

const {ContractData} = newContextComponents;

class ListaAlumnos extends React.Component {

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

		const instanceState = drizzleState.contracts.UpmAlumnos;
		if (!instanceState || !instanceState.initialized) return;

		const instance = drizzle.contracts.UpmAlumnos;

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

		console.log("Has pulsado el botón para eliminar el alumno", addrEthAlum);

		// coger drizzle y drizzleState
		const {drizzle, drizzleState} = this.props;
		const instance = drizzle.contracts.UpmAlumnos;

		// eliminar alumno
		const txId = instance.methods.borrarAlumnoAddr.cacheSend(
			addrEthAlum,
			{from: this.props.miDireccion}
		);

		//console.log('~~eliminar~~ txId:', txId);

		//console.log('~~eliminar~~ drizzleState:', drizzleState);
		//console.log('~~eliminar~~ drizzleState.transactionStack:', drizzleState.transactionStack);
		//console.log('~~eliminar~~ drizzleState.transactionStack[txId]:', drizzleState.transactionStack[txId]);

		//console.log('~~eliminar~~ drizzleState.transactions:', drizzleState.transactions);
	}

	render() {
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts.UpmAlumnos;
		if (!this.state.ready || !instanceState || !instanceState.initialized) {
			return <span>Initializing...</span>;
		}

		//console.log('~~renderEli~ drizzleState.transactionStack:', drizzleState.transactionStack);

		//console.log('~~renderEli~ drizzleState.transactions:', drizzleState.transactions);

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
											<td><Link to={`/gestion-alumnos/alumno/${alumno.addrEthAlum}`}>{alumno.addrEthAlum}</Link></td>
											
											<td>{alumno.nombre}</td>
											
											<td>{alumno.apellidos}</td>
											
											<td>{alumno.correoUpm}</td>
											
											{
												this.props.owner === this.props.miDireccion
												?
													<td>
														<form onSubmit={this.eliminarAlumno}>
															<input type="hidden" value={addrEthAlum} name="addrEthAlum" />
															<button type="submit">Eliminar alumno</button>
														</form>
													</td>
												:
													""
											}
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

							{
								this.props.owner === this.props.miDireccion
								?
									<th>Eliminar</th>
								:
								""
							}
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

export default ListaAlumnos;