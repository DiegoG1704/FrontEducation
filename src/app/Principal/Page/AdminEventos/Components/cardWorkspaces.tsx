import { useAppContext } from '@/app/Provider/AppContext'
import Link from 'next/link'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Divider } from 'primereact/divider'
import { Tag } from 'primereact/tag'
import React from 'react'

export default function CardEventos() {
    const {user,eventos,setSelectEventCode}=useAppContext()
    const isDark = user?.estadoModo !== "1"
  return (
    <>
        {eventos.map((workspace) => (
            <Card
                key={workspace.id}
                className={`
                    shadow-4 border-round-2xl border
                    transition-all duration-300
                    hover:shadow-8 hover:scale-[1.02]
                    ${
                        isDark
                            ? "bg-[#1E293B] text-white border-[#334155]"
                            : "bg-white text-gray-900 border-gray-200"
                    }
                `}
            >
                <div className="flex justify-between items-start">

                    <div>

                        <span className="text-cyan-500 font-semibold">
                            {workspace.codigo}
                        </span>

                        <h2 className="text-2xl font-bold mt-2">
                            {workspace.nombre}
                        </h2>

                    </div>

                    <Tag
                        severity={
                            workspace.tipo === "1"
                            ? "success"
                            : workspace.tipo === "2"
                            ? "info"
                            : "warning"
                        }
                        value={
                            workspace.tipo === '1'
                            ? 'Pubico'
                            : workspace.tipo === '2'
                            ? 'Privado'
                            : ''
                        }
                    />

                </div>

                <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                    {workspace.descripcion}
                </p>

                <Divider className={isDark ? "border-gray-700" : ""} />

                {/* Acciones */}

                <div className="flex justify-end gap-3">
                    <Link href={`/Principal/Page/AdminEventos/Participantes?codigo=${workspace.codigo}`} className="no-underline">
                        <Button
                            icon="pi pi-eye"
                            rounded
                            outlined
                            severity="info"
                            tooltip="Ver"
                            onClick={()=>setSelectEventCode(workspace.codigo)}
                        />
                    </Link>
                    
                    <Link
                        href={
                            workspace.tipo === "2"
                                ? `/Principal/Page/AdminEventos/ConfiguracionesPrivado?codigo=${workspace.codigo}`
                                : `/Principal/Page/AdminEventos/ConfiguracionesPublico?codigo=${workspace.codigo}`
                        }
                        className="no-underline"
                    >
                        <Button
                            icon="pi pi-cog"
                            rounded
                            outlined
                            severity="help"
                            tooltip="Editar"
                            onClick={() => setSelectEventCode(workspace.codigo)}
                        />
                    </Link>
                    <Button
                            icon="pi pi-trash"
                            rounded
                            outlined
                            severity="danger"
                            tooltip="Eliminar"
                            onClick={()=>setSelectEventCode(workspace)}
                        />
                </div>
            </Card>
        ))}
    </>
  )
}
