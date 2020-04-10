import React, {useEffect, useState} from 'react';

import {useParams} from 'react-router-dom';

const Prueba = (props) => {

	const [ready, setReady] = useState(false);
	const [a, setA] = useState(null);
	const [drizzle, setDrizzle] = useState(null);
	const [drizzleState, setDrizzleState] = useState(null);
	const [returnar, setReturnar] = useState({});
	//const [, set] = useState();

	//console.log('useParams()', useParams());
	//console.log('props', props);

	useEffect(() => {
		setA(5);
		console.log('useEffect1');
	});

	useEffect(() => {
		setReady(true);
		console.log('useEffect2');
	});

	useEffect(() => {
		setDrizzle(props.drizzle);
		console.log('useEffect3');
	});

	useEffect(() => {
		setDrizzleState(props.drizzleState);
		console.log('useEffect4');
	});

	useEffect(() => {
		console.log('useEffect5');
		console.log('drizzle');
		console.log(drizzle);
		console.log('drizzleState');
		console.log(drizzleState);
	});

	// esto no vale, hay que crearlo fuera como una variable normal const x = [<></>];
	useEffect(() => {
		console.log('useEffect6');
		let x = [<h3>asdf</h3>];
		setReturnar([<h3>asdf</h3>]);
	});

	/*
	useEffect(() => {
		
	});
	*/


	//console.log('a:', a);

	return (
		<>
			<h2>Prueba</h2>
		</>
	);
}

export default Prueba;

/*
class Prueba extends React.Component {

	state = {
		ready: false,
	};

	componentDidMount() {
		this.setState({ready: true});

		console.log('Prueba');
		console.log(useParams());
	}

	componentDidUpdate() {
		const {drizzle, drizzleState} = this.props;

		const instanceState = drizzleState.contracts.UpmCatalogo;
		if (!instanceState || !instanceState.initialized) return;

		const instance = drizzle.contracts.UpmCatalogo;
	}

	render() {
		const {drizzle, drizzleState} = this.props;
		console.log(this.props);

		const instanceState = drizzleState.contracts.UpmCatalogo;
        if (!this.state.ready || !instanceState || !instanceState.initialized) {
            return <span>Initializing...</span>;
        }

		return (
			<>
				<h2>Prueba</h2>
			</>
		);
	}
}

export default Prueba;
*/