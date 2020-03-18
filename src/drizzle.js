// Importar los artefactos de los contratos
import TfmAlumnos from './contracts/TfmAlumnos.json';
import TfmAsignatura from './contracts/TfmAsignatura.json';
import TfmCatalogo from './contracts/TfmCatalogo.json';
import TfmProfesores from './contracts/TfmProfesores.json';

require('dotenv').config();

// Opciones de Drizzle:
const options = {
	contracts: [TfmAlumnos, TfmAsignatura, TfmCatalogo, TfmProfesores],
    web3: {
    	fallback: {
    		type: "ws",
    		url: "wss://ropsten.infura.io/ws/v3/" + process.env.PROJECT_ID
    	}
    }
};

export default options;
