import axiosInstance from '@/app/Herramientas/axiosToken';
import { useAppContext } from '@/app/Provider/AppContext';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react'
import * as XLSX from "xlsx";

export default function GenerateCode() {
    const {user, Code, eventoCode, ListaEventoCodigos} = useAppContext();
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

    const copiarLink = async (codigo: string) => {
        const linkRegistro = `https://eventos.asociaciondebodegueros.com/event/${eventoCode.codigo}/r/${codigo}`;
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

    const exportarExcel = () => {
        const data = Code.map((item: any) => ({
            Código: item.codigo,
            Estado: item.estado,
            Link: `https://eventos.asociaciondebodegueros.com/event/${eventoCode.codigo}/r/${item.codigo}`
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Codigos");


        XLSX.writeFile(workbook, `Codigos_${eventoCode.codigo}.xlsx`);
    };

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

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5">
                <h2 className="text-xl font-bold">
                    Generar códigos
                </h2>

            </div>


            <div className="flex flex-col lg:flex-row lg:items-end gap-4">
                <div className="w-full lg:w-auto">
                    <label className="block mb-2">
                        Cantidad
                    </label>

                    <InputNumber
                        className="w-full"
                        value={cantidad}
                        onValueChange={(e) => setCantidad(e.value ?? 1)}
                        showButtons
                        min={1}
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                    <Button
                        label="Generar"
                        icon="pi pi-key"
                        severity="info"
                        outlined
                        className="w-full sm:w-auto"
                        onClick={handleSubmit}
                    />

                    <Button
                        label="Exportar"
                        icon="pi pi-file-excel"
                        severity="success"
                        outlined
                        className="w-full sm:w-auto"
                        onClick={exportarExcel}
                    />
                </div>
            </div>


        </div>




        {/* TABLA */}

        <div
                className={`
                    rounded-xl
                    border
                    p-4 md:p-6
                    overflow-x-auto
                ${
                    isDark
                    ?
                    "bg-[#1E293B] border-[#334155]"
                    :
                    "bg-white border-gray-200"
                }
            `}
        >


            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-5">

                <h2 className="text-xl font-bold">
                    Códigos generados
                </h2>

                <InputText
                    placeholder="Buscar código..."
                    className="w-full lg:w-80"
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
                    body={(row) => (
                        <div className="flex justify-center gap-2">
                            <Button
                                icon="pi pi-copy"
                                rounded
                                outlined
                                onClick={() => copiarLink(row.codigo)}
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
    </>
  )
}
