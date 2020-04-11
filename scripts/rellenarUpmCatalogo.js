module.exports = async callback => {
    try {
        const UpmCatalogo = artifacts.require('./UpmCatalogo.sol');

        // usar las cuentas de Ganache
        const accounts = await web3.eth.getAccounts();
        if (accounts.length !== 10) throw new Error('No hay 10 cuentas');

        let upmCatalogo = await UpmCatalogo.deployed();

        let numAsignaturas = await upmCatalogo.numAsignaturas();
        let asignaturasLength = await upmCatalogo.asignaturasLength();
        console.log('numAsignaturas:', numAsignaturas.toNumber());
        console.log('asignaturasLength:', asignaturasLength.toNumber());

        // añadir la UpmAsignatura ya creada
        await upmCatalogo.anadirAsignatura("0x5287103b2B410180A712C5EBaD61F89D59e420b1");

        numAsignaturas = await upmCatalogo.numAsignaturas();
        asignaturasLength = await upmCatalogo.asignaturasLength();
        console.log('numAsignaturas:', numAsignaturas.toNumber());
        console.log('asignaturasLength:', asignaturasLength.toNumber());

    } catch(err) {
        console.log(err);
    } finally {
        console.log('Fin');
    }

    callback();
};