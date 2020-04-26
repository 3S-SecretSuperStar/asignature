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
			actualizarCoordinador = <li className="list-group-item mt-3">
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
													<input type="text" className="form-control code" id="addrEthCoord" name="addrEthCoord" />
						                        </div>
											</div>

											<button type="submit" className="btn btn-primary">Actualizar coordinador</button>
										</form>
									</li>;
		}

		let actualizarOwner = [];
		if (this.props.isOwner) {
			actualizarOwner =	<li className="list-group-item mt-3 border-top-width">
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
												<input type="text" className="form-control code" id="addrEthOwner" name="addrEthOwner" />
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
                        <h4>Datos de la asignatura</h4>
                    </div>

                    <div className="card-body">
                    	<ul className="list-group list-group-flush">
                    		<div className="container">
	                    		<li className="list-group-item">
	                    			<div className="row">
	                    				<div className="col-12 col-md-4 col-lg-3">
	                    					<strong>Dirección:</strong>
										</div>
										<div className="col-12 col-md-8 col-lg-9">
	                    					<span className="code">{this.props.addrEthAsig}</span>
			                    			<button type="button" className="btn btn-outline-primary btn-copy" onClick={() => copyToClipboard(this.props.addrEthAsig)}>
												<i className="far fa-copy fa-lg"></i>
											</button>
										</div>
	                    			</div>

	                    		</li>

	                    		<li className="list-group-item">
	                    			<div className="row">
	                    				<div className="col-12 col-md-4 col-lg-3">
	                    					<strong>Owner:</strong>
										</div>
										<div className="col-12 col-md-8 col-lg-9">
			                    			<ContractData 	drizzle={drizzle}
															drizzleState={drizzleState}
															contract={contractName}
															method={"owner"}
															render={(owner) => (
																<span>
																	<span className="code">{owner}</span>
																	<button type="button" className="btn btn-outline-primary btn-copy" onClick={() => copyToClipboard(this.props.addrEthAsig)}>
																		<i className="far fa-copy fa-lg"></i>
																	</button>
																	{owner === this.props.miDireccion ? <span class="badge badge-light">yo</span> : ""}
																</span>
															)} />
										</div>
	                    			</div>
	                    		</li>

	                    		<li className="list-group-item">
	                    			<div className="row">
	                    				<div className="col-12 col-md-4 col-lg-3">
	                    					<strong>Coordinador:</strong>
										</div>
										<div className="col-12 col-md-8 col-lg-9">
											<ContractData 	drizzle={drizzle}
															drizzleState={drizzleState}
															contract={contractName}
															method={"coordinador"}
															render={(coordinador) => (
																<span>
																	<span className="code">{coordinador}</span>
																	<button type="button" className="btn btn-outline-primary btn-copy" onClick={() => copyToClipboard(this.props.addrEthAsig)}>
																		<i className="far fa-copy fa-lg"></i>
																	</button>
																	{coordinador === this.props.miDireccion ? <span class="badge badge-light">yo</span> : ""}
																</span>
															)} />
										</div>
	                    			</div>
	                    		</li>

	                    		<li className="list-group-item">
	                    			<div className="row">
	                    				<div className="col-12 col-md-4 col-lg-3">
	                    					<strong>Nombre de la asignatura:</strong>
										</div>
										<div className="col-12 col-md-8 col-lg-9">
											<ContractData 	drizzle={drizzle}
															drizzleState={drizzleState}
															contract={contractName}
															method={"nombreAsignatura"}
															render={(nombreAsignatura) => (
																<span>
																	 {nombreAsignatura}
																</span>
															)} />
										</div>
	                    			</div>
	                    		</li>

	                    		<li className="list-group-item">
	                    			<div className="row">
	                    				<div className="col-12 col-md-4 col-lg-3">
	                    					<strong>Curso acádemico:</strong>
										</div>
										<div className="col-12 col-md-8 col-lg-9">
											<ContractData 	drizzle={drizzle}
															drizzleState={drizzleState}
															contract={contractName}
															method={"cursoAcademico"}
															render={(cursoAcademico) => (
																<span>
																	 {cursoAcademico}
																</span>
															)} />
										</div>
	                    			</div>
	                    		</li>

	                    		<li className="list-group-item">
	                    			<div className="row">
	                    				<div className="col-12 col-md-4 col-lg-3">
	                    					<strong>Código de la asigatura:</strong>
										</div>
										<div className="col-12 col-md-8 col-lg-9">
											<ContractData 	drizzle={drizzle}
															drizzleState={drizzleState}
															contract={contractName}
															method={"codigoAsignatura"}
															render={(codigoAsignatura) => (
																<span>
																	 {codigoAsignatura}
																</span>
															)} />
										</div>
	                    			</div>
	                    		</li>

	                    		<li className="list-group-item">
	                    			<div className="row">
	                    				<div className="col-12 col-md-4 col-lg-3">
	                    					<strong>Titulación:</strong>
										</div>
										<div className="col-12 col-md-8 col-lg-9">
											<ContractData 	drizzle={drizzle}
															drizzleState={drizzleState}
															contract={contractName}
															method={"titulacion"}
															render={(titulacion) => (
																<span>
																	 {titulacion}
																</span>
															)} />
										</div>
	                    			</div>
	                    		</li>

	                    		<li className="list-group-item">
	                    			<div className="row">
	                    				<div className="col-12 col-md-4 col-lg-3">
	                    					<strong>Nº créditos:</strong>
										</div>
										<div className="col-12 col-md-8 col-lg-9">
											<ContractData 	drizzle={drizzle}
															drizzleState={drizzleState}
															contract={contractName}
															method={"numCreditos"}
															render={(numCreditos) => (
																<span>
																	 {numCreditos}
																</span>
															)} />
										</div>
	                    			</div>
	                    		</li>

	                    		<li className="list-group-item">
	                    			<div className="row">
	                    				<div className="col-12 col-md-4 col-lg-3">
	                    					<strong>Semestre:</strong>
										</div>
										<div className="col-12 col-md-8 col-lg-9">
											<ContractData 	drizzle={drizzle}
															drizzleState={drizzleState}
															contract={contractName}
															method={"semestre"}
															render={(semestre) => (
																<span>
																	 {semestre}
																</span>
															)} />
										</div>
	                    			</div>
	                    		</li>

	                    		<li className="list-group-item">
	                    			<div className="row">
	                    				<div className="col-12 col-md-4 col-lg-3">
	                    					<strong>Curso:</strong>
										</div>
										<div className="col-12 col-md-8 col-lg-9">
											<ContractData 	drizzle={drizzle}
															drizzleState={drizzleState}
															contract={contractName}
															method={"cursoAno"}
															render={(cursoAno) => (
																<span>
																	 {cursoAno}
																</span>
															)} />
										</div>
	                    			</div>
	                    		</li>

	                    		<li className="list-group-item">
	                    			<div className="row">
	                    				<div className="col-12 col-md-4 col-lg-3">
	                    					<strong>Tipo de asignatura:</strong>
										</div>
										<div className="col-12 col-md-8 col-lg-9">
											<ContractData 	drizzle={drizzle}
															drizzleState={drizzleState}
															contract={contractName}
															method={"tipoAsignatura"}
															render={tipoAsignatura => (
																<span>
																	{tipoAsignatura === "0" ? " Obligatoria" : ""}
																	{tipoAsignatura === "1" ? " Optativa" : ""}
																</span>
															)} />
										</div>
	                    			</div>
	                    		</li>

	                    		<li className="list-group-item">
	                    			<div className="row">
	                    				<div className="col-12 col-md-4 col-lg-3">
	                    					<strong>Nº alumnos:</strong>
										</div>
										<div className="col-12 col-md-8 col-lg-9">
											<ContractData 	drizzle={drizzle}
															drizzleState={drizzleState}
															contract={contractName}
															method={"numAlumnos"}
															render={(numAlumnos) => (
																<span>
																	 {numAlumnos}
																</span>
															)} />
										</div>
	                    			</div>
	                    		</li>

	                    		<li className="list-group-item">
	                    			<div className="row">
	                    				<div className="col-12 col-md-4 col-lg-3">
	                    					<strong>Nº profesores:</strong>
										</div>
										<div className="col-12 col-md-8 col-lg-9">
											<ContractData 	drizzle={drizzle}
															drizzleState={drizzleState}
															contract={contractName}
															method={"numProfesores"}
															render={(numProfesores) => (
																<span>
																	 {numProfesores}
																</span>
															)} />
										</div>
	                    			</div>
	                    		</li>

	                    		<li className="list-group-item">
	                    			<div className="row">
	                    				<div className="col-12 col-md-4 col-lg-3">
	                    					<strong>Nº evaluaciones:</strong>
										</div>
										<div className="col-12 col-md-8 col-lg-9">
											<ContractData 	drizzle={drizzle}
															drizzleState={drizzleState}
															contract={contractName}
															method={"numEvaluaciones"}
															render={(numEvaluaciones) => (
																<span>
																	 {numEvaluaciones}
																</span>
															)} />
										</div>
	                    			</div>
	                    		</li>
							</div>
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