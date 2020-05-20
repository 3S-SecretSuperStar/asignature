import React from 'react';

import {crearObjetoFromFormData} from '../../utils/funciones.js';

class ActualizarOwner extends React.Component {

	state = {
		ready: false,
	};

	componentDidMount() {
		this.setState({ready: true});
	}

	componentDidUpdate() {
		
	}

	actualizarOwner = (event) => {
		event.preventDefault();

		const formData = new FormData(event.target);
		let objFormData = crearObjetoFromFormData(formData);
		let {addrEthOwner} = objFormData;

		// https://stackoverflow.com/questions/43922508/clear-and-reset-form-input-fields/43922523#43922523
		document.getElementById('actualizar-owner-form').reset();

		const {drizzle} = this.props;

		const instance = drizzle.contracts.UpmAlumnos;

		instance.methods.actualizarOwner.cacheSend(
			addrEthOwner,
			{from: this.props.miDireccion}
		);
	}

	render() {
		const {drizzleState} = this.props;

        const instanceState = drizzleState.contracts.UpmAlumnos;
        if (!this.state.ready || !instanceState || !instanceState.initialized) {
            return <span>Initializing...</span>;
        }

        if (this.props.miDireccion !== this.props.owner) {
			return (
				<span></span>
			);
		}

		return (
			<>
				<h4>Actualizar owner</h4>
				<form onSubmit={this.actualizarOwner} id="actualizar-owner-form">
					<div className="form-group">
						<label htmlFor="addrEthOwner">Dirección Ethereum del owner</label>
						<div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fab fa-ethereum fa-lg" />
                                </span>
                            </div>
							<input type="text" className="form-control" id="addrEthOwner" name="addrEthOwner"
								placeholder={this.props.owner}
							/>
                        </div>
					</div>

					<button type="submit" className="btn btn-primary">Actualizar owner</button>
				</form>	
			</>
		);
	}

}

export default ActualizarOwner;