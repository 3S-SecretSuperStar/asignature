import React from 'react';

import {crearObjetoFromFormData} from '../../utils/funciones.js';

class AsignaturaAnadirAlumno extends React.Component {

	state = {
		ready: false,
	};

	componentDidMount() {
		this.setState({ready: true});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts.UpmAlumnos;
		if (!instanceState || !instanceState.initialized) return;

		const instance = drizzle.contracts.UpmAlumnos;

	}

	crearAlumno = (event) => {
		event.preventDefault();

		// obtener valores del formulario
		const formData = new FormData(event.target);
		let objFormData = crearObjetoFromFormData(formData);
		let {addrEthAlum, nombre, apellidos, dni, correoUpm, telefMovil, fechaNac, idUpm} = objFormData;

		// limpiar formulario
		// https://stackoverflow.com/questions/43922508/clear-and-reset-form-input-fields/43922523#43922523
		document.getElementById('crear-alumno-form').reset();

		// mandar transacción
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts.UpmAlumnos;
		if (!instanceState || !instanceState.initialized) return;

		const instance = drizzle.contracts.UpmAlumnos;

		const txId = instance.methods.crearAlumno.cacheSend(
			addrEthAlum,
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

        const instanceState = drizzleState.contracts.UpmAlumnos;
        if (!this.state.ready || !instanceState || !instanceState.initialized) {
            return <span>Initializing...</span>;
        }        

		return (
			<>
				<h3>Crear alumno</h3>
				<form onSubmit={this.crearAlumno} id="crear-alumno-form">
					<label htmlFor="addrEthAlum">Dirección Ethereum del alumno</label>
					<input type="text" id="addrEthAlum" name="addrEthAlum" />

					<label htmlFor="nombre">Nombre del alumno</label>
					<input type="text" id="nombre" name="nombre" />

					<label htmlFor="apellidos">Apellidos del alumno</label>
					<input type="text" id="apellidos" name="apellidos" />

					<label htmlFor="dni">DNI del alumno</label>
					<input type="text" id="dni" name="dni" />

					<label htmlFor="correoUpm">Correo de la UPM del alumno</label>
					<input type="text" id="correoUpm" name="correoUpm" />

					<label htmlFor="telefMovil">Teléfono móvil del alumno</label>
					<input type="text" id="telefMovil" name="telefMovil" />

					<label htmlFor="fechaNac">Fecha de nacimiento del alumno</label>
					<input type="text" id="fechaNac" name="fechaNac" />

					<label htmlFor="idUpm">ID de la UPM del alumno</label>
					<input type="text" id="idUpm" name="idUpm" />

					<button type="submit">Crear alumno</button>
				</form>
			</>
		);
	}

}

export default AsignaturaAnadirAlumno;