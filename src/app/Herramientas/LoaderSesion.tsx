'use client'

import React from 'react'

export default function LoaderSesion() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/70 backdrop-blur-md">

    {/* Glow */}
    <div className="absolute w-[450px] h-[450px] rounded-full bg-cyan-500/20 blur-[120px]" />

    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl px-14 py-12 shadow-2xl">

        {/* Logo */}
        <div className="relative mx-auto mb-8 h-28 w-28">

            {/* Anillo */}
            <div className="absolute inset-0 rounded-full border-[3px] border-cyan-400/20"></div>

            <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-cyan-400 animate-spin"></div>

            {/* Centro */}
            <div className="absolute inset-4 flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-xl">

                <i className="pi pi-box text-white text-4xl"></i>

            </div>

        </div>

        <h2 className="text-center text-4xl font-bold text-white">
            SyncERP
        </h2>

        <p className="mt-2 text-center text-cyan-300">
            Sistema de Gestión Empresarial
        </p>

        <p className="mt-8 text-center text-gray-300">
            Iniciando sesión...
        </p>

        {/* Barra */}
        <div className="mt-6 h-2 w-80 overflow-hidden rounded-full bg-white/10">

            <div className="relative h-full w-1/2 bg-cyan-400">

                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/70 to-transparent"></div>

            </div>

        </div>

        <p className="mt-5 text-center text-sm text-gray-400">
            Preparando tu espacio de trabajo...
        </p>

    </div>

</div>
  )
}
