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
		console.log('Has pulsado el botón para crear un profesor');

		// obtener valores del formulario
		const formData = new FormData(event.target);

		let objFormData = crearObjetoFromFormData(formData);
		console.log(objFormData);
		let {addrEthProf, nombre, apellidos, dni, correoUpm, telefMovil, fechaNac, idUpm} = objFormData;

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

		// limpiar formulario
	}

	render() {
		const {drizzle, drizzleState} = this.props;

        const instanceState = drizzleState.contracts.UpmProfesores;
        if (!this.state.ready || !instanceState || !instanceState.initialized) {
            return <span>Initializing...</span>;
        }        

		return (
			<form onSubmit={this.crearProfesor}>
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
		);
	}

}

export default CrearProfesor;