import React from 'react';

import {crearObjetoFromFormData} from '../../../utils/funciones.js';

class AsignaturaAnadirNota extends React.Component {

	state = {
		ready: false,
	};

	componentDidMount() {
		this.setState({ready: true});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {

	}

	crearNota = (event) => {
		event.preventDefault();

		// obtener valores del formulario
		const formData = new FormData(event.target);
		let objFormData = crearObjetoFromFormData(formData);
		let {addrEthAlum, tipoConvocatoria, indexEval, tipoNota, calificacion} = objFormData;

		// limpiar formulario
		// https://stackoverflow.com/questions/43922508/clear-and-reset-form-input-fields/43922523#43922523
		document.getElementById('crear-nota-form').reset();

		// mandar transacción
		const {drizzle, drizzleState} = this.props;

		const instance = drizzle.contracts[this.props.contractName];

		const txId = instance.methods.crearNota.cacheSend(
			addrEthAlum, tipoConvocatoria, indexEval, tipoNota, calificacion,
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
				<h3>Crear nota</h3>
				<form onSubmit={this.crearNota} id="crear-nota-form">
					<label htmlFor="addrEthAlum">Dirección Ethereum del alumno</label>
					<input type="text" id="addrEthAlum" name="addrEthAlum" />

					<label htmlFor="tipoConvocatoria">ipo de convocatoria (0=Ord. Continua, 1=Ord. Final, 2=Extraordinaria)</label>
					<input type="text" id="tipoConvocatoria" name="tipoConvocatoria" />

					<label htmlFor="indexEval">Índice de la evaluación</label>
					<input type="text" id="indexEval" name="indexEval" />

					<label htmlFor="tipoNota">Tipo de nota (0=NP, 1=Normal, 2=MH)</label>
					<input type="text" id="tipoNota" name="tipoNota" />

					<label htmlFor="calificacion">Calificación (0-100)</label>
					<input type="text" id="calificacion" name="calificacion" />

					<button type="submit">Crear nota</button>
				</form>
			</>
		);
	}

}

export default AsignaturaAnadirNota;