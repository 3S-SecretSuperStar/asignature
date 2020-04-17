import React from 'react';

import {Link} from "react-router-dom";

import {newContextComponents} from "drizzle-react-components";

import {crearObjetoFromFormData} from '../../../utils/funciones.js';

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

	eliminarNota = (event) => {
		event.preventDefault();

		// obtener valores del formulario
		const formData = new FormData(event.target);
		let objFormData = crearObjetoFromFormData(formData);
		let {addrEthAlum, indexEval} = objFormData;

		// limpiar formulario
		// https://stackoverflow.com/questions/43922508/clear-and-reset-form-input-fields/43922523#43922523
		document.getElementById('eliminar-nota-individual-form').reset();

		// mandar transacción
		const {drizzle, drizzleState} = this.props;

		const instance = drizzle.contracts[this.props.contractName];

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
						eliminarNota = 	<form onSubmit={this.eliminarNota} id="eliminar-nota-individual-form">
											<input type="hidden" id="addrEthAlum" name="addrEthAlum" value={addrEthAlum} />
											<input type="hidden" id="indexEval" name="indexEval" value={j} />

											<button type="submit">Eliminar</button>
										</form>;
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
					                            {eliminarNota}
											</td>
										)} />
					);
				}

				tbodyListaNotas[i] = (
					<tr>
						<td>A<sub>{i}</sub> (<Link to={`/gestion-alumnos/alumno/${addrEthAlum}`}>{addrEthAlum}</Link>)</td>
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