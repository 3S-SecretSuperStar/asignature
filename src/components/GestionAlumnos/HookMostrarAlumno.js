import React from 'react';

import {useParams} from 'react-router-dom';

import MostrarAlumno from './MostrarAlumno';

const HookMostrarAlumno = (props) => {

	console.log(useParams());

	return (
		<>
			<MostrarAlumno 	drizzle={props.drizzle}
							drizzleState={props.drizzleState}
							addrEthAlum={useParams().addrEthAlum} />
		</>	
	);

}

export default HookMostrarAlumno;