'use client';

import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import axiosInstance from '@/app/Herramientas/axiosToken';
import { useAppContext } from '@/app/Provider/AppContext';
import { Calendar } from 'primereact/calendar';

interface NuevaActividad {
    nombre: string;
    descripcion: string;
    fechaEvento: Date | null;
    tipo: number | null;
}

interface Props {
    Open: boolean;
    Close: () => void;
}

const initialState: NuevaActividad = {
    nombre: '',
    descripcion: '',
    fechaEvento: null,
    tipo: null
};


export default function DialogCrearEvento({
    Open,
    Close,
}: Props) {
    const {ListaEventos} = useAppContext()
    const [actividad, setActividad] = useState<NuevaActividad>(initialState);

    const handleChange = <K extends keyof NuevaActividad>(
    campo: K,
        valor: NuevaActividad[K]
    ) => {
        setActividad(prev => ({
            ...prev,
            [campo]: valor
        }));
    };
    const handleClose = () => {
        setActividad(initialState);
        Close();
    };
    const opciones = [
        {id:1,value:'Publico'},
        {id:2,value:'Privado'}
    ]

    const handleSave = async () => {
        const payload = {
            ...actividad,
            fechaEvento: actividad.fechaEvento?.toISOString()
        };
        
        
        try {
            await axiosInstance.post('PostEvento',payload) 
            ListaEventos(); 
            handleClose();
        } catch (error) {
            console.log('error',error);
        }
        
    };

    const footer = (
        <div className="flex justify-end gap-3">

            <Button
                label="Cancelar"
                icon="pi pi-times"
                outlined
                severity="secondary"
                onClick={handleClose}
            />

            <Button
                label="Guardar"
                icon="pi pi-check"
                className="bg-[#BACD00] border-[#BACD00]"
                onClick={handleSave}
            />

        </div>
    );

    const Header = () => (
        <div className="flex items-center gap-3">
            <i className="pi pi-plus-circle text-2xl text-[#BACD00]" />
            <span className="text-2xl font-semibold">
                Nueva Actividad
            </span>
        </div>
    );

    return (
        <Dialog
            visible={Open}
            onHide={handleClose}
            header={Header}
            footer={footer}
            style={{ width: '750px' }}
            breakpoints={{
                '960px': '95vw',
                '640px': '100vw'
            }}
        >

            <div className="space-y-6 mt-3">

                {/* Información principal */}

                <div className="bg-slate-50 rounded-xl border p-5">

                    <h3 className="font-semibold text-lg mb-4">
                        Información General
                    </h3>

                    <div className="space-y-4">

                        <div>
                            <label className="block mb-2 font-medium">
                                Nombre
                            </label>

                            <InputText
                                value={actividad.nombre}
                                onChange={(e) =>
                                    handleChange('nombre', e.target.value)
                                }
                                placeholder="Ingrese el título"
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Descripción
                            </label>

                            <InputTextarea
                                rows={4}
                                autoResize
                                value={actividad.descripcion}
                                onChange={(e) =>
                                    handleChange(
                                        'descripcion',
                                        e.target.value
                                    )
                                }
                                placeholder="Describe la actividad..."
                                className="w-full"
                            />
                        </div>

                        <div>

                            <label className="block mb-2 font-medium">
                                Tipo de evento
                            </label>

                            <Dropdown
                                value={actividad.tipo}
                                options={opciones}
                                optionLabel="value"
                                optionValue="id"
                                placeholder="Seleccione un tipo evento..."
                                onChange={(e) =>
                                    handleChange(
                                        'tipo',
                                        e.value
                                    )
                                }
                                className="w-full"
                            />
                            
                        </div>

                        <div>

                            <label className="block mb-2 font-medium">
                                Fecha de evento
                            </label>

                            <Calendar
                                value={actividad.fechaEvento}
                                onChange={(e) => handleChange('fechaEvento', e.value)}
                                dateFormat="dd/mm/yy"
                                showIcon
                                className="w-full"
                            />
                        </div>

                    </div>

                </div>

            </div>

        </Dialog>
    );
}