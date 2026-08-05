'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import userImage from '../Imagen/producto.jpg';
import { Divider } from 'primereact/divider';
import { useAppContext } from '../Provider/AppContext';
import { Button } from 'primereact/button';

interface Ruta {
  ruta: string;
  icono: string;
  nombre: string;
}

const Sidebar = () => {
  const pathname = usePathname();
  const { user, loadingRoute, setLoadingRoute, setSidebarOpen} = useAppContext();
  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth >= 768) {
            setSidebarOpen(true);
        } else {
            setSidebarOpen(false);
        }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Estado del menú hamburguesa
  const [menuOpen, setMenuOpen] = useState(false);

  const opcionesExtras = [
    {
      ruta: '/Principal/Page/AdminEventos',
      icono: 'pi pi-box',
      nombre: 'Eventos',
    },
    {
      ruta: '/Principal/Configuraciones',
      icono: 'pi pi-cog',
      nombre: 'Configuraciones',
    },
    {
      ruta: '/Principal/Perfil',
      icono: 'pi pi-user',
      nombre: 'Perfil',
    },
  ];

  const LinkSidebar = ({ ruta, icono, nombre }: Ruta) => (
    <Link
      href={ruta}
      onClick={() => {
        if (pathname !== ruta) {
          setLoadingRoute(true);
        }

        // Cerrar menú en móvil
        setMenuOpen(false);
      }}
      className={`flex items-center text-white space-x-3 p-2 rounded-lg text-[1.2rem] cursor-pointer transition duration-200 no-underline ${
        pathname === ruta ? 'bg-[#BACD00]' : 'hover:bg-[#1E3A5F]'
      } ${loadingRoute ? 'pointer-events-none opacity-60' : ''}`}
    >
      <i className={`${icono} text-[1.2rem]`} />
      <span>{nombre}</span>
    </Link>
  );

  return (
    <>
      {/* Botón hamburguesa (solo móvil) */}
      {!menuOpen && (
        <Button
          onClick={() => setMenuOpen(true)}
          className="fixed top-4 left-4 z-[60] md:hidden"
          rounded
          text
        >
          <i className="pi pi-bars text-2xl"></i>
        </Button>
      )}

      {/* Fondo oscuro */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`hidden md:flex w-64 h-screen flex-col p-4 ${
          user?.estadoModo === '1'
            ? 'bg-[#4F9CD7]'
            : 'bg-[#0B1F3A]'
        } text-white`}
      >
        {/* Logo */}
        <Image
          src="https://yt3.googleusercontent.com/YffPeaLZABPiuvpMw53nEgdQZc69b3r_4cljcsHHprFgoIPlHzwLKiiID-sP_djaxlFmO-QM=s900-c-k-c0x00ffffff-no-rj"
          alt="Logo Ellafit"
          width={120}
          height={100}
          className="mx-auto mb-2 rounded-full object-cover border-2 border-white"
        />

        <Divider />

        {/* Opciones */}
        <div className="flex-1 overflow-y-auto flex flex-col items-center">
          <ul className="w-full px-2">
            {opcionesExtras.map((item, idx) => (
              <li key={idx} className="mb-2">
                <LinkSidebar {...item} />
              </li>
            ))}
          </ul>
        </div>

        {/* Usuario */}
        <div
          className={`mt-4 flex flex-col items-center justify-center rounded-lg p-3 ${
            user?.estadoModo === '1'
              ? 'bg-[#afcade]'
              : 'bg-[#123A63]'
          }`}
        >
          <Image
            src={
              user?.fotoPerfil
                ? `${process.env.NEXT_PUBLIC_LOCALHOST}uploads/${user.fotoPerfil}`
                : userImage
            }
            alt="user"
            width={55}
            height={55}
            className="mx-auto mb-2 rounded-full"
          />

          <span className="font-medium text-center">
            {user?.nombres}
          </span>

          {user?.correo ? (
            <span className="text-sm text-center">
              {user?.correo}
            </span>
          ) : (
            <span className="text-sm italic opacity-70 mt-1">
              sin correo
            </span>
          )}
        </div>
      </div>
      {menuOpen && (
        <div
          className={`fixed top-0 left-0 w-64 h-screen z-50 p-4 shadow-2xl animate-slide flex flex-col ${
            user?.estadoModo === '1'
              ? 'bg-[#4F9CD7]'
              : 'bg-[#0B1F3A]'
          } text-white`}
        >
          {/* Botón cerrar */}
          <div className="flex justify-end mb-3">
            <Button 
              onClick={() => setMenuOpen(false)}
              className='bg-transparent border-transparent'
            >
              <i className="pi pi-times text-2xl"></i>
            </Button>
          </div>
          <div className='flex justify-center'>
            {/* Logo */}
            <Image
              src="https://yt3.googleusercontent.com/YffPeaLZABPiuvpMw53nEgdQZc69b3r_4cljcsHHprFgoIPlHzwLKiiID-sP_djaxlFmO-QM=s900-c-k-c0x00ffffff-no-rj"
              alt="Logo Ellafit"
              width={120}
              height={100}
              className="mx-auto mb-2"
            />
          </div>

        <Divider />

        {/* Opciones */}
        <div className="flex-1 overflow-y-auto">
          <ul className="w-full px-2">
            {opcionesExtras.map((item, idx) => (
              <li key={idx} className="mb-2">
                <LinkSidebar {...item} />
              </li>
            ))}
          </ul>
        </div>

        {/* Usuario */}
        <div
          className={`mt-auto flex flex-col items-center justify-center rounded-lg p-3 ${
            user?.estadoModo === '1'
              ? 'bg-[#afcade]'
              : 'bg-[#123A63]'
          }`}
        >
          <Image
            src={
              user?.fotoPerfil
                ? `${process.env.NEXT_PUBLIC_LOCALHOST}uploads/${user.fotoPerfil}`
                : userImage
            }
            alt="user"
            width={55}
            height={55}
            className="rounded-full mb-2"
          />

          <span className="font-medium text-center">
            {user?.nombres}
          </span>

          {user?.correo ? (
            <span className="text-sm text-center">
              {user?.correo}
            </span>
          ) : (
            <span className="text-sm italic opacity-70 mt-1">
              sin correo
            </span>
          )}
        </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;