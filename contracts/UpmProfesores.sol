pragma solidity >=0.5.12 <0.6.0;

contract UpmProfesores {
    
    address public owner;
    
    uint8 public numProfesores;
    address[] public listaProfesores;
    mapping(address => Profesor) public mapProfesoresAddr;
    
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
    }

    function actualizarOwner(address _newOwner) public soloOwner() {
        owner = _newOwner;
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
    ) public soloOwner() returns(
        uint8 _indexProf
    ) {
        require(mapProfesoresAddr[_addrEthProf].addrEthProf == address(0), "crearProfesor - Profesor ya creado.");
        
        _indexProf = uint8(listaProfesores.length);
        
        mapProfesoresAddr[_addrEthProf] = Profesor(_addrEthProf, _indexProf, _nombre, _apellidos, _dni, _correoUpm, _telefMovil, _fechaNac, _idUpm);
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
        require(mapProfesoresAddr[_addrEthProf].addrEthProf != address(0), "leerProfesorAddr - Profesor no creado.");
        
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
    ) public soloOwner() {
        require(mapProfesoresAddr[_addrEthProf].addrEthProf != address(0), "actualizarProfesorAddr - Profesor no creado.");
        
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
    ) public soloOwner() {
        require(mapProfesoresAddr[_addrEthProf].addrEthProf != address(0), "borrarProfesorAddr - Profesor no creado.");
        
        uint8 _indexProf = mapProfesoresAddr[_addrEthProf].indexProf;

        delete mapProfesoresAddr[_addrEthProf];
        delete listaProfesores[_indexProf];
        
        numProfesores--;
    }



    modifier soloOwner() {
        require(msg.sender == owner, "Sólo el owner puede hacer esta operación.");
        _;
    }
    
}