'use client';


import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import axiosInstance from '@/app/Herramientas/axiosToken';

interface OpcionCampo {
    texto: string;
    valor: string;
    orden: number;
}

interface CampoFormulario {
    id: number;
    label: string;
    nombreInterno: string;
    tipo: string;
    required: boolean;
    placeholder: string;
    orden: number;
    opciones: OpcionCampo[];
}

export default function Register() {

    const searchParams = useSearchParams();

    const codigo = searchParams.get('codigo');
    const evento = searchParams.get('evento');
    const toast = useRef<Toast>(null);

    const router = useRouter();


    const [datos, setDatos] = useState<CampoFormulario[]>([]);
    const [respuestas, setRespuestas] = useState<Record<number, any>>({});
    const [nombres,setNombres]=useState('')
    const [apellidos,setApellidos]=useState('')
    const [dni,setdni]=useState('')
    const [correo,setCorreo]=useState('')

    const formulario = async() =>{
        try {
            const response = await axiosInstance.get(`getCamposPrivado/${codigo}`)
            setDatos(response.data)
        } catch (error) {
            console.log('error',error);
        }
    }

    useEffect(() => {
        if (codigo) {
            formulario();
        }
    }, [codigo]);

    const cambiarValor = (campoId: number, valor: any) => {
        setRespuestas(prev => ({
            ...prev,
            [campoId]: valor
        }));
    };

    const Registrar = async () => {
        try {

            const body = {
                estado:"Por Revisar",
                dni:dni,
                nombres:nombres,
                apellidos:apellidos,
                correo:correo,
                codigoEvento:evento,
                codigoRegistro: codigo,
                respuestas: Object.entries(respuestas).map(([campoId, valor]) => ({
                    campoId: Number(campoId),
                    valor: Array.isArray(valor)
                        ? valor.join(",") // Para checkbox
                        : valor instanceof Date
                            ? valor.toISOString() // Para fechas
                            : valor
                }))
            };

            console.log('body',body);
            
            const faltantes = datos.filter(campo => {
                if (!campo.required) return false;

                const valor = respuestas[campo.id];

                return (
                    valor === undefined ||
                    valor === null ||
                    valor === "" ||
                    (Array.isArray(valor) && valor.length === 0)
                );
            });

            if (faltantes.length > 0) {
                toast.current?.show({
                    severity: 'warn',
                    summary: 'Campo requerido',
                    detail: `Debe completar: ${faltantes[0].label}`,
                    life: 3000
                });

                return;
            }

             await axiosInstance.post(
                "/registrarParticipante",
                body
            );

            router.push(
                `/Formulario/CodigoQR`
            );

            toast.current?.show({
                severity: 'success',
                summary: 'Registro exitoso',
                detail: 'Tus datos fueron registrados correctamente',
                life: 3000
            });


        } catch (error: any) {

            console.error(error);

            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail:
                    error?.response?.data?.message ??
                    "Ocurrió un error al registrar",
                life: 4000
            });

        }
    };


    return (
        <div className="max-w-2xl mx-auto p-5">
            <Toast ref={toast} />
            <h2 className="text-2xl font-bold mb-5">
                Registro
            </h2>

            <div className='flex flex-col'>
                <label>DNI</label>
                <InputText
                    value={dni}
                    onChange={(e)=>setdni(e.target.value)}
                    placeholder='Ingresar dni...'
                />
            </div>
            <div className='flex flex-col'>
                <label>Nombres</label>
                <InputText
                    value={nombres}
                    onChange={(e)=>setNombres(e.target.value)}
                    placeholder='Ingresar nombres...'
                />
            </div>
            <div className='flex flex-col'>
                <label>Apellidos</label>
                <InputText
                    value={apellidos}
                    onChange={(e)=>setApellidos(e.target.value)}
                    placeholder='Ingresar apellidos...'
                />
            </div>
            <div className='flex flex-col'>
                <label>Correo</label>
                <InputText
                    value={correo}
                    onChange={(e)=>setCorreo(e.target.value)}
                    placeholder='Ingresar correo...'
                />
            </div>
            {datos.map((campo) => (

                <div key={campo.id} className="mb-4">

                    <label className="block mb-2 font-semibold">
                        {campo.label}
                        {campo.required && <span className="text-red-500"> *</span>}
                    </label>

                    {campo.tipo === "text" && (
                        <InputText
                            className="w-full"
                            placeholder={campo.placeholder}
                            value={respuestas[campo.id] || ""}
                            onChange={(e) =>
                                cambiarValor(campo.id, e.target.value)
                            }
                        />
                    )}

                    {campo.tipo === "email" && (
                        <InputText
                            className="w-full"
                            type="email"
                            placeholder={campo.placeholder}
                            value={respuestas[campo.id] || ""}
                            onChange={(e) =>
                                cambiarValor(campo.id, e.target.value)
                            }
                        />
                    )}

                    {campo.tipo === "number" && (
                        <InputNumber
                            className="w-full"
                            value={respuestas[campo.id]}
                            onValueChange={(e) =>
                                cambiarValor(campo.id, e.value)
                            }
                        />
                    )}

                    {campo.tipo === "textarea" && (
                        <InputTextarea
                            className="w-full"
                            rows={4}
                            placeholder={campo.placeholder}
                            value={respuestas[campo.id] || ""}
                            onChange={(e) =>
                                cambiarValor(campo.id, e.target.value)
                            }
                        />
                    )}

                    {campo.tipo === "date" && (
                        <Calendar
                            className="w-full"
                            value={respuestas[campo.id]}
                            onChange={(e) =>
                                cambiarValor(campo.id, e.value)
                            }
                            showIcon
                        />
                    )}

                    {campo.tipo === "select" && (
                        <Dropdown
                            className="w-full"
                            value={respuestas[campo.id]}
                            options={campo.opciones}
                            optionLabel="texto"
                            optionValue="valor"
                            placeholder={campo.placeholder}
                            onChange={(e) =>
                                cambiarValor(campo.id, e.value)
                            }
                        />
                    )}

                    {campo.tipo === "radio" &&
                        campo.opciones.map((op) => (
                            <div key={op.valor} className="flex items-center gap-2 mb-2">

                                <RadioButton
                                    inputId={`${campo.id}-${op.valor}`}
                                    value={op.valor}
                                    checked={respuestas[campo.id] === op.valor}
                                    onChange={(e) =>
                                        cambiarValor(campo.id, e.value)
                                    }
                                />

                                <label htmlFor={`${campo.id}-${op.valor}`}>
                                    {op.texto}
                                </label>

                            </div>
                        ))}

                    {campo.tipo === "checkbox" &&
                        campo.opciones.map((op) => {

                            const seleccionados = respuestas[campo.id] || [];

                            return (
                                <div key={op.valor} className="flex items-center gap-2 mb-2">

                                    <Checkbox
                                        inputId={`${campo.id}-${op.valor}`}
                                        value={op.valor}
                                        checked={seleccionados.includes(op.valor)}
                                        onChange={(e) => {

                                            let nuevo = [...seleccionados];

                                            if (e.checked) {
                                                nuevo.push(op.valor);
                                            } else {
                                                nuevo = nuevo.filter(
                                                    (x) => x !== op.valor
                                                );
                                            }

                                            cambiarValor(campo.id, nuevo);
                                        }}
                                    />

                                    <label htmlFor={`${campo.id}-${op.valor}`}>
                                        {op.texto}
                                    </label>

                                </div>
                            );
                        })}

                </div>

            ))}

            <Button
                label="Registrarme"
                icon="pi pi-check"
                onClick={Registrar}
            />
            

        </div>
    );

}
