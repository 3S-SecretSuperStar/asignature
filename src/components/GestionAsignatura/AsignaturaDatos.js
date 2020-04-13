import React from 'react';

import {newContextComponents} from "drizzle-react-components";

import {jsonInterface} from '../../utils/varios.js';

const {ContractData} = newContextComponents;

class AsignaturaDatos extends React.Component {

	state = {
		ready: false,
	};

	componentDidMount() {
		this.setState({ready: true});
	}

	componentDidUpdate() {
		
	}

	render() {
		const {drizzle, drizzleState, contractName} = this.props;

		const instanceState = drizzleState.contracts[contractName];
		if (!this.state.ready || !instanceState || !instanceState.initialized) {
			return <span>Initializing...</span>;
		}

		return (
			<>
				<h3>Datos de la asignatura</h3>
				<p>Nombre del contrato: {contractName}</p>

				<table>
					<tbody>
						<tr>
							<td>Coordinador</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"coordinador"} />
							</td>
						</tr>

						<tr>
							<td>Owner</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"owner"} />
							</td>
						</tr>

						

						<tr>
							<td>Nombre asignatura</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"nombreAsignatura"} />
							</td>
						</tr>

						<tr>
							<td>Curso académico</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"cursoAcademico"} />
							</td>
						</tr>

						<tr>
							<td>Código asignatura</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"codigoAsignatura"} />
							</td>
						</tr>

						<tr>
							<td>Titulación</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"titulacion"} />
							</td>
						</tr>

						<tr>
							<td>Número de créditos</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"numCreditos"} />
							</td>
						</tr>

						<tr>
							<td>Semestre</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"semestre"} />
							</td>
						</tr>

						<tr>
							<td>Curso (1º, 2º, etc.)</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"cursoAno"} />
							</td>
						</tr>

						<tr>
							<td>Tipo de asignatura</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"tipoAsignatura"}
												render={tipoAsignatura => (
													<>
														{tipoAsignatura === "0" ? "Obligatoria" : ""}
														{tipoAsignatura === "1" ? "Optativa" : ""}
													</>
												)} />
							</td>
						</tr>

						<tr>
							<td>numAlumnos</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"numAlumnos"} />
							</td>
						</tr>

						<tr>
							<td>numProfesores</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"numProfesores"} />
							</td>
						</tr>

						<tr>
							<td>numEvaluaciones</td>
							<td>
								<ContractData 	drizzle={drizzle}
												drizzleState={drizzleState}
												contract={contractName}
												method={"numEvaluaciones"} />
							</td>
						</tr>
					</tbody>
				</table>
			</>
		);
	}
}

export default AsignaturaDatos;