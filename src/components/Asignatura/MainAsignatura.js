import React from 'react';

import {newContextComponents} from "drizzle-react-components";

const {ContractData} = newContextComponents;

class MainAsignatura extends React.Component {

	state = {
		ready: false,
	};

	componentDidMount() {
		this.setState({ready: true});
	}

	componentDidUpdate() {
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts.UpmAsignatura;
		if (!instanceState || !instanceState.initialized) return;

		const instance = drizzle.contracts.UpmAsignatura;

		
	}

	render() {

		console.log('MainAsignatura', this.props);

		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts.UpmAsignatura;
        if (!this.state.ready || !instanceState || !instanceState.initialized) {
            return <span>Initializing...</span>;
        }

        console.log('instanceState', instanceState);

		return (
			<>
				<h3>MainAsignatura 1</h3>
			</>
		);
	}
}

export default MainAsignatura;