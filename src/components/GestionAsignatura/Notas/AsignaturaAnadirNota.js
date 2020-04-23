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
		let {addrEthAlum, indexEval, tipoNota, calificacion} = objFormData;

		// limpiar formulario
		// https://stackoverflow.com/questions/43922508/clear-and-reset-form-input-fields/43922523#43922523
		document.getElementById('crear-nota-form').reset();

		// mandar transacción
		const {drizzle, drizzleState} = this.props;

		const instance = drizzle.contracts[this.props.contractName];

		const txId = instance.methods.crearNota.cacheSend(
			addrEthAlum, indexEval, tipoNota, calificacion,
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

					<label htmlFor="indexEval">Índice de la evaluación</label>
					<input type="number" id="indexEval" name="indexEval" min="0" step="1" />

					<label htmlFor="tipoNota">Tipo de nota</label>
					<label>
						<input type="radio" name="tipoNota" id="tipoNota1" value="1" /> Normal
					</label>
					<label>
						<input type="radio" name="tipoNota" id="tipoNota2" value="2" /> Matrícula de Honor (MH)
					</label>
					<label>
						<input type="radio" name="tipoNota" id="tipoNota0" value="0" /> No presentado (NP) <br />
					</label>

					<label htmlFor="calificacion">Calificación (0-100)</label>
					<input type="number" id="calificacion" name="calificacion" min="0" max="100" step="1" />

					<button type="submit">Crear nota</button>
				</form>
			</>
		);
	}

}

export default AsignaturaAnadirNota;