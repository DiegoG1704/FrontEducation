'use client'

import React, { useRef, useState } from 'react'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Divider } from 'primereact/divider'
import { Toast } from 'primereact/toast'
import axiosInstance from '@/app/Herramientas/axiosToken'
import { useAppContext } from '@/app/Provider/AppContext'

interface Props {
  Open: boolean
  Close: () => void
  Datos: {
    id: number
    nombre: string
    ruta: string
    icono: string
    descripcion: string
    precio: number
  }
}

export default function DialogCompra({
  Close,
  Open,
  Datos,
}: Props) {
  const toast = useRef<Toast>(null)

  const { user, me } = useAppContext()

  const [loading, setLoading] = useState(false)

  const sudmit = async () => {
    try {
      setLoading(true)

      await axiosInstance.post('/PostCompra', {
        idUsuario: user.idUser,
        idVista: Datos.id
      })

      toast.current?.show({
        severity: 'success',
        summary: 'Compra realizada',
        detail: `El módulo ${Datos.nombre} fue adquirido correctamente`,
        life: 3000,
      })

      await me()

      setTimeout(() => {
        Close()
      }, 1200)
    } catch (error: any) {

      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail:
          error?.response?.data?.error ||
          error?.response?.data?.message ||
          'No se pudo completar la compra',
        life: 3000,
      })

      console.log(error)

    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Toast ref={toast} position="top-right" />

      <Dialog
        visible={Open}
        onHide={Close}
        draggable={false}
        resizable={false}
        className="w-[95vw] md:w-[32rem] overflow-hidden rounded-2xl"
        contentClassName="p-0"
        header={null}
      >
        {/* HEADER */}
        <div className="bg-gradient-to-r from-lime-300 to-lime-400 p-6 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-white/10 rounded-full" />

          <div className="relative z-10 flex items-start gap-4">
            <div className="bg-white text-[#BACD00] p-5 rounded-2xl shadow-lg">
              <i className={`${Datos?.icono} text-3xl`} />
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium text-[#5d6600] uppercase tracking-widest">
                Compra de módulo
              </p>

              <span className="text-3xl font-bold text-[#4e5700]">
                {Datos?.nombre}
              </span>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="p-6">
          {/* DESCRIPCIÓN */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <i className="pi pi-info-circle text-[#BACD00]" />
              <span className="font-semibold text-gray-700">
                Descripción
              </span>
            </div>

            <p className="text-gray-600 leading-relaxed text-sm">
              {Datos?.descripcion}
            </p>
          </div>

          <Divider />

          {/* INFO EXTRA */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-1">
                Precio de módulo
              </p>

              <div className="flex items-center gap-2">
                <i className="pi pi-dollar text-[#BACD00]" />

                <span className="font-medium text-gray-700">
                  ${Datos?.precio}.99
                </span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-1">
                Código
              </p>

              <div className="flex items-center gap-2">
                <i className="pi pi-hashtag text-[#BACD00]" />

                <span className="font-medium text-gray-700">
                  MOD-{Datos?.id}
                </span>
              </div>
            </div>
          </div>

          {/* BENEFICIOS */}
          <div className="mt-6 bg-lime-50 border border-lime-100 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <i className="pi pi-check-circle text-[#BACD00]" />

              <span className="font-semibold text-gray-700">
                Beneficios incluidos
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <i className="pi pi-check text-[#BACD00]" />
                Acceso completo al módulo
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <i className="pi pi-check text-[#BACD00]" />
                Actualizaciones automáticas
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <i className="pi pi-check text-[#BACD00]" />
                Soporte y mantenimiento
              </div>
            </div>
          </div>

          {/* BOTONES */}
          <div className="flex justify-end gap-3 mt-8">
            <Button
              label="Cancelar"
              icon="pi pi-times"
              outlined
              severity="secondary"
              onClick={Close}
              className="rounded-xl"
              disabled={loading}
            />

            <Button
              label={loading ? 'Procesando...' : 'Comprar módulo'}
              icon={loading ? 'pi pi-spin pi-spinner' : 'pi pi-shopping-cart'}
              className="bg-[#BACD00] border-none hover:bg-[#a8b900] rounded-xl"
              onClick={sudmit}
              disabled={loading}
            />
          </div>
        </div>
      </Dialog>
    </>
  )
}