import React from 'react';

import {crearObjetoFromFormData, dateStringToTimestamp} from '../../utils/funciones.js';

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

	crearAlumno = async (event) => {
		event.preventDefault();

		// obtener valores del formulario
		const formData = new FormData(event.target);
		let objFormData = crearObjetoFromFormData(formData);
		let {addrEthAlum, nombre, apellidos, dni, correoUpm, telefMovil, fechaNac, idUpm} = objFormData;
		fechaNac = dateStringToTimestamp(fechaNac);

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
			idUpm,
			{from: this.props.miDireccion}
		);

		console.log('~~crear~~~0~ txId:', txId);

		console.log('~~crear~~~0~ drizzleState:', drizzleState);
		console.log('~~crear~~~0~ drizzleState.transactionStack:', drizzleState.transactionStack);
		console.log('~~crear~~~0~ drizzleState.transactionStack[txId]:', drizzleState.transactionStack[txId]);

		console.log('~~crear~~~0~ drizzleState.transactions:', drizzleState.transactions);


		//console.log('~~crear~~~1~ txId:', txId);

		//console.log('~~crear~~~1~ drizzleState:', drizzleState);
		//console.log('~~crear~~~1~ drizzleState.transactionStack:', drizzleState.transactionStack);
		//console.log('~~crear~~~1~ drizzleState.transactionStack[txId]:', drizzleState.transactionStack[txId]);

		//console.log('~~crear~~~1~ drizzleState.transactions:', drizzleState.transactions);
	}

	render() {
		const {drizzle, drizzleState} = this.props;

        const instanceState = drizzleState.contracts.UpmAlumnos;
        if (!this.state.ready || !instanceState || !instanceState.initialized) {
            return <span>Initializing...</span>;
        }

		console.log('~~renderCre~ drizzleState.transactionStack:', drizzleState.transactionStack);

		console.log('~~renderCre~ drizzleState.transactions:', drizzleState.transactions);

		if (drizzleState.transactionStack[0]) {
			const txHash = drizzleState.transactionStack[0];
			console.log('~~renderCre~ drizzleState.transaction:', drizzleState.transactions[txHash]);
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
					<input type="number" id="telefMovil" name="telefMovil" />

					<label htmlFor="fechaNac">Fecha de nacimiento del alumno</label>
					<input type="date" id="fechaNac" name="fechaNac" />

					<label htmlFor="idUpm">ID de la UPM del alumno</label>
					<input type="text" id="idUpm" name="idUpm" />

					<button type="submit">Crear alumno</button>
				</form>
			</>
		);
	}

}

export default CrearAlumno;