import React from 'react';

import {crearObjetoFromFormData} from '../../../utils/funciones.js';

class AsignaturaAnadirProfesor extends React.Component {

	state = {
		ready: false,
	};

	componentDidMount() {
		this.setState({ready: true});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {

	}

	anadirProfesor = (event) => {
		event.preventDefault();

		const formData = new FormData(event.target);
		let objFormData = crearObjetoFromFormData(formData);
		let {addrEthProf} = objFormData;

		// https://stackoverflow.com/questions/43922508/clear-and-reset-form-input-fields/43922523#43922523
		document.getElementById('anadir-profesor-form').reset();

		const {drizzle} = this.props;

		const instance = drizzle.contracts[this.props.contractName];

		// TODO: comprobar que está el profesor creado

		instance.methods.anadirProfesor.cacheSend(
			addrEthProf,
			{from: this.props.miDireccion}
		);
	}

	render() {
		const {drizzleState} = this.props;

        const instanceState = drizzleState.contracts[this.props.contractName];
        if (!this.state.ready || !instanceState || !instanceState.initialized) {
            return <span>Initializing...</span>;
        }

        if (this.props.isOwner || this.props.isCoordinador) {
			return (
				<li className="list-group-item mt-3">
					<h5>Añadir profesor</h5>
					<form onSubmit={this.anadirProfesor} id="anadir-profesor-form">
						<div className="form-group">
							<label htmlFor="addrEthProf">Dirección Ethereum del profesor</label>
							
							<div className="input-group">
								<div className="input-group-prepend">
									<span className="input-group-text">
	                                    <i className="fab fa-ethereum fa-lg" />
	                                </span>
								</div>
								<input type="text" className="form-control code"  id="addrEthProf" name="addrEthProf" />
							</div>
						</div>

						<button type="submit" className="btn btn-primary">Añadir profesor</button>
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

export default AsignaturaAnadirProfesor;