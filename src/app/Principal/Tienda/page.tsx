'use client'

import { useAppContext } from '@/app/Provider/AppContext';
import React, { useState } from 'react';

import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';



import DialogCompra from './Components/DialogShop';

export default function Page() {

    const { user} = useAppContext();
    // const iconos:any = {
    //     PackageCheck: <PackageCheck size={22} />,
    //     ShoppingCart: <ShoppingCart size={22} />,
    //     Sparkles:<Sparkles size={22} />,
    //     Factory: <Factory size={22} />,
    //     Users: <Users size={22} />,
    //     Globe: <Globe size={22} />
    // };
    const[visible,setVisible]=useState(false)
    const[select]=useState<any>(null)
    const isDark = user?.estadoModo !== "1";

    return (

        <div
            className={`
                min-h-screen
                w-full
                p-8 lg:p-12
                transition-all
                duration-300
                overflow-y-auto
                ${
                    isDark
                        ? "bg-[#020817] text-white"
                        : "bg-[#F8FAFC] text-black"
                }
            `}
        >

            {/* HERO */}

            <div
                className={`
                    relative
                    overflow-hidden
                    rounded-[35px]
                    p-10
                    border
                    mb-14
                    ${
                        isDark
                            ? "bg-[#0F172A] border-[#1E293B]"
                            : "bg-white border-gray-200"
                    }
                `}
            >

                <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-blue-500/10 blur-3xl rounded-full"></div>

                <div className="relative z-10">

                    <Tag
                        value="Marketplace ERP"
                        severity="info"
                        className="mb-5"
                    />

                    <h1 className="text-[45px] font-extrabold leading-tight">
                        Tienda de <span className="text-[#4F9CD7]">Módulos</span>
                    </h1>

                    <p
                        className={`
                            mt-5
                            text-[18px]
                            max-w-[850px]
                            leading-8
                            ${
                                isDark
                                    ? "text-gray-300"
                                    : "text-gray-600"
                            }
                        `}
                    >
                        Explora módulos independientes y paquetes empresariales
                        diseñados para optimizar ventas, producción,
                        logística, clientes y administración de tu negocio.
                    </p>

                    <div className="flex gap-4 mt-8 flex-wrap">

                        <Button
                            label="Explorar paquetes"
                            icon="pi pi-box"
                            rounded
                            size="large"
                        />

                        <Button
                            label="Ver módulos"
                            icon="pi pi-th-large"
                            outlined
                            rounded
                            size="large"
                        />

                    </div>

                </div>

            </div>

            {/* ===================== */}
            {/* PAQUETES */}
            {/* ===================== */}

            <section>

                <div className="flex items-center justify-between mb-8">

                    <div>
                        <h2 className="text-[32px] font-bold">
                            Paquetes Recomendados
                        </h2>

                        <p
                            className={`mt-2 ${
                                isDark
                                    ? "text-gray-400"
                                    : "text-gray-500"
                            }`}
                        >
                            Soluciones listas para implementar.
                        </p>
                    </div>

                </div>

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">

               
                </div>

            </section>

            {/* ===================== */}
            {/* MODULOS */}
            {/* ===================== */}

            <section className="mt-20">

                <div className="mb-8">

                    <h2 className="text-[32px] font-bold">
                        Módulos Disponibles
                    </h2>

                    <p
                        className={`mt-2 ${
                            isDark
                                ? "text-gray-400"
                                : "text-gray-500"
                        }`}
                    >
                        Compra módulos individuales según las necesidades de tu empresa.
                    </p>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">


                </div>

            </section>
            <DialogCompra Open={visible} Close={()=>setVisible(false)} Datos={select}/>
        </div>

    )
}