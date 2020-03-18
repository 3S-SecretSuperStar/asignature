import React from 'react';

import CalificacionesRow from "./CalificacionesRow";

class CalificacionesBody extends React.Component {

    state = {
        ready: false,
        alumnoAddrsKeys: []
    }

    componentDidMount() {
        this.setState({ready: true});
    }

    componentDidUpdate(prevProps, prevState, snapshoot) {
        const {drizzle} = this.props;

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

        let el = this.props.evaluacionesLength;
        let ml = this.props.matriculasLength;

        let rows = [];
        for (let mi = 0; mi < ml; mi++) {
            let addr = instanceState.matriculas[this.state.alumnoAddrsKeys[mi]];
            addr = addr ? addr.value : false;

            rows[mi] = <CalificacionesRow key={"CalRow-"+mi}
                                          drizzle={drizzle}
                                          drizzleState={drizzleState}
                                          alumnoIndex={mi}
                                          alumnoAddr={addr}
                                          evaluacionesLength={el}/>
        }

        return (
            <tbody>{rows}</tbody>
        );
    }
}

export default CalificacionesBody;