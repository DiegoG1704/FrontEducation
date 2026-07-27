'use client';

import { useAppContext } from '@/app/Provider/AppContext'
import React, { useRef, useState } from 'react'

import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Tag } from 'primereact/tag'
import Configuracion from '../Configuraciones/page';
import axiosInstance from '@/app/Herramientas/axiosToken';
import LinkEmpresa from '../Components/LinkEmpresa';

export default function EventoPrivado() {

    const { user, eventoCode, Code ,ListaEventoCodigos } = useAppContext()
    
    const toast = useRef<Toast>(null)

    const isDark = user?.estadoModo !== "1"

    const [cantidad,setCantidad] = useState(10)

    const handleSubmit = async() =>{
        
        try {
             await axiosInstance.post(`PostGenerarCodigo/${eventoCode.id}`,{cantidad})
             ListaEventoCodigos()
        } catch (error) {
            console.log('error',error);
        }
    }


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
            

            {/* GENERADOR */}

            <div
                className={`
                    rounded-xl
                    border
                    p-6
                    mb-8
                    ${
                        isDark
                        ?
                        "bg-[#1E293B] border-[#334155]"
                        :
                        "bg-white border-gray-200"
                    }
                `}
            >

                <div className="flex justify-between items-center mb-5">

                    <h2 className="text-xl font-bold">
                        Generar códigos
                    </h2>

                </div>


                <div className="
                    flex
                    flex-col
                    md:flex-row
                    gap-4
                    items-end
                ">


                    <div>

                        <label className="block mb-2">
                            Cantidad
                        </label>


                        <InputNumber
                            value={cantidad}
                            onValueChange={(e)=>
                                setCantidad(e.value ?? 1)
                            }
                            showButtons
                            min={1}
                        />

                    </div>


                    <Button
                        label="Generar"
                        icon="pi pi-key"
                        onClick={handleSubmit}
                    />

                    <Button
                        label="Exportar"
                        icon="pi pi-download"
                        severity="help"
                    />


                </div>


            </div>




            {/* TABLA */}

            <div
                className={`
                    rounded-xl
                    border
                    p-6
                    ${
                        isDark
                        ?
                        "bg-[#1E293B] border-[#334155]"
                        :
                        "bg-white border-gray-200"
                    }
                `}
            >


                <div className="
                    flex
                    flex-col
                    md:flex-row
                    justify-between
                    gap-4
                    mb-5
                ">


                    <h2 className="text-xl font-bold">
                        Códigos generados
                    </h2>


                    <InputText
                        placeholder="Buscar código..."
                        className="md:w-80"
                    />


                </div>



                <DataTable
                    value={Code}
                    paginator
                    rows={5}
                    stripedRows
                >

                    <Column
                        field="codigo"
                        header="Código"
                    />


                    <Column
                        header="Estado"
                        body={(row)=>(
                            <Tag
                                value={row.estado}
                                severity={
                                    row.estado==="DISPONIBLE"
                                    ?
                                    "success"
                                    :
                                    row.estado==="USADO"
                                    ?
                                    "warning"
                                    :
                                    "danger"
                                }
                            />
                        )}
                    />




                    <Column
                        header="Acciones"
                        body={(row)=>(
                            <div className="flex gap-2">

                                <Button
                                    icon="pi pi-copy"
                                    rounded
                                    outlined
                                    onClick={async()=>{

                                        await navigator.clipboard.writeText(`http://localhost:3000/Formulario/Privado?evento=${eventoCode.codigo}&codigo=${row.codigo}`);

                                        toast.current?.show({
                                            severity:"success",
                                            summary:"Copiado",
                                            detail:`Código ${row.codigo} copiado`,
                                            life:2000
                                        });

                                    }}
                                />


                                <Button
                                    icon="pi pi-ban"
                                    rounded
                                    outlined
                                    severity="danger"
                                />

                            </div>
                        )}
                    />


                </DataTable>


            </div>



        </div>

    )
}