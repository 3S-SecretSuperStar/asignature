pragma solidity >=0.5.12 <0.6.0;

contract UpmAlumnos {
    
    address public owner;
    
    uint public numAlumnos;
    address[] public listaAlumnos;
    mapping(address => Alumno) public mapAlumnosAddr;
    
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
        int256 fechaNac;
        string idUpm;
    }

    function actualizarOwner(address _newOwner) public soloOwner() {
        owner = _newOwner;
    }

    function miDireccion() public view returns(address _miDireccion) {
        _miDireccion = msg.sender;
    }

    function alumnosLength() public view returns(uint _alumnosLength) {
        _alumnosLength = listaAlumnos.length;
    }
    
    
    
    function crearAlumno(
        address _addrEthAlum,
        string memory _nombre,
        string memory _apellidos,
        string memory _dni,
        string memory _correoUpm,
        uint32 _telefMovil,
        int256 _fechaNac,
        string memory _idUpm
    ) public soloOwner() returns(
        uint _indexAlum
    ) {
        require(mapAlumnosAddr[_addrEthAlum].addrEthAlum == address(0), "crearAlumno - Alumno ya creado.");
        
        _indexAlum = listaAlumnos.length;
        
        mapAlumnosAddr[_addrEthAlum] = Alumno(_addrEthAlum, _indexAlum, _nombre, _apellidos, _dni, _correoUpm, _telefMovil, _fechaNac, _idUpm);
        
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
        int256 _fechaNac,
        string memory _idUpm
    ) {
        require(mapAlumnosAddr[_addrEthAlum].addrEthAlum != address(0), "leerAlumnoAddr - Alumno no creado.");
        
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
        int256 _fechaNac,
        string memory _idUpm
    ) public soloOwner() {
        require(mapAlumnosAddr[_addrEthAlum].addrEthAlum != address(0), "actualizarAlumnoAddr - Alumno no creado.");
        
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
    ) public soloOwner {
        require(mapAlumnosAddr[_addrEthAlum].addrEthAlum != address(0), "borrarAlumnoAddr - Alumno no creado.");
        
        uint _indexAlum = mapAlumnosAddr[_addrEthAlum].indexAlum;
        
        delete mapAlumnosAddr[_addrEthAlum];
        delete listaAlumnos[_indexAlum];
        
        numAlumnos--;
    }


    modifier soloOwner() {
        require(msg.sender == owner, "Sólo el owner puede hacer esta operación.");
        _;
    }
    
}