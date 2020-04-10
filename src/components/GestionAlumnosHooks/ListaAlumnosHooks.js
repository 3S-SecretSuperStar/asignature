import React from 'react';

import {newContextComponents} from "drizzle-react-components";

const {ContractData} = newContextComponents;

class ListaAlumnos extends React.Component {

	state = {
		ready: false,
		ownAlumnosLengthKey: null,
		numAlumnosKey: null,
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
			ownAlumnosLengthKey, numAlumnosKey
		} = JSON.parse(JSON.stringify(this.state));

		if (!ownAlumnosLengthKey) {
			ownAlumnosLengthKey = instance.methods.alumnosLength.cacheCall();
			changed = true;
		}

		if (!numAlumnosKey) {
			numAlumnosKey = instance.methods.numAlumnos.cacheCall();
			changed = true;
		}

		if (changed) {
			this.setState({
				ownAlumnosLengthKey,
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

        let ownAlumnosLength = instanceState.alumnosLength[this.state.ownAlumnosLengthKey];
        ownAlumnosLength = ownAlumnosLength ? ownAlumnosLength.value : -1;

        let numAlumnos = instanceState.numAlumnos[this.state.numAlumnosKey];
        numAlumnos = numAlumnos ? numAlumnos.value : -2;

        let tbodyListaAlumnos = [];
        for (let i = 0; i < ownAlumnosLength; i++) {
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
															<td>{alumno.correoUpm}</td>
														</tr>
					        						)} />
        							
        						)}
				/>
        	);
        }

		return (
			<>
				<p>{ownAlumnosLength} ownAlumnosLength</p>
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

export default ListaAlumnos;