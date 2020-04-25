import React from 'react';

import {DrizzleContext} from "drizzle-react";

import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from "react-router-dom";

import GestionAlumnos from './GestionAlumnos';

import GestionProfesores from './GestionProfesores';

import GestionCatalogoAsignaturas from './GestionCatalogoAsignaturas';

import GestionAsignatura from './GestionAsignatura';

import PruebasInterfaz from './PruebasInterfaz';

const Navegacion = () => (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">Home</Link>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/gestion-alumnos" className="nav-link">Gestión de alumnos</Link>
                </li>
                <li className="nav-item">
                    <Link to="/gestion-profesores" className="nav-link">Gestión de profesores</Link>
                </li>
                <li className="nav-item">
                    <Link to="/gestion-catalogo-asignaturas" className="nav-link">Gestión del catálogo de asignaturas</Link>
                </li>
            </ul>
        </div>
    </nav>
);

const Header = () => (
    <header className="App">
        <h1>UPM - Aplicación de gestión de Asignaturas</h1>
    </header>
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

                    <div className="container">
                        <Header />
                        
                        <Switch>
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

                            <Route path="/gestion-asignatura/:addrEthAsig">
                                <GestionAsignatura  drizzle={drizzle}
                                                    drizzleState={drizzleState} />
                            </Route>
                        </Switch>
                    </div>

                    
                </Router>
            )
        }}
    </DrizzleContext.Consumer>
);
