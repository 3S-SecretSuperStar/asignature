import UpmAlumnos from './contracts/UpmAlumnos.json';
import UpmCatalogo from './contracts/UpmCatalogo.json';
import UpmProfesores from './contracts/UpmProfesores.json';

require('dotenv').config();

const options = {
	contracts: [UpmAlumnos, UpmCatalogo, UpmProfesores],
    web3: {
    	fallback: {
    		type: "ws",
    		url: "wss://ropsten.infura.io/ws/v3/" + process.env.REACT_APP_PROJECT_ID
    	}
    }
};

export default options;