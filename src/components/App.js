import React from 'react';

import {DrizzleContext} from "drizzle-react";

import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from "react-router-dom";

import Fortmatic from 'fortmatic';
import Web3 from 'web3';

import GestionAlumnos from './GestionAlumnos';

import GestionProfesores from './GestionProfesores';

import GestionCatalogoAsignaturas from './GestionCatalogoAsignaturas';

import GestionAsignatura from './GestionAsignatura';

require('dotenv').config();

const Navegacion = () => (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <Link to="/" className="navbar-brand tamano">Home</Link>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/gestion-alumnos" className="nav-link tamano">Gestión de alumnos</Link>
                </li>
                <li className="nav-item">
                    <Link to="/gestion-profesores" className="nav-link tamano">Gestión de profesores</Link>
                </li>
                <li className="nav-item">
                    <Link to="/gestion-catalogo-asignaturas" className="nav-link tamano">Gestión del catálogo de asignaturas</Link>
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

const AvisoEthers = (props) => (
    <div className="jumbotron jumbotron-fluid">
        <div className="container">
            <h1>Para Ropsten</h1>
            
                <p>Tu cuenta: {props.currentAccount}</p>
                <p className="m-0">Tu balance: {Math.round(props.currentBalance*Math.pow(10, -18)*100000)/100000 + ' Eth'}</p>
            
            <p className="lead">Si no tienes fondos en tu cuenta, tienes que pedirlos en una faucet.</p>
            <p><a href="https://faucet.metamask.io/" target="_blank" rel="noopener noreferrer">Faucet 1</a></p>
            <p><a href="https://faucet.ropsten.be/" target="_blank" rel="noopener noreferrer">Faucet 2</a></p>
        </div>
    </div>
);
const LoadingDapp = () => (
    <section className="loading">
        <h1 className="display-1">
            <span><i className="fa fa-cog fa-spin mr-3" /></span> Cargando dApp...
        </h1>
        <h4>¿No tienes MetaMask o Fortmatic?</h4>
    </section>
);

let isThereMetaMask = false;
let isThereWeb3 = false;

export default () => (
    <DrizzleContext.Consumer>
        {drizzleContext => {
            const {drizzle, drizzleState, initialized} = drizzleContext;

            /*if (typeof window.ethereum !== 'undefined') {
                console.log('----- Es MetaMask');
                isThereMetaMask = true;
            } else {
                console.log('----- No es MetaMask');
            }

            if (!window.ethereum) {
                console.log('----- No hay Ethereum, pongo Fortmatic');
                const fm = new Fortmatic(process.env.REACT_APP_FORTMATIC, 'ropsten');
                window.web3 = new Web3(fm.getProvider());
            } else {
                console.log('----- Sí que hay Ethereum');
            }*/
            if (!window.ethereum) {
                const fm = new Fortmatic(process.env.REACT_APP_FORTMATIC, 'ropsten');
                window.web3 = new Web3(fm.getProvider());
            }

            if (!initialized) {
                return <LoadingDapp />;
            }

            // opcion 2
            /*if (window.ethereum) {
                console.log(1);
                //window.web3 = new Web3(window.ethereum);
            } else {
                console.log(2);
                const fm = new Fortmatic(process.env.REACT_APP_FORTMATIC, 'ropsten');
                window.web3 = new Web3(fm.getProvider());
            }

            if (typeof web3 !== 'undefined') {
                window.web3 = new Web3(web3.currentProvider);
            } else {
                const fm = new Fortmatic(process.env.REACT_APP_FORTMATIC, 'ropsten');
                window.web3 = new Web3(fm.getProvider());
            }*/

            // opcion 3
            /*console.log('window.ethereum', window.ethereum);
            console.log('window.web3', window.web3);

            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum);
                console.log(1);
                try {
                    window.ethereum.enable();
                    console.log(2);
                } catch(err) {
                    console.log(err);
                    console.log(3);
                }
            }
            //else if (window.web3) {
                //window.web3 = new Web3(window.web3.currentProvider);
                //console.log(4);
            //}
            else {
                console.log('Non-Ethereum browser detected.');
                console.log('process.env.REACT_APP_FORTMATIC', process.env.REACT_APP_FORTMATIC);
                const fm = new Fortmatic(process.env.REACT_APP_FORTMATIC, 'ropsten');
                console.log('fm', fm);
                console.log('fm.getProvider()', fm.getProvider());
                window.web3 = new Web3(fm.getProvider());
                console.log(5);
                try {
                    //window.web3.enable();
                    console.log(6);
                } catch(err) {
                    console.log(err);
                    console.log(7);
                }
            }*/

            /*if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider);
                console.log(10);
            } else {
                console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
                console.log(11);
            }*/

            console.log(' ----- isThereMetaMask', isThereMetaMask);
            console.log(' ----- isThereWeb3', isThereWeb3);

            console.log(' ----- isMetaMask', window.web3.currentProvider.isMetaMask);
            console.log(' ----- isFortmatic', window.web3.currentProvider.isFortmatic);

            let currentAccount = Object.keys(drizzleState.accountBalances);
            let currentBalance = drizzleState.accountBalances[Object.keys(drizzleState.accountBalances)[0]];
            //console.log(currentAccount);
            //console.log(currentBalance);

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
                                <AvisoEthers    currentAccount={currentAccount}
                                                currentBalance={currentBalance} />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            )
        }}
    </DrizzleContext.Consumer>
);
