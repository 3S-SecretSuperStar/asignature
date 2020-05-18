module.exports = async callback => {
    try {
        const UpmProfesores = artifacts.require('./UpmProfesores.sol');

        // usar las cuentas de Ganache
        const accounts = await web3.eth.getAccounts();
        if (accounts.length !== 10) throw new Error('No hay 10 cuentas');

        let upmProfesores = await UpmProfesores.deployed();

        let numProfesores = await upmProfesores.numProfesores();
        let profesoresLength = await upmProfesores.profesoresLength();
        console.log('numProfesores:', numProfesores.toNumber());
        console.log('profesoresLength:', profesoresLength.toNumber());

        // crear un profesor
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

        numProfesores = await upmProfesores.numProfesores();
        profesoresLength = await upmProfesores.profesoresLength();
        console.log('numProfesores:', numProfesores.toNumber());
        console.log('profesoresLength:', profesoresLength.toNumber());

        // crear otro profesor
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

        numProfesores = await upmProfesores.numProfesores();
        profesoresLength = await upmProfesores.profesoresLength();
        console.log('numProfesores:', numProfesores.toNumber());
        console.log('profesoresLength:', profesoresLength.toNumber());
    } catch(err) {
        console.log(err);
    } finally {
        console.log('Fin.');
    }

    callback();
};