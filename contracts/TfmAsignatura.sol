pragma solidity >=0.5.12 <0.6.0;

contract TfmAsignatura {
    
    address public owner;
    
    address public coordinador;
    
    string public nombreAsignatura;
    string public cursoAcademico;
    string public codigoAsignatura;
    uint8 public numCreditos;
    uint8 public semestre;      // TODO: cambiar por enum?
    uint8 public cursoAno;      // 1, 2, 3, 4, 5, 6...
    TipoAsignatura public tipoAsignatura;
    
    uint public numAlumnos;
    address[] public listaAlumnos;                                  // TODO: no ponerlo public y hacer funcion con modifiers?
    mapping(address => uint) public mapAlumnos;                     // TODO: no ponerlo public y hacer funcion con modifiers?
                                                                    // uint es el indice del array listaAlumnos
    
    uint public numProfesores;
    address[] public listaProfesores;                               // TODO: no ponerlo public y hacer funcion con modifiers?
    mapping(address => uint) public mapProfesores;                  // TODO: no ponerlo public y hacer funcion con modifiers?
                                                                    // uint es el indice del array listaProfesores
    
    uint8 public numEvaluaciones;
    Evaluacion[] public listaEvaluaciones;
    
    uint public numNotas;
    mapping(address => mapping(uint8 => mapping(uint8 => Nota))) public calificaciones;     // address: dirección Alumno
                                                                                            // uint8:    key convocatoria
                                                                                            // uint8:    key Evaluacion
    
    enum TipoNota { NoPresentado, Normal, MatriculaHonor }
    
    enum TipoConvocatoria { OrdinariaContinua, OrdinariaFinal, Extraordinaria }
    
    enum TipoAsignatura { Obligatoria, Optativa }
    
    struct Evaluacion {
        uint8 indexEvaluacion;
        string nombre;
        uint fecha;
        bool obligatoria;
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
        numCreditos = _numCreditos;
        semestre = _semestre;
        cursoAno = _cursoAno;
        tipoAsignatura = _tipoAsignatura;
        
        numAlumnos = 0;
        numProfesores = 0;
        numEvaluaciones = 0;
    }
    
    
    function miDireccion() public view returns(address _miDireccion) {
        _miDireccion = msg.sender;
    }

    // TODO: poder cambiar coordinador
    

    // EVALUACIONES
    
    function evaluacionesLength() public view returns(uint _numEvaluaciones) {
        _numEvaluaciones = listaEvaluaciones.length;
    }
    
    function crearEvaluacion(
        string memory _nombre,
        uint _fecha,
        bool _obligatoria,
        uint _notaMinima,
        uint _porcAportacion,
        TipoConvocatoria _tipoConvocatoria
    ) public returns(uint8 _indexEval) {
        listaEvaluaciones.push(Evaluacion(uint8(listaEvaluaciones.length), _nombre, _fecha, _obligatoria, _notaMinima, _porcAportacion, _tipoConvocatoria));
        _indexEval = uint8(listaEvaluaciones.length - 1);
        numEvaluaciones++;
    }
    
    function leerEvaluacion(
        uint8 _indexEval
    ) public view returns(
        string memory _nombre,
        uint _fecha,
        bool _obligatoria,
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
        bool _obligatoria,
        uint _notaMinima,
        uint _porcAportacion,
        TipoConvocatoria _tipoConvocatoria
    ) public {
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
    // ¿no hace falta?
    
    
    // PROFESORES
    
    function profesoresLength() public view returns(uint _numProfesores) {
        _numProfesores = listaProfesores.length;
    }
    
    function anadirProfesor(
        address _addrEthProf
    ) public {
        // comprobar que no esta creado el Profesor
        if (listaProfesores.length != 0) {
            uint indexArrayProf = mapProfesores[_addrEthProf];
            require(_addrEthProf != listaProfesores[indexArrayProf], "anadirProfesor - Profesor ya creado.");   
        }
        
        mapProfesores[_addrEthProf] = listaProfesores.length;
        listaProfesores.push(_addrEthProf);
        numProfesores++;
    }
    
    function eliminarProfesor(
        address _addrEthProf
    ) public {
        // comprobar que esta creado el Profesor
        uint indexArrayProf = mapProfesores[_addrEthProf];
        if (listaProfesores.length != 0) {
            address comparar = listaProfesores[indexArrayProf];
            require(_addrEthProf == comparar, "eliminarProfesor - Profesor no creado.");
        }
        
        mapProfesores[_addrEthProf] = 0;
        listaProfesores[indexArrayProf] = address(0);
        numProfesores--;
    }
    
    
    
    // ALUMNOS
    
    function alumnosLength() public view returns(uint _numAlumnos) {
        _numAlumnos = listaAlumnos.length;
    }
    
    function anadirAlumno(
        address _addrEthAlum
    ) public {
        // comprobar que no esta creado el Alumno
        if (listaAlumnos.length != 0) {
            uint indexArrayAlum = mapAlumnos[_addrEthAlum];
            require(_addrEthAlum != listaAlumnos[indexArrayAlum], "anadirAlumno - Alumno ya creado.");
        }
        
        mapAlumnos[_addrEthAlum] = listaAlumnos.length;
        listaAlumnos.push(_addrEthAlum);
        numAlumnos++;
    }
    
    function eliminarAlumno(
        address _addrEthAlum
    ) public {
        // comprobar que esta creado el Alumno
        uint indexArrayAlum = mapAlumnos[_addrEthAlum];
        if (listaAlumnos.length != 0) {
            address comparar = listaAlumnos[indexArrayAlum];
            require(_addrEthAlum == comparar, "eliminarAlumno - Alumno no creado.");
        }
        
        mapAlumnos[_addrEthAlum] = 0;
        listaAlumnos[indexArrayAlum] = address(0);
        numAlumnos--;
    }
    
    
    
    // NOTAS
    
    function crearNota(
        address _addrEthAlum,
        TipoConvocatoria _tipoConvocatoria,
        uint8 _indexEval,
        TipoNota _tipoNota,
        uint _calificacion
    ) public {
        // comprobar que esta el Alumno creado
        uint indexArrayAlum = mapAlumnos[_addrEthAlum];
        address comparar = listaAlumnos[indexArrayAlum];
        require(_addrEthAlum == comparar, "crearNota - Alumno no creado.");
        // comprobar que esta la Evaluacion creada
        require(_indexEval >= 0, "crearNota - No existen los índices de evaluacion negativos.");
        require(_indexEval <= uint8(listaEvaluaciones.length) - 1, "crearNota - Evaluacion no creada.");
        // comprobar que no esta la Nota creada
        require(!calificaciones[_addrEthAlum][uint8(_tipoConvocatoria)][_indexEval].existsNota, "crearNota - Nota ya creada.");
        // TODO: comprobar entrada calificacion bien
        
        calificaciones[_addrEthAlum][uint8(_tipoConvocatoria)][_indexEval] = Nota(_tipoNota, _calificacion, true);

        numNotas++;
    }
    
    function leerNota(
        address _addrEthAlum,
        TipoConvocatoria _tipoConvocatoria,
        uint8 _indexEval
    ) public view returns(
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
        require(calificaciones[_addrEthAlum][uint8(_tipoConvocatoria)][_indexEval].existsNota, "leerNota - La nota no esta creada.");
        
        _tipoNota = calificaciones[_addrEthAlum][uint8(_tipoConvocatoria)][_indexEval].tipoNota;
        _calificacion = calificaciones[_addrEthAlum][uint8(_tipoConvocatoria)][_indexEval].calificacion;
    }
    
    function leerMiNota(
        TipoConvocatoria _tipoConvocatoria,
        uint8 _indexEval
    ) public view returns(
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
        require(calificaciones[msg.sender][uint8(_tipoConvocatoria)][_indexEval].existsNota, "leerMiNota - La nota no existe.");
        
        _tipoNota = calificaciones[msg.sender][uint8(_tipoConvocatoria)][_indexEval].tipoNota;
        _calificacion = calificaciones[msg.sender][uint8(_tipoConvocatoria)][_indexEval].calificacion;
    }
    
    function actualizarNota(
        address _addrEthAlum,
        TipoConvocatoria _tipoConvocatoria,
        uint8 _indexEval,
        TipoNota _tipoNota,
        uint _calificacion
    ) public {
        // comprobar que esta el Alumno creado
        uint indexArrayAlum = mapAlumnos[_addrEthAlum];
        address comparar = listaAlumnos[indexArrayAlum];
        require(_addrEthAlum == comparar, "actualizarNota - Alumno no creado.");
        // comprobar que esta la Evaluacion creada
        require(_indexEval >= 0, "actualizarNota - No existen los índices de evaluacion negativos.");
        require(_indexEval <= uint8(listaEvaluaciones.length) - 1, "actualizarNota - Evaluacion no creada.");
        // comprobar que esta la Nota creada
        require(calificaciones[_addrEthAlum][uint8(_tipoConvocatoria)][_indexEval].existsNota, "actualizarNota - La nota no existe.");
        // TODO: comprobar entrada calificacion bien
        
        calificaciones[_addrEthAlum][uint8(_tipoConvocatoria)][_indexEval] = Nota(_tipoNota, _calificacion, true);
    }
    
    function borrarNota(
        address _addrEthAlum,
        TipoConvocatoria _tipoConvocatoria,
        uint8 _indexEval
    ) public {
        // comprobar que esta el Alumno creado
        uint indexArrayAlum = mapAlumnos[_addrEthAlum];
        address comparar = listaAlumnos[indexArrayAlum];
        require(_addrEthAlum == comparar, "borrarNota - Alumno no creado.");
        // comprobar que esta la Evaluacion creada
        require(_indexEval >= 0, "borrarNota - No existen los índices de evaluacion negativos.");
        require(_indexEval <= uint8(listaEvaluaciones.length) - 1, "borrarNota - Evaluacion no creada.");
        // comprobar que esta la Nota creada
        require(calificaciones[_addrEthAlum][uint8(_tipoConvocatoria)][_indexEval].existsNota, "borrarNota - La nota no existe.");
        
        calificaciones[_addrEthAlum][uint8(_tipoConvocatoria)][_indexEval].existsNota = false;
        delete calificaciones[_addrEthAlum][uint8(_tipoConvocatoria)][_indexEval];

        numNotas--;
    }
    
    
    
    
    // TODO: modifiers
}