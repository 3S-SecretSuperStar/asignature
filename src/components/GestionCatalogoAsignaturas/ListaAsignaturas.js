import React from 'react';

import {newContextComponents} from "drizzle-react-components";

import {copyToClipboard} from '../../utils/funciones.js';

import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";

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
		console.log("Has pulsado el botón para eliminar la asignatura", addrEthAsignatura);

		// coger drizzle y drizzleState
		const {drizzle, drizzleState} = this.props;
		const instance = drizzle.contracts.UpmCatalogo;
		const instanceState = drizzleState.contracts.UpmCatalogo;

		// eliminar asignatura del catálogo
		const txId = instance.methods.eliminarAsignatura.cacheSend(addrEthAsignatura);
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
		console.log('ListaAsignaturas - render - direccionesAsignaturasAnadidas', direccionesAsignaturasAnadidas);
		console.log('ListaAsignaturas - render - contratos vigilados:', Object.keys(drizzle.contracts));

		let tbodyListaAsignaturas = [];
		for (let i in direccionesAsignaturasAnadidas) {
			let addrEthAsignatura = direccionesAsignaturasAnadidas[i];
			tbodyListaAsignaturas[i] = (
				<tr key={i}>
					<td>
						<Link to={`/gestion-asignatura/${addrEthAsignatura}/datos-asignatura`}>{addrEthAsignatura}</Link>
						<button onClick={() => copyToClipboard(addrEthAsignatura)}>Copy</button>
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

					{
						this.props.owner === this.props.miDireccion
						?
							<td>
								<button onClick={() => this.eliminarAsignatura(addrEthAsignatura)}>Eliminar</button>
							</td>
						:
							""
					}

					<td>
						<Link to={`/gestion-asignatura/${addrEthAsignatura}/alumnos`}>Ir</Link>
					</td>

					<td>
						<Link to={`/gestion-asignatura/${addrEthAsignatura}/profesores`}>Ir</Link>
					</td>

					<td>
						<Link to={`/gestion-asignatura/${addrEthAsignatura}/evaluaciones`}>Ir</Link>
					</td>

					<td>
						<Link to={`/gestion-asignatura/${addrEthAsignatura}/notas`}>Ir</Link>
					</td>
				</tr>
			);
		}

		const hayAlgunaAsignatura = this.props.numAsignaturas > 0;

		if (hayAlgunaAsignatura) {
			return (
				<>
					<h3>Lista de asignaturas</h3>

					<Link to="/gestion-asignatura/0x0eA9CE88927AC7CF566Db71f94AcF019A124af29/datos-asignatura">Asignatura desplegada a mano</Link>

					<p>{this.props.asignaturasLength} asignaturasLength</p>
					<p>{this.props.numAsignaturas} numAsignaturas</p>

					<table>
						<thead>
							<tr>
								<th>Dirección</th>
								
								<th>Nombre a mostrar</th>
								
								{
									this.props.owner === this.props.miDireccion
									?
										<th>Eliminar del catálogo</th>
									:
									""
								}
								
								<th>Alumnos</th>
								
								<th>Profesores</th>
								
								<th>Evaluaciones</th>
								
								<th>Notas</th>
							</tr>
						</thead>
						<tbody>
							{tbodyListaAsignaturas}
						</tbody>
					</table>
				</>
			);
		} else {
			return (
				<h3>No hay ninguna asignatura creada</h3>
			);
		}

	}

}

export default ListaAsignaturas;