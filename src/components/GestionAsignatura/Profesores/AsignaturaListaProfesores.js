import React from 'react';

import {Link} from "react-router-dom";

import {newContextComponents} from "drizzle-react-components";

import {copyToClipboard, shortenEthAddress} from '../../../utils/funciones.js';

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

	eliminarProfesor = (addrEthProf) => {
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

			if (addrEthProf !== "" && addrEthProf !== "0x0000000000000000000000000000000000000000") {
				tbodyListaProfesores[i] = (
					<ContractData	key={i}
									drizzle={drizzle}
									drizzleState={drizzleState}
									contract={"UpmProfesores"}
									method={"mapProfesoresAddr"}
									methodArgs={[addrEthProf]}
									render={(profesor) => (
										<tr>
											<td>
												<Link to={`/gestion-profesores/profesor/${profesor.addrEthProf}`}>
													<span className="code">{shortenEthAddress(profesor.addrEthProf)}</span>
												</Link>
												<button type="button" className="btn btn-outline-primary btn-copy" onClick={() => copyToClipboard(addrEthProf)}>
													<i className="far fa-copy fa-lg"></i>
												</button>
												{
													this.props.owner === this.props.miDireccion
													?
													<button type="button" className="btn btn-outline-danger btn-delete" onClick={() => this.eliminarProfesor(addrEthProf)}>
														<i className="fas fa-trash-alt fa-lg" title="Eliminar profesor" style={{color: "red"}}></i>
													</button>
													:
													""
												}
												{profesor.addrEthProf === this.props.miDireccion ? <span class="badge badge-light">yo</span> : ""}
											</td>

											<td>{profesor.nombre}</td>

											<td>{profesor.apellidos}</td>

											<td>{profesor.correoUpm}</td>											
										</tr>
									)}
					/>
				);
			}
		}

		const hayAlgunProfesor = this.props.numProfesores > 0;

		if (hayAlgunProfesor) {
			return (
				<>
					<h5>Lista de profesores añadidos</h5>

					<p>{this.props.numProfesores} profesores</p>

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
								{tbodyListaProfesores}
							</tbody>
						</table>
					</div>
				</>
			);
		} else {
			return (
				<h5>No hay ningún profesor añadido</h5>
			);
		}
	}

}

export default AsignaturaListaProfesores;