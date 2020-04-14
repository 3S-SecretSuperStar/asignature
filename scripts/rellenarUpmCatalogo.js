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
        await upmCatalogo.anadirAsignatura("0x6EECdb1f079A9109bBA03EFdEBB3c3Dd17D4142b", "Desplegada a mano, añadida con script");

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