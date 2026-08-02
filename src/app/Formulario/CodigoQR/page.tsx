'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

function FinalizadoContent() {
    const searchParams = useSearchParams();

    const qr = searchParams.get("qr");

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">

            <Card className="w-full max-w-lg shadow-4 text-center">

                <div className="flex justify-center mb-4">
                    <i
                        className="pi pi-check-circle text-green-500"
                        style={{ fontSize: "5rem" }}
                    />
                </div>

                <h1 className="text-3xl font-bold mb-3">
                    ¡Registro completado!
                </h1>

                <p className="text-gray-600 mb-5">
                    Gracias por completar tu inscripción.
                </p>

                <p className="text-gray-600 mb-6">
                    Tu registro fue realizado correctamente.
                    Presenta el siguiente código QR el día del evento para realizar tu ingreso.
                </p>

                {qr && (
                    <div className="flex justify-center mb-5">

                        <Image
                            src={qr}
                            alt="Código QR"
                            width={250}
                            height={250}
                        />

                    </div>
                )}

                <div className="bg-blue-50 border-round p-3 text-sm text-blue-900 mb-4">

                    <i className="pi pi-info-circle mr-2"></i>

                    Guarda una captura del QR o mantenlo disponible en tu teléfono.

                </div>

                <Button
                    label="Finalizar"
                    icon="pi pi-home"
                    className="w-full"
                    onClick={() => window.close()}
                />

            </Card>

        </div>
    );
}

export default function Finalizado() {
    return (
        <Suspense fallback={null}>
            <FinalizadoContent />
        </Suspense>
    );
}
