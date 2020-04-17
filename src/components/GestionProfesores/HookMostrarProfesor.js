import React from 'react';

import {useParams} from 'react-router-dom';

import MostrarProfesor from './MostrarProfesor';

const HookMostrarProfesor = (props) => {

	return (
		<>
			<MostrarProfesor 	drizzle={props.drizzle}
								drizzleState={props.drizzleState}
								miDireccion={props.miDireccion}
								owner={props.owner}
								addrEthProf={useParams().addrEthProf} />
		</>	
	);

}

export default HookMostrarProfesor;