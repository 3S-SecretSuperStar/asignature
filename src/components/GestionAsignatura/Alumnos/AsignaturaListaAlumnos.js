import React from 'react';

import {Link} from "react-router-dom";

import {newContextComponents} from "drizzle-react-components";

import {copyToClipboard} from '../../../utils/funciones.js';

const {ContractData} = newContextComponents;

class AsignaturaListaAlumnos extends React.Component {

	state = {
		ready: false,
		alumnosAddrsKeys: [],
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

	eliminarAlumno = (addrEthAlum) => {
		console.log("Has pulsado el botón para eliminar el alumno", addrEthAlum);

		// coger drizzle
		const instance = this.props.drizzle.contracts[this.props.contractName];

		// eliminar alumno
		const txId = instance.methods.eliminarAlumno.cacheSend(
			addrEthAlum,
			{from: this.props.miDireccion}
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

			if (addrEthAlum !== "" && addrEthAlum !== "0x0000000000000000000000000000000000000000") {
				tbodyListaAlumnos[i] = (
					<ContractData	key={i}
									drizzle={drizzle}
									drizzleState={drizzleState}
									contract={"UpmAlumnos"}
									method={"mapAlumnosAddr"}
									methodArgs={[addrEthAlum]}
									render={(alumno) => (
										<tr>
											<td>
												<Link to={`/gestion-alumnos/alumno/${alumno.addrEthAlum}`}>{alumno.addrEthAlum}</Link>
												<button onClick={() => copyToClipboard(addrEthAlum)}>Copy</button>
											</td>

											<td>{alumno.nombre}</td>

											<td>{alumno.apellidos}</td>

											<td>{alumno.correoUpm}</td>

											{
												this.props.owner === this.props.miDireccion
												?
													<td>
														<button onClick={() => this.eliminarAlumno(addrEthAlum)}>Eliminar</button>
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

		const hayAlgunAlumno = this.props.numAlumnos > 0;

		if (hayAlgunAlumno) {
			return (
				<>
					<h3>Lista de alumnos añadidos</h3>

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
		} else {
			return (
				<h3>No hay ningún alumno añadido</h3>
			);
		}
	}

}

export default AsignaturaListaAlumnos;