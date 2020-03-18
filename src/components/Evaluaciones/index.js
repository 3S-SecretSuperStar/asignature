import React from 'react';

import {newContextComponents} from "drizzle-react-components";

const {ContractData} = newContextComponents;

class Evaluaciones extends React.Component {

    state = {
        ready: false,
        evaluacionesLengthKey: null
    }

    componentDidMount() {
        this.setState({ready: true});
    }

    componentDidUpdate(prevProps, prevState, snapshoot) {
        const {drizzle, drizzleState} = this.props;

        const instanceState = drizzleState.contracts.Asignatura;
        if (!instanceState || !instanceState.initialized) return;

        if (!this.state.evaluacionesLengthKey) {
            const instance = drizzle.contracts.Asignatura;
            this.setState({
                evaluacionesLengthKey: instance.methods.evaluacionesLength.cacheCall()
            });
        }
    }

    render() {
        const {drizzle, drizzleState} = this.props;

        const instanceState = drizzleState.contracts.Asignatura;
        if (!this.state.ready || !instanceState || !instanceState.initialized) {
            return <span>Initializing...</span>;
        }

        let el = instanceState.evaluacionesLength[this.state.evaluacionesLengthKey];
        el = el ? el.value : 0;

        let tbody = [];
        for (let i = 0; i < el; i++) {
            tbody[i] = (
                <ContractData
                    key={"Eva_"+i}
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract={"Asignatura"}
                    method={"evaluaciones"}
                    methodArgs={[i]}
                    render={evaluacion => (
                        <tr key={"EVA-"+i}>
                            <th>E<sub>{i}</sub></th>
                            <td>{evaluacion.nombre}</td>
                            <td>{evaluacion.fecha ? (new Date(1000 * evaluacion.fecha)).toLocaleString() : ""}</td>
                            <td>{(evaluacion.puntos / 10).toFixed(1)}</td>
                        </tr>
                    )}
                />);
        }

        return (
            <section>
                <h1>Evaluaciones [{el}]</h1>

                <table border={1}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Fecha</th>
                        <th>Puntos</th>
                    </tr>
                    </thead>
                    <tbody>{tbody}</tbody>
                </table>
            </section>
        );
    }
}

export default Evaluaciones;


