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

require('dotenv').config();

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
    <header>
        <h1 className="mt-2">UPM - Aplicación de gestión de Asignaturas</h1>
    </header>
);

const AvisoEthers = () => (
    <div className="jumbotron jumbotron-fluid">
        <div className="container">
            <h1>Aviso válido para Ropsten</h1>
            <p className="lead">Si no tienes fondos, tienes que pedirlos en una faucet.</p>
            <p><a href="https://faucet.metamask.io/" target="_blank" rel="noopener noreferrer">Faucet 1</a></p>
            <p><a href="https://faucet.ropsten.be/" target="_blank" rel="noopener noreferrer">Faucet 2</a></p>
        </div>
    </div>
);

const LoadingDapp = () => (
    <section>
        <h1 className="display-1">
            <span><i className="fa fa-cog fa-spin mr-3" /></span> Cargando dApp...
        </h1>
        <h4>¿No tienes MetaMask o Fortmatic?</h4>
    </section>
);

export default () => (
    <DrizzleContext.Consumer>
        {drizzleContext => {
            const {drizzle, drizzleState, initialized} = drizzleContext;

            if (!initialized) {
                return <LoadingDapp />;
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

                            <Route path="/">
                                <AvisoEthers />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            )
        }}
    </DrizzleContext.Consumer>
);
