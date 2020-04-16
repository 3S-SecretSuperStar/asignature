import React from 'react';

import {
	Switch,
	Route,
} from 'react-router-dom';

import {newContextComponents} from "drizzle-react-components";

import ListaAlumnos from './ListaAlumnos';
import CrearAlumno from './CrearAlumno';
import ActualizarOwner from './ActualizarOwner';

import HookMostrarAlumno from './HookMostrarAlumno';

const {ContractData} = newContextComponents;

class GestionAlumnos extends React.Component {

	state = {
		ready: false,
		miDireccionKey: null,
		ownerKey: null,
		alumnosLengthKey: null,
		numAlumnosKey: null,
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
			miDireccionKey, alumnosLengthKey, numAlumnosKey, ownerKey,
		} = JSON.parse(JSON.stringify(this.state));

		if (!miDireccionKey) {
            miDireccionKey = instance.methods.miDireccion.cacheCall();
            changed = true;
        }

		if (!ownerKey) {
			ownerKey = instance.methods.owner.cacheCall();
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

		if (changed) {
			this.setState({
				miDireccionKey,
				ownerKey,
				alumnosLengthKey,
				numAlumnosKey,
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

        let owner = instanceState.owner[this.state.ownerKey];
        owner = owner ? owner.value : "0x0";

        let alumnosLength = instanceState.alumnosLength[this.state.alumnosLengthKey];
        alumnosLength = alumnosLength ? alumnosLength.value : -1;

        let numAlumnos = instanceState.numAlumnos[this.state.numAlumnosKey];
        numAlumnos = numAlumnos ? numAlumnos.value : -1;

        let crearAlumno = [];
        let actualizarOwner = [];
        if (miDireccion === owner) {
        	crearAlumno = <CrearAlumno 	drizzle={drizzle}
										drizzleState={drizzleState}
										miDireccion={miDireccion}
										owner={owner} />;
			actualizarOwner = <ActualizarOwner 	drizzle={drizzle}
												drizzleState={drizzleState}
												miDireccion={miDireccion}
												owner={owner} />;
        }

		return (
			<>
				<h2>Gestión de alumnos</h2>
				<p>Mi dirección: {miDireccion} {miDireccion === owner ? "(owner)" : "(no owner)"}</p>

				<Switch>
					<Route exact path="/gestion-alumnos">
						<ListaAlumnos 	drizzle={drizzle}
										drizzleState={drizzleState}
										alumnosLength={alumnosLength}
										numAlumnos={numAlumnos}
										miDireccion={miDireccion}
										owner={owner} />

						{crearAlumno}
						
						{actualizarOwner}
					</Route>

					<Route path="/gestion-alumnos/alumno/:addrEthAlum">
						<HookMostrarAlumno 	drizzle={drizzle}
											drizzleState={drizzleState}
											miDireccion={miDireccion}
											owner={owner} />
					</Route>
				</Switch>

			</>
		);
	}
}

export default GestionAlumnos;