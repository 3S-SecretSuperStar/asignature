import React from 'react';

import {newContextComponents} from "drizzle-react-components";

import NavbarAsignatura from '../NavbarAsignatura';

import {jsonInterface} from '../../../utils/varios.js';
import {crearObjetoFromFormData, copyToClipboard} from '../../../utils/funciones.js';

const {ContractData} = newContextComponents;

class AsignaturaDatos extends React.Component {

	state = {
		ready: false,
	};

	componentDidMount() {
		this.setState({ready: true});
	}

	componentDidUpdate() {
		
	}

	actualizarCoordinador = (event) => {
		event.preventDefault();

		// obtener valores del formulario
		const formData = new FormData(event.target);
		let objFormData = crearObjetoFromFormData(formData);
		let {addrEthCoord} = objFormData;

		// limpiar formulario
		// https://stackoverflow.com/questions/43922508/clear-and-reset-form-input-fields/43922523#43922523
		document.getElementById('actualizar-coordinador-form').reset();

		// mandar transacción
		const {drizzle, drizzleState} = this.props;

		const instance = drizzle.contracts[this.props.contractName];

		// TODO: comprobar que está el coordinador (profesor) creado

		const txId = instance.methods.actualizarCoordinador.cacheSend(
			addrEthCoord,
			{from: this.props.miDireccion}
		);
	}

	actualizarOwner = (event) => {
		event.preventDefault();

		// obtener valores del formulario
		const formData = new FormData(event.target);
		let objFormData = crearObjetoFromFormData(formData);
		let {addrEthOwner} = objFormData;

		// limpiar formulario
		// https://stackoverflow.com/questions/43922508/clear-and-reset-form-input-fields/43922523#43922523
		document.getElementById('actualizar-owner-form').reset();

		// mandar transacción
		const {drizzle, drizzleState} = this.props;

		const instance = drizzle.contracts[this.props.contractName];

		const txId = instance.methods.actualizarOwner.cacheSend(
			addrEthOwner,
			{from: this.props.miDireccion}
		);
	}

	render() {
		const {drizzle, drizzleState, contractName} = this.props;

		const instanceState = drizzleState.contracts[contractName];
		if (!this.state.ready || !instanceState || !instanceState.initialized) {
			return <span>Initializing...</span>;
		}

		let actualizarCoordinador = [];
		if (this.props.isOwner || this.props.isCoordinador) {
			actualizarCoordinador = <li className="list-group-item">
										<h5>Actualizar coordinador</h5>
										<form onSubmit={this.actualizarCoordinador} id="actualizar-coordinador-form">
											<div className="form-group">
												<label htmlFor="addrEthCoord">Dirección Ethereum del coordinador</label>
												
												<div className="input-group">
						                            <div className="input-group-prepend">
						                                <span className="input-group-text">
						                                    <i className="fab fa-ethereum fa-lg" />
						                                </span>
						                            </div>
													<input type="text" className="form-control" id="addrEthCoord" name="addrEthCoord" />
						                        </div>
											</div>

											<button type="submit" className="btn btn-primary">Actualizar coordinador</button>
										</form>
									</li>;
		}

		let actualizarOwner = [];
		if (this.props.isOwner) {
			actualizarOwner =	<li className="list-group-item">
									<h5>Actualizar owner</h5>
									<form onSubmit={this.actualizarOwner} id="actualizar-owner-form">
										<div className="form-group">
											<label htmlFor="addrEthOwner">Dirección Ethereum del owner</label>
											
											<div className="input-group">
					                            <div className="input-group-prepend">
					                                <span className="input-group-text">
					                                    <i className="fab fa-ethereum fa-lg" />
					                                </span>
					                            </div>
												<input type="text" className="form-control" id="addrEthOwner" name="addrEthOwner" />
					                        </div>
										</div>

										<button type="submit" className="btn btn-primary">Actualizar owner</button>
									</form>
								</li>;
		}

		return (
			<>
				<NavbarAsignatura	addrEthAsig={this.props.addrEthAsig}
									isOwner={this.props.isOwner}
									isCoordinador={this.props.isCoordinador}
									isProfesor={this.props.isProfesor}
									isAlumno={this.props.isAlumno}
									active={"datos"} />

				<div className="card">
					<div className="card-header">
                        <h4>
                            Contrato asignatura {contractName}
                        </h4>
                    </div>

                    <div className="card-body">
                    	<ul className="list-group list-group-flush">
                    		<li className="list-group-item">
                    			<strong>Dirección:</strong> {this.props.addrEthAsig}
                    			<button type="button" className="btn btn-outline-primary btn-copy" onClick={() => copyToClipboard(this.props.addrEthAsig)}>
									<i className="far fa-copy fa-lg"></i>
								</button>
                    		</li>

                    		<li className="list-group-item">
                    			<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"owner"}
												render={(owner) => (
													<span>
														<strong>Owner:</strong> {owner}
														<button type="button" className="btn btn-outline-primary btn-copy" onClick={() => copyToClipboard(this.props.addrEthAsig)}>
															<i className="far fa-copy fa-lg"></i>
														</button>
														{owner === this.props.miDireccion ? <span class="badge badge-light">yo</span> : ""}
													</span>
												)} />
                    		</li>

							<li className="list-group-item">
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"coordinador"}
												render={(coordinador) => (
													<span>
														<strong>Coordinador:</strong> {coordinador}
														<button type="button" className="btn btn-outline-primary btn-copy" onClick={() => copyToClipboard(this.props.addrEthAsig)}>
															<i className="far fa-copy fa-lg"></i>
														</button>
														{coordinador === this.props.miDireccion ? <span class="badge badge-light">yo</span> : ""}
													</span>
												)} />
							</li>

							<li className="list-group-item">
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"nombreAsignatura"}
												render={(nombreAsignatura) => (
													<span>
														<strong>Nombre de la asignatura:</strong> {nombreAsignatura}
													</span>
												)} />
							</li>

							<li className="list-group-item">
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"cursoAcademico"}
												render={(cursoAcademico) => (
													<span>
														<strong>Curso acádemico:</strong> {cursoAcademico}
													</span>
												)} />
							</li>

							<li className="list-group-item">
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"codigoAsignatura"}
												render={(codigoAsignatura) => (
													<span>
														<strong>Código de la asigatura:</strong> {codigoAsignatura}
													</span>
												)} />
							</li>

							<li className="list-group-item">
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"titulacion"}
												render={(titulacion) => (
													<span>
														<strong>Titulación:</strong> {titulacion}
													</span>
												)} />
							</li>

							<li className="list-group-item">
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"numCreditos"}
												render={(numCreditos) => (
													<span>
														<strong>Nº créditos:</strong> {numCreditos}
													</span>
												)} />
							</li>

							<li className="list-group-item">
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"semestre"}
												render={(semestre) => (
													<span>
														<strong>Semestre:</strong> {semestre}
													</span>
												)} />
							</li>

							<li className="list-group-item">
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"cursoAno"}
												render={(cursoAno) => (
													<span>
														<strong>Curso:</strong> {cursoAno}
													</span>
												)} />
							</li>

							<li className="list-group-item">
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"tipoAsignatura"}
												render={tipoAsignatura => (
													<span>
														<strong>Tipo de asignatura:</strong>
														{tipoAsignatura === "0" ? " Obligatoria" : ""}
														{tipoAsignatura === "1" ? " Optativa" : ""}
													</span>
												)} />
							</li>

							<li className="list-group-item">
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"numAlumnos"}
												render={(numAlumnos) => (
													<span>
														<strong>Nº alumnos:</strong> {numAlumnos}
													</span>
												)} />
							</li>

							<li className="list-group-item">
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"numProfesores"}
												render={(numProfesores) => (
													<span>
														<strong>Nº profesores:</strong> {numProfesores}
													</span>
												)} />
							</li>

							<li className="list-group-item">
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"numEvaluaciones"}
												render={(numEvaluaciones) => (
													<span>
														<strong>Nº evaluaciones:</strong> {numEvaluaciones}
													</span>
												)} />
							</li>
                    	</ul>
                    </div>
				</div>

				{actualizarCoordinador}

				{actualizarOwner}
			</>
		);
	}
}

export default AsignaturaDatos;