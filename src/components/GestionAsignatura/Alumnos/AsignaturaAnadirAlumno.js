import React from 'react';

import {crearObjetoFromFormData} from '../../../utils/funciones.js';

class AsignaturaAnadirAlumno extends React.Component {

	state = {
		ready: false,
	};

	componentDidMount() {
		this.setState({ready: true});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {

	}

	anadirAlumno = (event) => {
		event.preventDefault();

		// obtener valores del formulario
		const formData = new FormData(event.target);
		let objFormData = crearObjetoFromFormData(formData);
		let {addrEthAlum} = objFormData;

		// limpiar formulario
		// https://stackoverflow.com/questions/43922508/clear-and-reset-form-input-fields/43922523#43922523
		document.getElementById('anadir-alumno-form').reset();

		// mandar transacción
		const {drizzle, drizzleState} = this.props;

		const instance = drizzle.contracts[this.props.contractName];

		// TODO: comprobar que está el alumno creado

		const txId = instance.methods.anadirAlumno.cacheSend(
			addrEthAlum,
			{from: this.props.miDireccion}
		);
	}

	render() {
		const {drizzle, drizzleState, isOwner, isCoordinador, isProfesor} = this.props;

        const instanceState = drizzleState.contracts[this.props.contractName];
        if (!this.state.ready || !instanceState || !instanceState.initialized) {
            return <span>Initializing...</span>;
        }

        if (isOwner || isCoordinador || isProfesor) {
        	return (
				<>
					<h3>Añadir alumno</h3>
					<form onSubmit={this.anadirAlumno} id="anadir-alumno-form">
						<label htmlFor="addrEthAlum">Dirección Ethereum del alumno</label>
						<input type="text" id="addrEthAlum" name="addrEthAlum" />

						<button type="submit">Añadir alumno</button>
					</form>
				</>
        	);
        } else {
        	return (
        		<h3>Sección oculta. Sólo el owner, el coordinador o el profesor pueden añadir alumnos a la asignatura.</h3>
        	);
        }
	}

}

export default AsignaturaAnadirAlumno;