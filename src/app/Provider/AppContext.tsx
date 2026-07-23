"use client"; // Necesario para usar hooks en App Router

import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "../Herramientas/axiosToken";
import axios from "axios";

interface Datos {
  usuario: string;
  contraseña: string;
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
  usuario:string | null;
  config:any;
  showWelcome:boolean;
  setVisible: (v: boolean) => void;
  ListaConfiguraciones:()=>Promise<void>;
  me:()=>Promise<void>;
  setConfig:()=>void;
  loadingRoute:boolean;
  setLoadingRoute: (v: boolean) => void;
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [datos, setDatos] = useState<Datos>({ usuario: "", contraseña: "" });
  const [config,setConfig]=useState([])
  const [usuario, setUsuario] = useState<string| null>(null);
  const [visible,setVisible]=useState(false)
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

  const ListaConfiguraciones = async()=>{
    try {
      const response=await axiosInstance.get(`getConfiguraciones/${user?.id}`)
      setConfig(response.data)
    } catch (error) {
      console.error('error', error)
    }
  }

  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    if (token && selectEventCode) {
      ListaEventoCode();
      ListaCampoCode();
      ListaParticipante();
      ListaEventoCodigos();
    }
  }, [token, selectEventCode]);

  useEffect(() => {
    if (token) {
      ListaEventos();
      me();
    }
  }, [token]);

  

  useEffect(() => {
    if (usuario?.datosUsuario?.id) {
      ListaConfiguraciones();
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
        handleChange,
        handleSelect,
        errorMessage,
        datos,
        login,
        handleLogout,
        setDatos,
        visible,
        setVisible,
        ListaConfiguraciones,
        ListaCampoCode,
        loadingRoute,
        setLoadingRoute,
        ListaEventos,
        eventoCode,
        setSelectEventCode,
        ListaEventoCodigos,
        ListaParticipante,
        Code,
        eventos,
        participantesCode,
        campoCode,
        config,
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
