import React from 'react';

import {crearObjetoFromFormData} from '../../../utils/funciones.js';

class AsignaturaEliminarNota extends React.Component {

	state = {
		ready: false,
	};

	componentDidMount() {
		this.setState({ready: true});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {

	}

	eliminarNota = (event) => {
		event.preventDefault();

		// obtener valores del formulario
		const formData = new FormData(event.target);
		let objFormData = crearObjetoFromFormData(formData);
		let {addrEthAlum, indexEval} = objFormData;

		// limpiar formulario
		// https://stackoverflow.com/questions/43922508/clear-and-reset-form-input-fields/43922523#43922523
		document.getElementById('eliminar-nota-form').reset();

		// mandar transacción
		const {drizzle, drizzleState} = this.props;

		const instance = drizzle.contracts[this.props.contractName];

		const txId = instance.methods.borrarNota.cacheSend(
			addrEthAlum, indexEval,
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
				<h3>Eliminar nota</h3>
				<form onSubmit={this.eliminarNota} id="eliminar-nota-form">
					<label htmlFor="addrEthAlum">Dirección Ethereum del alumno</label>
					<input type="text" id="addrEthAlum" name="addrEthAlum" />

					<label htmlFor="indexEval">Índice de la evaluación</label>
					<input type="text" id="indexEval" name="indexEval" />

					<button type="submit">Crear nota</button>
				</form>
			</>
		);
	}

}

export default AsignaturaEliminarNota;