import React from 'react';

import {newContextComponents} from "drizzle-react-components";

const {ContractData} = newContextComponents;

class ListaProfesores extends React.Component {

	state = {
		ready: false,
		ownProfesoresLengthKey: null,
		numProfesoresKey: null,
	};

	componentDidMount() {
		this.setState({
			ready: true,
		});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts.UpmProfesores;
		if (!instanceState || !instanceState.initialized) return;

		const instance = drizzle.contracts.UpmProfesores;

		let changed = false;

		let {
			ownProfesoresLengthKey, numProfesoresKey
		} = JSON.parse(JSON.stringify(this.state));

		if (!ownProfesoresLengthKey) {
			ownProfesoresLengthKey = instance.methods.profesoresLength.cacheCall();
			changed = true;
		}

		if (!numProfesoresKey) {
			numProfesoresKey = instance.methods.numProfesores.cacheCall();
			changed = true;
		}

		if (changed) {
			this.setState({
				ownProfesoresLengthKey,
				numProfesoresKey,
			});
		}

	}

	render() {
		const {drizzle, drizzleState} = this.props;

        const instanceState = drizzleState.contracts.UpmProfesores;
        if (!this.state.ready || !instanceState || !instanceState.initialized) {
            return <span>Initializing...</span>;
        }

        let ownProfesoresLength = instanceState.profesoresLength[this.state.ownProfesoresLengthKey];
        ownProfesoresLength = ownProfesoresLength ? ownProfesoresLength.value : -1;

        let numProfesores = instanceState.numProfesores[this.state.numProfesoresKey];
        numProfesores = numProfesores ? numProfesores.value : -2;

        let tbodyListaProfesores = [];
        for (let i = 0; i < ownProfesoresLength; i++) {
        	tbodyListaProfesores[i] = (
        		<ContractData	key={i}
        						drizzle={drizzle}
        						drizzleState={drizzleState}
        						contract={"UpmProfesores"}
        						method={"listaProfesores"}
        						methodArgs={[i]}
        						render={addrEthProf => (
        							<ContractData	key={`${i}${i}`}
					        						drizzle={drizzle}
					        						drizzleState={drizzleState}
					        						contract={"UpmProfesores"}
					        						method={"mapProfesoresAddr"}
					        						methodArgs={[addrEthProf]}
					        						render={profesor => (
					        							<tr>
															<td>{profesor.addrEthProf}</td>
															<td>{profesor.nombre}</td>
															<td>{profesor.apellidos}</td>
															<td>{profesor.correoUpm}</td>
														</tr>
					        						)} />
        							
        						)}
				/>
        	);
        }

		return (
			<>
				<p>{ownProfesoresLength} ownProfesoresLength</p>
				<p>{numProfesores} profesor</p>

				<table>
					<thead>
						<tr>
							<th>Dirección</th>
							<th>Nombre</th>
							<th>Apellidos</th>
							<th>Correo</th>
						</tr>
					</thead>
					<tbody>
						{tbodyListaProfesores}
					</tbody>
				</table>
			</>
		);
	}

}

export default ListaProfesores;