import React from 'react';

import AlumnosHead from "./AlumnosHead";
import AlumnosBody from "./AlumnosBody";
import AlumnosRow from "./AlumnosRow";
import CalificacionesBody from "../Calificaciones/CalificacionesBody";

class Alumnos extends React.Component {

    state = {
        ready: false,
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
            matriculasLengthKey
        } = JSON.parse(JSON.stringify(this.state));

        if (!matriculasLengthKey) {
            matriculasLengthKey = instance.methods.matriculasLength.cacheCall();
            changed = true;
        }

        if (changed) {
            this.setState({
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

        let ml = instanceState.matriculasLength[this.state.matriculasLengthKey];
        ml = ml ? ml.value : "??";

        return (
            <section>
                <h1>Alumnos [{ml}]</h1>
                <table>
                    <AlumnosHead/>
                    <AlumnosBody drizzle={drizzle}
                                 drizzleState={drizzleState}
                                 matriculasLength={ml}/>
                </table>
            </section>
        );
    }
}

export default Alumnos;