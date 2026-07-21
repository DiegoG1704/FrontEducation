"use client"; // Necesario para usar hooks en App Router

import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "../Herramientas/axiosToken";
import axios from "axios";

interface Datos {
  usuario: string;
  contraseña: string;
}

interface ModuloClase {
  titulo: string;
  descripcion: string;
  duracion: string;
  completado: boolean;
  video: string;
}

interface Modulo {
  titulo: string;
  descripcion: string;
  clases: ModuloClase[];
}

interface Modelo {
  id:number;
  nombre:string;
}

interface DetallePrenda{
  idProduccion:number,
  nombreModelo:string
}

interface InformeProduc{
  idProduccion:number,
  nombreModelo:string,
  area:string
}
interface PrendaDetalle{
  idPrenda:number,
  idProduccion:number,
  idDetallePrenda:number,
  nombrePrenda:string
}

export interface InfomPrenda {
  id: number
  nombrePrenda: string
  nombreTaller: string
  direccion: string
  codigo: string
  idProduccion: number
  fechaInicio: string
  area: string
  estado: string
  idPrenda: number
  cantidad: number
  cantidadExt: number
  talla: string
  idDetalle: number
  cantidadTotal: number
  estadoinforme: string
  cantInfor: number | null
  cantMerma: number | null
}


interface AppContextType {
  user: any;
  setPrendasConf: React.Dispatch<React.SetStateAction<InfomPrenda[]>>;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  listProductos: Modulo[];
  datos: Datos;
  setDatos: (datos: Datos) => void;
  handleSelect: (field: "usuario" | "contraseña", value: string) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  login: () => void;
  handleLogout: () => void;
  errorMessage:string | null;
  color:any;
  talla:any;
  prenda:any;
  modelo:any;
  material:any;
  rutas:any;
  roles:any;
  clientes:any;
  paquetes:any;
  personal:any;
  produccion:any;
  prendaDetalle:any;
  visible: boolean;
  taller:any;
  detalleInforme:any;
  usuario:string | null;
  detallePrenda:any;
  prendasConf:any;
  notif:any;
  pedidos:any;
  plantillas:any;
  dashAsist:any;
  preVenta:any;
  config:any;
  asistencia:any;
  showWelcome:boolean;
  asistenciaPers:any;
  setVisible: (v: boolean) => void;
  selectProd: Modelo | null;
  selectPrenda:DetallePrenda| null;
  setSelectProd: (p: Modelo | null) => void;
  setSelectPrenda:(p:DetallePrenda| null)=>void;
  setSelectDetallePrenda:(p:PrendaDetalle| null)=>void;
  ListaPrendasConfirmacion: () => Promise<void>;
  modeloPred:any
  ListaModelo: () => Promise<void>;
  ListaRoles: () => Promise<void>;
  ListaPersonal : ()=>Promise<void>;
  ListaTaller: ()=>Promise<void>;
  ListaProduccion:()=>Promise<void>;
  ListaDetallesInforme:()=>Promise<void>;
  ListaPrenda:()=>Promise<void>;
  Listacolor:()=>Promise<void>;
  Listamaterial:()=>Promise<void>;
  ListaClientes:()=>Promise<void>;
  ListaPedidos:()=>Promise<void>;
  ListaAsistencia:()=>Promise<void>;
  ListaAsistenciaId:()=>Promise<void>;
  ListaAsistenciaDash:()=>Promise<void>;
  ListaConfiguraciones:()=>Promise<void>;
  ListaNotificiaciones:()=>Promise<void>;
  ListaPlantillas:()=>Promise<void>;
  ListaMovimientos:()=>Promise<void>;
  ListaDetallePrestamo:()=>Promise<void>;
  me:()=>Promise<void>;
  selectInforme:InformeProduc| null;
  setSelectInforme:(p:InformeProduc| null)=>void;
  setConfig:()=>void;
  setSelectPedidos:()=>void;
  setSelectAdmin:()=>void;
  setSelectDetalle:()=>void;
  detalle: any;
  informePedidos:any;
  admin:any;
  gestion:any;
  ListaGestion:()=>Promise<void>;
  loadingRoute:boolean;
  setLoadingRoute: (v: boolean) => void;
  ListaActividades:()=>Promise<void>;
  actividad:any;
  evidencia:any
  setSelectEvi:()=>void;
  ListaEvidencia:()=>Promise<void>;
  columnas:any;
  proyectos:any;
  proyectPers:any;
  ListaProyectos:()=>Promise<void>;
  codigo:any;
  setSelectCode:()=>void;
  ListaProyectosCodigo:()=>Promise<void>;
  codigoAct:any;
  ListaEventos:()=>Promise<void>;
  eventos:any;
  eventoCode:any;
  setSelectEventCode:()=>void;
  campoCode:any;
  ListaCampoCode:()=>Promise<void>;
  ListaParticipante:()=>Promise<void>;
  participantesCode:any;
  ListaEventoCodigos:()=>Promise<void>;
  Code:any;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [listProductos] = useState<Modulo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [datos, setDatos] = useState<Datos>({ usuario: "", contraseña: "" });
  const [color,setColor]=useState([])
  const [talla,setTalla]=useState([])
  const [prenda,setPrenda]=useState([])
  const [modelo,setModelo]=useState([])
  const [rutas,setRutas]=useState([])
  const [roles,setRoles]=useState([])
  const [asistencia,setAsistencia]=useState([])
  const [plantillas,setPlantillas]=useState([])
  const [paquetes,setPaquetes]=useState([])
  const [asistenciaPers,setAsistenciaPers]=useState([])
  const [config,setConfig]=useState([])
  const [notif,setnotif]=useState([])
  const [personal,setPersonal]=useState([])
  const [material,setMaterial]=useState([])
  const [produccion,setProduccion]=useState([])
  const [modeloPred,setModeloPred]=useState([])
  const [prendasConf, setPrendasConf] = useState<InfomPrenda[]>([])
  const [prendaDetalle,setPrendaDetalle]=useState([])
  const [detalleInforme,setDetalleInforme]=useState([])
  const [clientes,setClientes]=useState([])
  const [taller,setTaller]=useState([])
  const [usuario, setUsuario] = useState<string| null>(null); // Puedes tiparlo mejor si sabes su estructura
  const [detallePrenda,setDetallePrenda]=useState([])
  const [dashAsist,setDashAsist]=useState([])
  const [visible,setVisible]=useState(false)
  const [selectProd, setSelectProd] = useState<Modelo | null>(null);
  const [selectPrenda, setSelectPrenda] = useState<DetallePrenda| null>(null);
  const [selectDetallePrenda, setSelectDetallePrenda] = useState<PrendaDetalle| null>(null);
  const [admin,setAdmin]=useState([])
  const [selectAdmin,setSelectAdmin]=useState(null)
  const [selectInforme,setSelectInforme]=useState<InformeProduc| null>(null);
  const [selectPedidos,setSelectPedidos]=useState(null);
  const [informePedidos,setInformePedidos]=useState(null);
  const [pedidos,setPedidos]=useState<InformeProduc| null>(null);
  const [preVenta, setPreventa] = useState([])
  const [showWelcome, setShowWelcome] = useState(false);
  const [detalle, setDetalle] = useState(null)
  const [selectDetalle, setSelectDetalle] = useState(null)
  const [gestion, setGestion] = useState(null)
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [actividad, setActividad] = useState([])
  const [evidencia, setEvidencia] = useState([])
  const [selectEvi,setSelectEvi] = useState(null)
  const[proyectos,setProyectos]=useState([])
  const[columnas,setColumnas]=useState([])

  const user = usuario?.datosUsuario;

  const router = useRouter();

  const handleSelect = (field: "usuario" | "contraseña", value: string) => {
    setDatos((prev) => ({ ...prev, [field]: value }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  };

  const Listacolor = async()=>{
    try {
      const response=await axiosInstance.get('getColor')
      setColor(response.data)
    } catch (error) {
      console.error('error', error)
    }
  }

  const Listamaterial = async()=>{
    try {
      const response=await axiosInstance.get('getMaterial')
      setMaterial(response.data)
    } catch (error) {
      console.error('error', error)
    }
  }

  const ListaClientes = async()=>{
    try {
      const response=await axiosInstance.get('getClientes')
      setClientes(response.data)
    } catch (error) {
      console.error('error', error)
    }
  }

  const ListaPrendaDetalle = async () => {
    try {
      const response = await axiosInstance.get(`getPrendasProduccion/${selectPrenda?.idProduccion}`);
      // Verifica que la respuesta sea un arreglo de objetos que cumplen con la interfaz 'Prenda'
      setPrendaDetalle(response.data);
    } catch (error) {
      console.error('Error al obtener los detalles de la prenda', error);
    }
  };

  const ListaDetallesInforme = async () => {
    try {
      const response = await axiosInstance.get(`getDetallesInforme/${selectDetallePrenda?.idDetallePrenda}`);
      // Verifica que la respuesta sea un arreglo de objetos que cumplen con la interfaz 'Prenda'
      setDetalleInforme(response.data);
    } catch (error) {
      console.error('Error al obtener los detalles de la prenda', error);
    }
  };

  const ListaDetallePrenda = async () => {
    try {
      const response = await axiosInstance.get(`getDetallePrenda/${selectDetallePrenda?.idDetallePrenda}`);
      // Verifica que la respuesta sea un arreglo de objetos que cumplen con la interfaz 'Prenda'
      setDetallePrenda(response.data[0]);
    } catch (error) {
      console.error('Error al obtener los detalles de la prenda', error);
    }
  };

  const ListaMovimientos = async () => {
    try {
      const response = await axiosInstance.get(`getAdministracion/${selectAdmin}`);
      // Verifica que la respuesta sea un arreglo de objetos que cumplen con la interfaz 'Prenda'
      setAdmin(response.data);
    } catch (error) {
      console.error('Error al obtener los detalles de la prenda', error);
    }
  };

  const ListaTaller = async()=>{
    try {
      const response=await axiosInstance.get('getTaller')
      setTaller(response.data)
    } catch (error) {
      console.error('error', error)
    }
  }

  const ListaPrendasConfirmacion = async () => {
    if (!selectInforme || !selectInforme.idProduccion) {
      console.warn("selectInforme o idProduccion no está definido.");
      return;
    }

    try {
      const response = await axiosInstance.get(`getInforme/${selectInforme.idProduccion}/${selectInforme.area}`);
      setPrendasConf(response.data);
    } catch (error) {
      console.error('Error al obtener el informe:', error);
    }
  };

  const ListaPrendasModelo = async () => {
    if (!selectInforme || !selectInforme.idProduccion) {
      console.warn("selectInforme o idProduccion no está definido.");
      return;
    }

    try {
      const response = await axiosInstance.get(`getInforme/${selectInforme.idProduccion}/${selectInforme.area}`);
      setPrendasConf(response.data);
    } catch (error) {
      console.error('Error al obtener el informe:', error);
    }
  };

  const ListaTallas = async()=>{
    try {
      const response=await axiosInstance.get('getTallas')
      setTalla(response.data)
    } catch (error) {
      console.error('error', error)
    }
  }

  const ListaPrenda = async()=>{
    try {
      const response=await axiosInstance.get('getPrenda')
      setPrenda(response.data)
    } catch (error) {
      console.error('error', error)
    }
  }

  const ListaModelo = async()=>{
    try {
      const response=await axiosInstance.get('getModelo')
      setModelo(response.data)
    } catch (error) {
      console.error('error', error)
    }
  }

  const me = async () => {
    const storedIdUsuario = localStorage.getItem("idUsuario");
    try {
      const response = await axiosInstance.get(`me/${storedIdUsuario}`);
      setUsuario(response.data);
    } catch (error) {
      console.error('Error en me():', error);
    }
  };


  const ListaRutas = async()=>{
    try {
      const response=await axiosInstance.get('getRutas')
      setRutas(response.data)
    } catch (error) {
      console.error('error', error)
    }
  }

  const ListaRoles = async()=>{
    try {
      const response=await axiosInstance.get('getRoles')
      setRoles(response.data)
    } catch (error) {
      console.error('error', error)
    }
  }

  const ListaPedidos = async()=>{
    try {
      const response=await axiosInstance.get('getPedidos')
      setPedidos(response.data)
    } catch (error) {
      console.error('error', error)
    }
  }

  const ListaPedidosId = async()=>{
    try {
      const response=await axiosInstance.get(`getPedidos/${selectPedidos.id}`)
      setInformePedidos(response.data)
    } catch (error) {
      console.error('error', error)
    }
  }

  const ListaEvidencia = async()=>{
    try {
      const response=await axiosInstance.get(`getEvidencia/${selectEvi.id}`)
      setEvidencia(response.data)
    } catch (error) {
      console.error('error', error)
    }
  }

  const ListaPersonal = async()=>{
    try {
      const response=await axiosInstance.get('getPersonal')
      setPersonal(response.data)
    } catch (error) {
      console.error('error', error)
    }
  }

  const ListaProduccion = async()=>{
    try {
      const response=await axiosInstance.get('getDetalleProduccion')
      setProduccion(response.data)
    } catch (error) {
      console.error('error', error)
    }
  }

  const ListaPreventa = async()=>{
    try {
      const response=await axiosInstance.get('getSobreventa')
      setPreventa(response.data)
    } catch (error) {
      console.error('error', error)
    }
  }

  const ListaAsistencia = async()=>{
    try {
      const response=await axiosInstance.get('getAsistencia')
      setAsistencia(response.data)
    } catch (error) {
      console.error('error', error)
    }
  }

  const ListaPlantillas = async()=>{
    try {
      const response=await axiosInstance.get('getPlantillas')
      setPlantillas(response.data)
    } catch (error) {
      console.error('error', error)
    }
  }

  const ListaPaquetes = async()=>{
    try {
      const response=await axiosInstance.get('getPaquetes')
      setPaquetes(response.data)
    } catch (error) {
      console.error('error', error)
    }
  }

  const ListaGestion = async()=>{
    try {
      const response=await axiosInstance.get('getGestion')
      setGestion(response.data)
    } catch (error) {
      console.error('error', error)
    }
  }

  const ListaActividades = async()=>{
    try {
      const response=await axiosInstance.get('getActividades')
      setActividad(response.data)
    } catch (error) {
      console.error('error', error)
    }
  }

  const ListaColumnas = async()=>{
    try {
      const response=await axiosInstance.get('getColumnas')
      setColumnas(response.data)
    } catch (error) {
      console.error('error', error)
    }
  }
  
  const ListaProyectos = async()=>{
    try {
      const response=await axiosInstance.get('getProyectos')
      setProyectos(response.data)
    } catch (error) {
      console.error('error', error)
    }
  }

  const [eventos,setEventos]=useState([])
  const ListaEventos = async()=>{
    try {
      const response=await axiosInstance.get('getEventos')
      setEventos(response.data)
    } catch (error) {
      console.error('error', error)
    }
  }

  const [eventoCode,setEventoCode]=useState([])
  const [selectEventCode,setSelectEventCode]=useState(null)

  const ListaEventoCode = async()=>{
    try {
      const response=await axiosInstance.get(`getEventoCode/${selectEventCode}`)
      setEventoCode(response.data[0])
    } catch (error) {
      console.error('error', error)
    }
  }
  const [campoCode,setCampoCode]=useState([])
  const ListaCampoCode = async()=>{
    try {
      const response=await axiosInstance.get(`getCampos/${selectEventCode}`)
      setCampoCode(response.data)
    } catch (error) {
      console.error('error', error)
    }
  }
  
  const [participantesCode,setparticipantesCode]=useState([])
  const ListaParticipante = async()=>{
    try {
      const response=await axiosInstance.get(`getParticipantes/${selectEventCode}`)
      setparticipantesCode(response.data)
    } catch (error) {
      console.error('error', error)
    }
  }

  const [Code,setCode]=useState([])
  const ListaEventoCodigos = async()=>{
    try {
      const response=await axiosInstance.get(`getEventoCodigo/${selectEventCode}`)
      setCode(response.data)
    } catch (error) {
      console.error('error', error)
    }
  }
  
  const [codigo,setCodigo]=useState([])
  const [selectCode,setSelectCode]=useState(null)

  const ListaProyectosCodigo = async()=>{
    try {
      const response=await axiosInstance.get(`getProyectosCodigo/${selectCode}`)
      setCodigo(response.data)
    } catch (error) {
      console.error('error', error)
    }
  }
  const [codigoAct,setCodigoAct]=useState([])

  const ListaActividadCodigo = async()=>{
    try {
      const response=await axiosInstance.get(`getActividadCodigo/${selectCode}`)
      setCodigoAct(response.data)
    } catch (error) {
      console.error('error', error)
    }
  }

  const ListaAsistenciaId = async()=>{
    try {
      const response=await axiosInstance.get(`getAsistencia/general/${usuario?.datosUsuario?.id}`)
      setAsistenciaPers(response.data)
    } catch (error) {
      console.error('error', error)
    }
  }

  const ListaConfiguraciones = async()=>{
    try {
      const response=await axiosInstance.get(`getConfiguraciones/${usuario?.datosUsuario?.id}`)
      setConfig(response.data)
    } catch (error) {
      console.error('error', error)
    }
  }

  const ListaNotificiaciones = async()=>{
    try {
      const response=await axiosInstance.get(`getNotificaciones/${usuario?.datosUsuario?.id}`)
      setnotif(response.data)
    } catch (error) {
      console.error('error', error)
    }
  }

  const ListaAsistenciaDash = async()=>{
    try {
      const response=await axiosInstance.get(`getAsistencia/dashboard/${usuario?.datosUsuario?.id}`)
      setDashAsist(response.data)
    } catch (error) {
      console.error('error', error)
    }
  }

  const ListaDetallePrestamo = async()=>{
      try {
      const response=await axiosInstance.get(`getDetallePrestamo/${selectDetalle}`)
      setDetalle(response.data)
      } catch (error) {
      console.error('error', error)
      }
  }

  const ProcesarVencimientos = async()=>{
      try {
        await axiosInstance.get(`procesarVencimientos/${user?.idUser}`)
      } catch (error) {
        console.error('error', error)
      }
  }

  const ListaModeloPrendas = async () => {
  if (selectProd && selectProd.id) {  // Verificamos si selectProd no es null y tiene un id
      try {
        const response = await axiosInstance.get(`getPrenda/${selectProd.id}`);
        setModeloPred(response.data);
      } catch (error) {
        console.error("Error al obtener las prendas del modelo:", error);
      }
    } else {
      console.log("selectProd es null o no tiene un id válido.");
    }
  };

  const [token, setToken] = useState<string | null>(null)
  
  useEffect(() => {
    if (token && selectPrenda) {
      ListaPrendaDetalle();
    }
  }, [token, selectPrenda]);

  useEffect(()=>{
    if(token && selectDetalle){
      ListaDetallePrestamo()
    }
  },[token,selectDetalle])

  useEffect(() => {
    if (token && selectInforme?.idProduccion) {
      ListaPrendasConfirmacion();
    }
  }, [token, selectInforme]);

  useEffect(() => {
    if (token && selectDetallePrenda) {
      ListaDetallePrenda();
      ListaDetallesInforme();
    }
  }, [token, selectDetallePrenda]);

  useEffect(() => {
    if (token && selectPedidos) {
      ListaPedidosId();
    }
  }, [token, selectPedidos]);

  useEffect(() => {
    if (token && selectEventCode) {
      ListaEventoCode();
      ListaCampoCode();
      ListaParticipante();
      ListaEventoCodigos();
    }
  }, [token, selectEventCode]);

  useEffect(() => {
    if (token && selectAdmin) {
      ListaMovimientos();
    }
  }, [token, selectAdmin]);

  useEffect(() => {
    if (token && selectProd) {
      ListaModeloPrendas();
    }
  }, [token, selectProd]);

  useEffect(()=>{
    if (token && selectCode) {
      ListaProyectosCodigo();
      ListaActividadCodigo();
    }
  },[token,selectCode]);
  
  useEffect(()=>{
    if (token && selectEvi) {
      ListaEvidencia();
    }
  },[token,selectEvi]);

  useEffect(() => {
    if (token) {
      Listacolor();
      ListaTallas();
      ListaPrenda();
      ListaModelo();
      ListaTaller();
      Listamaterial();
      ListaRutas();
      ListaRoles();
      ListaPaquetes();
      ListaPersonal();
      ListaProduccion();
      ListaPedidos();
      ListaColumnas();
      ListaClientes();
      ListaPreventa();
      ListaAsistenciaDash();
      ListaAsistencia();
      ListaPlantillas();
      ListaProyectos();
      ListaEventos();
      ListaGestion();
      ListaActividades();
      me();
    }
  }, [token]);

  

  useEffect(() => {
    if (usuario?.datosUsuario?.id) {
      ListaAsistenciaId();
      ListaAsistenciaDash();
      ListaConfiguraciones();
      ListaNotificiaciones();
      ProcesarVencimientos();
    }
  }, [usuario]);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    setShowWelcome(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('idUsuario');
    router.push('/');
  };
  
  const login = async () => {
    if (datos.usuario === '' || datos.contraseña === '') {
      setErrorMessage('Por favor ingrese su correo y contraseña.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/login', datos);

      if (!response.data || !response.data.access_token) {
        setErrorMessage("No se recibió un token válido.");
        return;
      }

      setToken(response.data.access_token);

      localStorage.setItem("authToken", response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      localStorage.setItem('idUsuario', response.data?.id);

      setErrorMessage(null);

      // Mostrar mensaje de bienvenida
      setShowWelcome(true);

      // Esperar 2 segundos antes de redirigir
      setTimeout(() => {
        setShowWelcome(false);
        router.push("/Principal");
      }, 5000);

      setDatos({ usuario: "", contraseña: "" });

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setErrorMessage("Datos incorrectos, por favor intente de nuevo.");
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        usuario,
        theme,
        setTheme,
        listProductos,
        handleChange,
        handleSelect,
        errorMessage,
        datos,
        login,
        handleLogout,
        setDatos,
        color,
        talla,
        prenda,
        modelo,
        produccion,
        visible,
        setVisible,
        selectProd,
        setSelectProd,
        selectPrenda,
        modeloPred,
        material,
        ListaModelo,
        rutas,
        ListaRoles,
        roles,
        personal,
        ListaPersonal,
        taller,
        ListaTaller,
        setSelectPrenda,
        ListaProduccion,
        prendaDetalle,
        detallePrenda,
        prendasConf,
        setSelectDetallePrenda,
        setSelectInforme,
        selectInforme,
        setPrendasConf,
        ListaPrendasConfirmacion,
        ListaDetallesInforme,
        detalleInforme,
        ListaPrenda,
        Listacolor,
        Listamaterial,
        ListaClientes,
        clientes,
        pedidos,
        plantillas,
        setSelectPedidos,
        setSelectAdmin,
        detalle,
        setSelectDetalle,
        admin,
        informePedidos,
        ListaPedidos,
        preVenta,
        asistencia,
        paquetes,
        asistenciaPers,
        gestion,
        ListaAsistencia,
        ListaAsistenciaId,
        dashAsist,
        ListaAsistenciaDash,
        ListaConfiguraciones,
        ListaNotificiaciones,
        ListaPlantillas,
        ListaMovimientos,
        ListaDetallePrestamo,
        ListaCampoCode,
        ListaGestion,
        loadingRoute, 
        evidencia,
        setSelectEvi,
        setLoadingRoute,
        actividad, 
        ListaActividades,
        ListaEvidencia,
        proyectos,
        ListaProyectos,
        codigo,
        setSelectCode,
        ListaProyectosCodigo,
        ListaEventos,
        eventoCode,
        setSelectEventCode,
        ListaEventoCodigos,
        ListaParticipante,
        Code,
        eventos,
        participantesCode,
        campoCode,
        columnas,
        codigoAct,
        config,
        notif,
        showWelcome,
        me
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext debe usarse dentro de un AppProvider");
  }
  return context;
};
