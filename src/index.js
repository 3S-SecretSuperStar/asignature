import React from 'react';
import ReactDOM from 'react-dom';

import { Drizzle } from 'drizzle';
import { DrizzleContext } from "drizzle-react";

import './css/index.css';
import './css/App.css';

import App from './components/App';

import drizzleOptions from "./drizzle";

const drizzle = new Drizzle(drizzleOptions);

ReactDOM.render(
	<DrizzleContext.Provider drizzle={drizzle}>
		<App />
	</DrizzleContext.Provider>,
	document.getElementById('root')
);
