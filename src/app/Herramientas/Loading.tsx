'use client';

import { Dumbbell } from 'lucide-react';

export default function LoadingCharge() {

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">


            <div className="bg-white rounded-2xl shadow-2xl px-10 py-8 flex flex-col items-center gap-5 min-w-[260px]">

                <div className="relative">

                    <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping"></div>

                    <div className="relative bg-blue-500 rounded-full p-4">
                        <Dumbbell
                            size={38}
                            className="text-white animate-spin"
                            style={{
                                animationDuration: "1.8s"
                            }}
                        />
                    </div>

                </div>

                <div className="text-center">

                    {/* <p className="font-semibold text-gray-700 text-lg">
                        {message}
                    </p> */}

                    <p className="text-sm text-gray-500">
                        Espere un momento...
                    </p>

                </div>

                <div className="flex gap-2">

                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></span>

                    <span
                        className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
                        style={{ animationDelay: "0.15s" }}
                    ></span>

                    <span
                        className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
                        style={{ animationDelay: "0.30s" }}
                    ></span>

                </div>

            </div>

        </div>
    );
}