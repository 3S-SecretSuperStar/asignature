pragma solidity >=0.5.12 <0.6.0;

contract TfmAlumnos {
    
    address public owner;
    
    uint public numAlumnos;
    address[] public listaAlumnos;                      // TODO: no ponerlo public y hacer funcion con modifiers?
    mapping(address => Alumno) public mapAlumnosAddr;   // TODO: no ponerlo public y hacer funcion con modifiers?
    
    constructor() public {
        owner = msg.sender;
    }
    
    struct Alumno {
        address addrEthAlum;
        uint indexAlum;
        string nombre;
        string apellidos;
        string dni;
        string correoUpm;
        uint32 telefMovil;
        uint256 fechaNac;
        string idUpm;
        bool existsAlum;
    }
    
    

    function alumnosLength() public view returns(
        uint _numAlumnos
    ) {
        _numAlumnos = listaAlumnos.length;
    }
    
    function crearAlumno(
        address _addrEthAlum,
        string memory _nombre,
        string memory _apellidos,
        string memory _dni,
        string memory _correoUpm,
        uint32 _telefMovil,
        uint256 _fechaNac,
        string memory _idUpm
    ) public returns(
        uint _indexAlum
    ) {
        require(!mapAlumnosAddr[_addrEthAlum].existsAlum, "crearAlumno - Alumno ya creado.");
        // TODO: require campos
        
        _indexAlum = listaAlumnos.length;
        
        mapAlumnosAddr[_addrEthAlum] = Alumno(_addrEthAlum, _indexAlum, _nombre, _apellidos, _dni, _correoUpm, _telefMovil, _fechaNac, _idUpm, true);
        
        listaAlumnos.push(_addrEthAlum);
        
        numAlumnos++;
    }
    
    function leerAlumnoAddr(
        address _addrEthAlum
    ) public view returns(
        uint _indexAlum,
        string memory _nombre,
        string memory _apellidos,
        string memory _dni,
        string memory _correoUpm,
        uint32 _telefMovil,
        uint256 _fechaNac,
        string memory _idUpm
    ) {
        require(mapAlumnosAddr[_addrEthAlum].existsAlum, "leerAlumnoAddr - Alumno no creado.");
        
        _indexAlum = mapAlumnosAddr[_addrEthAlum].indexAlum;
        _nombre = mapAlumnosAddr[_addrEthAlum].nombre;
        _apellidos = mapAlumnosAddr[_addrEthAlum].apellidos;
        _dni = mapAlumnosAddr[_addrEthAlum].dni;
        _correoUpm = mapAlumnosAddr[_addrEthAlum].correoUpm;
        _telefMovil = mapAlumnosAddr[_addrEthAlum].telefMovil;
        _fechaNac = mapAlumnosAddr[_addrEthAlum].fechaNac;
        _idUpm = mapAlumnosAddr[_addrEthAlum].idUpm;
    }
    
    function actualizarAlumnoAddr(
        address _addrEthAlum,
        string memory _nombre,
        string memory _apellidos,
        string memory _dni,
        string memory _correoUpm,
        uint32 _telefMovil,
        uint256 _fechaNac,
        string memory _idUpm)
    public {
        require(mapAlumnosAddr[_addrEthAlum].existsAlum, "actualizarAlumnoAddr - Alumno no creado.");
        
        mapAlumnosAddr[_addrEthAlum].nombre = _nombre;
        mapAlumnosAddr[_addrEthAlum].apellidos = _apellidos;
        mapAlumnosAddr[_addrEthAlum].dni = _dni;
        mapAlumnosAddr[_addrEthAlum].correoUpm = _correoUpm;
        mapAlumnosAddr[_addrEthAlum].telefMovil = _telefMovil;
        mapAlumnosAddr[_addrEthAlum].fechaNac = _fechaNac;
        mapAlumnosAddr[_addrEthAlum].idUpm = _idUpm;
    }
    
    function borrarAlumnoAddr(
        address _addrEthAlum
    ) public {
        require(mapAlumnosAddr[_addrEthAlum].existsAlum, "borrarAlumnoAddr - Alumno no creado.");
        
        uint _indexAlum = mapAlumnosAddr[_addrEthAlum].indexAlum;
        
        mapAlumnosAddr[_addrEthAlum].existsAlum = false;
        delete mapAlumnosAddr[_addrEthAlum];
        
        delete listaAlumnos[_indexAlum];
        
        numAlumnos--;
    }
    
}