import React from 'react';

import {newContextComponents} from "drizzle-react-components";

const {ContractData} = newContextComponents;

class ListaAlumnos extends React.Component {

	state = {
		ready: false,
		alumnosLengthKey: null,
		numAlumnosKey: null,
		alumno1Key: null,
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
			alumnosLengthKey, numAlumnosKey, alumno1Key
		} = JSON.parse(JSON.stringify(this.state));

		if (!alumnosLengthKey) {
			alumnosLengthKey = instance.methods.alumnosLength.cacheCall();
			changed = true;
		}

		if (!numAlumnosKey) {
			numAlumnosKey = instance.methods.numAlumnos.cacheCall();
			changed = true;
		}

		if (!alumno1Key && alumnosLengthKey) {
			alumno1Key = instance.methods.listaAlumnos.cacheCall(1);
			changed = true;
		}

		if (changed) {
			this.setState({
				alumnosLengthKey,
				numAlumnosKey,
				alumno1Key,
			});
		}

	}

	render() {
		const {drizzle, drizzleState} = this.props;

        const instanceState = drizzleState.contracts.UpmAlumnos;
        if (!this.state.ready || !instanceState || !instanceState.initialized) {
            return <span>Initializing...</span>;
        }

        let alumnosLength = instanceState.alumnosLength[this.state.alumnosLengthKey];
        alumnosLength = alumnosLength ? alumnosLength.value : -1;

        let numAlumnos = instanceState.numAlumnos[this.state.numAlumnosKey];
        numAlumnos = numAlumnos ? numAlumnos.value : -2;

        let alumno1 = instanceState.listaAlumnos[this.state.alumno1Key];
        alumno1 = alumno1 ? alumno1.value : -3;
        console.log('alumno1:', alumno1);

        let tbodyListaAlumnos = [];
        for (let i = 0; i < alumnosLength; i++) {
        	tbodyListaAlumnos[i] = (
        		<ContractData	key={i}
        						drizzle={drizzle}
        						drizzleState={drizzleState}
        						contract={"UpmAlumnos"}
        						method={"listaAlumnos"}
        						methodArgs={[i]}
        						render={addrEthAlum => (
        							<ContractData	key={`${i}${i}`}
					        						drizzle={drizzle}
					        						drizzleState={drizzleState}
					        						contract={"UpmAlumnos"}
					        						method={"mapAlumnosAddr"}
					        						methodArgs={[addrEthAlum]}
					        						render={alumno => (
					        							<tr>
															<td>{alumno.addrEthAlum}</td>
															<td>{alumno.nombre}</td>
															<td>{alumno.apellidos}</td>
														</tr>
					        						)} />
        							
        						)}
				/>
        	);
        }

		return (
			<>
				<p>{alumnosLength} alumnosLength</p>
				<p>{numAlumnos} alumnos</p>

				<table>
					<thead>
						<tr>
							<th>Dirección</th>
							<th>Nombre</th>
							<th>Apellidos</th>
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

export default ListaAlumnos;