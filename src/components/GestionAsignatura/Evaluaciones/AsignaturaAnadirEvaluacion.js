import React from 'react';

import {crearObjetoFromFormData, dateStringToTimestamp} from '../../../utils/funciones.js';

class AsignaturaAnadirEvaluacion extends React.Component {

	state = {
		ready: false,
	};

	componentDidMount() {
		this.setState({ready: true});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {

	}

	crearEvaluacion = (event) => {
		event.preventDefault();

		// obtener valores del formulario
		const formData = new FormData(event.target);
		let objFormData = crearObjetoFromFormData(formData);
		let {nombre, fecha, obligatoria, notaMinima, porcAportacion, tipoConvocatoria} = objFormData;
		fecha = dateStringToTimestamp(fecha);

		// limpiar formulario
		// https://stackoverflow.com/questions/43922508/clear-and-reset-form-input-fields/43922523#43922523
		document.getElementById('crear-evaluacion-form').reset();

		// mandar transacción
		const {drizzle, drizzleState} = this.props;

		const instance = drizzle.contracts[this.props.contractName];

		const txId = instance.methods.crearEvaluacion.cacheSend(
			nombre, fecha, obligatoria, notaMinima, porcAportacion, tipoConvocatoria,
			{from: this.props.miDireccion}
		);
	}

	render() {
		const {drizzle, drizzleState} = this.props;

        const instanceState = drizzleState.contracts[this.props.contractName];
        if (!this.state.ready || !instanceState || !instanceState.initialized) {
            return <span>Initializing...</span>;
        }

        if (this.props.isOwner || this.props.isCoordinador || this.props.isProfesor) {
        	return (
        		<li className="list-group-item mt-3">
					<h5>Crear evaluación</h5>
					<form onSubmit={this.crearEvaluacion} id="crear-evaluacion-form">
						<div className="container p-0">
							<div className="form-group">
								<div className="row">
									<div className="col-sm-12">
										<label htmlFor="nombre">Nombre de la evaluación</label>
										<input type="text" className="form-control" id="nombre" name="nombre" />
									</div>
								</div>
							</div>

							<div className="form-group">
								<div className="row">
									<div className="col-sm-12 col-md-4">
										<label htmlFor="fecha">Fecha</label>
										<input type="date" className="form-control" id="fecha" name="fecha" />
									</div>

									<div className="col-sm-12 col-md-4">
										<label htmlFor="notaMinima">Nota mínima (0-100)</label>
										<input type="number" className="form-control"  id="notaMinima" name="notaMinima" />
									</div>

									<div className="col-sm-12 col-md-4">
										<label htmlFor="porcAportacion">Porcentaje de aportación (0-100)</label>
										<input type="number" className="form-control" id="porcAportacion" name="porcAportacion" />
									</div>
								</div>
							</div>

							<div className="form-group">
								<div className="row">
									<div className="col-sm-12 col-md-4">
										<label htmlFor="obligatoria">¿Es obligatoria?</label>

										<div className="input-group">
											<div className="form-check form-check-inline">
												<input type="radio" className="form-check-input" name="obligatoria" id="obligatoria0" value="0" checked />
												<label className="form-check-label" for="semestre1">Obligatoria</label>
											</div>

											<div className="form-check form-check-inline">
												<input type="radio" className="form-check-input" name="obligatoria" id="obligatoria1" value="1" />
												<label className="form-check-label" for="semestre2">No obligatoria</label>
											</div>
										</div>
									</div>

									<div className="col-sm-12 col-md-8">
										<label htmlFor="tipoConvocatoria">Tipo de convocatoria</label>

										<div className="input-group">
											<div className="form-check form-check-inline">
												<input type="radio" className="form-check-input" name="tipoConvocatoria" id="tipoConvocatoria0" value="0" checked />
												<label className="form-check-label" for="semestre1">Ordinaria Continua</label>
											</div>

											<div className="form-check form-check-inline">
												<input type="radio" className="form-check-input" name="tipoConvocatoria" id="tipoConvocatoria1" value="1" />
												<label className="form-check-label" for="semestre2">Ordinaria Final</label>
											</div>

											<div className="form-check form-check-inline">
												<input type="radio" className="form-check-input" name="tipoConvocatoria" id="tipoConvocatoria2" value="2" />
												<label className="form-check-label" for="semestre2">Extraordinaria</label>
											</div>
										</div>
									</div>
								</div>
							</div>
							
							<button type="submit" className="btn btn-primary">Crear evaluación</button>
						</div>
					</form>
        		</li>
        	);
        } else {
        	return (
				<span></span>
			);
        }

		return (
			<>
			</>
		);
	}

}

export default AsignaturaAnadirEvaluacion;