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

const Navegacion = () => (
    <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/gestion-de-alumnos">Gestión de alumnos</Link></li>
            <li><Link to="/gestion-de-profesores">Gestión de profesores</Link></li>
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

                    <Header drizzle={drizzle}
                            drizzleState={drizzleState} />

                    <Route path="/gestion-de-alumnos">
                        <GestionAlumnos drizzle={drizzle}
                                        drizzleState={drizzleState} />
                    </Route>

                    <Route path="/gestion-de-profesores">
                        <GestionProfesores  drizzle={drizzle}
                                            drizzleState={drizzleState} />
                    </Route>
                    
                </Router>
            )
        }}
    </DrizzleContext.Consumer>
);
