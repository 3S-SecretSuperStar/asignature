import React from 'react';

import {Link} from "react-router-dom";

import {newContextComponents} from "drizzle-react-components";

import {copyToClipboard} from '../../../utils/funciones.js';

const {ContractData} = newContextComponents;

class AsignaturaListaNotas extends React.Component {

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

	eliminarNota = (addrEthAlum, indexEval) => {
		// mandar transacción
		const instance = this.props.drizzle.contracts[this.props.contractName];

		const txId = instance.methods.borrarNota.cacheSend(
			addrEthAlum, indexEval,
			{from: this.props.miDireccion}
		);
	}

	render() {
		const {drizzle, drizzleState, isOwner, isCoordinador, isProfesor} = this.props;

		const instanceState = drizzleState.contracts[this.props.contractName];
		if (!this.state.ready || !instanceState || !instanceState.initialized) {
			return <span>Initializing...</span>;
		}

		const contractAdress = this.props.contractName.replace("UpmAsignatura-", "");

		let theadtr = [];
		for (let i = 0; i < this.props.numEvaluaciones; i++) {
			theadtr.push(
				<th>
					<Link to={`/gestion-asignatura/${contractAdress}/evaluaciones`}>
						E<sub>{i}</sub> (
						<ContractData	drizzle={drizzle}
										drizzleState={drizzleState}
										contract={this.props.contractName}
										method={"listaEvaluaciones"}
										methodArgs={[i]}
										render={(evaluacion) => (
											<span>{evaluacion.nombre}</span>
										)} />
						)
					</Link>
				</th>
			);
		}

		let tbodyListaNotas = [];
		for (let i = 0; i < this.props.alumnosLength; i++) {
			let addrEthAlum = instanceState.listaAlumnos[this.state.alumnosAddrsKeys[i]];
			addrEthAlum = addrEthAlum ? addrEthAlum.value : "";

			if (addrEthAlum != "" && addrEthAlum != "0x0000000000000000000000000000000000000000") {
				let notasUnAlumno = [];
				for (let j = 0; j < this.props.numEvaluaciones; j++) {
					let eliminarNota = [];
					if (isOwner || isCoordinador || isProfesor) {
						eliminarNota = <button onClick={() => this.eliminarNota(addrEthAlum, j)}>Eliminar</button>;
					}
					notasUnAlumno.push(
						<ContractData	drizzle={drizzle}
										drizzleState={drizzleState}
										contract={this.props.contractName}
										method={"mapNotas"}
										methodArgs={[addrEthAlum, j]}
										render={(nota) => (
											<td>
												{nota.tipoNota === "0" ? "NP" : ""}
					                            {nota.tipoNota === "1" ? (nota.calificacion / 10).toFixed(1) : ""}
					                            {nota.tipoNota === "2" ? (nota.calificacion / 10).toFixed(1) + " (MH)" : ""}
					                            {(nota.tipoNota === "1" || nota.tipoNota === "2")  ? eliminarNota : ""}
											</td>
										)} />
					);
				}

				tbodyListaNotas[i] = (
					<tr>
						<td>
							A<sub>{i}</sub> (<Link to={`/gestion-alumnos/alumno/${addrEthAlum}`}>{addrEthAlum}</Link>)
							<button onClick={() => copyToClipboard(addrEthAlum)}>Copy</button>
						</td>
						{notasUnAlumno}
					</tr>
				);
			}
		}

		const hayAlgunaNota = this.props.numNotas > 0;

		if (hayAlgunaNota) {
			return (
				<>
					<h3>Lista de notas creadas</h3>

					<p>{this.props.numNotas} notas</p>

					<table>
						<thead>
							<tr>
								<th>A\E</th>
								{theadtr}
							</tr>
						</thead>
						<tbody>
							{tbodyListaNotas}
						</tbody>
					</table>
				</>
			);
		} else {
			return (
				<h3>No hay ninguna nota creada</h3>
			);
		}

	}

}

export default AsignaturaListaNotas;