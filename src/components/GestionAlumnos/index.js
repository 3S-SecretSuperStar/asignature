import React from 'react';

import {newContextComponents} from "drizzle-react-components";

import ListaAlumnos from './ListaAlumnos';
import CrearAlumno from './CrearAlumno';

const {ContractData} = newContextComponents;

class GestionAlumnos extends React.Component {

	state = {
		ready: false,
		miDireccionKey: null,
		alumnosLengthKey: null,
		numAlumnosKey: null,
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
			miDireccionKey, alumnosLengthKey, numAlumnosKey, ownerKey
		} = JSON.parse(JSON.stringify(this.state));

		if (!miDireccionKey) {
            miDireccionKey = instance.methods.miDireccion.cacheCall();
            changed = true;
        }

        if (!alumnosLengthKey) {
			alumnosLengthKey = instance.methods.alumnosLength.cacheCall();
			changed = true;
		}

		if (!numAlumnosKey) {
			numAlumnosKey = instance.methods.numAlumnos.cacheCall();
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
				numAlumnosKey,
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

        let alumnosLength = instanceState.alumnosLength[this.state.alumnosLengthKey];
        alumnosLength = alumnosLength ? alumnosLength.value : -1;

        let numAlumnos = instanceState.numAlumnos[this.state.numAlumnosKey];
        numAlumnos = numAlumnos ? numAlumnos.value : -1;

        let owner = instanceState.owner[this.state.ownerKey];
        owner = owner ? owner.value : "0x0";

		return (
			<>
				<h2>Gestión de alumnos</h2>
				<p>Mi dirección: {miDireccion} {miDireccion === owner ? "(owner)" : "(no owner)"}</p>

				<ListaAlumnos 	drizzle={drizzle}
								drizzleState={drizzleState}
								alumnosLength={alumnosLength}
								numAlumnos={numAlumnos} />

				<CrearAlumno 	drizzle={drizzle}
								drizzleState={drizzleState} />

				<h3>(ToDo) Actualizar alumno</h3>
				<p>ToDo</p>
			</>
		);
	}
}

export default GestionAlumnos;