pragma solidity >=0.5.12 <0.6.0;

contract TfmCatalogo {
    
    address public owner;
    
    uint public numAsignaturas;
    address[] public listaAsignaturas;                  // TODO: no ponerlo public y hacer funcion con modifiers?
    mapping(address => uint) public mapAsignaturas;     // TODO: no ponerlo public y hacer funcion con modifiers?
    
    constructor() public {
        owner = msg.sender;
    }
    
    
    function asignaturasLength() public view returns(uint _numAsignaturas) {
        _numAsignaturas = listaAsignaturas.length;
    }
    
    function anadirAsignatura(
        address _addrContractAsignatura
    ) public {
        // comprobar que no esta
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
    ) public {
        // comprobar que esta la Asignatura creada
        uint indexArrayAsig = mapAsignaturas[_addrContractAsignatura];
        require(_addrContractAsignatura == listaAsignaturas[indexArrayAsig], "eliminarAsignatura - Asignatura no creada.");
        
        mapAsignaturas[_addrContractAsignatura] = 0;
        delete mapAsignaturas[_addrContractAsignatura];
        listaAsignaturas[indexArrayAsig] = address(0);
        numAsignaturas--;
    }
    
}