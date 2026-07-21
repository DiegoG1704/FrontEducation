'use client'

import { Sparkles, ArrowRight } from "lucide-react";
import { useAppContext } from "../Provider/AppContext";
import { Button } from "primereact/button";
import Link from "next/link";

export default function PageInicio() {
  const {user} = useAppContext()
  const isDark = user?.estadoModo !== "1"
  return (
    // <div
    //         className={`min-h-screen p-8 ${
    //             isDark
    //                 ? "bg-[#0F172A] text-white"
    //                 : "bg-gray-100 text-gray-900"
    //         }`}
    //     ></div>
    <div className={`flex min-h-screen items-center justify-center from-slate-900 via-slate-800 to-blue-900 px-6
    ${
        isDark
            ? "bg-[#0F172A] text-white"
            : "bg-gray-100 text-gray-900"
    }`}>
      <div className="max-w-3xl text-center">
        {/* Logo o ícono */}
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-white/10 backdrop-blur">
          <Sparkles className="h-12 w-12 text-cyan-400" />
        </div>

        {/* Título */}
        <h1 className="text-6xl font-extrabold tracking-wide text-white">
          SYNC<span className="text-cyan-400">ERP</span>
        </h1>

        {/* Subtítulo */}
        <p className="mt-6 text-xl text-gray-300">
          Bienvenido al sistema de gestión empresarial.
        </p>

        <p className="mx-auto mt-4 max-w-2xl text-gray-400 leading-relaxed">
          Centraliza la administración de tus procesos, optimiza la gestión de
          recursos y accede a toda la información de tu organización desde un
          solo lugar.
        </p>

        {/* Línea decorativa */}
        <div className="mx-auto mt-10 h-1 w-32 rounded-full bg-cyan-400" />

        {/* Botón */}
        <Link href={'/Principal/Page/AdminEventos'}>
          <Button className="mt-10 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-8 py-4 text-lg font-semibold text-white transition border-cyan-600 hover:bg-cyan-600"
          >
            Comenzar
            <ArrowRight size={20} />
          </Button>
        </Link>
        

        {/* Footer */}
        <p className="mt-16 text-sm text-gray-500">
          © {new Date().getFullYear()} SYNCERP · Plataforma de Gestión Empresarial
        </p>
      </div>
    </div>
  );
}
