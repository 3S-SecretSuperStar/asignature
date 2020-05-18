pragma solidity >=0.5.12 <0.6.0;

contract UpmAsignatura {
    
    address public owner;
    
    address public coordinador;
    
    string public nombreAsignatura;
    string public cursoAcademico;
    string public codigoAsignatura;
    string public titulacion;
    uint8 public numCreditos;
    uint8 public semestre;
    uint8 public cursoAno;
    TipoAsignatura public tipoAsignatura;
    
    uint public numAlumnos;
    address[] public listaAlumnos;
    mapping(address => uint) public mapAlumnos;                     // uint es el indice del array listaAlumnos
    
    uint public numProfesores;
    address[] public listaProfesores;
    mapping(address => uint) public mapProfesores;                  // uint es el indice del array listaProfesores
    
    uint8 public numEvaluaciones;
    Evaluacion[] public listaEvaluaciones;
    
    uint public numNotas;
    mapping(address => mapping(uint8 => Nota)) public mapNotas;         // address: dirección Alumno
                                                                        // uint8: key Evaluacion
    
    enum TipoNota { NoPresentado, Normal, MatriculaHonor }
    
    enum TipoConvocatoria { OrdinariaContinua, OrdinariaFinal, Extraordinaria }
    
    enum TipoAsignatura { Obligatoria, Optativa }

    enum EvaluacionObligatoria { Optativa, Obligatoria }
    
    struct Evaluacion {
        uint8 indexEvaluacion;
        string nombre;
        uint fecha;
        EvaluacionObligatoria obligatoria;
        uint notaMinima;
        uint porcAportacion;
        TipoConvocatoria tipoConvocatoria;
    }
    
    struct Nota {
        TipoNota tipoNota;
        uint calificacion;
        bool existsNota;
    }
    
    
    constructor(
        address _coordinador,
        string memory _nombreAsignatura,
        string memory _cursoAcademico,
        string memory _codigoAsignatura,
        string memory _titulacion,
        uint8 _numCreditos,
        uint8 _semestre,
        uint8 _cursoAno,
        TipoAsignatura _tipoAsignatura
    ) public {
        owner = msg.sender;
        coordinador = _coordinador;
        nombreAsignatura = _nombreAsignatura;
        cursoAcademico = _cursoAcademico;
        codigoAsignatura = _codigoAsignatura;
        titulacion = _titulacion;
        numCreditos = _numCreditos;
        semestre = _semestre;
        cursoAno = _cursoAno;
        tipoAsignatura = _tipoAsignatura;
        
        numAlumnos = 0;
        numProfesores = 0;
        numEvaluaciones = 0;
    }

    function actualizarOwner(address _newOwner) public soloOwner() {
        owner = _newOwner;
    }

    function actualizarCoordinador(address _addrCoordinador) public soloOwnerOCoordinador() {
        coordinador = _addrCoordinador;
    }
    
    function miDireccion() public view returns(address _miDireccion) {
        _miDireccion = msg.sender;
    }

    function alumnosLength() public view returns(uint _alumnosLength) {
        _alumnosLength = listaAlumnos.length;
    }

    function profesoresLength() public view returns(uint _profesoresLength) {
        _profesoresLength = listaProfesores.length;
    }

    function evaluacionesLength() public view returns(uint _evaluacionesLength) {
        _evaluacionesLength = listaEvaluaciones.length;
    }
    

    // EVALUACIONES
    
    function crearEvaluacion(
        string memory _nombre,
        uint _fecha,
        EvaluacionObligatoria _obligatoria,
        uint _notaMinima,
        uint _porcAportacion,
        TipoConvocatoria _tipoConvocatoria
    ) public soloOwnerOCoordinadorOProfesor() returns(uint8 _indexEval) {
        listaEvaluaciones.push(Evaluacion(uint8(listaEvaluaciones.length), _nombre, _fecha, _obligatoria, _notaMinima, _porcAportacion, _tipoConvocatoria));
        _indexEval = uint8(listaEvaluaciones.length - 1);
        numEvaluaciones++;
    }
    
    function leerEvaluacion(
        uint8 _indexEval
    ) public soloOwnerOCoordinadorOProfesorOAlumno() view returns(
        string memory _nombre,
        uint _fecha,
        EvaluacionObligatoria _obligatoria,
        uint _notaMinima,
        uint _porcAportacion,
        TipoConvocatoria _tipoConvocatoria
    ) {
        require(_indexEval >= 0, "leerEvaluacion - No existen los índices negativos.");
        require(_indexEval <= uint8(listaEvaluaciones.length) - 1, "leerEvaluacion - Evaluacion no creada.");
        
        _nombre = listaEvaluaciones[_indexEval].nombre;
        _fecha = listaEvaluaciones[_indexEval].fecha;
        _obligatoria = listaEvaluaciones[_indexEval].obligatoria;
        _notaMinima = listaEvaluaciones[_indexEval].notaMinima;
        _porcAportacion = listaEvaluaciones[_indexEval].porcAportacion;
        _tipoConvocatoria = listaEvaluaciones[_indexEval].tipoConvocatoria;
    }
    
    function actualizarEvaluacion(
        uint8 _indexEval,
        string memory _nombre,
        uint _fecha,
        EvaluacionObligatoria _obligatoria,
        uint _notaMinima,
        uint _porcAportacion,
        TipoConvocatoria _tipoConvocatoria
    ) public soloOwnerOCoordinadorOProfesor() {
        require(_indexEval >= 0, "actualizarEvaluacion - No existen los indices negativos.");
        require(_indexEval <= uint8(listaEvaluaciones.length) - 1, "actualizarEvaluacion - Evaluacion no creada.");
        
        listaEvaluaciones[_indexEval].nombre = _nombre;
        listaEvaluaciones[_indexEval].fecha = _fecha;
        listaEvaluaciones[_indexEval].obligatoria = _obligatoria;
        listaEvaluaciones[_indexEval].notaMinima = _notaMinima;
        listaEvaluaciones[_indexEval].porcAportacion = _porcAportacion;
        listaEvaluaciones[_indexEval].tipoConvocatoria = _tipoConvocatoria;
    }
    
    // borrar Evaluacion
    // no hace falta
    
    
    // PROFESORES
    
    function anadirProfesor(
        address _addrEthProf
    ) public soloOwnerOCoordinador() {
        // comprobar que no esta creado el Profesor
        if (numProfesores != 0) {
            uint indexArrayProf = mapProfesores[_addrEthProf];
            require(_addrEthProf != listaProfesores[indexArrayProf], "anadirProfesor - Profesor ya creado.");   
        }
        
        mapProfesores[_addrEthProf] = listaProfesores.length;
        listaProfesores.push(_addrEthProf);
        numProfesores++;
    }
    
    function eliminarProfesor(
        address _addrEthProf
    ) public soloOwnerOCoordinador() {
        // comprobar que esta creado el Profesor
        require(numProfesores != 0, "eliminarProfesor - No hay Profesores creados.");
        uint indexArrayProf = mapProfesores[_addrEthProf];
        require(_addrEthProf == listaProfesores[indexArrayProf], "eliminarProfesor - Profesor no creado.");
        
        delete mapProfesores[_addrEthProf];
        //listaProfesores[indexArrayProf] = address(0);
        delete listaProfesores[indexArrayProf];
        numProfesores--;
    }
    
    
    
    // ALUMNOS
    
    function anadirAlumno(
        address _addrEthAlum
    ) public soloOwnerOCoordinadorOProfesor() {
        // comprobar que no esta creado el Alumno
        if (numAlumnos != 0) {
            uint indexArrayAlum = mapAlumnos[_addrEthAlum];
            require(_addrEthAlum != listaAlumnos[indexArrayAlum], "anadirAlumno - Alumno ya creado.");
        }
        
        mapAlumnos[_addrEthAlum] = listaAlumnos.length;
        listaAlumnos.push(_addrEthAlum);
        numAlumnos++;
    }
    
    function eliminarAlumno(
        address _addrEthAlum
    ) public soloOwnerOCoordinadorOProfesor() {
        // comprobar que esta creado el Alumno
        require(numAlumnos != 0, "eliminarAlumno - No hay Alumnos creados.");
        uint indexArrayAlum = mapAlumnos[_addrEthAlum];
        require(_addrEthAlum == listaAlumnos[indexArrayAlum], "eliminarAlumno - Alumno no creado.");
        
        delete mapAlumnos[_addrEthAlum];
        //listaAlumnos[indexArrayAlum] = address(0);
        delete listaAlumnos[indexArrayAlum];
        numAlumnos--;
    }
    
    
    
    // NOTAS
    
    function crearNota(
        address _addrEthAlum,
        uint8 _indexEval,
        TipoNota _tipoNota,
        uint _calificacion
    ) public soloOwnerOCoordinadorOProfesor() {
        // comprobar que esta el Alumno creado
        uint indexArrayAlum = mapAlumnos[_addrEthAlum];
        address comparar = listaAlumnos[indexArrayAlum];
        require(_addrEthAlum == comparar, "crearNota - Alumno no creado.");
        // comprobar que esta la Evaluacion creada
        require(_indexEval >= 0, "crearNota - No existen los índices de evaluacion negativos.");
        require(_indexEval <= uint8(listaEvaluaciones.length) - 1, "crearNota - Evaluacion no creada.");
        // comprobar que no esta la Nota creada
        require(!mapNotas[_addrEthAlum][_indexEval].existsNota, "crearNota - Nota ya creada.");
        // TODO: comprobar entrada calificacion bien
        
        mapNotas[_addrEthAlum][_indexEval] = Nota(_tipoNota, _calificacion, true);
        
        numNotas++;
    }
    
    function leerNota(
        address _addrEthAlum,
        uint8 _indexEval
    ) public soloOwnerOCoordinadorOProfesor() view returns(
        TipoNota _tipoNota,
        uint _calificacion
    ) {
        // comprobar que esta el Alumno creado
        uint indexArrayAlum = mapAlumnos[_addrEthAlum];
        address comparar = listaAlumnos[indexArrayAlum];
        require(_addrEthAlum == comparar, "leerNota - Alumno no creado.");
        // comprobar que esta la Evaluacion creada
        require(_indexEval >= 0, "leerNota - No existen los índices de evaluacion negativos.");
        require(_indexEval <= uint8(listaEvaluaciones.length) - 1, "leerNota - Evaluacion no creada.");
        // comprobar que esta la Nota creada
        require(mapNotas[_addrEthAlum][_indexEval].existsNota, "leerNota - La nota no esta creada.");
        
        _tipoNota = mapNotas[_addrEthAlum][_indexEval].tipoNota;
        _calificacion = mapNotas[_addrEthAlum][_indexEval].calificacion;
    }
    
    function leerMiNota(
        uint8 _indexEval
    ) public soloAlumno() view returns(
        TipoNota _tipoNota,
        uint _calificacion
    ) {
        // comprobar que esta el Alumno creado
        uint indexArrayAlum = mapAlumnos[msg.sender];
        address comparar = listaAlumnos[indexArrayAlum];
        require(msg.sender == comparar, "leerMiNota - Alumno no creado.");
        // comprobar que esta la Evaluacion creada
        require(_indexEval >= 0, "leerMiNota - No existen los índices de evaluacion negativos.");
        require(_indexEval <= uint8(listaEvaluaciones.length) - 1, "leerMiNota - Evaluacion no creada.");
        // comprobar que esta la Nota creada
        require(mapNotas[msg.sender][_indexEval].existsNota, "leerMiNota - La nota no existe.");
        
        _tipoNota = mapNotas[msg.sender][_indexEval].tipoNota;
        _calificacion = mapNotas[msg.sender][_indexEval].calificacion;
    }
    
    function actualizarNota(
        address _addrEthAlum,
        uint8 _indexEval,
        TipoNota _tipoNota,
        uint _calificacion
    ) public soloOwnerOCoordinadorOProfesor() {
        // comprobar que esta el Alumno creado
        uint indexArrayAlum = mapAlumnos[_addrEthAlum];
        address comparar = listaAlumnos[indexArrayAlum];
        require(_addrEthAlum == comparar, "actualizarNota - Alumno no creado.");
        // comprobar que esta la Evaluacion creada
        require(_indexEval >= 0, "actualizarNota - No existen los índices de evaluacion negativos.");
        require(_indexEval <= uint8(listaEvaluaciones.length) - 1, "actualizarNota - Evaluacion no creada.");
        // comprobar que esta la Nota creada
        require(mapNotas[_addrEthAlum][_indexEval].existsNota, "actualizarNota - La nota no existe.");
        // TODO: comprobar entrada calificacion bien
        
        mapNotas[_addrEthAlum][_indexEval] = Nota(_tipoNota, _calificacion, true);
    }
    
    function borrarNota(
        address _addrEthAlum,
        uint8 _indexEval
    ) public soloOwnerOCoordinadorOProfesor() {
        // comprobar que esta el Alumno creado
        uint indexArrayAlum = mapAlumnos[_addrEthAlum];
        address comparar = listaAlumnos[indexArrayAlum];
        require(_addrEthAlum == comparar, "borrarNota - Alumno no creado.");
        // comprobar que esta la Evaluacion creada
        require(_indexEval >= 0, "borrarNota - No existen los índices de evaluacion negativos.");
        require(_indexEval <= uint8(listaEvaluaciones.length) - 1, "borrarNota - Evaluacion no creada.");
        // comprobar que esta la Nota creada
        require(mapNotas[_addrEthAlum][_indexEval].existsNota, "borrarNota - La nota no existe.");
        
        delete mapNotas[_addrEthAlum][_indexEval];
        
        numNotas--;
    }
    
    
    
    function isOwner() public view returns(bool _isOwner) {
        _isOwner = msg.sender == owner;
    }

    function isCoordinador() public view returns(bool _isCoordinador) {
        _isCoordinador = msg.sender == coordinador;
    }

    function isProfesor() public view returns(bool _isProfesor) {
        uint indexArrayProf = mapProfesores[msg.sender];
        _isProfesor = (numProfesores > 0) && (msg.sender == listaProfesores[indexArrayProf]);
    }

    function isAlumno() public view returns(bool _isAlumno) {
        uint indexArrayAlum = mapAlumnos[msg.sender];
        _isAlumno = (numAlumnos > 0) && (msg.sender == listaAlumnos[indexArrayAlum]);
    }

    
    modifier soloOwner() {
        require(isOwner(), "Sólo el owner puede hacer esta operación.");
        _;
    }

    modifier soloOwnerOCoordinador() {
        require(isOwner() || isCoordinador(), "Sólo el owner o el coordinador pueden hacer esta operación.");
        _;
    }

    modifier soloOwnerOCoordinadorOProfesor() {
        require(isOwner() || isCoordinador() || isProfesor(), "Sólo el owner, el coordinador o un profesor pueden hacer esta operación.");
        _;
    }

    modifier soloOwnerOCoordinadorOProfesorOAlumno() {
        require(isOwner() || isCoordinador() || isProfesor() || isAlumno(), "Sólo el owner, el coordinador, un profesor o un alumno pueden hacer esta operación.");
        _;
    }

    modifier soloAlumno() {
        require(isAlumno(), "Sólo un alumno puede hacer esta operación.");
        _;
    }

}