import React from 'react';

import {newContextComponents} from "drizzle-react-components";

import {crearObjetoFromFormData, timestampToDateString} from '../../../utils/funciones.js';

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
										<td className="center">{evaluacion.indexEvaluacion}</td>

										<td className="center">
											{evaluacion.tipoConvocatoria === "0" ? "Ord. continua" : ""}
											{evaluacion.tipoConvocatoria === "1" ? "Ord. final" : ""}
											{evaluacion.tipoConvocatoria === "2" ? "Extraordinaria" : ""}
										</td>

										<td className="center">
											{evaluacion.obligatoria === "0" ? "Sí" : ""}
											{evaluacion.obligatoria === "1" ? "No" : ""}
										</td>

										<td className="center">{evaluacion.nombre}</td>

										<td className="center">{evaluacion.fecha ? timestampToDateString(evaluacion.fecha) : ""}</td>

										<td className="center">{evaluacion.porcAportacion}%</td>

										<td className="center">{evaluacion.notaMinima ? (evaluacion.notaMinima / 10).toFixed(1) : ""}</td>
									</tr>
								)} />
			);
		}

		const hayAlgunaEvaluacion = this.props.evaluacionesLength > 0;

		let listaEvaluaciones = [];
		if (hayAlgunaEvaluacion) {
			return (
				<>
					<h5>Lista de evaluaciones creadas</h5>

					<p>{this.props.evaluacionesLength} evaluacionesLength || {this.props.numEvaluaciones} evaluaciones</p>

					<div className="table-responsive">
						<table className="table table-sm table-bordered table-hover">
							<thead className="thead-dark">
								<tr>
									<th className="center">Índice</th>

									<th className="center">Tipo de convocatoria</th>

									<th className="center">Obligatoria</th>

									<th className="center">Nombre</th>

									<th className="center">Fecha</th>

									<th className="center">% aportación</th>

									<th className="center">Nota mínima</th>
								</tr>
							</thead>

							<tbody>
								{tbodyListaEvaluaciones}
							</tbody>
						</table>
					</div>
				</>
			);
		} else {
			return (
				<h5>No hay ninguna evaluación creada</h5>
			);
		}
	}

}

export default AsignaturaListaEvaluaciones;