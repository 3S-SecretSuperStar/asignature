import React from 'react';

import {newContextComponents} from "drizzle-react-components";

import ListaProfesores from './ListaProfesores';
import ListaProfesores2 from './ListaProfesores2';
import CrearProfesor from './CrearProfesor';
import EliminarProfesor from './EliminarProfesor';

const {ContractData} = newContextComponents;

class GestionProfesores extends React.Component {

	state = {
		ready: false,
		miDireccionKey: null,
		profesoresLengthKey: null,
		ownerKey: null,
	};

	componentDidMount() {
		this.setState({ready: true});
	}

	componentDidUpdate() {
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts.UpmProfesores;
		if (!instanceState || !instanceState.initialized) return;

		const instance = drizzle.contracts.UpmProfesores;

		let changed = false;

		let {
			miDireccionKey, profesoresLengthKey, ownerKey
		} = JSON.parse(JSON.stringify(this.state));

		if (!miDireccionKey) {
            miDireccionKey = instance.methods.miDireccion.cacheCall();
            changed = true;
        }

        if (!profesoresLengthKey) {
			profesoresLengthKey = instance.methods.profesoresLength.cacheCall();
			changed = true;
		}

		if (!ownerKey) {
			ownerKey = instance.methods.owner.cacheCall();
			changed = true;
		}

		if (changed) {
			this.setState({
				miDireccionKey,
				profesoresLengthKey,
				ownerKey,
			});
		}
	}

	render() {
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts.UpmProfesores;
        if (!this.state.ready || !instanceState || !instanceState.initialized) {
            return <span>Initializing...</span>;
        }

        let miDireccion = instanceState.miDireccion[this.state.miDireccionKey];
        miDireccion = miDireccion ? miDireccion.value :"0x0";
        console.log('*** miDireccion:', miDireccion);

        let profesoresLength = instanceState.profesoresLength[this.state.profesoresLengthKey];
        profesoresLength = profesoresLength ? profesoresLength.value : -1;
        console.log('*** profesoresLength:', profesoresLength);

        let owner = instanceState.owner[this.state.ownerKey];
        owner = owner ? owner.value : "0x0";
        console.log('*** owner:', owner);

		return (
			<>
				<h2>Gestión de profesores</h2>
				<p>Mi dirección: {miDireccion} {miDireccion === owner ? "(owner)" : "(no owner)"}</p>

				<h3>Lista de profesores creados</h3>
				<ListaProfesores 	drizzle={drizzle}
									drizzleState={drizzleState}
									profesoresLength={profesoresLength} />

				<h3>(2) Lista de profesores creados</h3>
				<p>(ToDo) No se muestran los eliminados, pero cuando creo un profesor no se actualiza</p>
				<ListaProfesores2 	drizzle={drizzle}
									drizzleState={drizzleState}
									profesoresLength={profesoresLength} />

				<h3>Crear profesor</h3>
				<CrearProfesor 	drizzle={drizzle}
								drizzleState={drizzleState} />

				<h3>Eliminar profesor</h3>
				<EliminarProfesor	drizzle={drizzle}
									drizzleState={drizzleState} />

				<h3>(ToDo) Actualizar profesor</h3>
				<p>ToDo</p>
			</>
		);
	}
}

export default GestionProfesores;