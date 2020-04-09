import React from 'react';

import {newContextComponents} from "drizzle-react-components";

const {ContractData} = newContextComponents;

class ListaAlumnos2 extends React.Component {

	state = {
		ready: false,
		numAlumnosKey: null,
		alumnosArrayKeys: null
	};

	componentDidMount() {
		this.setState({
			ready: true,
		});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts.UpmAlumnos;
		if (!instanceState || !instanceState.initialized) return;

		const instance = drizzle.contracts.UpmAlumnos;

		let changed = false;

		let {
			numAlumnosKey, alumnosArrayKeys
		} = JSON.parse(JSON.stringify(this.state));

		if (!numAlumnosKey) {
			numAlumnosKey = instance.methods.numAlumnos.cacheCall();
			changed = true;
		}

		if (this.props.alumnosLength != -1 && !alumnosArrayKeys) {
			alumnosArrayKeys = [];
			for (let i = 0; i < this.props.alumnosLength; i++) {
				alumnosArrayKeys[i] = instance.methods.listaAlumnos.cacheCall(i);
				changed = true;
			}
		}

		if (changed) {
			this.setState({
				numAlumnosKey,
				alumnosArrayKeys,
			});
		}

	}

	render() {
		const {drizzle, drizzleState} = this.props;

        const instanceState = drizzleState.contracts.UpmAlumnos;
        if (!this.state.ready || !instanceState || !instanceState.initialized) {
            return <span>Initializing...</span>;
        }

        console.log('render - propsAlumnosLength:', this.props.alumnosLength);

        let numAlumnos = instanceState.numAlumnos[this.state.numAlumnosKey];
        numAlumnos = numAlumnos ? numAlumnos.value : -2;

        let alumnos = [];
        if (this.state.alumnosArrayKeys) {
        	for (let i = 0; i < this.props.alumnosLength; i++) {
	        	let maux = instanceState.listaAlumnos[this.state.alumnosArrayKeys[i]];
	        	alumnos[i] = maux ? maux.value : -10;
	        }
        }
        console.log('render - alumnosArrayKeys:', this.state.alumnosArrayKeys);
        console.log('render - alumnos', alumnos);

        let tbodyListaAlumnos = [];
        for (let i = 0; i < alumnos.length; i++) {
        	if (alumnos[i] != -10  && alumnos[i] != "0x0000000000000000000000000000000000000000") {
        		tbodyListaAlumnos[i] = (
	        		<ContractData	key={i}
	        						drizzle={drizzle}
	        						drizzleState={drizzleState}
	        						contract={"UpmAlumnos"}
	        						method={"mapAlumnosAddr"}
	        						methodArgs={[alumnos[i]]}
	        						render={alumno => (
	        							<tr>
											<td>{alumno.addrEthAlum}</td>
											<td>{alumno.nombre}</td>
											<td>{alumno.apellidos}</td>
											<td>{alumno.correoUpm}</td>
										</tr>
	        						)}
	        		/>
	        	);
        	}
        }

		return (
			<>
				<p>{this.props.alumnosLength} propsAlumnosLength</p>
				<p>{numAlumnos} alumnos</p>

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
						{tbodyListaAlumnos}
					</tbody>
				</table>
			</>
		);
	}

}

export default ListaAlumnos2;