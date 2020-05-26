module.exports = async callback => {
    try {
        const UpmAlumnos = artifacts.require('./UpmAlumnos.sol');

        const accounts = await web3.eth.getAccounts();
        if (accounts.length !== 10) throw new Error('No hay 10 cuentas');

        let upmAlumnos = await UpmAlumnos.deployed();

        let numAlumnos = await upmAlumnos.numAlumnos();
        console.log('numAlumnos:', numAlumnos.toNumber());

        await upmAlumnos.crearAlumno(
            accounts[4],
            "Antonio",
            "Rodríguez Pérez",
            "47921449W",
            "antonio.rodriguez.perez@alumnos.upm.es",
            651447141,
            797724000,
            "89owkjhsgh835"
        );
        console.log("Primer alumno creado.");

        await upmAlumnos.crearAlumno(
            accounts[5],
            "Roberto",
            "Peláez Yuste",
            "14932001Y",
            "roberto.pelaez.yuste@alumnos.upm.es",
            684269851,
            938901600,
            "jklfhd6e78taiewg"
        );
        console.log("Segundo alumno creado.");

        await upmAlumnos.crearAlumno(
            accounts[6],
            "Pedro",
            "Martínez del Val",
            "87102004R",
            "pedro.martinez.delval@alumnos.upm.es",
            685112041,
            937699200,
            "asdfa8sdgk"
        );
        console.log("Tercer alumno creado.");

        await upmAlumnos.crearAlumno(
            accounts[7],
            "Juan",
            "Vázquez Fuertes",
            "02001476L",
            "juan.vazquez.fuertes@alumnos.upm.es",
            617445192,
            1041120000,
            "pasdl9asrga26"
        );
        console.log("Cuarto alumno creado.");

        await upmAlumnos.crearAlumno(
            accounts[8],
            "Eva",
            "Pérez Mateos",
            "9366272W",
            "eva.perez.mateos@alumnos.upm.es",
            612001989,
            971136000,
            "39388gjah"
        );
        console.log("Quinto alumno creado.");

        await upmAlumnos.crearAlumno(
            accounts[9],
            "Lucía",
            "Sánchez Moral",
            "30247879N",
            "lucia.sanchez.moral@alumnos.upm.es",
            665217990,
            984614400,
            "sdgpa8wyiw"
        );
        console.log("Sexto alumno creado.");

        numAlumnos = await upmAlumnos.numAlumnos();
        console.log('numAlumnos:', numAlumnos.toNumber());
    } catch(err) {
        console.log(err);
    } finally {
        console.log('\nFin del script: rellenado con seis alumnos.');
    }

    callback();
};