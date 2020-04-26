module.exports = async callback => {
    try {
        const UpmAlumnos = artifacts.require('./UpmAlumnos.sol');

        // usar las cuentas de Ganache
        const accounts = await web3.eth.getAccounts();
        if (accounts.length !== 10) throw new Error('No hay 10 cuentas');

        let upmAlumnos = await UpmAlumnos.deployed();

        let numAlumnos = await upmAlumnos.numAlumnos();
        let alumnosLength = await upmAlumnos.alumnosLength();
        console.log('numAlumnos:', numAlumnos.toNumber());
        console.log('alumnosLength:', alumnosLength.toNumber());

        // crear un alumno
        await upmAlumnos.crearAlumno(
            accounts[3],
            "Antonio",
            "Rodríguez Pérez",
            "47921449W",
            "antonio.rodriguez.perez@alumnos.upm.es",
            651447141,
            797724000,
            "89owkjhsgh835"
        );

        numAlumnos = await upmAlumnos.numAlumnos();
        alumnosLength = await upmAlumnos.alumnosLength();
        console.log('numAlumnos:', numAlumnos.toNumber());
        console.log('alumnosLength:', alumnosLength.toNumber());

        // crear otro alumno
        await upmAlumnos.crearAlumno(
            accounts[4],
            "Roberto",
            "Peláez Yuste",
            "14932001Y",
            "roberto.pelaez.yuste@alumnos.upm.es",
            684269851,
            938901600,
            "jklfhd6e78taiewg"
        );

        numAlumnos = await upmAlumnos.numAlumnos();
        alumnosLength = await upmAlumnos.alumnosLength();
        console.log('numAlumnos:', numAlumnos.toNumber());
        console.log('alumnosLength:', alumnosLength.toNumber());
    } catch(err) {
        console.log(err);
    } finally {
        console.log('Fin');
    }

    callback();
};