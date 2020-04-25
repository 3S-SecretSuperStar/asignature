import React from 'react';

const MiDireccion = (props) => {

	return (
		<p>
			Mi dirección: {props.miDireccion}
			{
				props.miDireccion === props.owner
				?
				<span class="badge badge-primary">owner</span>
				:
				""
			}
		</p>
	);

}

export default MiDireccion;