import React from 'react';

import {useParams} from 'react-router-dom';

import MainGestionAsignatura from './MainGestionAsignatura';

const GestionAsignatura = (props) => {
	return (
		<>
			<MainGestionAsignatura 	drizzle={props.drizzle}
									drizzleState={props.drizzleState}
									miDireccion={props.drizzleState.accounts[0]}
									addrEthAsig={useParams().addrEthAsig} />
		</>	
	);
}

export default GestionAsignatura;