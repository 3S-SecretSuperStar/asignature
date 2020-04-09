// Importar los artefactos de los contratos
import UpmAlumnos from './contracts/UpmAlumnos.json';
import UpmAsignatura from './contracts/UpmAsignatura.json';
import UpmCatalogo from './contracts/UpmCatalogo.json';
import UpmProfesores from './contracts/UpmProfesores.json';

require('dotenv').config();

// Opciones de Drizzle:
const options = {
	contracts: [UpmAlumnos, UpmAsignatura, UpmCatalogo, UpmProfesores],
    web3: {
    	fallback: {
    		type: "ws",
    		url: "wss://ropsten.infura.io/ws/v3/" + process.env.PROJECT_ID
    	}
    }
};

export default options;