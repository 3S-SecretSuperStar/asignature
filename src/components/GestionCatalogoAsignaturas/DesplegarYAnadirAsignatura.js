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
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts.UpmCatalogo;
		if (!instanceState || !instanceState.initialized) return;

		const instance = drizzle.contracts.UpmCatalogo;
	}

	desplegarYAnadirAsignatura = async (event) => {
		event.preventDefault();
		console.log('Has pulsado el botón para desplegar y añadir una asignatura');

		// obtener valores del formulario 
		const formData = new FormData(event.target);
		let objFormData = crearObjetoFromFormData(formData);
		console.log('DesplegarYAnadirAsignatura - desplegarYAnadirAsignatura - objFormData:', objFormData);
		let {addrEthCoord, nombreAsig, cursoAcad, codigoAsig, titulacion, numCreditos, semestre, cursoAno, tipoAsig} = objFormData;

		// limpiar formulario
		// https://stackoverflow.com/questions/43922508/clear-and-reset-form-input-fields/43922523#43922523
		document.getElementById('desplegar-y-anadir-asignatura-form').reset();

		// coger drizzle y drizzleState
		const {drizzle, drizzleState} = this.props;
		const instance = drizzle.contracts.UpmCatalogo;

		// desplegar contrato
		let contrato = new drizzle.web3.eth.Contract(jsonInterface);

		let estimGas = await contrato
		.deploy({
			data: bytecode,
			arguments: [addrEthCoord, nombreAsig, cursoAcad, codigoAsig, titulacion, numCreditos, semestre, cursoAno, tipoAsig]
		}).estimateGas({from: this.props.miDireccion});
		console.log('estimGas:', estimGas);

		let contratoInstance = await contrato
		.deploy({
			data: bytecode,
			arguments: [addrEthCoord, nombreAsig, cursoAcad, codigoAsig, titulacion, numCreditos, semestre, cursoAno, tipoAsig]
		})
		.send({from: this.props.miDireccion});

		let addrAsignaturaDesplegada = contratoInstance.options.address;
		console.log(codigoAsig, 'desplegada en:', addrAsignaturaDesplegada);

		// añadir asignatura al ćatálogo
		const txId = instance.methods.anadirAsignatura.cacheSend(addrAsignaturaDesplegada, titulacion + " - " + nombreAsig);
	}

	render() {
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts.UpmCatalogo;
		if (!this.state.ready || !instanceState || !instanceState.initialized) {
			return <span>Initializing...</span>;
		}

		return (
			<>
				<h3>Desplegar asignatura y añadirla al catálogo</h3>
				<form onSubmit={this.desplegarYAnadirAsignatura} id="desplegar-y-anadir-asignatura-form">
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
					
					<div className="form-group">
						<label htmlFor="nombreAsig">Nombre de la asignatura</label>
						<input type="text" className="form-control" id="nombreAsig" name="nombreAsig" />
					</div>
					
					<div className="form-group">
						<label htmlFor="cursoAcad">Curso académico</label>
						<input type="text" className="form-control" id="cursoAcad" name="cursoAcad" />
					</div>
					
					<div className="form-group">
						<label htmlFor="codigoAsig">Código de la asignatura</label>
						<input type="text" className="form-control" id="codigoAsig" name="codigoAsig" />
					</div>

					<div className="form-group">
						<label htmlFor="titulacion">Titulación</label>
						<input type="text" className="form-control" id="titulacion" name="titulacion" />
					</div>
					
					<div className="form-group">
						<label htmlFor="numCreditos">Número de créditos</label>
						<input type="number" className="form-control" id="numCreditos" name="numCreditos" />
					</div>

					<div className="form-group">
						<label htmlFor="semestre">Semestre</label>

						<div className="input-group">
							<div className="form-check form-check-inline">
								<input type="radio" name="semestre" className="form-check-input" id="semestre1" value="1" />
								<label className="form-check-label" for="semestre1">1</label>
							</div>

							<div className="form-check form-check-inline">
							<input type="radio" name="semestre" className="form-check-input" id="semestre2" value="2" />
								<label className="form-check-label" for="semestre2">2</label>
							</div>
						</div>
					</div>
					
					<div className="form-group">
						<label htmlFor="cursoAno">Curso</label>

						<div className="input-group">
							<div className="form-check form-check-inline">
								<input type="radio" name="cursoAno" className="form-check-input" id="cursoAno1" value="1" />
								<label className="form-check-label" for="cursoAno1">1</label>
							</div>
							
							<div className="form-check form-check-inline">
								<input type="radio" name="cursoAno" className="form-check-input" id="cursoAno2" value="2" />
								<label className="form-check-label" for="cursoAno2">2</label>
							</div>
							
							<div className="form-check form-check-inline">
								<input type="radio" name="cursoAno" className="form-check-input" id="cursoAno3" value="3" />
								<label className="form-check-label" for="cursoAno3">3</label>
							</div>
							
							<div className="form-check form-check-inline">
								<input type="radio" name="cursoAno" className="form-check-input" id="cursoAno4" value="4" />
								<label className="form-check-label" for="cursoAno4">4</label>
							</div>
							
							<div className="form-check form-check-inline">
								<input type="radio" name="cursoAno" className="form-check-input" id="cursoAno5" value="5" />
								<label className="form-check-label" for="cursoAno5">5</label>
							</div>
							
							<div className="form-check form-check-inline">
								<input type="radio" name="cursoAno" className="form-check-input" id="cursoAno6" value="6" />
								<label className="form-check-label" for="cursoAno6">6</label>
							</div>
						</div>
					</div>

					<div className="form-group">
						<label>Tipo de asignatura</label>

						<div className="input-group">
							<div className="form-check form-check-inline">
								<input type="radio" name="tipoAsig" className="form-check-input" id="tipoAsig0" value="0" />
								<label className="form-check-label" for="tipoAsig0">Obligatoria</label>
							</div>

							<div className="form-check form-check-inline">
								<input type="radio" name="tipoAsig" className="form-check-input" id="tipoAsig1" value="1" />
								<label className="form-check-label" for="tipoAsig1">Optativa</label>
							</div>
						</div>
					</div>
					
					<button type="submit" className="btn btn-primary">Desplegar asignatura</button>
				</form>
			</>
		);
	}

}

export default DesplegarYAnadirAsignatura;