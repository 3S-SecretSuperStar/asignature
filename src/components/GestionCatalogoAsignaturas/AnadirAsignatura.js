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

class AnadirAsignatura extends React.Component {

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

	anadirAsignatura = (event) => {
		event.preventDefault();
		console.log('Has pulsado el botón para añadir una asignatura');

		// obtener valores del formulario
		const formData = new FormData(event.target);

		let objFormData = crearObjetoFromFormData(formData);
		console.log('objFormData:', objFormData);
		let {addrEthAsignatura, nombreAsignatura} = objFormData;
		console.log('addrEthAsignatura:', addrEthAsignatura);
		console.log('nombreAsignatura:', nombreAsignatura);

		// limpiar formulario
		// https://stackoverflow.com/questions/43922508/clear-and-reset-form-input-fields/43922523#43922523
		document.getElementById('anadir-asignatura-form').reset();

		// mandar transacción
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts.UpmCatalogo;
		if (!instanceState || !instanceState.initialized) return;

		const instance = drizzle.contracts.UpmCatalogo;

		const txId = instance.methods.anadirAsignatura.cacheSend(
			addrEthAsignatura
		);

		// esperar a que se termine la tx (sea confirmada o rechazada)
		// TODO

		let jsonInterface = [{"inputs":[{"internalType":"address","name":"_coordinador","type":"address"},{"internalType":"string","name":"_nombreAsignatura","type":"string"},{"internalType":"string","name":"_cursoAcademico","type":"string"},{"internalType":"string","name":"_codigoAsignatura","type":"string"},{"internalType":"uint8","name":"_numCreditos","type":"uint8"},{"internalType":"uint8","name":"_semestre","type":"uint8"},{"internalType":"uint8","name":"_cursoAno","type":"uint8"},{"internalType":"enumUpmAsignatura.TipoAsignatura","name":"_tipoAsignatura","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[{"internalType":"address","name":"_addrCoordinador","type":"address"}],"name":"actualizarCoordinador","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint8","name":"_indexEval","type":"uint8"},{"internalType":"string","name":"_nombre","type":"string"},{"internalType":"uint256","name":"_fecha","type":"uint256"},{"internalType":"bool","name":"_obligatoria","type":"bool"},{"internalType":"uint256","name":"_notaMinima","type":"uint256"},{"internalType":"uint256","name":"_porcAportacion","type":"uint256"},{"internalType":"enumUpmAsignatura.TipoConvocatoria","name":"_tipoConvocatoria","type":"uint8"}],"name":"actualizarEvaluacion","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_addrEthAlum","type":"address"},{"internalType":"enumUpmAsignatura.TipoConvocatoria","name":"_tipoConvocatoria","type":"uint8"},{"internalType":"uint8","name":"_indexEval","type":"uint8"},{"internalType":"enumUpmAsignatura.TipoNota","name":"_tipoNota","type":"uint8"},{"internalType":"uint256","name":"_calificacion","type":"uint256"}],"name":"actualizarNota","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"actualizarOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"alumnosLength","outputs":[{"internalType":"uint256","name":"_alumnosLength","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_addrEthAlum","type":"address"}],"name":"anadirAlumno","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_addrEthProf","type":"address"}],"name":"anadirProfesor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_addrEthAlum","type":"address"},{"internalType":"enumUpmAsignatura.TipoConvocatoria","name":"_tipoConvocatoria","type":"uint8"},{"internalType":"uint8","name":"_indexEval","type":"uint8"}],"name":"borrarNota","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"codigoAsignatura","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"coordinador","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_nombre","type":"string"},{"internalType":"uint256","name":"_fecha","type":"uint256"},{"internalType":"bool","name":"_obligatoria","type":"bool"},{"internalType":"uint256","name":"_notaMinima","type":"uint256"},{"internalType":"uint256","name":"_porcAportacion","type":"uint256"},{"internalType":"enumUpmAsignatura.TipoConvocatoria","name":"_tipoConvocatoria","type":"uint8"}],"name":"crearEvaluacion","outputs":[{"internalType":"uint8","name":"_indexEval","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_addrEthAlum","type":"address"},{"internalType":"enumUpmAsignatura.TipoConvocatoria","name":"_tipoConvocatoria","type":"uint8"},{"internalType":"uint8","name":"_indexEval","type":"uint8"},{"internalType":"enumUpmAsignatura.TipoNota","name":"_tipoNota","type":"uint8"},{"internalType":"uint256","name":"_calificacion","type":"uint256"}],"name":"crearNota","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"cursoAcademico","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cursoAno","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_addrEthAlum","type":"address"}],"name":"eliminarAlumno","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_addrEthProf","type":"address"}],"name":"eliminarProfesor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint8","name":"_indexEval","type":"uint8"}],"name":"leerEvaluacion","outputs":[{"internalType":"string","name":"_nombre","type":"string"},{"internalType":"uint256","name":"_fecha","type":"uint256"},{"internalType":"bool","name":"_obligatoria","type":"bool"},{"internalType":"uint256","name":"_notaMinima","type":"uint256"},{"internalType":"uint256","name":"_porcAportacion","type":"uint256"},{"internalType":"enumUpmAsignatura.TipoConvocatoria","name":"_tipoConvocatoria","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"enumUpmAsignatura.TipoConvocatoria","name":"_tipoConvocatoria","type":"uint8"},{"internalType":"uint8","name":"_indexEval","type":"uint8"}],"name":"leerMiNota","outputs":[{"internalType":"enumUpmAsignatura.TipoNota","name":"_tipoNota","type":"uint8"},{"internalType":"uint256","name":"_calificacion","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_addrEthAlum","type":"address"},{"internalType":"enumUpmAsignatura.TipoConvocatoria","name":"_tipoConvocatoria","type":"uint8"},{"internalType":"uint8","name":"_indexEval","type":"uint8"}],"name":"leerNota","outputs":[{"internalType":"enumUpmAsignatura.TipoNota","name":"_tipoNota","type":"uint8"},{"internalType":"uint256","name":"_calificacion","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"listaAlumnos","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"listaEvaluaciones","outputs":[{"internalType":"uint8","name":"indexEvaluacion","type":"uint8"},{"internalType":"string","name":"nombre","type":"string"},{"internalType":"uint256","name":"fecha","type":"uint256"},{"internalType":"bool","name":"obligatoria","type":"bool"},{"internalType":"uint256","name":"notaMinima","type":"uint256"},{"internalType":"uint256","name":"porcAportacion","type":"uint256"},{"internalType":"enumUpmAsignatura.TipoConvocatoria","name":"tipoConvocatoria","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"listaProfesores","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"mapAlumnos","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"uint8","name":"","type":"uint8"}],"name":"mapNotas","outputs":[{"internalType":"enumUpmAsignatura.TipoNota","name":"tipoNota","type":"uint8"},{"internalType":"uint256","name":"calificacion","type":"uint256"},{"internalType":"bool","name":"existsNota","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"mapProfesores","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"miDireccion","outputs":[{"internalType":"address","name":"_miDireccion","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nombreAsignatura","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numAlumnos","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numCreditos","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numEvaluaciones","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numNotas","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numProfesores","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"profesoresLength","outputs":[{"internalType":"uint256","name":"_profesoresLength","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"semestre","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tipoAsignatura","outputs":[{"internalType":"enumUpmAsignatura.TipoAsignatura","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"}];

		// añadir contrato dinámicamente
		const contractConfig = {
			contractName: "UpmAsignatura" + nombreAsignatura,
			web3Contract: new drizzle.web3.eth.Contract(
				jsonInterface,
				addrEthAsignatura // address (pero ya está desplegado)
			),
		}
		const events = [];
		drizzle.addContract(contractConfig, []);

		console.log('this.props', this.props);
	}

	render() {
		const {drizzle, drizzleState} = this.props;
		console.log('this.props:', this.props);
		console.log('this.props.drizzle.contracts:', this.props.drizzle.contracts);

        const instanceState = drizzleState.contracts.UpmCatalogo;
        if (!this.state.ready || !instanceState || !instanceState.initialized) {
            return <span>Initializing...</span>;
        }

		return (
			<form onSubmit={this.anadirAsignatura} id="anadir-asignatura-form">
				<label htmlFor="addrEthAsignatura">Dirección Ethereum de la asignatura</label>
				<input type="text" id="addrEthAsignatura" name="addrEthAsignatura" />

				<label htmlFor="nombreAsignatura">Nombre de la asignatura</label>
				<input type="text" id="nombreAsignatura" name="nombreAsignatura" />

				<button type="submit">Añadir</button>
			</form>
		);
	}

}

export default AnadirAsignatura;