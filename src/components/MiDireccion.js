import React from 'react';

const MiDireccion = (props) => {

	return (
		<p>
			Mi dirección: {props.miDireccion}
			{props.miDireccion === props.owner ? " (owner)" : " (no owner)"}
		</p>
	);

}

export default MiDireccion;