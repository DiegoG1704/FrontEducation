'use client'

import { useMemo } from 'react'
import { useAppContext } from '@/app/Provider/AppContext'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Tag } from 'primereact/tag'
import Link from 'next/link'
import { Button } from 'primereact/button'
import { ArrowLeft } from 'lucide-react'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import axiosInstance from '@/app/Herramientas/axiosToken'

export default function Participantes() {

    const { user, participantesCode, eventoCode, ListaParticipante } = useAppContext()
    

    const AcceptCambio = async(row)=>{
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

    return (

        <div
            className={`min-h-screen p-8 ${
                isDark
                    ? "bg-[#0F172A] text-white"
                    : "bg-slate-100 text-gray-900"
            }`}
        >
            <ConfirmDialog />

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-4xl font-bold text-cyan-500">
                        Participantes
                    </h1>

                    <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                        Total registrados: <strong>{data.length}</strong>
                    </p>

                </div>

            </div>

            <div className="flex justify-between items-center mb-5">
                <Link href="/Principal/Page/AdminEventos">

                    <Button
                        icon={<ArrowLeft size={18} />}
                        label="Regresar"
                        outlined
                    />

                </Link>

                <Button
                    icon='pi pi-refresh'
                    className='mx-2'
                    outlined
                    onClick={ListaParticipante}
                />

            </div>

            <div
                className={`rounded-2xl shadow-xl overflow-hidden ${
                    isDark ? "bg-slate-800" : "bg-white"
                }`}
            >

                <DataTable
                    value={data}
                    paginator
                    rows={10}
                    stripedRows
                    removableSort
                    responsiveLayout="scroll"
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
