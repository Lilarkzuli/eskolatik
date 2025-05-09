"use client"

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';

function Login() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const {
        register,     // Registra los inputs con react-hook-form
        handleSubmit, // Maneja el envío del formulario
        formState: { errors }, // Captura los errores de validación
    } = useForm();

    const onSubmit = async (data) => {
        
        try {
            setLoading(true);
            setError('');
            console.log("he llegado antes del response")
            const response = await fetch('../api/auth/login/verification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            console.log(data)

            const responseData = await response.json();
            console.log(responseData)

            if (!response.ok) {
                throw new Error(responseData.message || 'Error en el inicio de sesión');
            }
        
            // Si el login es exitoso, puedes redirigir al usuario o actualizar el estado
            console.log('Login exitoso:', responseData);
            setCookie('usuario', JSON.stringify((responseData.user), {
                maxAge: 60 * 60 * 24 // 1 día
              }));
            // Cookies.set('usuario',JSON.stringify(responseData.user), { expires: 7 });
            router.push('../Pages/Panel_Principal'); // Usa la ruta como string
      

        } catch (error) {
            setError(error.message);
            console.error('Error en el login:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className=" flex flex-col shadow-md rounded px-8 pt-6 pb-8 mb-4" >
                <h1 className='text-4xl' >Inicio Sesion</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit(onSubmit)}  >
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Usuario">
                            Usuario
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="usuario"
                            type="usuario"
                            placeholder="uferandez"
                            {...register("usuario", { required: "El nombre es obligatorio" })}
                        />
                        {errors.usuario && <p className="text-red-500 text-xs italic">{errors.usuario.message}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="******************"
                            {...register("password", { required: "La contraseña es obligatoria" })}
                        />
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        <button 
                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Iniciando...' : 'Iniciar Sesión'}
                        </button>

                    </div>
                </form>
            </div>
        </>
    )
}


export default Login