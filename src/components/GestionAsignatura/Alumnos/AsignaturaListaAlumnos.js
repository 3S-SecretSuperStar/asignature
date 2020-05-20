import React from 'react';

import {Link} from "react-router-dom";

import {newContextComponents} from "drizzle-react-components";

import {copyToClipboard, shortenEthAddress} from '../../../utils/funciones.js';

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
		const instance = this.props.drizzle.contracts[this.props.contractName];

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
												<Link to={`/gestion-alumnos/alumno/${alumno.addrEthAlum}`}>
													<span className="code">{shortenEthAddress(alumno.addrEthAlum)}</span>
												</Link>
												<button type="button" className="btn btn-outline-primary btn-copy" onClick={() => copyToClipboard(addrEthAlum)}>
													<i className="far fa-copy fa-lg"></i>
												</button>
												{
													this.props.owner === this.props.miDireccion
													?
													<button type="button" className="btn btn-outline-danger btn-delete" onClick={() => this.eliminarAlumno(addrEthAlum)}>
														<i className="fas fa-trash-alt fa-lg" title="Eliminar alumno" style={{color: "red"}}></i>
													</button>
													:
													""
												}
												{alumno.addrEthAlum === this.props.miDireccion ? <span class="badge badge-light">yo</span> : ""}
											</td>

											<td>{alumno.nombre}</td>

											<td>{alumno.apellidos}</td>

											<td>{alumno.correoUpm}</td>
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
					<h5>Lista de alumnos añadidos</h5>

					<p>{this.props.numAlumnos} alumnos</p>

					<div className="table-responsive">
						<table className="table table-sm table-bordered table-hover">
							<thead className="thead-dark">
								<tr>
									<th>Dirección</th>

									<th>Nombre</th>

									<th>Apellidos</th>

									<th>Correo</th>
								</tr>
							</thead>
							<tbody>
								{tbodyListaAlumnos}
							</tbody>
						</table>
					</div>
				</>
			);
		} else {
			return (
				<h5>No hay ningún alumno añadido</h5>
			);
		}
	}

}

export default AsignaturaListaAlumnos;