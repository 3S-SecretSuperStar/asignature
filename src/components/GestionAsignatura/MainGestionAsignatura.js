import React from 'react';

import {newContextComponents} from "drizzle-react-components";

const {ContractData} = newContextComponents;

class MainGestionAsignatura extends React.Component {

	state = {
		ready: false,
		contractName: "UpmAsignatura-" + this.props.addrEthAsig,
		miDireccionKey: null,
		ownerKey: null,
	};

	anadirContratoDinamicamente() {
		const jsonInterface = [{"inputs":[{"internalType":"address","name":"_coordinador","type":"address"},{"internalType":"string","name":"_nombreAsignatura","type":"string"},{"internalType":"string","name":"_cursoAcademico","type":"string"},{"internalType":"string","name":"_codigoAsignatura","type":"string"},{"internalType":"uint8","name":"_numCreditos","type":"uint8"},{"internalType":"uint8","name":"_semestre","type":"uint8"},{"internalType":"uint8","name":"_cursoAno","type":"uint8"},{"internalType":"enumUpmAsignatura.TipoAsignatura","name":"_tipoAsignatura","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[{"internalType":"address","name":"_addrCoordinador","type":"address"}],"name":"actualizarCoordinador","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint8","name":"_indexEval","type":"uint8"},{"internalType":"string","name":"_nombre","type":"string"},{"internalType":"uint256","name":"_fecha","type":"uint256"},{"internalType":"bool","name":"_obligatoria","type":"bool"},{"internalType":"uint256","name":"_notaMinima","type":"uint256"},{"internalType":"uint256","name":"_porcAportacion","type":"uint256"},{"internalType":"enumUpmAsignatura.TipoConvocatoria","name":"_tipoConvocatoria","type":"uint8"}],"name":"actualizarEvaluacion","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_addrEthAlum","type":"address"},{"internalType":"enumUpmAsignatura.TipoConvocatoria","name":"_tipoConvocatoria","type":"uint8"},{"internalType":"uint8","name":"_indexEval","type":"uint8"},{"internalType":"enumUpmAsignatura.TipoNota","name":"_tipoNota","type":"uint8"},{"internalType":"uint256","name":"_calificacion","type":"uint256"}],"name":"actualizarNota","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"actualizarOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"alumnosLength","outputs":[{"internalType":"uint256","name":"_alumnosLength","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_addrEthAlum","type":"address"}],"name":"anadirAlumno","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_addrEthProf","type":"address"}],"name":"anadirProfesor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_addrEthAlum","type":"address"},{"internalType":"enumUpmAsignatura.TipoConvocatoria","name":"_tipoConvocatoria","type":"uint8"},{"internalType":"uint8","name":"_indexEval","type":"uint8"}],"name":"borrarNota","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"codigoAsignatura","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"coordinador","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_nombre","type":"string"},{"internalType":"uint256","name":"_fecha","type":"uint256"},{"internalType":"bool","name":"_obligatoria","type":"bool"},{"internalType":"uint256","name":"_notaMinima","type":"uint256"},{"internalType":"uint256","name":"_porcAportacion","type":"uint256"},{"internalType":"enumUpmAsignatura.TipoConvocatoria","name":"_tipoConvocatoria","type":"uint8"}],"name":"crearEvaluacion","outputs":[{"internalType":"uint8","name":"_indexEval","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_addrEthAlum","type":"address"},{"internalType":"enumUpmAsignatura.TipoConvocatoria","name":"_tipoConvocatoria","type":"uint8"},{"internalType":"uint8","name":"_indexEval","type":"uint8"},{"internalType":"enumUpmAsignatura.TipoNota","name":"_tipoNota","type":"uint8"},{"internalType":"uint256","name":"_calificacion","type":"uint256"}],"name":"crearNota","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"cursoAcademico","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cursoAno","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_addrEthAlum","type":"address"}],"name":"eliminarAlumno","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_addrEthProf","type":"address"}],"name":"eliminarProfesor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint8","name":"_indexEval","type":"uint8"}],"name":"leerEvaluacion","outputs":[{"internalType":"string","name":"_nombre","type":"string"},{"internalType":"uint256","name":"_fecha","type":"uint256"},{"internalType":"bool","name":"_obligatoria","type":"bool"},{"internalType":"uint256","name":"_notaMinima","type":"uint256"},{"internalType":"uint256","name":"_porcAportacion","type":"uint256"},{"internalType":"enumUpmAsignatura.TipoConvocatoria","name":"_tipoConvocatoria","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"enumUpmAsignatura.TipoConvocatoria","name":"_tipoConvocatoria","type":"uint8"},{"internalType":"uint8","name":"_indexEval","type":"uint8"}],"name":"leerMiNota","outputs":[{"internalType":"enumUpmAsignatura.TipoNota","name":"_tipoNota","type":"uint8"},{"internalType":"uint256","name":"_calificacion","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_addrEthAlum","type":"address"},{"internalType":"enumUpmAsignatura.TipoConvocatoria","name":"_tipoConvocatoria","type":"uint8"},{"internalType":"uint8","name":"_indexEval","type":"uint8"}],"name":"leerNota","outputs":[{"internalType":"enumUpmAsignatura.TipoNota","name":"_tipoNota","type":"uint8"},{"internalType":"uint256","name":"_calificacion","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"listaAlumnos","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"listaEvaluaciones","outputs":[{"internalType":"uint8","name":"indexEvaluacion","type":"uint8"},{"internalType":"string","name":"nombre","type":"string"},{"internalType":"uint256","name":"fecha","type":"uint256"},{"internalType":"bool","name":"obligatoria","type":"bool"},{"internalType":"uint256","name":"notaMinima","type":"uint256"},{"internalType":"uint256","name":"porcAportacion","type":"uint256"},{"internalType":"enumUpmAsignatura.TipoConvocatoria","name":"tipoConvocatoria","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"listaProfesores","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"mapAlumnos","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"uint8","name":"","type":"uint8"}],"name":"mapNotas","outputs":[{"internalType":"enumUpmAsignatura.TipoNota","name":"tipoNota","type":"uint8"},{"internalType":"uint256","name":"calificacion","type":"uint256"},{"internalType":"bool","name":"existsNota","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"mapProfesores","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"miDireccion","outputs":[{"internalType":"address","name":"_miDireccion","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nombreAsignatura","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numAlumnos","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numCreditos","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numEvaluaciones","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numNotas","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numProfesores","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"profesoresLength","outputs":[{"internalType":"uint256","name":"_profesoresLength","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"semestre","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tipoAsignatura","outputs":[{"internalType":"enumUpmAsignatura.TipoAsignatura","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"}];
		const contractConfig = {
			contractName: this.state.contractName,
			web3Contract: new this.props.drizzle.web3.eth.Contract(
				jsonInterface,				// abi
				this.props.addrEthAsig		// address del desplegado
			)
		};
		const events = [];
		if (!this.props.drizzle.contracts[this.state.contractName]) {
			this.props.drizzle.addContract(contractConfig, events);
		}
	}

	eliminarContratoDinamicamente() {
		const contractName = "UpmAsignatura-" + this.props.addrEthAsig;
		this.props.drizzle.deleteContract(this.state.contractName);
	}

	componentDidMount() {
		this.setState({ready: true});

		// añadir dinámicamente contrato a vigilar
		this.anadirContratoDinamicamente();
		console.log('MainGestionAsignatura - componentDidMount - contratos vigilados:', Object.keys(this.props.drizzle.contracts));
	}

	componentDidUpdate() {
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts[this.state.contractName];
		if (!instanceState || !instanceState.initialized) return;

		const instance = drizzle.contracts[this.state.contractName];

		let changed = false;

		let {
			miDireccionKey, ownerKey,
		} = JSON.parse(JSON.stringify(this.state));

		if (!miDireccionKey) {
			miDireccionKey = instance.methods.miDireccion.cacheCall();
			changed = true;
		}

		if (!ownerKey) {
			ownerKey = instance.methods.owner.cacheCall();
			changed = true;
		}

		if (changed) {
			this.setState({
				miDireccionKey,
				ownerKey,
			});
		}
		
	}

	componentWillUnmount() {
		// eliminar dinámicamente contrato a vigilar
		this.eliminarContratoDinamicamente();
		console.log('MainGestionAsignatura - componentWillUnmount - contratos vigilados:', Object.keys(this.props.drizzle.contracts));
	}

	render() {
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts[this.state.contractName];
		if (!this.state.ready || !instanceState || !instanceState.initialized) {
			return <span>Initializing...</span>;
		}

		let miDireccion = instanceState.miDireccion[this.state.miDireccionKey];
		miDireccion = miDireccion ? miDireccion.value :"0x0";
		console.log('MainGestionAsignatura - render - miDireccion:', miDireccion);

		let owner = instanceState.owner[this.state.ownerKey];
		owner = owner ? owner.value : "0x0";
		console.log('MainGestionAsignatura - render - owner:', owner);

		console.log('MainGestionAsignatura - render - props:', this.props);
		console.log('MainGestionAsignatura - render - contratos vigilados:', Object.keys(this.props.drizzle.contracts));

		return (
			<>
				<h2>Gestión de la asignatura {this.props.addrEthAsig}</h2>
				<p>Mi dirección: {miDireccion} {miDireccion === owner ? "(owner)" : "(no owner)"}</p>

				{this.state.contractName}

				<p>Coordinador: 
					<ContractData 	drizzle={drizzle}
									drizzleState={drizzleState}
									contract={this.state.contractName}
									method={"coordinador"} />
				</p>

				<p>Owner: 
					<ContractData 	drizzle={drizzle}
									drizzleState={drizzleState}
									contract={this.state.contractName}
									method={"owner"} />
				</p>

				<p>Nombre asignatura: 
					<ContractData 	drizzle={drizzle}
									drizzleState={drizzleState}
									contract={this.state.contractName}
									method={"nombreAsignatura"} />
				</p>

				<p>Curso académico: 
					<ContractData 	drizzle={drizzle}
									drizzleState={drizzleState}
									contract={this.state.contractName}
									method={"cursoAcademico"} />
				</p>

				<p>Código asignatura: 
					<ContractData 	drizzle={drizzle}
									drizzleState={drizzleState}
									contract={this.state.contractName}
									method={"codigoAsignatura"} />
				</p>
			</>
		);
	}
}

export default MainGestionAsignatura;