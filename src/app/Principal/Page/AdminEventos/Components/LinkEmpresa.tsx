import axiosInstance from '@/app/Herramientas/axiosToken'
import { useAppContext } from '@/app/Provider/AppContext'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import React, { useRef, useState } from 'react'

export default function LinkEmpresa() {
    const {eventoCode, user, empresa, ListaEmpresa}= useAppContext()
     const isDark = user?.estadoModo !== "1"
    const [visible,setVisible]=useState(false)
    const [select,setSelect]=useState<any>(null)
    const [visibleCupos,setVisibleCupos]=useState(false)
    const [cupos,setCupos] = useState('')
    const [cantidad,setCantidad]= useState('')
    const [nombre,setNombre]=useState('')
    const toast = useRef<Toast>(null);

    const handleClose = ()=>{
        setCantidad('');
        setNombre('');
        setVisible(false);
    }

    const handleCloseCupos = ()=>{
        setCupos('');
        setVisibleCupos(false);
    }

    const handleSave = async()=>{
        const Datos = {
            nombre:nombre,
            cupos:Number(cantidad)
        }
        
        try {
            await axiosInstance.post(`PostEmpresa/${eventoCode.id}`,Datos) 
            ListaEmpresa();
            handleClose();
        } catch (error) {
            console.log('error',error);
        }
    }

    const handleUpdate = async()=>{        
        try {
            await axiosInstance.put(`PutCuposEmpresa/${select.id}`,{cupos}) 
            ListaEmpresa();
            handleCloseCupos();
        } catch (error) {
            console.log('error',error);
        }
    }

    
    const copiarLink = async (codigo: string) => {
        const linkRegistro = `https://eventos.asociaciondebodegueros.com/event/${eventoCode.codigo}/company/${codigo}`;
        try {
            await navigator.clipboard.writeText(linkRegistro);

            toast.current?.show({
                severity: "success",
                summary: "Copiado",
                detail: "El enlace fue copiado al portapapeles.",
                life: 2500
            });
        } catch (error) {
            console.log(error);
            
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "No fue posible copiar el enlace.",
                life: 2500
            });
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
                    Nueva Empresa
                </span>
            </div>
        );

        const footerCupos = (
            <div className="flex justify-end gap-3">
    
                <Button
                    label="Cancelar"
                    icon="pi pi-times"
                    outlined
                    severity="secondary"
                    onClick={handleCloseCupos}
                />
    
                <Button
                    label="Guardar"
                    icon="pi pi-check"
                    className="bg-[#BACD00] border-[#BACD00]"
                    onClick={handleUpdate}
                />
    
            </div>
        );
    
        const HeaderCupos = () => (
            <div className="flex items-center gap-3">
                <i className="pi pi-plus-circle text-2xl text-[#BACD00]" />
                <span className="text-2xl font-semibold">
                    Cantidad Cupos
                </span>
            </div>
        );
  return (
    <>
    <Toast ref={toast} />
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
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 my-5">
                <strong className="text-xl">
                    Link de Empresa
                </strong>
                <div className="flex flex-wrap gap-2 justify-start lg:justify-end">
                    <Button
                        icon='pi pi-refresh'
                        className='mx-2'
                        outlined
                        onClick={ListaEmpresa}
                    />
                    <Button
                        label="Agregar Empresa"
                        icon="pi pi-plus"
                        onClick={() => setVisible(true)}
                    />
                </div>
            </div>
            <DataTable value={empresa} stripedRows>
                <Column field='codigo' header='Codigo'/>

                <Column field="nombre" header="Empresa" />

                <Column field="cupos" header="Cupos" />

                <Column header="Link" 
                    body={(row)=>(
                        <Button
                            icon="pi pi-copy"
                            rounded
                            severity="info"
                            onClick={() =>
                                copiarLink(row.codigo)
                            }
                        />
                    )}
                />

                <Column
                    body={(row) => (
                        <div>
                            <Button
                                icon="pi pi-pencil"
                                rounded
                                className='bg-yellow-400 border-yellow-400 mx-1'
                                onClick={() =>{
                                    setSelect(row)
                                    setVisibleCupos(true)
                                }}
                            />
                            <Button
                                icon="pi pi-trash"
                                rounded
                                severity="danger"
                                className='mx-1'
                                // onClick={() =>
                                //     eliminarCampo(row.id)
                                // }
                            />
                        </div>
                    )}
                />

            </DataTable>

            <Dialog
                onHide={handleClose}
                visible={visible}
                header={Header}
                footer={footer}
            >
                <div className='flex flex-col'>
                    <div className='flex flex-col m-2'>
                        <strong>Nombre</strong>
                        <InputText
                            value={nombre}
                            onChange={(e)=>setNombre(e.target.value)}
                            placeholder='Ingresar nombre...'
                        />
                    </div>
                    <div className='flex flex-col m-2'>
                        <strong>Cantidad</strong>
                        <InputText
                            value={cantidad}
                            onChange={(e)=>setCantidad(e.target.value)}
                            placeholder='Ingresar cantidad...'
                        />
                    </div>
                </div>
            </Dialog>

            <Dialog
                onHide={handleClose}
                visible={visibleCupos}
                header={HeaderCupos}
                footer={footerCupos}
            >
                <div className='flex flex-col'>
                    <div className='flex flex-col m-2'>
                        <strong>Cantidad</strong>
                        <InputText
                            value={cupos}
                            onChange={(e)=>setCupos(e.target.value)}
                            placeholder='Ingresar cantidad...'
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    </>
  )
}
