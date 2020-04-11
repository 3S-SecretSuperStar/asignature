import React from 'react';

import {newContextComponents} from "drizzle-react-components";

const {ContractData} = newContextComponents;

class MainAsignatura extends React.Component {

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

		console.log('MainAsignatura', this.props);

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

        console.log('instanceState', instanceState);

		return (
			<>
				<h3>MainAsignatura 1</h3>
			</>
		);
	}
}

export default MainAsignatura;