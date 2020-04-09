import React from 'react';

import {newContextComponents} from "drizzle-react-components";

import ListaAlumnos from './ListaAlumnos';
import ListaAlumnos2 from './ListaAlumnos2';
import CrearAlumno from './CrearAlumno';
import EliminarAlumno from './EliminarAlumno';

const {ContractData} = newContextComponents;

class GestionAlumnos extends React.Component {

	state = {
		ready: false,
		miDireccionKey: null,
		alumnosLengthKey: null,
		ownerKey: null,
	};

	componentDidMount() {
		this.setState({ready: true});
	}

	componentDidUpdate() {
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts.UpmAlumnos;
		if (!instanceState || !instanceState.initialized) return;

		const instance = drizzle.contracts.UpmAlumnos;

		let changed = false;

		let {
			miDireccionKey, alumnosLengthKey, ownerKey
		} = JSON.parse(JSON.stringify(this.state));

		if (!miDireccionKey) {
            miDireccionKey = instance.methods.miDireccion.cacheCall();
            changed = true;
        }

        if (!alumnosLengthKey) {
			alumnosLengthKey = instance.methods.alumnosLength.cacheCall();
			changed = true;
		}

		if (!ownerKey) {
			ownerKey = instance.methods.owner.cacheCall();
			changed = true;
		}

		if (changed) {
			this.setState({
				miDireccionKey,
				alumnosLengthKey,
				ownerKey,
			});
		}
	}

	render() {
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts.UpmAlumnos;
        if (!this.state.ready || !instanceState || !instanceState.initialized) {
            return <span>Initializing...</span>;
        }

        let miDireccion = instanceState.miDireccion[this.state.miDireccionKey];
        miDireccion = miDireccion ? miDireccion.value :"0x0";
        console.log('*** miDireccion:', miDireccion);

        let alumnosLength = instanceState.alumnosLength[this.state.alumnosLengthKey];
        alumnosLength = alumnosLength ? alumnosLength.value : -1;
        console.log('*** alumnosLength:', alumnosLength);

        let owner = instanceState.owner[this.state.ownerKey];
        owner = owner ? owner.value : "0x0";
        console.log('*** owner:', owner);

		return (
			<>
				<h2>Gestión de alumnos</h2>
				<p>Mi dirección: {miDireccion} {miDireccion === owner ? "(owner)" : "(no owner)"}</p>

				<h3>Lista de alumnos creados</h3>
				<ListaAlumnos 	drizzle={drizzle}
								drizzleState={drizzleState}
								alumnosLength={alumnosLength} />

				<h3>(2) Lista de alumnos creados</h3>
				<p>(ToDo) No se muestran los eliminados, pero cuando creo un alumno no se actualiza</p>
				<ListaAlumnos2 	drizzle={drizzle}
								drizzleState={drizzleState}
								alumnosLength={alumnosLength} />

				<h3>Crear alumno</h3>
				<CrearAlumno 	drizzle={drizzle}
								drizzleState={drizzleState} />

				<h3>Eliminar alumno</h3>
				<EliminarAlumno drizzle={drizzle}
								drizzleState={drizzleState} />

				<h3>(ToDo) Actualizar alumno</h3>
				<p>ToDo</p>
			</>
		);
	}
}

export default GestionAlumnos;