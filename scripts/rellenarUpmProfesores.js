module.exports = async callback => {
    try {
        const UpmProfesores = artifacts.require('./UpmProfesores.sol');

        const accounts = await web3.eth.getAccounts();
        if (accounts.length !== 10) throw new Error('No hay 10 cuentas');

        let upmProfesores = await UpmProfesores.deployed();

        let numProfesores = await upmProfesores.numProfesores();
        console.log('numProfesores inicial:', numProfesores.toNumber());

        await upmProfesores.crearProfesor(
            accounts[1],
            "Santiago",
            "Menéndez Manises",
            "95103214D",
            "santiago.menendez.manises@upm.es",
            693017210,
            -315622800,
            "hgujik3tlgk3qkg434"
        );
        console.log("Primer profesor creado.");

        await upmProfesores.crearProfesor(
            accounts[2],
            "José María",
            "San Pedro Heredia",
            "97103002V",
            "josemaria.sanpedro.heredia@upm.es",
            663147115,
            -484880400,
            "mknja9hdfn6a7duf"
        );
        console.log("Segundo profesor creado.");

        await upmProfesores.crearProfesor(
            accounts[3],
            "Torcuato",
            "Vega Zamora",
            "96147220T",
            "torcuato.vega.zamora@upm.es",
            695147110,
            32486400,
            "asldfa8setkwengaa"
        );
        console.log("Tercer profesor creado.");

        numProfesores = await upmProfesores.numProfesores();
        console.log('numProfesores final:', numProfesores.toNumber());

    } catch(err) {
        console.log(err);
    } finally {
        console.log('\nFin del script: rellenado con tres profesores.');
    }

    callback();
};