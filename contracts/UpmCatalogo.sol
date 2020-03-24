pragma solidity >=0.5.12 <0.6.0;

contract UpmCatalogo {
    
    address public owner;
    
    uint public numAsignaturas;
    address[] public listaAsignaturas;
    mapping(address => uint) public mapAsignaturas;
    
    constructor() public {
        owner = msg.sender;
    }

    function actualizarOwner(address _newOwner) public soloOwner() {
        owner = _newOwner;
    }
    


    function anadirAsignatura(
        address _addrContractAsignatura
    ) public soloOwner() {
        // comprobar que no esta creada
        if (listaAsignaturas.length != 0) {
            uint indexArrayAsig = mapAsignaturas[_addrContractAsignatura];
            require(_addrContractAsignatura != listaAsignaturas[indexArrayAsig], "anadirAsignatura - Asignatura ya creada.");
        }
        
        mapAsignaturas[_addrContractAsignatura] = listaAsignaturas.length;
        listaAsignaturas.push(_addrContractAsignatura);
        
        numAsignaturas++;
    }
    
    function eliminarAsignatura(
        address _addrContractAsignatura
    ) public soloOwner() {
        // comprobar que esta creada la Asignatura
        require(listaAsignaturas.length != 0, "eliminarAsignatura - No hay Asignaturas creadas.");
        uint indexArrayAsig = mapAsignaturas[_addrContractAsignatura];
        require(_addrContractAsignatura == listaAsignaturas[indexArrayAsig], "eliminarAsignatura - Asignatura no creada.");
        
        delete mapAsignaturas[_addrContractAsignatura];
        listaAsignaturas[indexArrayAsig] = address(0);
        
        numAsignaturas--;
    }



    modifier soloOwner() {
        require(msg.sender == owner, "Sólo el owner puede hacer esta operación.");
        _;
    }
    
}