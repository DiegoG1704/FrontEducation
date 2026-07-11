'use client';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';

import { useAppContext } from './Provider/AppContext';

export default function Home() {
  const { datos, handleChange, login, errorMessage } = useAppContext();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#060816]">
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-[#060816] to-cyan-950" />

      <div className="absolute top-[-120px] left-[-120px] w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-120px] w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />

      {/* Card */}
      <div className="relative z-10 w-[92%] sm:w-[420px] bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 mb-4">
            <span className="text-3xl font-bold text-white">
              N2
            </span>
          </div>

          <h1 className="text-3xl font-bold text-white">
            N2 Platform
          </h1>

          <p className="text-gray-400 mt-2 text-sm">
            Accede a tu plataforma blockchain
          </p>
        </div>

        {/* Error */}
        {errorMessage && (
          <div className="mb-5 bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center p-3 rounded-xl">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <div className="space-y-5">

          {/* Username */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Usuario
            </label>

            <span className="p-input-icon-left w-full">
              <i className="pi pi-user text-gray-400" />

              <InputText
                name="username"
                placeholder="Ingrese su usuario"
                value={datos.username}
                onChange={handleChange}
                className="
                  w-full
                  !bg-white/5
                  !border-white/10
                  !text-white
                  placeholder:!text-gray-500
                  rounded-xl
                  p-3
                "
              />
            </span>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Contraseña
            </label>

            <Password
              name="password"
              value={datos.password}
              onChange={handleChange}
              placeholder="Ingrese su contraseña"
              feedback={false}
              toggleMask
              inputClassName="
                w-full
                !bg-white/5
                !border-white/10
                !text-white
                placeholder:!text-gray-500
                rounded-xl
                p-3
              "
              className="w-full"
            />
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <input type="checkbox" />
              <span>Recordarme</span>
            </div>

            <button className="text-cyan-400 hover:text-cyan-300 transition">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {/* Button */}
          <Button
            onClick={login}
            label="Iniciar Sesión"
            icon="pi pi-sign-in"
            className="
              w-full
              !rounded-xl
              !border-none
              !bg-gradient-to-r
              from-indigo-600
              to-cyan-500
              hover:opacity-90
              p-3
              font-semibold
              shadow-lg
              shadow-cyan-500/20
            "
          />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 N2 Platform
          </p>
        </div>
      </div>
    </div>
  );
}