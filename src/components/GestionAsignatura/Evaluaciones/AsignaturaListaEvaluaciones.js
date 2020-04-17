import React from 'react';

import {newContextComponents} from "drizzle-react-components";

import {crearObjetoFromFormData} from '../../../utils/funciones.js';

const {ContractData} = newContextComponents;

class AsignaturaListaEvaluaciones extends React.Component {

	state = {
		ready: false,
	};

	componentDidMount() {
		this.setState({
			ready: true,
		});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {

	}

	eliminarEvaluacion = (event) => {
		event.preventDefault();

		console.log('Esta funcionalidad no está implementada.');
	}

	render() {
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts[this.props.contractName];
		if (!this.state.ready || !instanceState || !instanceState.initialized) {
			return <span>Initializing...</span>;
		}

		let tbodyListaEvaluaciones = [];
		for (let i = 0; i < this.props.evaluacionesLength; i++) {
			tbodyListaEvaluaciones[i] = (
				<ContractData	key={i}
								drizzle={drizzle}
								drizzleState={drizzleState}
								contract={this.props.contractName}
								method={"listaEvaluaciones"}
								methodArgs={[i]}
								render={(evaluacion) => (
									<tr>
										<td>{evaluacion.indexEvaluacion}</td>
										<td>
											{evaluacion.tipoConvocatoria === "0" ? "Ord. continua" : ""}
											{evaluacion.tipoConvocatoria === "1" ? "Ord. final" : ""}
											{evaluacion.tipoConvocatoria === "2" ? "Extraordinaria" : ""}
										</td>
										<td>
											{evaluacion.obligatoria === "0" ? "Sí" : ""}
											{evaluacion.obligatoria === "1" ? "No" : ""}
										</td>
										<td>{evaluacion.nombre}</td>
										<td>{evaluacion.fecha ? (new Date(1000 * evaluacion.fecha)).toLocaleString() : ""}</td>
										<td>{evaluacion.porcAportacion}%</td>
										<td>{evaluacion.notaMinima ? (evaluacion.notaMinima / 10).toFixed(1) : ""}</td>
									</tr>
								)} />
			);
		}

		const hayAlgunaEvaluacion = this.props.evaluacionesLength > 0;

		let listaEvaluaciones = [];
		if (hayAlgunaEvaluacion) {
			return (
				<>
					<h3>Lista de evaluaciones creadas</h3>

					<p>{this.props.evaluacionesLength} evaluacionesLength</p>
					<p>{this.props.numEvaluaciones} evaluaciones</p>					

					<table>
						<thead>
							<tr>
								<th>Índice</th>
								<th>Tipo de convocatoria</th>
								<th>Obligatoria</th>
								<th>Nombre</th>
								<th>Fecha (ToDo)</th>
								<th>% aportación</th>
								<th>Nota mínima</th>
							</tr>
						</thead>
						<tbody>
							{tbodyListaEvaluaciones}
						</tbody>
					</table>
				</>
			);
		} else {
			return (
				<h3>No hay ninguna evaluación creada</h3>
			);
		}
	}

}

export default AsignaturaListaEvaluaciones;