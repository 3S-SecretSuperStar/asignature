import React from 'react';

import AlumnosRow from "./AlumnosRow";

class AlumnosBody extends React.Component {

    state = {
        ready: false,
        alumnoAddrsKeys: []
    }

    componentDidMount() {
        this.setState({ready: true});
    }

    componentDidUpdate(prevProps, prevState, snapshoot) {
        const {drizzle, drizzleState} = this.props;

        const instance = drizzle.contracts.Asignatura;

        let changed = false;

        // Copiar el estado
        let { alumnoAddrsKeys } = JSON.parse(JSON.stringify(this.state));

        // Añadir keys de las nuevas matriculas
        for (let i = alumnoAddrsKeys.length; i < this.props.matriculasLength; i++) {
            alumnoAddrsKeys[i] = instance.methods.matriculas.cacheCall(i);
            changed = true;
        }

        if (changed) {
            this.setState({
                alumnoAddrsKeys
            });
        }
    }


    render() {
        const {drizzle, drizzleState} = this.props;

        const instanceState = drizzleState.contracts.Asignatura;

        if (!this.state.ready) {
            return <tbody></tbody>;
        }

        let ml = this.props.matriculasLength;

        let rows = [];
        for (let i = 0; i < ml; i++) {

            let addr = instanceState.matriculas[this.state.alumnoAddrsKeys[i]];
            addr = addr ? addr.value : "";

            rows[i] = (
                < AlumnosRow
                    key={"AAAALU-" + i}
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    alumnoIndex={i}
                    alumnoAddr={addr}
                />
            );
        }

        return (
            <tbody>
            {rows}
            </tbody>
        );
    }
}

export default AlumnosBody;