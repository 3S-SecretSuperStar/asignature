import React from 'react';

import {newContextComponents} from "drizzle-react-components";

const {ContractData} = newContextComponents;

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

class ListaAsignaturas extends React.Component {

	state = {
		ready: false,
		ownAsignaturasLengthKey: null,
		numAsignaturasKey: null,
	};

	componentDidMount() {
		this.setState({
			ready: true,
		});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts.UpmCatalogo;
		if (!instanceState || !instanceState.initialized) return;

		const instance = drizzle.contracts.UpmCatalogo;

		let changed = false;

		let {
			ownAsignaturasLengthKey, numAsignaturasKey
		} = JSON.parse(JSON.stringify(this.state));

		if (!ownAsignaturasLengthKey) {
			ownAsignaturasLengthKey = instance.methods.asignaturasLength.cacheCall();
			changed = true;
		}

		if (!numAsignaturasKey) {
			numAsignaturasKey = instance.methods.numAsignaturas.cacheCall();
			changed = true;
		}

		if (changed) {
			this.setState({
				ownAsignaturasLengthKey,
				numAsignaturasKey,
			});
		}

	}

	mandarEliminar = (event) => {
		event.preventDefault();

		// obtener valores del formulario
		const formData = new FormData(event.target);

		let objFormData = crearObjetoFromFormData(formData);
		console.log(objFormData);
		let {addrEthAsignatura} = objFormData;

		console.log("Has pulsado el botón para mandar eliminar la asignatura", addrEthAsignatura);

		// mandar transacción
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts.UpmCatalogo;
		if (!instanceState || !instanceState.initialized) return;

		const instance = drizzle.contracts.UpmCatalogo;

		const txId = instance.methods.eliminarAsignatura.cacheSend(
			addrEthAsignatura
		);

		// eliminar contrato dinámicamente
		const contractName = "UpmAsignaturaPrueba";
		drizzle.deleteContract(contractName);
	}

	render() {
		const {drizzle, drizzleState} = this.props;

        const instanceState = drizzleState.contracts.UpmCatalogo;
        if (!this.state.ready || !instanceState || !instanceState.initialized) {
            return <span>Initializing...</span>;
        }

        let ownAsignaturasLength = instanceState.asignaturasLength[this.state.ownAsignaturasLengthKey];
        ownAsignaturasLength = ownAsignaturasLength ? ownAsignaturasLength.value : -1;
        console.log('ownAsignaturasLength:', ownAsignaturasLength);

        let numAsignaturas = instanceState.numAsignaturas[this.state.numAsignaturasKey];
        numAsignaturas = numAsignaturas ? numAsignaturas.value : -2;
        console.log('numAsignaturas:', numAsignaturas);

        console.log('this.props.asignaturasLength:', this.props.asignaturasLength);

        let tbodyListaAsignaturas = [];
        for (let i = 0; i < ownAsignaturasLength; i++) {
        	tbodyListaAsignaturas[i] = (
        		<ContractData	key={i}
        						drizzle={drizzle}
        						drizzleState={drizzleState}
        						contract={"UpmCatalogo"}
        						method={"listaAsignaturas"}
        						methodArgs={[i]}
        						render={address => (
        							<tr>
        								<td>{address}</td>
        								<td>
        									<form onSubmit={this.mandarEliminar}>
        										<input type="hidden" value={address} name="addrEthAsignatura" />
        										<button>Eliminar asignatura</button>
        									</form>
        								</td>
        							</tr>
        						)}
				/>
        	);
        }

		return (
			<>
				<p>{ownAsignaturasLength} ownAsignaturasLength</p>
				<p>{numAsignaturas} asignaturas</p>

				<table>
					<thead>
						<tr>
							<th>Dirección</th>
							<th>Eliminar</th>
						</tr>
					</thead>
					<tbody>
						{tbodyListaAsignaturas}
					</tbody>
				</table>
			</>
		);
	}

}

export default ListaAsignaturas;