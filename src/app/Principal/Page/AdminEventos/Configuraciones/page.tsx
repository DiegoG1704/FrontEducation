'use client';

import React, { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { InputNumber } from 'primereact/inputnumber';
import { Divider } from 'primereact/divider';
import { useAppContext } from '@/app/Provider/AppContext';
import axiosInstance from '@/app/Herramientas/axiosToken';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Toast } from 'primereact/toast';

interface OpcionCampo {
    texto: string;
    valor: string;
    orden: number;
}

interface CampoFormulario {
    label: string;
    nombreInterno: string;
    tipo: string;
    required: boolean;
    placeholder: string;
    orden: number;
    opciones: OpcionCampo[];
}

const tipos = [
    { label: 'Texto', value: 'text' },
    { label: 'Correo', value: 'email' },
    { label: 'Número', value: 'number' },
    { label: 'Fecha', value: 'date' },
    { label: 'Textarea', value: 'textarea' },
    { label: 'Select', value: 'select' },
    { label: 'Radio', value: 'radio' },
    { label: 'Checkbox', value: 'checkbox' },
];

export default function Configuracion() {
    const {eventoCode,campoCode,ListaCampoCode, user} = useAppContext()
    const isDark = user?.estadoModo !== "1"
    const [visible, setVisible] = useState(false);
    const toast = useRef<Toast>(null);

    const [campo, setCampo] = useState<CampoFormulario>({
        label: '',
        nombreInterno: '',
        tipo: 'text',
        required: false,
        placeholder: '',
        orden: 1,
        opciones: [],
    });

    const agregarOpcion = () => {
        setCampo((prev) => ({
            ...prev,
            opciones: [
                ...prev.opciones,
                {
                    texto: '',
                    valor: '',
                    orden: prev.opciones.length + 1,
                },
            ],
        }));
    };

    const eliminarOpcion = (index: number) => {
        setCampo((prev) => ({
            ...prev,
            opciones: prev.opciones.filter((_, i) => i !== index),
        }));
    };

    const actualizarOpcion = (
        index: number,
        campoNombre: keyof OpcionCampo,
        valor: string
    ) => {
        const copia = [...campo.opciones];

        copia[index] = {
            ...copia[index],
            [campoNombre]: valor,
        };

        setCampo({
            ...campo,
            opciones: copia,
        });
    };

    const guardarCampo = async() => {

        try {
            await axiosInstance.post(`PostCampo/${eventoCode.id}`,campo)
            setCampo({
                label: '',
                nombreInterno: '',
                tipo: 'text',
                required: false,
                placeholder: '',
                orden: 1,
                opciones: [],
            });
            ListaCampoCode();
            setVisible(false);
        } catch (error) {
            console.log('error',error);
            
        }
    };

    // const eliminarCampo = (id: number) => {
    //     setCampos(campos.filter((x) => x.id !== id));
    // };

    return (
        <div>
            <Toast ref={toast} />

            <div className="flex justify-start items-center mb-5">
                <Link href="/Principal/Page/AdminEventos">

                    <Button
                        icon={<ArrowLeft size={18} />}
                        label="Regresar"
                        outlined
                    />

                </Link>

            </div>

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
                        Lista de Campos
                    </h2>


                    <Button
                        label="Nuevo Campo"
                        icon="pi pi-plus"
                        onClick={() => setVisible(true)}
                    />


                </div>
                    <DataTable value={campoCode} stripedRows>

                    <Column field="label" header="Label" />

                    <Column field="nombreInterno" header="Nombre interno" />

                    <Column field="tipo" header="Tipo" />

                    <Column
                        header="Obligatorio"
                        body={(row) =>
                            row.required ? 'Sí' : 'No'
                        }
                    />

                    <Column
                        body={() => (
                            <Button
                                icon="pi pi-trash"
                                rounded
                                severity="danger"
                            />
                        )}
                    />

                </DataTable>
            </div>

            <Dialog
                header="Nuevo Campo"
                visible={visible}
                style={{ width: '700px' }}
                onHide={() => setVisible(false)}
            >

                <div className="grid grid-cols-2 gap-4">

                    <div>

                        <label>Label</label>

                        <InputText
                            className="w-full"
                            value={campo.label}
                            onChange={(e) =>
                                setCampo({
                                    ...campo,
                                    label: e.target.value,
                                })
                            }
                        />

                    </div>

                    <div>

                        <label>Nombre interno</label>

                        <InputText
                            className="w-full"
                            value={campo.nombreInterno}
                            onChange={(e) =>
                                setCampo({
                                    ...campo,
                                    nombreInterno:
                                        e.target.value,
                                })
                            }
                        />

                    </div>

                    <div>

                        <label>Tipo</label>

                        <Dropdown
                            className="w-full"
                            options={tipos}
                            optionLabel="label"
                            optionValue="value"
                            value={campo.tipo}
                            onChange={(e) =>
                                setCampo({
                                    ...campo,
                                    tipo: e.value,
                                })
                            }
                        />

                    </div>

                    <div>

                        <label>Orden</label>

                        <InputNumber
                            className="w-full"
                            value={campo.orden}
                            onValueChange={(e) =>
                                setCampo({
                                    ...campo,
                                    orden:
                                        e.value ?? 1,
                                })
                            }
                        />

                    </div>

                    <div className="col-span-2">

                        <label>Placeholder</label>

                        <InputText
                            className="w-full"
                            value={campo.placeholder}
                            onChange={(e) =>
                                setCampo({
                                    ...campo,
                                    placeholder:
                                        e.target.value,
                                })
                            }
                        />

                    </div>

                    <div className="col-span-2 flex items-center gap-3">

                        <Checkbox
                            checked={campo.required}
                            onChange={(e) =>
                                setCampo({
                                    ...campo,
                                    required:
                                        e.checked ?? false,
                                })
                            }
                        />

                        <span>Campo obligatorio</span>

                    </div>

                </div>

                {(campo.tipo === 'select' ||
                    campo.tipo === 'radio' ||
                    campo.tipo === 'checkbox') && (
                    <>
                        <Divider />

                        <div className="flex justify-between mb-3">

                            <h3 className="font-bold">
                                Opciones
                            </h3>

                            <Button
                                icon="pi pi-plus"
                                label="Agregar"
                                onClick={agregarOpcion}
                            />

                        </div>

                        {campo.opciones.map((op, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-12 gap-3 mb-3"
                            >
                                <div className="col-span-5">

                                    <InputText
                                        className="w-full"
                                        placeholder="Texto"
                                        value={op.texto}
                                        onChange={(e) =>
                                            actualizarOpcion(
                                                index,
                                                'texto',
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                                <div className="col-span-5">

                                    <InputText
                                        className="w-full"
                                        placeholder="Valor"
                                        value={op.valor}
                                        onChange={(e) =>
                                            actualizarOpcion(
                                                index,
                                                'valor',
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                                <div className="col-span-2">

                                    <Button
                                        icon="pi pi-trash"
                                        severity="danger"
                                        onClick={() =>
                                            eliminarOpcion(index)
                                        }
                                    />

                                </div>
                            </div>
                        ))}
                    </>
                )}

                <Divider />

                <div className="flex justify-end gap-2">

                    <Button
                        label="Cancelar"
                        severity="secondary"
                        outlined
                        onClick={() =>
                            setVisible(false)
                        }
                    />

                    <Button
                        label="Guardar"
                        icon="pi pi-check"
                        onClick={guardarCampo}
                    />

                </div>

            </Dialog>

        </div>
    );
}