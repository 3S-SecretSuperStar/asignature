import React from 'react';

import {useParams} from 'react-router-dom';

import MostrarProfesor from './MostrarProfesor';

const HookMostrarProfesor = (props) => {

	console.log(useParams());

	return (
		<>
			<MostrarProfesor 	drizzle={props.drizzle}
								drizzleState={props.drizzleState}
								addrEthProf={useParams().addrEthProf} />
		</>	
	);

}

export default HookMostrarProfesor;