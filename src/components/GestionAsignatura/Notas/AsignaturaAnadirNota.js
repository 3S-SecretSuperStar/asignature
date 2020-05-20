import React from 'react';

import {crearObjetoFromFormData} from '../../../utils/funciones.js';

class AsignaturaAnadirNota extends React.Component {

	state = {
		ready: false,
	};

	componentDidMount() {
		this.setState({ready: true});
	}

	componentDidUpdate() {

	}

	crearNota = (event) => {
		event.preventDefault();

		const formData = new FormData(event.target);
		let objFormData = crearObjetoFromFormData(formData);
		let {addrEthAlum, indexEval, tipoNota, calificacion} = objFormData;

		// https://stackoverflow.com/questions/43922508/clear-and-reset-form-input-fields/43922523#43922523
		document.getElementById('crear-nota-form').reset();

		const {drizzle} = this.props;

		const instance = drizzle.contracts[this.props.contractName];

		instance.methods.crearNota.cacheSend(
			addrEthAlum, indexEval, tipoNota, calificacion,
			{from: this.props.miDireccion}
		);
	}

	render() {
		const {drizzleState} = this.props;

        const instanceState = drizzleState.contracts[this.props.contractName];
        if (!this.state.ready || !instanceState || !instanceState.initialized) {
            return <span>Initializing...</span>;
        }

        if (this.props.isOwner || this.props.isCoordinador || this.props.isProfesor) {
        	return (
        		<li className="list-group-item mt-3">
        			<h5>Crear nota</h5>
        			<form onSubmit={this.crearNota} id="crear-nota-form">
        				<div className="container p-0">
        					<div className="form-group">
								<div className="row">
									<div className="col-sm-12">
										<label htmlFor="addrEthAlum">Dirección Ethereum del alumno</label>

										<div className="input-group">
											<div className="input-group-prepend">
												<span className="input-group-text">
				                                    <i className="fab fa-ethereum fa-lg" />
				                                </span>
											</div>
											<input type="text" className="form-control code" id="addrEthAlum" name="addrEthAlum" />
										</div>
									</div>
								</div>
							</div>

							<div className="form-group">
								<div className="row">
									<div className="col-sm-6">
										<label htmlFor="indexEval">Índice de la evaluación</label>
										<input type="number" className="form-control" id="indexEval" name="indexEval" min="0" step="1" />
									</div>

									<div className="col-sm-6">
										<label htmlFor="calificacion">Calificación (0-100)</label>
										<input type="number" className="form-control"  id="calificacion" name="calificacion" min="0" max="100" step="1" />
									</div>
								</div>
							</div>

	        				<div className="form-group">
								<label htmlFor="tipoNota">Tipo de nota</label>

								<div className="input-group">
									<div className="form-check form-check-inline">
										<input type="radio" className="form-check-input" name="tipoNota" id="tipoNota1" value="1" defaultChecked />
										<label className="form-check-label" htmlFor="tipoNota1">Normal</label>
									</div>

									<div className="form-check form-check-inline">
										<input type="radio" className="form-check-input" name="tipoNota" id="tipoNota2" value="2" />
										<label className="form-check-label" htmlFor="tipoNota2">Matrícula de honor (MH)</label>
									</div>

									<div className="form-check form-check-inline">
										<input type="radio" className="form-check-input" name="tipoNota" id="tipoNota0" value="0" />
										<label className="form-check-label" htmlFor="tipoNota0">No presentado (NP)</label>
									</div>
								</div>
	        				</div>
        					
        					<button type="submit" className="btn btn-primary">Crear nota</button>
        				</div>
        			</form>
        		</li>
        	);
        } else {
        	return (
        		<span></span>
        	);
        }
	}

}

export default AsignaturaAnadirNota;