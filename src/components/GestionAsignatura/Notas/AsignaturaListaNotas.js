import React from 'react';

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

	}

	render() {
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts[this.props.contractName];
		if (!this.state.ready || !instanceState || !instanceState.initialized) {
			return <span>Initializing...</span>;
		}

		let theadtr = [];
		//theadtr.push(A\E);
		for (let i = 0; i < this.props.numEvaluaciones; i++) {
			theadtr.push(
				<th>
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
											</td>
										)} />
					);
				}

				tbodyListaNotas[i] = (
					<tr>
						<td>A<sub>{i}</sub> ({addrEthAlum})</td>
						{notasUnAlumno}
					</tr>
				);
			}
		}

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
	}

}

export default AsignaturaListaNotas;