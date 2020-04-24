import React from 'react';

class PruebasInterfaz extends React.Component {

	state = {
		ready: false,
	};

	componentDidMount() {
		this.setState({ready: true});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {

	}

	render() {
		const {drizzle, drizzleState} = this.props;

		return (
			<>
				<h1>h1 - <strong>Prueba</strong> para ver los tamaños</h1>
				<h2>h2 - <strong>Prueba</strong> para ver los tamaños</h2>
				<h3>h3 - <strong>Prueba</strong> para ver los tamaños</h3>
				<h4>h4 - <strong>Prueba</strong> para ver los tamaños</h4>
				<h5>h5 - <strong>Prueba</strong> para ver los tamaños</h5>
				<h6>h6 - <strong>Prueba</strong> para ver los tamaños</h6>
			</>
		);
	}

}

export default PruebasInterfaz;