import React from 'react';

import CalificacionesHead from "./CalificacionesHead";
import CalificacionesBody from "./CalificacionesBody";

class Calificaciones extends React.Component {

    state = {
        ready: false,
        evaluacionesLengthKey: null,
        matriculasLengthKey: null
    }

    componentDidMount() {
        this.setState({ready: true});
    }

    componentDidUpdate(prevProps, prevState, snapshoot) {
        const {drizzle, drizzleState} = this.props;

        const instanceState = drizzleState.contracts.Asignatura;
        if (!instanceState || !instanceState.initialized) return;

        const instance = drizzle.contracts.Asignatura;

        let changed = false;

        // Copiar el estado
        let {
            evaluacionesLengthKey,
            matriculasLengthKey
        } = JSON.parse(JSON.stringify(this.state));

        if (!evaluacionesLengthKey) {
            evaluacionesLengthKey = instance.methods.evaluacionesLength.cacheCall();
            changed = true;
        }

        if (!matriculasLengthKey) {
            matriculasLengthKey = instance.methods.matriculasLength.cacheCall();
            changed = true;
        }

        if (changed) {
            this.setState({
                evaluacionesLengthKey,
                matriculasLengthKey
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

        let ml = instanceState.matriculasLength[this.state.matriculasLengthKey];
        ml = ml ? ml.value : 0;

        return (
            <section>
                <h1>Calificaciones</h1>
                <table>
                    <CalificacionesHead evaluacionesLength={el} />
                    <CalificacionesBody drizzle={drizzle}
                                        drizzleState={drizzleState}
                                        evaluacionesLength={el}
                                        matriculasLength={ml} />
                </table>
            </section>
        );
    }
}

export default Calificaciones;