'use client'

import { useAppContext } from '@/app/Provider/AppContext';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';

import {
    ShoppingCart,
    PackageCheck,
    Sparkles,
    Factory,
    Users,
    Globe,
    ChevronRight
} from 'lucide-react';
import DialogCompra from './Components/DialogShop';

export default function Page() {

    const { user, rutas, paquetes } = useAppContext();
    const router = useRouter();
    const iconos:any = {
        PackageCheck: <PackageCheck size={22} />,
        ShoppingCart: <ShoppingCart size={22} />,
        Sparkles:<Sparkles size={22} />,
        Factory: <Factory size={22} />,
        Users: <Users size={22} />,
        Globe: <Globe size={22} />
    };
    const[visible,setVisible]=useState(false)
    const[select,setSelect]=useState<any[]>([])
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

                    {paquetes.map((paquete:any) => (

                        <div
                            key={paquete.id}
                            className={`
                                rounded-[30px]
                                overflow-hidden
                                border
                                transition-all
                                duration-300
                                hover:-translate-y-2
                                hover:shadow-2xl
                                group
                                ${
                                    isDark
                                        ? "bg-[#0F172A] border-[#1E293B]"
                                        : "bg-white border-gray-200"
                                }
                            `}
                        >

                            {/* HEADER */}

                            <div className={`bg-gradient-to-r ${paquete.color} p-8 text-white`}>

                                <div className="flex items-center justify-between">

                                    <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                                        {iconos[paquete.icono]}
                                    </div>

                                    <Tag
                                        value="POPULAR"
                                        severity="warning"
                                    />

                                </div>

                                <h2 className="text-[30px] font-bold mt-7">
                                    {paquete.nombre}
                                </h2>

                                <div className="mt-5 flex items-end gap-2">

                                    <span className="text-[45px] font-extrabold">
                                        ${paquete.precio}
                                    </span>

                                    <span className="pb-2 opacity-80">
                                        pago único
                                    </span>

                                </div>

                            </div>

                            {/* BODY */}

                            <div className="px-8 pb-8">

                                <p
                                    className={`leading-8 min-h-[80px] ${
                                        isDark
                                            ? "text-gray-300"
                                            : "text-gray-600"
                                    }`}
                                >
                                    {paquete.descripcion}
                                </p>

                                <Divider />

                                <div className="flex flex-wrap gap-2">

                                    {paquete.modulos.map((modulo:any) => (

                                        <Tag
                                            key={modulo.id}
                                            value={modulo.nombre}
                                            rounded
                                            severity="info"
                                        />

                                    ))}

                                </div>

                                <div className="flex flex-col gap-3 mt-8">

                                    <Button
                                        label="Ver detalles"
                                        icon="pi pi-arrow-right"
                                        outlined
                                        rounded
                                        className="w-full"
                                    />

                                    <Button
                                        label="Comprar paquete"
                                        icon="pi pi-shopping-cart"
                                        rounded
                                        className="w-full"
                                        onClick={()=>{
                                            setSelect(paquete);
                                            setVisible(true);
                                        }}
                                    />

                                </div>

                            </div>

                        </div>

                    ))}

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

                    {rutas?.map((modulo: any) => (

                        <div
                            key={modulo.id}
                            className={`
                                rounded-[28px]
                                p-7
                                border
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:shadow-2xl
                                flex
                                flex-col
                                justify-between
                                group
                                ${
                                    isDark
                                        ? "bg-[#0F172A] border-[#1E293B]"
                                        : "bg-white border-gray-200"
                                }
                            `}
                        >

                            <div>

                                {/* HEADER */}

                                <div className="flex items-start justify-between">

                                    <div
                                        className={`
                                            w-[65px]
                                            h-[65px]
                                            rounded-2xl
                                            flex
                                            items-center
                                            justify-center
                                            text-[28px]
                                            ${
                                                isDark
                                                    ? "bg-[#111827] text-[#4F9CD7]"
                                                    : "bg-blue-100 text-blue-600"
                                            }
                                        `}
                                    >
                                        <i className={`${modulo.icono} text-[25px]`}></i>
                                    </div>

                                    <Tag
                                        value="Disponible"
                                        severity="success"
                                        rounded
                                    />

                                </div>

                                {/* TITULO */}

                                <h3 className="text-[24px] font-bold mt-6">
                                    {modulo.nombre}
                                </h3>

                                {/* DESCRIPCION */}

                                <p
                                    className={`mt-4 leading-8 min-h-[110px] ${
                                        isDark
                                            ? "text-gray-300"
                                            : "text-gray-600"
                                    }`}
                                >
                                    {modulo.descripcion}
                                </p>

                            </div>

                            {/* FOOTER */}

                            <div className="mt-8">

                                <div className="flex items-center justify-between mb-5">

                                    <div>
                                        <span className="text-[30px] font-extrabold text-[#4F9CD7]">
                                            ${modulo.precio}.99
                                        </span>

                                        <span
                                            className={`ml-2 text-sm ${
                                                isDark
                                                    ? "text-gray-400"
                                                    : "text-gray-500"
                                            }`}
                                        >
                                            licencia
                                        </span>
                                    </div>

                                    <ChevronRight
                                        size={20}
                                        className="text-[#4F9CD7]"
                                    />

                                </div>

                                <div className="flex gap-3">

                                    <Button
                                        label="Información"
                                        outlined
                                        rounded
                                        className="w-full"
                                        // onClick={() => router.push(modulo.ruta)}
                                    />

                                    <Button
                                        label="Comprar"
                                        icon="pi pi-shopping-cart"
                                        rounded
                                        className="w-full"
                                        onClick={()=>{
                                            setSelect(modulo);
                                            setVisible(true);
                                        }}
                                    />

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </section>
            <DialogCompra Open={visible} Close={()=>setVisible(false)} Datos={select}/>
        </div>

    )
}