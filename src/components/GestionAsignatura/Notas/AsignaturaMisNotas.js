import React from 'react';

import {Link} from "react-router-dom";

import {newContextComponents} from "drizzle-react-components";

import NavbarAsignatura from '../NavbarAsignatura';

import {crearObjetoFromFormData, copyToClipboard} from '../../../utils/funciones.js';

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
					<td>
						<Link to={`/gestion-alumnos/alumno/${this.props.miDireccion}`}>Yo ({this.props.miDireccion})</Link>
						<button type="button" className="btn btn-outline-primary" onClick={() => copyToClipboard(this.props.miDireccion)}>
							<i className="far fa-copy fa-lg"></i>
						</button>
					</td>
					{notasUnAlumno}
				</tr>
			);

			listaNotas =	<div className="table-responsive">
								<table className="table table-sm table-bordered table-hover">
									<thead className="thead-dark">
										<tr>
											<th>A\E</th>
											{theadtr}
										</tr>
									</thead>

									<tbody>
										{tbodyListaNotas}
									</tbody>
								</table>
							</div>;
		} else {
			listaNotas = <p>No hay ninguna nota mía</p>
		}

		if (isAlumno) {
			return (
				<>
					<NavbarAsignatura	addrEthAsig={this.props.addrEthAsig}
										isOwner={this.props.isOwner}
										isCoordinador={this.props.isCoordinador}
										isProfesor={this.props.isProfesor}
										isAlumno={this.props.isAlumno}
										active={"misNotas"} />

					<h5>Mis notas</h5>

					{listaNotas}
				</>
			);
		} else {
			return (
				<NavbarAsignatura	addrEthAsig={this.props.addrEthAsig}
									isOwner={this.props.isOwner}
									isCoordinador={this.props.isCoordinador}
									isProfesor={this.props.isProfesor}
									isAlumno={this.props.isAlumno}
									active={"misNotas"} />
			);
		}
		
	}

}

export default AsignaturaMisNotas;