pragma solidity >=0.5.12 <0.6.0;

contract TfmProfesores {
    
    address public owner;
    
    uint8 public numProfesores;
    address[] public listaProfesores;                          // TODO: no ponerlo public y hacer funcion con modifiers?
    mapping(address => Profesor) public mapProfesoresAddr;     // TODO: no ponerlo public y hacer funcion con modifiers?
    
    constructor() public {
        owner = msg.sender;
    }
    
    struct Profesor {
        address addrEthProf;
        uint8 indexProf;
        string nombre;
        string apellidos;
        string dni;
        string correoUpm;
        uint32 telefMovil;
        uint256 fechaNac;
        string idUpm;
        bool existsProf;
    }
    
    

    function profesoresLength() public view returns(
        uint _numProfesores
    ) {
        _numProfesores = listaProfesores.length;
    }
    
    function crearProfesor(
        address _addrEthProf,
        string memory _nombre,
        string memory _apellidos,
        string memory _dni,
        string memory _correoUpm,
        uint32 _telefMovil,
        uint256 _fechaNac,
        string memory _idUpm
    ) public returns(
        uint8 _indexProf
    ) {
        require(!mapProfesoresAddr[_addrEthProf].existsProf, "crearProfesor - Ya existe un profesor con esta direccion.");
        // TODO: require campos
        
        _indexProf = uint8(listaProfesores.length);
        
        mapProfesoresAddr[_addrEthProf] = Profesor(_addrEthProf, _indexProf, _nombre, _apellidos, _dni, _correoUpm, _telefMovil, _fechaNac, _idUpm, true);
        
        listaProfesores.push(_addrEthProf);
        
        numProfesores++;
    }
    
    function leerProfesorAddr(
        address _addrEthProf
    ) public view returns(
        uint8 _indexProf, 
        string memory _nombre, 
        string memory _apellidos, 
        string memory _dni, 
        string memory _correoUpm, 
        uint32 _telefMovil, 
        uint256 _fechaNac, 
        string memory _idUpm
    ) {
        require(mapProfesoresAddr[_addrEthProf].existsProf, "leerProfesorAddr - Profesor no creado.");
        
        _indexProf = mapProfesoresAddr[_addrEthProf].indexProf;
        _nombre = mapProfesoresAddr[_addrEthProf].nombre;
        _apellidos = mapProfesoresAddr[_addrEthProf].apellidos;
        _dni = mapProfesoresAddr[_addrEthProf].dni;
        _correoUpm = mapProfesoresAddr[_addrEthProf].correoUpm;
        _telefMovil = mapProfesoresAddr[_addrEthProf].telefMovil;
        _fechaNac = mapProfesoresAddr[_addrEthProf].fechaNac;
        _idUpm = mapProfesoresAddr[_addrEthProf].idUpm;
    }
    
    function actualizarProfesorAddr(
        address _addrEthProf,
        string memory _nombre,
        string memory _apellidos,
        string memory _dni,
        string memory _correoUpm,
        uint32 _telefMovil,
        uint256 _fechaNac,
        string memory _idUpm
    ) public {
        require(mapProfesoresAddr[_addrEthProf].existsProf, "actualizarProfesorAddr - Profesor no creado.");
        
        mapProfesoresAddr[_addrEthProf].nombre = _nombre;
        mapProfesoresAddr[_addrEthProf].apellidos = _apellidos;
        mapProfesoresAddr[_addrEthProf].dni = _dni;
        mapProfesoresAddr[_addrEthProf].correoUpm = _correoUpm;
        mapProfesoresAddr[_addrEthProf].telefMovil = _telefMovil;
        mapProfesoresAddr[_addrEthProf].fechaNac = _fechaNac;
        mapProfesoresAddr[_addrEthProf].idUpm = _idUpm;
    }
    
    function borrarProfesorAddr(
        address _addrEthProf
    ) public {
        require(mapProfesoresAddr[_addrEthProf].existsProf, "borrarProfesorAddr - Profesor no creado.");
        
        uint8 _indexProf = mapProfesoresAddr[_addrEthProf].indexProf;

        mapProfesoresAddr[_addrEthProf].existsProf = false;
        delete mapProfesoresAddr[_addrEthProf];
        
        delete listaProfesores[_indexProf];
        
        numProfesores--;
    }
    
}