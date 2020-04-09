import React from 'react';

// de cada input del form, crea un objeto:
//    clave: atributo name
//    valor: contenido del input
function crearObjetoFromFormData(formData) {
	let objFormData = {};
	for (let key of formData.keys()) {
		objFormData[key] = formData.get(key);
	}
	return objFormData;
}

class CrearAlumno extends React.Component {

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
		console.log('Has pulsado el botón para crear un alumno');

		// obtener valores del formulario
		const formData = new FormData(event.target);

		let objFormData = crearObjetoFromFormData(formData);
		console.log(objFormData);
		let {addrEthAlum, nombre, apellidos, dni, correoUpm, telefMovil, fechaNac, idUpm} = objFormData;

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

		// limpiar formulario
	}

	render() {
		const {drizzle, drizzleState} = this.props;

        const instanceState = drizzleState.contracts.UpmAlumnos;
        if (!this.state.ready || !instanceState || !instanceState.initialized) {
            return <span>Initializing...</span>;
        }        

		return (
			<form onSubmit={this.crearAlumno}>
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
		);
	}

}

export default CrearAlumno;