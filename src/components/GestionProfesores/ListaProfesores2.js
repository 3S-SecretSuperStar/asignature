import React from 'react';

import {newContextComponents} from "drizzle-react-components";

const {ContractData} = newContextComponents;

class ListaProfesores2 extends React.Component {

	state = {
		ready: false,
		numProfesoresKey: null,
		profesoresArrayKeys: null
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
			numProfesoresKey, profesoresArrayKeys
		} = JSON.parse(JSON.stringify(this.state));

		if (!numProfesoresKey) {
			numProfesoresKey = instance.methods.numProfesores.cacheCall();
			changed = true;
		}

		if (this.props.profesoresLength !== -1 && !profesoresArrayKeys) {
			profesoresArrayKeys = [];
			for (let i = 0; i < this.props.profesoresLength; i++) {
				profesoresArrayKeys[i] = instance.methods.listaProfesores.cacheCall(i);
				changed = true;
			}
		}

		if (changed) {
			this.setState({
				numProfesoresKey,
				profesoresArrayKeys,
			});
		}

	}

	render() {
		const {drizzle, drizzleState} = this.props;

        const instanceState = drizzleState.contracts.UpmProfesores;
        if (!this.state.ready || !instanceState || !instanceState.initialized) {
            return <span>Initializing...</span>;
        }

        console.log('render - propsProfesoresLength:', this.props.profesoresLength);

        let numProfesores = instanceState.numProfesores[this.state.numProfesoresKey];
        numProfesores = numProfesores ? numProfesores.value : -2;

        let profesores = [];
        if (this.state.profesoresArrayKeys) {
        	for (let i = 0; i < this.props.profesoresLength; i++) {
	        	let maux = instanceState.listaProfesores[this.state.profesoresArrayKeys[i]];
	        	profesores[i] = maux ? maux.value : -10;
	        }
        }
        console.log('render - profesoresArrayKeys:', this.state.profesoresArrayKeys);
        console.log('render - profesores', profesores);

        let tbodyListaProfesores = [];
        for (let i = 0; i < profesores.length; i++) {
        	if (profesores[i] !== -10  && profesores[i] !== "0x0000000000000000000000000000000000000000") {
        		tbodyListaProfesores[i] = (
	        		<ContractData	key={i}
	        						drizzle={drizzle}
	        						drizzleState={drizzleState}
	        						contract={"UpmProfesores"}
	        						method={"mapProfesoresAddr"}
	        						methodArgs={[profesores[i]]}
	        						render={profesor => (
	        							<tr>
											<td>{profesor.addrEthProf}</td>
											<td>{profesor.nombre}</td>
											<td>{profesor.apellidos}</td>
											<td>{profesor.correoUpm}</td>
										</tr>
	        						)}
	        		/>
	        	);
        	}
        }

		return (
			<>
				<p>{this.props.profesoresLength} propsProfesoresLength</p>
				<p>{numProfesores} profesores</p>

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

export default ListaProfesores2;