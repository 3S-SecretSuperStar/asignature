import React from 'react';

import {crearObjetoFromFormData} from '../../utils/funciones.js';
import {jsonInterface, bytecode} from '../../utils/varios.js';

class DesplegarYAnadirAsignatura extends React.Component {

	state = {
		ready: false,
	};

	componentDidMount() {
		this.setState({ready: true});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		
	}

	desplegarYAnadirAsignatura = async (event) => {
		event.preventDefault();

		const formData = new FormData(event.target);
		let objFormData = crearObjetoFromFormData(formData);
		let {addrEthCoord, nombreAsig, cursoAcad, codigoAsig, titulacion, numCreditos, semestre, cursoAno, tipoAsig} = objFormData;

		// https://stackoverflow.com/questions/43922508/clear-and-reset-form-input-fields/43922523#43922523
		document.getElementById('desplegar-y-anadir-asignatura-form').reset();

		const {drizzle} = this.props;
		const instance = drizzle.contracts.UpmCatalogo;

		let contrato = new drizzle.web3.eth.Contract(jsonInterface);

		let contratoInstance = await contrato
		.deploy({
			data: bytecode,
			arguments: [addrEthCoord, nombreAsig, cursoAcad, codigoAsig, titulacion, numCreditos, semestre, cursoAno, tipoAsig]
		})
		.send({from: this.props.miDireccion});

		let addrAsignaturaDesplegada = contratoInstance.options.address;

		const nombreAMostrar = titulacion + " - " + nombreAsig;
		instance.methods.anadirAsignatura.cacheSend(addrAsignaturaDesplegada, nombreAMostrar);
	}

	render() {
		const {drizzleState} = this.props;

		const instanceState = drizzleState.contracts.UpmCatalogo;
		if (!this.state.ready || !instanceState || !instanceState.initialized) {
			return <span>Initializing...</span>;
		}

		return (
			<>
				<h4>Desplegar asignatura y añadirla al catálogo</h4>
				<form onSubmit={this.desplegarYAnadirAsignatura} id="desplegar-y-anadir-asignatura-form">
					<div className="container p-0">
						<div className="form-group">
							<div className="row">
								<div className="col-12">
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
							</div>
						</div>

						<div className="form-group">
							<div className="row">
								<div className="col-12 col-lg-5 col-md-6">
									<label htmlFor="nombreAsig">Nombre de la asignatura</label>
									<input type="text" className="form-control" id="nombreAsig" name="nombreAsig" />
								</div>

								<div className="col-12 col-lg-2 col-md-3">
									<label htmlFor="cursoAcad">Curso académico</label>
									<input type="text" className="form-control" id="cursoAcad" name="cursoAcad" />
								</div>
								
								<div className="col-4 col-lg-2 col-md-3">
									<label htmlFor="numCreditos">Nº de créditos</label>
									<input type="number" className="form-control" id="numCreditos" name="numCreditos" min="0" step="1" />
								</div>

								<div className="col-8 col-lg-3 col-md-6">
									<label htmlFor="codigoAsig">Código de la asignatura</label>
									<input type="text" className="form-control" id="codigoAsig" name="codigoAsig" />
								</div>

								<div className="col-8 col-lg-4 col-md-6">
									<label htmlFor="titulacion">Titulación</label>
									<input type="text" className="form-control" id="titulacion" name="titulacion" />
								</div>

								<div className="col-4 col-lg-1 col-md-2">
									<label htmlFor="semestre">Semestre</label>

									<div className="input-group">
										<div className="form-check form-check-inline">
											<input type="radio" name="semestre" className="form-check-input" id="semestre1" value="1" />
											<label className="form-check-label" htmlFor="semestre1">1</label>
										</div>

										<div className="form-check form-check-inline">
										<input type="radio" name="semestre" className="form-check-input" id="semestre2" value="2" />
											<label className="form-check-label" htmlFor="semestre2">2</label>
										</div>
									</div>
								</div>

								<div className="col-7 col-lg-4 col-md-5">
									<label htmlFor="cursoAno">Curso</label>

									<div className="input-group">
										<div className="form-check form-check-inline">
											<input type="radio" name="cursoAno" className="form-check-input" id="cursoAno1" value="1" />
											<label className="form-check-label" htmlFor="cursoAno1">1</label>
										</div>
										
										<div className="form-check form-check-inline">
											<input type="radio" name="cursoAno" className="form-check-input" id="cursoAno2" value="2" />
											<label className="form-check-label" htmlFor="cursoAno2">2</label>
										</div>
										
										<div className="form-check form-check-inline">
											<input type="radio" name="cursoAno" className="form-check-input" id="cursoAno3" value="3" />
											<label className="form-check-label" htmlFor="cursoAno3">3</label>
										</div>
										
										<div className="form-check form-check-inline">
											<input type="radio" name="cursoAno" className="form-check-input" id="cursoAno4" value="4" />
											<label className="form-check-label" htmlFor="cursoAno4">4</label>
										</div>
										
										<div className="form-check form-check-inline">
											<input type="radio" name="cursoAno" className="form-check-input" id="cursoAno5" value="5" />
											<label className="form-check-label" htmlFor="cursoAno5">5</label>
										</div>
										
										<div className="form-check form-check-inline">
											<input type="radio" name="cursoAno" className="form-check-input" id="cursoAno6" value="6" />
											<label className="form-check-label" htmlFor="cursoAno6">6</label>
										</div>
									</div>
								</div>

								<div className="col-5 col-lg-3 col-md-5">
									<label>Tipo de asignatura</label>

									<div className="input-group">
										<div className="form-check form-check-inline">
											<input type="radio" name="tipoAsig" className="form-check-input" id="tipoAsig0" value="0" />
											<label className="form-check-label" htmlFor="tipoAsig0">Obligatoria</label>
										</div>

										<div className="form-check form-check-inline">
											<input type="radio" name="tipoAsig" className="form-check-input" id="tipoAsig1" value="1" />
											<label className="form-check-label" htmlFor="tipoAsig1">Optativa</label>
										</div>
									</div>
								</div>
							</div>
						</div>
						
						<button type="submit" className="btn btn-primary margin-bottom-2">Desplegar asignatura</button>
					</div>
				</form>
			</>
		);
	}

}

export default DesplegarYAnadirAsignatura;