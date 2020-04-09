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

class EliminarAlumno extends React.Component {

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

	eliminarAlumno = (event) => {
		event.preventDefault();
		console.log('Has pulsado el botón para eliminar un alumno');

		// obtener valores del formulario
		const formData = new FormData(event.target);

		let objFormData = crearObjetoFromFormData(formData);
		console.log(objFormData);
		let {addrEthAlum} = objFormData;

		// mandar transacción
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts.UpmAlumnos;
		if (!instanceState || !instanceState.initialized) return;

		const instance = drizzle.contracts.UpmAlumnos;

		const txId = instance.methods.borrarAlumnoAddr.cacheSend(
			addrEthAlum
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
			<form onSubmit={this.eliminarAlumno}>
				<label htmlFor="addrEthAlum">Dirección Ethereum del alumno</label>
				<input type="text" id="addrEthAlum" name="addrEthAlum" />
				<button type="submit">Eliminar alumno</button>
			</form>
		);
	}

}

export default EliminarAlumno;