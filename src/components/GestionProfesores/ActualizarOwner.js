import React from 'react';

import {crearObjetoFromFormData} from '../../utils/funciones.js';

class ActualizarOwner extends React.Component {

	state = {
		ready: false,
	};

	componentDidMount() {
		this.setState({ready: true});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts.UpmProfesores;
		if (!instanceState || !instanceState.initialized) return;

		const instance = drizzle.contracts.UpmProfesores;

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

		const instance = drizzle.contracts.UpmProfesores;

		const txId = instance.methods.actualizarOwner.cacheSend(
			addrEthOwner,
			{from: this.props.miDireccion}
		);
	}

	render() {
		const {drizzle, drizzleState} = this.props;

        const instanceState = drizzleState.contracts.UpmProfesores;
        if (!this.state.ready || !instanceState || !instanceState.initialized) {
            return <span>Initializing...</span>;
        }

        if (this.props.miDireccion !== this.props.owner) {
			return (
				<h3>Sección oculta. Sólo el owner puede actualizar el owner</h3>
			);
		}

		return (
			<>
				<h3>Actualizar owner</h3>
				<form onSubmit={this.actualizarOwner} id="actualizar-owner-form">
					<label htmlFor="addrEthOwner">Dirección Ethereum del owner</label>
					<input type="text" id="addrEthOwner" name="addrEthOwner" />

					<button type="submit">Actualizar owner</button>
				</form>	
			</>
		);
	}

}

export default ActualizarOwner;