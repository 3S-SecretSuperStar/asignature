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

		return (
			<>
				<h3>Crear evaluación</h3>
				<form onSubmit={this.crearEvaluacion} id="crear-evaluacion-form">
					<label htmlFor="nombre">Nombre de la evaluación</label>
					<input type="text" id="nombre" name="nombre" />

					<label htmlFor="fecha">Fecha</label>
					<input type="date" id="fecha" name="fecha" />

					<label htmlFor="obligatoria">¿Es obligatoria? (0=No, 1=Sí)</label>
					<select name="obligatoria" id="obligatoria">
						<option value="0">Obligatoria</option>
						<option value="1">Optativa</option>
					</select>

					<label htmlFor="notaMinima">Nota mínima (0-100)</label>
					<input type="text" id="notaMinima" name="notaMinima" />

					<label htmlFor="porcAportacion">Porcentaje de aportación (0-100)</label>
					<input type="text" id="porcAportacion" name="porcAportacion" />

					<label htmlFor="tipoConvocatoria">Tipo de convocatoria (0=Ord. Continua, 1=Ord. Final, 2=Extraordinaria)</label>
					<select name="tipoConvocatoria" id="tipoConvocatoria">
						<option value="0">Ordinaria Continua</option>
						<option value="1">Ordinaria Final</option>
						<option value="2">Extraordinaria</option>
					</select>

					<button type="submit">Crear evaluación</button>
				</form>
			</>
		);
	}

}

export default AsignaturaAnadirEvaluacion;