import React from 'react';

import {newContextComponents} from "drizzle-react-components";

import {copyToClipboard, shortenEthAddress} from '../../utils/funciones.js';

import { Link } from "react-router-dom";

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

	eliminarAsignatura = (addrEthAsignatura) => {
		const instance = this.props.drizzle.contracts.UpmCatalogo;

		instance.methods.eliminarAsignatura.cacheSend(addrEthAsignatura);
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

			if (asignaturaAddr !== "" && asignaturaAddr !== "0x0000000000000000000000000000000000000000") {
				direccionesAsignaturasAnadidas.push(asignaturaAddr);
			}
		}

		let tbodyListaAsignaturas = [];
		for (let i in direccionesAsignaturasAnadidas) {
			let addrEthAsignatura = direccionesAsignaturasAnadidas[i];
			tbodyListaAsignaturas[i] = (
				<tr key={i}>
					<td>
						<Link to={`/gestion-asignatura/${addrEthAsignatura}/datos-asignatura`}>
							<span className="code">{shortenEthAddress(addrEthAsignatura)}</span>
						</Link>
						<button type="button" className="btn btn-outline-primary btn-copy" onClick={() => copyToClipboard(addrEthAsignatura)}>
							<i className="far fa-copy fa-lg"></i>
						</button>
						{
							this.props.owner === this.props.miDireccion
							?
							<button type="button" className="btn btn-outline-danger btn-delete" onClick={() => this.eliminarAsignatura(addrEthAsignatura)}>
								<i className="fas fa-trash-alt fa-lg" title="Eliminar asignatura del catálogo" style={{color: "red"}}></i>
							</button>
							:
							""
						}
					</td>

					<td>
						<ContractData 	drizzle={drizzle}
										drizzleState={drizzleState}
										contract={"UpmCatalogo"}
										method={"mapAsignaturas"}
										methodArgs={[addrEthAsignatura]}
										render={(asignaturaConNombre) => (
											<span>{asignaturaConNombre.nombreAMostrar}</span>
										)} />
					</td>


					<td>
						<Link to={`/gestion-asignatura/${addrEthAsignatura}/alumnos`}>
							<i className="fas fa-sign-out-alt fa-2x d-flex justify-content-center" title="Ir a Alumnos"></i>
						</Link>
					</td>

					<td>
						<Link to={`/gestion-asignatura/${addrEthAsignatura}/profesores`}>
							<i className="fas fa-sign-out-alt fa-2x d-flex justify-content-center" title="Ir a Profesores"></i>
						</Link>
					</td>

					<td>
						<Link to={`/gestion-asignatura/${addrEthAsignatura}/evaluaciones`}>
							<i className="fas fa-sign-out-alt fa-2x d-flex justify-content-center" title="Ir a Evaluaciones"></i>
						</Link>
					</td>
				</tr>
			);
		}

		const hayAlgunaAsignatura = this.props.numAsignaturas > 0;

		if (hayAlgunaAsignatura) {
			return (
				<>
					<h4>Lista de asignaturas</h4>

					<p>{this.props.numAsignaturas} numAsignaturas</p>

					<div className="table-responsive">
						<table className="table table-sm table-bordered table-hover">
							<thead className="thead-dark">
								<tr>
									<th>Dirección</th>
									
									<th>Nombre a mostrar</th>

									<th className="center">Alumnos</th>
									
									<th className="center">Profesores</th>
									
									<th className="center">Evaluaciones</th>
								</tr>	
							</thead>

							<tbody>
								{tbodyListaAsignaturas}
							</tbody>
						</table>
					</div>
				</>
			);
		} else {
			return (
				<h4>No hay ninguna asignatura creada</h4>
			);
		}

	}

}

export default ListaAsignaturas;