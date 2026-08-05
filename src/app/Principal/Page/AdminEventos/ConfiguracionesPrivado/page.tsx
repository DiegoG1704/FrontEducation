'use client';

import { useAppContext } from '@/app/Provider/AppContext'
import React, { useRef} from 'react'

import { Toast } from 'primereact/toast'
import Configuracion from '../Configuraciones/page';
import LinkEmpresa from '../Components/LinkEmpresa';
import GenerateCode from '../Components/GenerateCode';

export default function EventoPrivado() {

    const { user, eventoCode } = useAppContext()
    
    const toast = useRef<Toast>(null)

    const isDark = user?.estadoModo !== "1"

    return (

        <div
            className={`min-h-screen p-8 transition-all ${
                isDark
                ? "bg-[#0F172A] text-white"
                : "bg-gray-100 text-gray-900"
            }`}
        >

            <Toast ref={toast}/>


            {/* HEADER */}

            <div className="mb-8">

                <h1 className="text-4xl font-bold text-cyan-500">
                    Evento privado
                </h1>

                <p
                    className={`mt-2 ${
                        isDark
                        ?"text-gray-400"
                        :"text-gray-600"
                    }`}
                >
                    Gestión de códigos de acceso
                    {eventoCode?.codigo &&
                        ` - ${eventoCode.codigo}`
                    }
                </p>

            </div>

            <div className='my-5'>
                <Configuracion/>
            </div>
            <div className='my-5'>
                <LinkEmpresa/>
            </div>

            <GenerateCode/>

        </div>

    )
}