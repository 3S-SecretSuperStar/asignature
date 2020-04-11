import React from 'react';

import {DrizzleContext} from "drizzle-react";

import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";

import Header from './Header';
import GestionAlumnos from './GestionAlumnos';
import GestionProfesores from './GestionProfesores';
import GestionCatalogoAsignaturas from './GestionCatalogoAsignaturas';
import Asignatura from './Asignatura';

import Prueba from './Prueba';

const Navegacion = () => (
    <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/gestion-alumnos">Gestión de alumnos</Link></li>
            <li><Link to="/gestion-profesores">Gestión de profesores</Link></li>
            <li><Link to="/gestion-catalogo-asignaturas">Gestión del catálogo de asignaturas</Link></li>
            <li><Link to="/asignatura/1">Asignatura 1</Link></li>

            <li><Link to="/prueba/8">Prueba 8</Link></li>
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

                    <Route path="/gestion-alumnos">
                        <GestionAlumnos drizzle={drizzle}
                                        drizzleState={drizzleState} />
                    </Route>

                    <Route path="/gestion-profesores">
                        <GestionProfesores  drizzle={drizzle}
                                            drizzleState={drizzleState} />
                    </Route>

                    <Route path="/gestion-catalogo-asignaturas">
                        <GestionCatalogoAsignaturas drizzle={drizzle}
                                                    drizzleState={drizzleState} />
                    </Route>

                    <Route path="/prueba/:id">
                        <Prueba drizzle={drizzle}
                                drizzleState={drizzleState} />
                    </Route>

                    <Route path="/asignatura/:idAsignatura">
                        <Asignatura drizzle={drizzle}
                                    drizzleState={drizzleState} />
                    </Route>
                    
                </Router>
            )
        }}
    </DrizzleContext.Consumer>
);
