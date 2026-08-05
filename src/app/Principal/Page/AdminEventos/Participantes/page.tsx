'use client'

import { useMemo, useState } from 'react'
import { useAppContext } from '@/app/Provider/AppContext'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Tag } from 'primereact/tag'
import Link from 'next/link'
import { Button } from 'primereact/button'
import { ArrowLeft } from 'lucide-react'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import axiosInstance from '@/app/Herramientas/axiosToken'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from "xlsx";
import { InputText } from 'primereact/inputtext'

export default function Participantes() {

    const { user, participantesCode, eventoCode, ListaParticipante } = useAppContext()
    

    const AcceptCambio = async(row: any)=>{
        try {
            await axiosInstance.put(`PutEstadoParticipante/${row.id}`)
            ListaParticipante()
        } catch (error) {
            console.log('erro',error);
        }
    }

    // get = devolver lista de datos 
    // post = enviar valores
    // put = cambiar o editar valor 
    // delete = eliminar un valor

    const confirmCambio = (rowData: any) => {
        console.log(rowData);
        
        confirmDialog({
          message: '¿Desea habilitar a este usuario?',
          header: 'Confirmación',
          icon: 'pi pi-exclamation-triangle',
          defaultFocus: 'accept',
          accept: () => AcceptCambio(rowData)
        });
      };
    
    const isDark = user?.estadoModo !== "1"

    const columnas = useMemo(() => {

        if (!participantesCode?.length) return [];

        return Object.keys(participantesCode[0].respuestas);

    }, [participantesCode]);

    const data = useMemo(() => {

        return participantesCode.map((p: any) => {

            const fila: any = {
                id: p.id,
                dni:p.dni,
                nombres:p.nombres,
                apellidos:p.apellidos,
                codigo:p.codigo,
                nombreEmpresa:p.nombreEmpresa,
                fechaRegistro: new Date(p.fechaRegistro).toLocaleDateString(),
                estado: p.estado
            };

            Object.entries(p.respuestas).forEach(([key, value]: any) => {
                fila[key] = value.valor;
            });

            return fila;

        });

    }, [participantesCode]);

    const [search, setSearch] = useState("");
    const filteredData = useMemo(() => {
        if (!search.trim()) return data;

        const text = search.toLowerCase();

        return data.filter((item: any) =>
            item.dni?.toLowerCase().includes(text) ||
            item.nombres?.toLowerCase().includes(text) ||
            item.apellidos?.toLowerCase().includes(text)
        );
    }, [data, search]);

    const exportExcel = () => {
        const excelData = data.map((item: any) => {
            const row = { ...item };
            delete row.id;
            return row;
        });

        const worksheet = XLSX.utils.json_to_sheet(excelData);

        const cols = Object.keys(excelData[0] || {}).map((key) => ({
            wch: Math.max(
                key.length,
                ...excelData.map((r: any) =>
                    r[key] ? r[key].toString().length : 0
                )
            ) + 5,
        }));

        worksheet["!cols"] = cols;

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Participantes");
        XLSX.writeFile(workbook, "Participantes.xlsx");
    };


    const exportPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text("Lista de Participantes", 14, 15);

        const body = data.map((item: any) => [
            item.dni,
            item.nombres,
            item.apellidos,
        ]);

        autoTable(doc, {
            startY: 25,
            head: [["DNI", "Nombres", "Apellidos"]],
            body,
            styles: {
                fontSize: 10,
            },
            headStyles: {
                fillColor: [6, 182, 212], // Cyan
                textColor: 255,
            },
            alternateRowStyles: {
                fillColor: [245, 245, 245],
            },
        });

        doc.save("Participantes.pdf");
    };

    return (

        <div
            className={`min-h-screen p-4 md:p-6 lg:p-8 ${
                isDark
                    ? "bg-[#0F172A] text-white"
                    : "bg-slate-100 text-gray-900"
            }`}
        >
            <ConfirmDialog />

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

                <div>

                    <h1 className="text-2xl md:text-4xl font-bold text-cyan-500">
                        Participantes
                    </h1>

                    <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                        Total registrados: <strong>{data.length}</strong>
                    </p>

                </div>

            </div>
            <Link href="/Principal/Page/AdminEventos" className="inline-block mb-4">

                <Button
                    icon={<ArrowLeft size={18} />}
                    label="Regresar"
                    outlined
                />

            </Link>

            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 my-5">
                <InputText
                    placeholder="Buscar por dni,nombres o apellidos..."
                    className="w-full lg:w-80"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="flex flex-wrap gap-2 justify-start lg:justify-end">
                    <Button
                        icon='pi pi-refresh'
                        className='mx-2'
                        outlined
                        onClick={ListaParticipante}
                    />
                    <Button
                        icon="pi pi-file-pdf"
                        label="Exportar PDF"
                        severity="danger"
                        outlined
                        className="mx-2"
                        onClick={exportPDF}
                    />
                    <Button
                        icon="pi pi-file-excel"
                        label="Excel"
                        severity="success"
                        outlined
                        className="mx-2"
                        onClick={exportExcel}
                    />
                </div>

            </div>

            <div
                className={`rounded-2xl shadow-xl overflow-hidden ${
                    isDark ? "bg-slate-800" : "bg-white"
                }`}
            >

                <DataTable
                    value={filteredData}
                    paginator 
                    rows={5} 
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    stripedRows
                    removableSort
                    emptyMessage="No existen participantes registrados."
                >
                    
                    <Column
                        field="codigo"
                        header="#"
                        sortable
                        style={{ width: "70px" }}
                    />
                    <Column
                        field="dni"
                        header="DNI"
                        sortable
                    />
                    <Column
                        field="nombres"
                        header="Nombres"
                        sortable
                    />
                    <Column
                        field="apellidos"
                        header="Apellidos"
                        sortable
                    />

                    {columnas.map((campo) => (

                        <Column
                            key={campo}
                            field={campo}
                            header={
                                participantesCode[0].respuestas[campo].label
                            }
                            sortable
                        />

                    ))}

                    <Column
                        field="fechaRegistro"
                        header="Fecha"
                        sortable
                    />

                    <Column
                        header="Invitacion"
                        body={(row) =>
                            row.nombreEmpresa ? (
                                <div className="border rounded p-2">
                                    <strong>{row.nombreEmpresa}</strong>
                                </div>
                            ) : (
                                <div className="border rounded p-2">
                                    <strong>Link</strong>
                                </div>
                            )
                        }
                    />
                    

                    <Column
                        field="estado"
                        header="Estado"
                        body={(row) => (
                            <Tag
                                value={row.estado}
                                severity={
                                    row.estado === "ACTIVO"
                                        ? "success"
                                        : "danger"
                                }
                            />
                        )}
                    />

                    

                    {eventoCode?.tipo === "2" &&(
                        <Column 
                            body={(row)=>(
                                <Button
                                    severity="info"
                                    label='Revisar'
                                    disabled={row.estado == "ACTIVO"}
                                    onClick={()=>confirmCambio(row)}
                                />
                            )}
                        />
                    )}

                </DataTable>

            </div>
        </div>

    );

}
