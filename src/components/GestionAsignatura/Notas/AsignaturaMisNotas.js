import React from 'react';

import {newContextComponents} from "drizzle-react-components";

import {crearObjetoFromFormData} from '../../../utils/funciones.js';

const {ContractData} = newContextComponents;

class AsignaturaMisNotas extends React.Component {

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

	render() {
		const {drizzle, drizzleState, isAlumno} = this.props;

		const instanceState = drizzleState.contracts[this.props.contractName];
		if (!this.state.ready || !instanceState || !instanceState.initialized) {
			return <span>Initializing...</span>;
		}

		const hayAlgunaNota = this.props.numNotas > 0;

		let listaNotas = [];
		if (hayAlgunaNota) {
			let theadtr = [];
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

			let notasUnAlumno = [];
			for (let j = 0; j < this.props.numEvaluaciones; j++) {
				notasUnAlumno.push(
					<ContractData	drizzle={drizzle}
									drizzleState={drizzleState}
									contract={this.props.contractName}
									method={"mapNotas"}
									methodArgs={[this.props.miDireccion, j]}
									render={(nota) => (
										<td>
											{nota.tipoNota === "0" ? "NP" : ""}
				                            {nota.tipoNota === "1" ? (nota.calificacion / 10).toFixed(1) : ""}
				                            {nota.tipoNota === "2" ? (nota.calificacion / 10).toFixed(1) + " (MH)" : ""}
										</td>
									)} />
				);
			}

			let tbodyListaNotas = [];
			tbodyListaNotas.push(
				<tr>
					<td>Yo ({this.props.miDireccion})</td>
					{notasUnAlumno}
				</tr>
			);

			listaNotas = <table>
							<thead>
								<tr>
									<th>A\E</th>
									{theadtr}
								</tr>
							</thead>
							<tbody>
								{tbodyListaNotas}
							</tbody>
						</table>;
		} else {
			listaNotas = <h3>No hay ninguna nota mía</h3>
		}

		if (isAlumno) {
			return (
				<>
					<h3>Mis notas</h3>
					<p>Nombre del contrato: {this.props.contractName}</p>

					{listaNotas}
				</>
			);
		} else {
			return (<></>);
		}
		
	}

}

export default AsignaturaMisNotas;