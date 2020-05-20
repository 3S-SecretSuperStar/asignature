import React from 'react';

import { Link } from "react-router-dom";

const NavbarAsignatura = (props) => {

	return (
		<ul className="nav nav-tabs">
			<li className="nav-item">
				<Link
					className={props.active === 'datos' ? 'nav-link active' : 'nav-link'}
					to={`/gestion-asignatura/${props.addrEthAsig}/datos-asignatura`}>
						Datos de la asignatura
				</Link>
			</li>
			<li className="nav-item">
				<Link
					className={props.active === 'alumnos' ? 'nav-link active' : 'nav-link'}
					to={`/gestion-asignatura/${props.addrEthAsig}/alumnos`}>
						Alumnos
				</Link>
			</li>
			<li className="nav-item">
				<Link
					className={props.active === 'profesores' ? 'nav-link active' : 'nav-link'}
					to={`/gestion-asignatura/${props.addrEthAsig}/profesores`}>
						Profesores
				</Link>
			</li>
			<li className="nav-item">
				<Link
					className={props.active === 'evaluaciones' ? 'nav-link active' : 'nav-link'}
					to={`/gestion-asignatura/${props.addrEthAsig}/evaluaciones`}>
						Evaluaciones
				</Link>
			</li>
			<li className="nav-item">
				{
					props.isOwner || props.isCoordinador || props.isProfesor
					?
					<Link
						className={props.active === 'notas' ? 'nav-link active' : 'nav-link'}
						to={`/gestion-asignatura/${props.addrEthAsig}/notas`}>
							Notas
					</Link>
					:
					""
				}
			</li>
			<li className="nav-item">
				{
					props.isAlumno
					?
					<Link
						className={props.active === 'misNotas' ? 'nav-link active' : 'nav-link'}
						to={`/gestion-asignatura/${props.addrEthAsig}/mis-notas`}>
							Mis notas
					</Link>
					:
					""
				}
			</li>
		</ul>
	);

}

export default NavbarAsignatura;