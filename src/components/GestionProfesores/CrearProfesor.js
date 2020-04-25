import React from 'react';

import {crearObjetoFromFormData, dateStringToTimestamp} from '../../utils/funciones.js';

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
		fechaNac = dateStringToTimestamp(fechaNac);

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
			idUpm,
			{from: this.props.miDireccion}
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
				<h4>Crear profesor</h4>
				<form onSubmit={this.crearProfesor} id="crear-profesor-form">
					<div className="form-group">
						<label htmlFor="addrEthProf">Dirección Ethereum del profesor</label>
						<div className="input-group">
							<div className="input-group-prepend">
								<span className="input-group-text">
									<i className="fab fa-ethereum fa-lg" />
								</span>
							</div>
							<input type="text" className="form-control code" id="addrEthProf" name="addrEthProf" />
						</div>
					</div>
					
					<div className="form-group">
						<label htmlFor="nombre">Nombre del profesor</label>
						<input type="text" className="form-control" id="nombre" name="nombre" />
					</div>
					
					<div className="form-group">
						<label htmlFor="apellidos">Apellidos del profesor</label>
						<input type="text" className="form-control" id="apellidos" name="apellidos" />
					</div>
					
					<div className="form-group">
						<label htmlFor="dni">DNI del profesor</label>
						<input type="text" className="form-control" id="dni" name="dni" />
					</div>
					
					<div className="form-group">
						<label htmlFor="correoUpm">Correo de la UPM del profesor</label>
						<div className="input-group">
							<div className="input-group-prepend">
								<span className="input-group-text">
									<i className="fas fa-at fa-lg" />
								</span>
							</div>
							<input type="text" className="form-control" id="correoUpm" name="correoUpm" />
						</div>
					</div>
					
					<div className="form-group">
						<label htmlFor="telefMovil">Teléfono móvil del profesor</label>
						<div className="input-group">
							<div className="input-group-prepend">
								<span className="input-group-text">
									<i className="fas fa-phone fa-lg" />
								</span>
							</div>
							<input type="number" className="form-control" id="telefMovil" name="telefMovil" />
						</div>
					</div>
					
					<div className="form-group">
						<label htmlFor="fechaNac">Fecha de nacimiento del profesor</label>
						<div className="input-group">
							<div className="input-group-prepend">
								<span className="input-group-text">
									<i className="fas fa-birthday-cake fa-lg" />
								</span>
							</div>
							<input type="date" className="form-control" id="fechaNac" name="fechaNac" />
						</div>
					</div>
					
					<div className="form-group">
						<label htmlFor="idUpm">ID de la UPM del profesor</label>
						<input type="text" className="form-control" id="idUpm" name="idUpm" />
					</div>
					
					<button type="submit" className="btn btn-primary">Crear profesor</button>
				</form>
			</>
		);
	}

}

export default CrearProfesor;