'use client'

import { useAppContext } from '@/app/Provider/AppContext'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import React, { useState } from 'react'
import DialogCrearEvento from './Components/DialogAgregar'
import CardEventos from './Components/cardWorkspaces'

export default function AdminEventos() {
    const { user, ListaEventos } = useAppContext()
    const [visible,setVisible]=useState(false)
    const isDark = user?.estadoModo !== "1"

    return (
        <div
            className={`min-h-screen p-8 ${
                isDark
                    ? "bg-[#0F172A] text-white"
                    : "bg-gray-100 text-gray-900"
            }`}
        >
            {/* Header */}

            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">

                <div>

                    <h1 className="text-4xl font-bold text-cyan-500">
                        Espacios de eventos
                    </h1>

                    <p
                        className={`mt-2 ${
                            isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                    >
                        Administra los espacios donde se organizarán las
                        actividades de los empleados.
                    </p>

                </div>

                {/* <Button
                    label="Nuevo Espacio"
                    icon="pi pi-plus"
                    rounded
                    size="large"
                /> */}

            </div>
            <div className='flex justify-end my-2'>
                <Button
                    icon='pi pi-refresh'
                    label='Recargar Proyectos'
                    outlined
                    onClick={ListaEventos}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            
                <CardEventos/>

                {/* Nueva Card */}

                <Card
                    className={`border-2 border-dashed border-cyan-400 shadow-none flex items-center 
                    justify-center min-h-[360px] hover:bg-[#123A63] hover:shadow-xl cursor-pointer 
                    transition-all duration-300 ${isDark ? "bg-[#0F172A] text-white" : ""}`}
                    onClick={()=>setVisible(true)}
                >
                    
                    <div className="flex flex-col items-center text-center">
                        
                        <Button
                            icon="pi pi-plus"
                            rounded
                            text
                            severity="info"
                            style={{
                                width: "70px",
                                height: "70px",
                                fontSize: "1.8rem"
                            }}
                        />

                        <h2 className="text-2xl font-bold mt-4">
                            Crear Evento
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Agrega un nuevo evento
                        </p>

                    </div>
                </Card>

            </div>
            <DialogCrearEvento Open={visible} Close={()=>setVisible(false)} />
        </div>
  )
}
