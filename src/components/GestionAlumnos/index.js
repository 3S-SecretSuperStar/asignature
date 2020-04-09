import React from 'react';

import {newContextComponents} from "drizzle-react-components";

import ListaAlumnos from './ListaAlumnos';
import CrearAlumno from './CrearAlumno';
import EliminarAlumno from './EliminarAlumno';

const {ContractData} = newContextComponents;

class GestionAlumnos extends React.Component {

	state = {
		ready: false,
		miDireccionKey: null
	};

	componentDidMount() {
		this.setState({ready: true});
	}

	componentDidUpdate() {
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts.UpmAlumnos;
		if (!instanceState || !instanceState.initialized) return;

		if (!this.state.miDireccionKey) {
            const instance = drizzle.contracts.UpmAlumnos;
            this.setState({
                miDireccionKey: instance.methods.miDireccion.cacheCall()
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
        console.log('miDireccion:', miDireccion);

		return (
			<>
				<h2>Gestión de alumnos</h2>
				<p>Mi dirección: {miDireccion}</p>

				<h3>Lista de alumnos creados</h3>
				<ListaAlumnos 	drizzle={drizzle}
								drizzleState={drizzleState} />

				<h3>Crear alumno</h3>
				<CrearAlumno 	drizzle={drizzle}
								drizzleState={drizzleState} />

				<h3>Eliminar alumno</h3>
				<EliminarAlumno drizzle={drizzle}
								drizzleState={drizzleState} />

				<h3>Actualizar alumno</h3>
				<p>ToDo</p>
			</>
		);
	}
}

export default GestionAlumnos;