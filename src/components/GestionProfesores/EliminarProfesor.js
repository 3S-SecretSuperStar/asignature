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

class EliminarProfesor extends React.Component {

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

	eliminarProfesor = (event) => {
		event.preventDefault();
		console.log('Has pulsado el botón para eliminar un profesor');

		// obtener valores del formulario
		const formData = new FormData(event.target);

		let objFormData = crearObjetoFromFormData(formData);
		console.log(objFormData);
		let {addrEthProf} = objFormData;

		// mandar transacción
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts.UpmProfesores;
		if (!instanceState || !instanceState.initialized) return;

		const instance = drizzle.contracts.UpmProfesores;

		const txId = instance.methods.borrarProfesorAddr.cacheSend(
			addrEthProf
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
			<form onSubmit={this.eliminarProfesor}>
				<label htmlFor="addrEthProf">Dirección Ethereum del profesor</label>
				<input type="text" id="addrEthProf" name="addrEthProf" />
				<button type="submit">Eliminar profesor</button>
			</form>
		);
	}

}

export default EliminarProfesor;