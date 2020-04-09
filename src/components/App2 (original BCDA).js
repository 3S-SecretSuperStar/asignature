import React from 'react';

import {DrizzleContext} from "drizzle-react";

import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";

import Header from './Header';
import Evaluaciones from "./Evaluaciones";
import Alumnos from "./Alumnos";
import Calificaciones from "./Calificaciones";

const Navegacion = () => (
    <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/evaluaciones/">Evaluaciones</Link></li>
            <li><Link to="/alumnos/">Alumnos</Link></li>
            <li><Link to="/calificaciones/">Calificaciones</Link></li>
        </ul>
    </nav>
);

export default () => (
    <DrizzleContext.Consumer>
        {drizzleContext => {
            const {drizzle, drizzleState, initialized} = drizzleContext;

            if (!initialized) {
                return (
                    <main><h1><span role="img">⚙</span>️ Cargando dapp...</h1></main>
                );
            }

            return (
                <Router>
                    <Navegacion/>

                    <Header drizzle={drizzle}
                            drizzleState={drizzleState}/>

                    <Route path="/" exact>
                        <p>Bienvenido a la práctica de BCDA. </p>
                    </Route>
                    < Route path="/evaluaciones/">
                        <Evaluaciones drizzle={drizzle}
                                      drizzleState={drizzleState}/>
                    </Route>
                    <Route path="/alumnos/">
                        <Alumnos drizzle={drizzle}
                                 drizzleState={drizzleState}/>
                    </Route>
                    <Route path="/calificaciones/">
                        <Calificaciones drizzle={drizzle}
                                        drizzleState={drizzleState}/>
                    </Route>
                </Router>
            )
        }}
    </DrizzleContext.Consumer>
);
