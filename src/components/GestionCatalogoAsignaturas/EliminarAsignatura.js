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

class EliminarAsignatura extends React.Component {

	state = {
		ready: false,
	};

	componentDidMount() {
		this.setState({ready: true});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts.UpmCatalogo;
		if (!instanceState || !instanceState.initialized) return;

		const instance = drizzle.contracts.UpmCatalogo;

	}

	eliminarAsignatura = (event) => {
		event.preventDefault();
		console.log('Has pulsado el botón para eliminar una asignatura');

		// obtener valores del formulario
		const formData = new FormData(event.target);

		let objFormData = crearObjetoFromFormData(formData);
		console.log(objFormData);
		let {addrEthAsignatura} = objFormData;

		// mandar transacción
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts.UpmCatalogo;
		if (!instanceState || !instanceState.initialized) return;

		const instance = drizzle.contracts.UpmCatalogo;

		const txId = instance.methods.eliminarAsignatura.cacheSend(
			addrEthAsignatura
		);

		// limpiar formulario
	}

	render() {
		const {drizzle, drizzleState} = this.props;

        const instanceState = drizzleState.contracts.UpmCatalogo;
        if (!this.state.ready || !instanceState || !instanceState.initialized) {
            return <span>Initializing...</span>;
        }        

		return (
			<form onSubmit={this.eliminarAsignatura}>
				<label htmlFor="addrEthAsignatura">Dirección Ethereum de la asignatura</label>
				<input type="text" id="addrEthAsignatura" name="addrEthAsignatura" />
				
				<button type="submit">Eliminar asignatura</button>
			</form>
		);
	}

}

export default EliminarAsignatura;