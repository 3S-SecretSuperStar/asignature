module.exports = async callback => {
    try {
        const UpmProfesores = artifacts.require('./UpmProfesores.sol');

        // usar las cuentas de Ganache
        const accounts = await web3.eth.getAccounts();
        if (accounts.length !== 10) throw new Error('No hay 10 cuentas');

        let upmProfesores = await UpmProfesores.deployed();

        // crear un alumno
        await upmProfesores.crearProfesor(
            accounts[1],
            "Profesor1",
            "ApellidoProf1 ApellidoProf2",
            "95103214D",
            "profesor1.apellidoprof1.apellidoprof2@alumnos.upm.es",
            693017210,
            89652315812058,
            "hgujik3tlgk3qkg434"
        );

        let numProfesores = await upmProfesores.numProfesores();
        let profesoresLength = await upmProfesores.profesoresLength();
        console.log('numProfesores:', numProfesores.toNumber());
        console.log('profesoresLength:', profesoresLength.toNumber());

        // crear otro alumno
        await upmProfesores.crearProfesor(
            accounts[2],
            "Profesor2",
            "ApellidoProf3 ApellidoProf4",
            "97103002V",
            "profesor2.apellidoprof3.apellidoprof4@alumnos.upm.es",
            663147115,
            7961452,
            "mknja9hdfn6a7duf"
        );

        numProfesores = await upmProfesores.numProfesores();
        profesoresLength = await upmProfesores.profesoresLength();
        console.log('numProfesores:', numProfesores.toNumber());
        console.log('profesoresLength:', profesoresLength.toNumber());
    } catch(err) {
        console.log(err);
    } finally {
        console.log('Fin');
    }

    callback();
};