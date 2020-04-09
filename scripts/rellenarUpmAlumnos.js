module.exports = async callback => {
    try {
        const UpmAlumnos = artifacts.require('./UpmAlumnos.sol');

        // usar las cuentas de Ganache
        const accounts = await web3.eth.getAccounts();
        if (accounts.length !== 10) throw new Error('No hay 10 cuentas');

        let upmAlumnos = await UpmAlumnos.deployed();

        // crear un alumno
        await upmAlumnos.crearAlumno(
            accounts[3],
            "Alumno1",
            "ApellidoAlum1 ApellidoAlum2",
            "47921449W",
            "alumno1.apellidoalum1.apellidoalum2@alumnos.upm.es",
            651447141,
            79652186464148,
            "89owkjhsgh835"
        );

        let numAlumnos = await upmAlumnos.numAlumnos();
        let alumnosLength = await upmAlumnos.alumnosLength();
        console.log('numAlumnos:', numAlumnos.toNumber());
        console.log('alumnosLength:', alumnosLength.toNumber());

        // crear otro alumno
        await upmAlumnos.crearAlumno(
            accounts[4],
            "Alumno2",
            "ApellidoAlum3 ApellidoAlum4",
            "14932001Y",
            "alumno2.apellidoalum3.apellidoalum4@alumnos.upm.es",
            684269851,
            8452314856698,
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