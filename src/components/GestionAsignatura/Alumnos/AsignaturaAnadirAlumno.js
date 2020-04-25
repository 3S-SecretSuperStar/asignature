import React from 'react';

import {crearObjetoFromFormData} from '../../../utils/funciones.js';

class AsignaturaAnadirAlumno extends React.Component {

	state = {
		ready: false,
	};

	componentDidMount() {
		this.setState({ready: true});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {

	}

	anadirAlumno = (event) => {
		event.preventDefault();

		// obtener valores del formulario
		const formData = new FormData(event.target);
		let objFormData = crearObjetoFromFormData(formData);
		let {addrEthAlum} = objFormData;

		// limpiar formulario
		// https://stackoverflow.com/questions/43922508/clear-and-reset-form-input-fields/43922523#43922523
		document.getElementById('anadir-alumno-form').reset();

		// mandar transacción
		const {drizzle, drizzleState} = this.props;

		const instance = drizzle.contracts[this.props.contractName];

		// TODO: comprobar que está el alumno creado

		const txId = instance.methods.anadirAlumno.cacheSend(
			addrEthAlum,
			{from: this.props.miDireccion}
		);
	}

	render() {
		const {drizzle, drizzleState} = this.props;

        const instanceState = drizzleState.contracts[this.props.contractName];
        if (!this.state.ready || !instanceState || !instanceState.initialized) {
            return <span>Initializing...</span>;
        }

        if (this.props.isOwner || this.props.isCoordinador || this.props.isProfesor) {
        	return (
				<li className="list-group-item">
					<h5>Añadir alumno</h5>
					<form onSubmit={this.anadirAlumno} id="anadir-alumno-form">
						<div className="form-group">
							<label htmlFor="addrEthAlum">Dirección Ethereum del alumno</label>

							<div className="input-group">
								<div className="input-group-prepend">
									<span className="input-group-text">
	                                    <i className="fab fa-ethereum fa-lg" />
	                                </span>
								</div>
								<input type="text" className="form-control code" id="addrEthAlum" name="addrEthAlum" />
							</div>
						</div>

						<button type="submit" className="btn btn-primary">Añadir alumno</button>
					</form>
				</li>
        	);
        } else {
        	return (
        		<span></span>
        	);
        }
	}

}

export default AsignaturaAnadirAlumno;