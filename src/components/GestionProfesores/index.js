import React from 'react';

import {
	Switch,
	Route,
} from 'react-router-dom';

import MiDireccion from '../MiDireccion';

import ListaProfesores from './ListaProfesores';
import CrearProfesor from './CrearProfesor';
import ActualizarOwner from './ActualizarOwner';

import HookMostrarProfesor from './HookMostrarProfesor';

class GestionProfesores extends React.Component {

	state = {
		ready: false,
		miDireccionKey: null,
		profesoresLengthKey: null,
		numProfesoresKey: null,
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
			miDireccionKey, profesoresLengthKey, numProfesoresKey, ownerKey
		} = JSON.parse(JSON.stringify(this.state));

		if (!miDireccionKey) {
            miDireccionKey = instance.methods.miDireccion.cacheCall();
            changed = true;
        }

        if (!profesoresLengthKey) {
			profesoresLengthKey = instance.methods.profesoresLength.cacheCall();
			changed = true;
		}

		if (!numProfesoresKey) {
			numProfesoresKey = instance.methods.numProfesores.cacheCall();
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
				numProfesoresKey,
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
        miDireccion = miDireccion ? miDireccion.value :"0x0000000000000000000000000000000000000000";

        let owner = instanceState.owner[this.state.ownerKey];
        owner = owner ? owner.value : "0x0000000000000000000000000000000000000000";

        let profesoresLength = instanceState.profesoresLength[this.state.profesoresLengthKey];
        profesoresLength = profesoresLength ? profesoresLength.value : -1;

        let numProfesores = instanceState.numProfesores[this.state.numProfesoresKey];
        numProfesores = numProfesores ? numProfesores.value : -1;

        let crearProfesor = [];
        let actualizarOwner = [];
        if (miDireccion === owner) {
        	crearProfesor = <CrearProfesor 	drizzle={drizzle}
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
				<h2>Gestión de profesores</h2>
				<MiDireccion miDireccion={miDireccion} owner={owner} />

				<Switch>
					<Route exact path="/gestion-profesores">
						<ListaProfesores	drizzle={drizzle}
											drizzleState={drizzleState}
											profesoresLength={profesoresLength}
											numProfesores={numProfesores}
											miDireccion={miDireccion}
											owner={owner} />

						{crearProfesor}

						{actualizarOwner}
					</Route>

					<Route path="/gestion-profesores/profesor/:addrEthProf">
						<HookMostrarProfesor	drizzle={drizzle}
												drizzleState={drizzleState}
												miDireccion={miDireccion}
												owner={owner} />
					</Route>
				</Switch>

			</>
		);
	}
}

export default GestionProfesores;