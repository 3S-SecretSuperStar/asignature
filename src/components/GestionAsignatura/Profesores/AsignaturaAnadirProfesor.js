import React from 'react';

import {crearObjetoFromFormData} from '../../../utils/funciones.js';

class AsignaturaAnadirProfesor extends React.Component {

	state = {
		ready: false,
	};

	componentDidMount() {
		this.setState({ready: true});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {

	}

	anadirProfesor = (event) => {
		event.preventDefault();

		// obtener valores del formulario
		const formData = new FormData(event.target);
		let objFormData = crearObjetoFromFormData(formData);
		let {addrEthProf} = objFormData;

		// limpiar formulario
		// https://stackoverflow.com/questions/43922508/clear-and-reset-form-input-fields/43922523#43922523
		document.getElementById('anadir-profesor-form').reset();

		// mandar transacción
		const {drizzle, drizzleState} = this.props;

		const instance = drizzle.contracts[this.props.contractName];

		// TODO: comprobar que está el profesor creado

		const txId = instance.methods.anadirProfesor.cacheSend(
			addrEthProf,
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
				<h3>Añadir profesor</h3>
				<form onSubmit={this.anadirProfesor} id="anadir-profesor-form">
					<label htmlFor="addrEthProf">Dirección Ethereum del profesor</label>
					<input type="text" id="addrEthProf" name="addrEthProf" />

					<button type="submit">Añadir profesor</button>
				</form>
			</>
		);
	}

}

export default AsignaturaAnadirProfesor;