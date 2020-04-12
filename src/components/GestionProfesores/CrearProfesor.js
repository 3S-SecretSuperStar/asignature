import React from 'react';

import {crearObjetoFromFormData} from '../../utils/funciones.js';

class CrearProfesor extends React.Component {

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

	crearProfesor = (event) => {
		event.preventDefault();

		// obtener valores del formulario
		const formData = new FormData(event.target);
		let objFormData = crearObjetoFromFormData(formData);
		let {addrEthProf, nombre, apellidos, dni, correoUpm, telefMovil, fechaNac, idUpm} = objFormData;

		// limpiar formulario
		// https://stackoverflow.com/questions/43922508/clear-and-reset-form-input-fields/43922523#43922523
		document.getElementById('crear-profesor-form').reset();

		// mandar transacción
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts.UpmProfesores;
		if (!instanceState || !instanceState.initialized) return;

		const instance = drizzle.contracts.UpmProfesores;

		const txId = instance.methods.crearProfesor.cacheSend(
			addrEthProf,
			nombre,
			apellidos,
			dni,
			correoUpm,
			telefMovil,
			fechaNac,
			idUpm
		);
	}

	render() {
		const {drizzle, drizzleState} = this.props;

        const instanceState = drizzleState.contracts.UpmProfesores;
        if (!this.state.ready || !instanceState || !instanceState.initialized) {
            return <span>Initializing...</span>;
        }        

		return (
			<>
				<h3>Crear profesor</h3>
				<form onSubmit={this.crearProfesor} id="crear-profesor-form">
					<label htmlFor="addrEthProf">Dirección Ethereum del profesor</label>
					<input type="text" id="addrEthProf" name="addrEthProf" />
					
					<label htmlFor="nombre">Nombre del profesor</label>
					<input type="text" id="nombre" name="nombre" />
					
					<label htmlFor="apellidos">Apellidos del profesor</label>
					<input type="text" id="apellidos" name="apellidos" />
					
					<label htmlFor="dni">DNI del profesor</label>
					<input type="text" id="dni" name="dni" />
					
					<label htmlFor="correoUpm">Correo de la UPM del profesor</label>
					<input type="text" id="correoUpm" name="correoUpm" />
					
					<label htmlFor="telefMovil">Teléfono móvil del profesor</label>
					<input type="text" id="telefMovil" name="telefMovil" />
					
					<label htmlFor="fechaNac">Fecha de nacimiento del profesor</label>
					<input type="text" id="fechaNac" name="fechaNac" />
					
					<label htmlFor="idUpm">ID de la UPM del profesor</label>
					<input type="text" id="idUpm" name="idUpm" />
					
					<button type="submit">Crear profesor</button>
				</form>
			</>
		);
	}

}

export default CrearProfesor;