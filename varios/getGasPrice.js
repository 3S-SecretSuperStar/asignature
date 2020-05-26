const cron = require('node-cron');
const Web3 = require('web3');
const fs = require('fs');

const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/ec0c65bda8004f8f96b6c11452c6454d'));

const getGasPrice = async () => {
	try {
		let gasPrice = await web3.eth.getGasPrice();
		gasPrice = gasPrice*Math.pow(10, -9) + " gwei";
		let fechaHora = new Date().toLocaleString("es-ES");

		console.log(fechaHora, '<<< - >>>', gasPrice);

		//cabecera = "fechaHora;gasPrice";
		salida = `\n${fechaHora};${gasPrice}`;

		fs.appendFileSync('gasPrice.csv', salida);
	} catch(err) {
		console.log(err);
		process.exit(1);
	}
}

let task = cron.schedule('* * * * *', () => {
	getGasPrice();
});

task.start();