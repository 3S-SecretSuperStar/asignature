import React from 'react';

import {crearObjetoFromFormData} from '../../utils/funciones.js';
import {jsonInterface, bytecode} from '../../utils/varios.js';

class DesplegarYAnadirAsignatura extends React.Component {

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

	desplegarYAnadirAsignatura = async (event) => {
		event.preventDefault();
		console.log('Has pulsado el botón para desplegar y añadir una asignatura');

		// obtener valores del formulario 
		const formData = new FormData(event.target);
		let objFormData = crearObjetoFromFormData(formData);
		console.log('DesplegarYAnadirAsignatura - desplegarYAnadirAsignatura - objFormData:', objFormData);
		let {addrEthCoord, nombreAsig, cursoAcad, codigoAsig, titulacion, numCreditos, semestre, cursoAno, tipoAsig} = objFormData;
		
		// limpiar formulario
		// https://stackoverflow.com/questions/43922508/clear-and-reset-form-input-fields/43922523#43922523
		document.getElementById('desplegar-y-anadir-asignatura-form').reset();

		// coger drizzle y drizzleState
		const {drizzle, drizzleState} = this.props;
		const instance = drizzle.contracts.UpmCatalogo;

		// desplegar contrato
		let contrato = new drizzle.web3.eth.Contract(jsonInterface);

		let estimGas = await contrato
		.deploy({
			data: bytecode,
			arguments: [addrEthCoord, nombreAsig, cursoAcad, codigoAsig, titulacion, numCreditos, semestre, cursoAno, tipoAsig]
		}).estimateGas({from: this.props.miDireccion});
		console.log('estimGas:', estimGas);

		let contratoInstance = await contrato
		.deploy({
			data: bytecode,
			arguments: [addrEthCoord, nombreAsig, cursoAcad, codigoAsig, titulacion, numCreditos, semestre, cursoAno, tipoAsig]
		})
		.send({from: this.props.miDireccion});

		let addrAsignaturaDesplegada = contratoInstance.options.address;
		console.log(codigoAsig, 'desplegada en:', addrAsignaturaDesplegada);

		// añadir asignatura al ćatálogo
		const txId = instance.methods.anadirAsignatura.cacheSend(addrAsignaturaDesplegada, titulacion + " - " + nombreAsig);
	}

	render() {
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts.UpmCatalogo;
		if (!this.state.ready || !instanceState || !instanceState.initialized) {
			return <span>Initializing...</span>;
		}

		return (
			<>
				<h3>Desplegar asignatura y añadirla al catálogo</h3>
				<form onSubmit={this.desplegarYAnadirAsignatura} id="desplegar-y-anadir-asignatura-form">
					<label htmlFor="addrEthCoord">Dirección Ethereum del coordinador</label>
					<input type="text" id="addrEthCoord" name="addrEthCoord" />
					
					<label htmlFor="nombreAsig">Nombre de la asignatura</label>
					<input type="text" id="nombreAsig" name="nombreAsig" />
					
					<label htmlFor="cursoAcad">Curso académico</label>
					<input type="text" id="cursoAcad" name="cursoAcad" />
					
					<label htmlFor="codigoAsig">Código de la asignatura</label>
					<input type="text" id="codigoAsig" name="codigoAsig" />

					<label htmlFor="titulacion">Titulación</label>
					<input type="text" id="titulacion" name="titulacion" />
					
					<label htmlFor="numCreditos">Número de créditos</label>
					<input type="text" id="numCreditos" name="numCreditos" />
					
					<label htmlFor="semestre">Semestre (1 o 2)</label>
					<input type="text" id="semestre" name="semestre" />
					
					<label htmlFor="cursoAno">Curso (1º, 2º...)</label>
					<input type="text" id="cursoAno" name="cursoAno" />
					
					<label htmlFor="tipoAsig">Tipo de asignatura (0=Obligatoria, 1=Optativa) (ToDo)</label>
					<input type="text" id="tipoAsig" name="tipoAsig" />
					
					<button type="submit">Desplegar asignatura</button>
				</form>
			</>
		);
	}

}

export default DesplegarYAnadirAsignatura;