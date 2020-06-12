# Diseño y Desarrollo de un Servicio Blockchain para la Gestión de las Calificaciones Definidas en las Guías Docentes de los Títulos Universitarios

Aplicación blockchain para la gestión de una asignatura: alumnos, profesores, evaluaciones, notas...

https://tfm-muirst-bc.netlify.app

## Prerrequisitos
Es necesario tener instalado Node.js 12 y git.

## Instalación
1. Clonar el repositorio:

```
git clone https://github.com/tfm-muirst-bc/asignatura.git
```

2. Acceder a la carpeta e instalar las dependencias:

```
cd asignatura
npm install
```

## Puesta en marcha en local

1. Abrir Ganache y crear un nuevo *workspace* seleccionando el fichero `truffle-config.js`.

2. Crear un fichero `.env` a partir de `.env.example` y rellenar, al menos, la variable `REACT_APP_ADDR_COORD_DEPLOYER_ASIGNATURA` con la última cuenta de Ganache (la número 9).

3. Ejecutar los test:

```
npx truffle test
```

4. Compilar los contratos y desplegarlos en la red local:

```
npx truffle migrate --compile-all --reset
```

5. Abrir la extensión de MetaMask en el navegador y conectarse a la red de Ganache utilizando su *seed phrase*.

6. Iniciar la dApp:

```
npm start
```

7. Rellenar los contratos, que inicialmente están vacíos, ejecutando los *scripts*:

```
npx truffle exec scripts/rellenarUpmAlumnos.js
npx truffle exec scripts/rellenarUpmProfesores.js
```

## Puesta en marcha en la nube (Ropsten + Netlify)

1. Crear un fichero `.env` a partir de `.env.example` y rellenar las variables:

- `REACT_APP_MNEMONIC` con el mnemónico (*seed phrase*) de la cartera.
- `REACT_APP_PROJECT_ID`con el identificador del proyecto de Infura.
- `REACT_APP_FORTMATIC` con la clave de Fortmatic.

2. Compilar los contratos y desplegarlos en la red Ropsten:

```
npx truffle migrate --compile-all --reset --network ropsten
```

3. Generar la carpeta *build* para producción

```
npm run build
```

4. Subir la carpeta *build* a Netlify (o a otro *hosting* de sitios estáticos).

5. Acceder a la página desplegada:

    5.1. Usar MetaMask
    
    Abrir la extensión de MetaMask en el navegador y conectarse a la red de Ganache utilizando la *seed phrase*.
  
    5.2. Usar MetaMask Mobile
    
    Abrir la aplicación de MetaMask Mobile y crear o importar una cuenta. Luego, acceder a la página.
    
    5.3. Usar Fortmatic
    
    Si no puedes o no quieres usar MetaMask, tras esperar unos segundos aparece una ventana de Fortmatic que pide correo y contraseña. Una vez introducidos, Fortmatic ya se encarga de la gestión de cuentas.
    
## Herramientas
- [Ethereum](https://ethereum.org/)
- [Solidity](https://solidity.readthedocs.io/en/latest/)
- [web3.js](https://web3js.readthedocs.io/en/v1.2.9/)
- [Ganache](https://www.trufflesuite.com/ganache)
- [Truffle](https://www.trufflesuite.com/truffle)
- [Drizzle](https://www.trufflesuite.com/drizzle)
- [Infura](https://infura.io/)
- [Netlify](https://www.netlify.com/)
- [MetaMask](https://metamask.io/)
- [Fortmatic](https://fortmatic.com/)
