import React from 'react';

import {DrizzleContext} from "drizzle-react";

import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";

import Header from './Header';
import GestionAlumnos from './GestionAlumnos';
import HookMostrarAlumno from './GestionAlumnos/HookMostrarAlumno';
import GestionProfesores from './GestionProfesores';
import HookMostrarProfesor from './GestionProfesores/HookMostrarProfesor';
import GestionCatalogoAsignaturas from './GestionCatalogoAsignaturas';
import GestionAsignatura from './GestionAsignatura';

const Navegacion = () => (
    <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/gestion-alumnos">Gestión de alumnos</Link></li>
            <li><Link to="/gestion-profesores">Gestión de profesores</Link></li>
            <li><Link to="/gestion-catalogo-asignaturas">Gestión del catálogo de asignaturas</Link></li>
        </ul>
    </nav>
);

export default () => (
    <DrizzleContext.Consumer>
        {drizzleContext => {
            const {drizzle, drizzleState, initialized} = drizzleContext;

            if (!initialized) {
                return (
                    <main><h1><span role="img">⚙</span>️ Cargando dApp...</h1></main>
                );
            }

            return (
                <Router>
                    <Navegacion />

                    <Header />

                    <Route exact path="/gestion-alumnos">
                        <GestionAlumnos drizzle={drizzle}
                                        drizzleState={drizzleState} />
                    </Route>

                    <Route path="/gestion-alumnos/alumno/:addrEthAlum">
                        <HookMostrarAlumno  drizzle={drizzle}
                                            drizzleState={drizzleState} />
                    </Route>

                    <Route exact path="/gestion-profesores">
                        <GestionProfesores  drizzle={drizzle}
                                            drizzleState={drizzleState} />
                    </Route>

                    <Route path="/gestion-profesores/profesor/:addrEthProf">
                        <HookMostrarProfesor    drizzle={drizzle}
                                                drizzleState={drizzleState} />
                    </Route>

                    <Route exact path="/gestion-catalogo-asignaturas">
                        <GestionCatalogoAsignaturas drizzle={drizzle}
                                                    drizzleState={drizzleState} />
                    </Route>

                    <Route path="/gestion-asignatura/:addrEthAsig">
                        <GestionAsignatura  drizzle={drizzle}
                                            drizzleState={drizzleState} />
                    </Route>
                    
                </Router>
            )
        }}
    </DrizzleContext.Consumer>
);
