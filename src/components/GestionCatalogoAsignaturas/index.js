import React from 'react';

import MiDireccion from '../MiDireccion';

import ListaAsignaturas from './ListaAsignaturas';
import DesplegarYAnadirAsignatura from './DesplegarYAnadirAsignatura';

class GestionCatalogoAsignaturas extends React.Component {

	state = {
		ready: false,
		miDireccionKey: null,
		ownerKey: null,
		asignaturasLengthKey: null,
		numAsignaturasKey: null,
	};

	componentDidMount() {
		this.setState({ready: true});
	}

	componentDidUpdate() {
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts.UpmCatalogo;
		if (!instanceState || !instanceState.initialized) return;

		const instance = drizzle.contracts.UpmCatalogo;

		let changed = false;

		let {
			miDireccionKey, ownerKey, asignaturasLengthKey, numAsignaturasKey
		} = JSON.parse(JSON.stringify(this.state));

		if (!miDireccionKey) {
			miDireccionKey = instance.methods.miDireccion.cacheCall();
			changed = true;
		}

		if (!ownerKey) {
			ownerKey = instance.methods.owner.cacheCall();
			changed = true;
		}

		if (!asignaturasLengthKey) {
			asignaturasLengthKey = instance.methods.asignaturasLength.cacheCall();
			changed = true;
		}

		if (!numAsignaturasKey) {
			numAsignaturasKey = instance.methods.numAsignaturas.cacheCall();
			changed = true;
		}

		if (changed) {
			this.setState({
				miDireccionKey,
				ownerKey,
				asignaturasLengthKey,
				numAsignaturasKey,
			});
		}
	}

	render() {
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts.UpmCatalogo;
		if (!this.state.ready || !instanceState || !instanceState.initialized) {
			return <span>Initializing...</span>;
		}

		let miDireccion = instanceState.miDireccion[this.state.miDireccionKey];
		miDireccion = miDireccion ? miDireccion.value :"0x0";

		let owner = instanceState.owner[this.state.ownerKey];
		owner = owner ? owner.value : "0x0";

		const isOwner = owner === miDireccion;

		let asignaturasLength = instanceState.asignaturasLength[this.state.asignaturasLengthKey];
		asignaturasLength = asignaturasLength ? asignaturasLength.value : -1;

		let numAsignaturas = instanceState.numAsignaturas[this.state.numAsignaturasKey];
		numAsignaturas = numAsignaturas ? numAsignaturas.value : -2;

		let desplegarYAnadirAsignatura = [];
		if (isOwner) {
			desplegarYAnadirAsignatura = <DesplegarYAnadirAsignatura	drizzle={drizzle}
																		drizzleState={drizzleState}
																		miDireccion={miDireccion} />
		}

		return (
			<>
				<h2>Gestión del catálogo de asignaturas</h2>
				<MiDireccion miDireccion={miDireccion} owner={owner} />

				<ListaAsignaturas	drizzle={drizzle}
									drizzleState={drizzleState}
									asignaturasLength={asignaturasLength}
									numAsignaturas={numAsignaturas}
									miDireccion={miDireccion}
									owner={owner} />

				{desplegarYAnadirAsignatura}
			</>
		);
	}
}

export default GestionCatalogoAsignaturas;