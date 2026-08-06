"use client"; // Necesario para usar hooks en App Router

import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "../Herramientas/axiosToken";
import axios from "axios";

interface Datos {
  usuario: string;
  contraseña: string;
}

export interface DatosUsuario {
  id?: number | string;
  idUser?: number | string;
  idRol?: number;
  nombres?: string;
  correo?: string;
  telefono?: string;
  dni?: string;
  rol?: string;
  estadoModo?: string;
  fotoPerfil?: string;
  imagenTaller?: string;
  nombreTaller?: string;
  ruc?: string;
  direccion?: string;
  rutas?: any[];
  [key: string]: any;
}

export interface Usuario {
  datosUsuario?: DatosUsuario;
  [key: string]: any;
}

interface AppContextType {
  user: any;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  datos: Datos;
  setDatos: (datos: Datos) => void;
  handleSelect: (field: "usuario" | "contraseña", value: string) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  login: () => void;
  handleLogout: () => void;
  errorMessage:string | null;
  usuario: Usuario | null;
  config:any;
  showWelcome:boolean;
  // ListaConfiguraciones:()=>Promise<void>;
  me:()=>Promise<void>;
  loadingRoute:boolean;
  setLoadingRoute: (v: boolean) => void;
  ListaEventos:()=>Promise<void>;
  eventos:any;
  eventoCode:any;
  setSelectEventCode: (value: any) => void;
  campoCode:any;
  ListaCampoCode:()=>Promise<void>;
  ListaParticipante:()=>Promise<void>;
  participantesCode:any;
  ListaEventoCodigos:()=>Promise<void>;
  Code:any;
  ListaEmpresa:()=>Promise<void>;
  empresa:any;
  sidebarOpen:boolean;
  setSidebarOpen: (value: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [datos, setDatos] = useState<Datos>({ usuario: "", contraseña: "" });
  const [config]=useState([])
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [loadingRoute, setLoadingRoute] = useState(false);

  const user = usuario?.datosUsuario;

  const router = useRouter();

  const handleSelect = (field: "usuario" | "contraseña", value: string) => {
    setDatos((prev) => ({ ...prev, [field]: value }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  };

  const me = async () => {
    const storedIdUsuario = localStorage.getItem("idUsuario");
    try {
      const response = await axiosInstance.get(`me/${storedIdUsuario}`);
      setUsuario(response.data);
    } catch (error) {
      console.error('Error en me():', error);
    }
  };

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
  const [selectEventCode,setSelectEventCode]=useState<any>(null)

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
      const response=await axiosInstance.get(`getCampos/${selectEventCode}/1,2`)
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

  const [empresa,setEmpresa]=useState([])
  const ListaEmpresa = async()=>{
    try {
      const response=await axiosInstance.get(`getEmpresa/${selectEventCode}`)
      setEmpresa(response.data)
    } catch (error) {
      console.error('error', error)
    }
  }

  // const [taller,setTaller]=useState([])
  // const ListaTaller = async()=>{
  //   try {
  //     const response=await axiosInstance.get('getTaller')
  //     setTaller(response.data)
  //   } catch (error) {
  //     console.error('error', error)
  //   }
  // }

  // const [rutas,setRutas]=useState([])
  // const ListaRutas = async()=>{
  //   try {
  //     const response=await axiosInstance.get('getRutas')
  //     setRutas(response.data)
  //   } catch (error) {
  //     console.error('error', error)
  //   }
  // }

  // const [paquetes,setPaquetes]=useState([])
  // const ListaPaquetes = async()=>{
  //   try {
  //     const response=await axiosInstance.get('getPaquetes')
  //     setPaquetes(response.data)
  //   } catch (error) {
  //     console.error('error', error)
  //   }
  // }

  // const [selectPrenda,setSelectPrenda]=useState<any>(null)
  // const ListaProduccion = async()=>{
  //   try {
  //     const response=await axiosInstance.get('getDetalleProduccion')
  //     setProduccion(response.data)
  //   } catch (error) {
  //     console.error('error', error)
  //   }
  // }
  // const [produccion,setProduccion]=useState([])

  // const ListaConfiguraciones = async()=>{
  //   try {
  //     const response=await axiosInstance.get(`getConfiguraciones/${user?.id}`)
  //     setConfig(response.data)
  //   } catch (error) {
  //     console.error('error', error)
  //   }
  // }

  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    if (token && selectEventCode) {
      ListaEventoCode();
      ListaCampoCode();
      ListaParticipante();
      ListaEventoCodigos();
      ListaEmpresa();
    }
  }, [token, selectEventCode]);

  useEffect(() => {
    if (token) {
      ListaEventos();
      // ListaTaller();
      // ListaRutas();
      // ListaPaquetes();
      // ListaProduccion();
      me();
    }
  }, [token]);

  

  useEffect(() => {
    if (usuario?.datosUsuario?.id) {
      // ListaConfiguraciones();
    }
  }, [usuario]);

  useEffect(() => {
    const storedIdUsuario = localStorage.getItem("idUsuario");
    if (storedIdUsuario) {
      setToken(storedIdUsuario);
    }
  }, []);

  const handleLogout = () => {
    setShowWelcome(false);
    setToken(null);
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
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_LOCALHOST}login`,
        datos,
        { withCredentials: true }
      );

      const idUsuario = response.data?.id;

      if (!response.data || !idUsuario) {
        setErrorMessage("No se recibió un identificador válido.");
        return;
      }

      setToken(String(idUsuario));
      localStorage.setItem('idUsuario', idUsuario);

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
        handleChange,
        handleSelect,
        errorMessage,
        datos,
        login,
        handleLogout,
        setDatos,
        // ListaConfiguraciones,
        ListaCampoCode,
        loadingRoute,
        setLoadingRoute,
        ListaEventos,
        eventoCode,
        setSelectEventCode,
        ListaEventoCodigos,
        ListaParticipante,
        ListaEmpresa,
        empresa,
        Code,
        eventos,
        participantesCode,
        campoCode,
        config,
        showWelcome,
        me,
        sidebarOpen,
        setSidebarOpen
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
