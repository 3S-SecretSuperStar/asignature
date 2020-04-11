import React from 'react';

import {useParams} from 'react-router-dom';

import MainAsignatura from './MainAsignatura';

const Asignatura = (props) => {

	return (
		<>
			<h3>Asignatura 1</h3>
			<MainAsignatura drizzle={props.drizzle}
							drizzleState={props.drizzleState}
							idAsignatura={useParams().idAsignatura} />
		</>	
	);

}

export default Asignatura;