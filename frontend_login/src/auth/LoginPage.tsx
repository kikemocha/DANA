import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";


const LoginPage: React.FC = () =>{
    const authContext = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [nif, setNif] = useState('');
    const [password, setPassword] = useState('');

    const handleFormSubmit = async (e: any) =>{
        e.preventDefault();
        setError('');
        setLoading(true);
    
        const requestBody = {
            'NIF': nif,
            'password': password,
        };
        try {
            // Hacer la solicitud POST
            const response = await axios.post('http://localhost:8000/auth/login/', requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000, // Aumentar el timeout si el servidor tarda en responder
            });
    
            if (response.status === 200) {
                const { access, refresh } = response.data;
                const UserDataResponse = await axios.get('http://localhost:8000/auth/getUserData/',
                    {
                        headers: {
                            Authorization: `Bearer ${access}`, 
                        },
                    }
                )
                if (UserDataResponse.status === 200) {
                    const userData = UserDataResponse.data;

                    // Llamar a `login` con access, refresh y userData después de obtener los datos del usuario
                    authContext.login(access, refresh, userData);
                    
                    // Guardar los datos del usuario en el contexto
                    authContext.setUserData(userData);

                    setLoading(false);
                    navigate('/'); // Redirigir al home
                } else {
                    setError('Error al obtener los datos del usuario');
                    setLoading(false);
                }
            }
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 401) {  // 401 Unauthorized para credenciales incorrectas
                    setError('Incorrect email or password');
                } else {
                    setError(error.response.data.message || 'An error occurred');
                }
                console.error('Error response data:', error.response.data);
            }
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Link to='/' className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        DANA  
                    </Link>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Inicia sesión
                            </h1>
                            <form className="space-y-4 md:space-y-6" method="POST" onSubmit={(e) => {handleFormSubmit(e)}}>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NIF</label>
                                    <input type="text" name="nif" onChange={(e) => {setNif(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none" placeholder="01010101X" required={true} />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Constraseña</label>
                                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none" required={true} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required={false} />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label className="text-gray-500 dark:text-gray-300">Recuerdame</label>
                                        </div>
                                    </div>
                                    <p className="text-white text-sm font-medium text-primary-600 hover:underline">¿Te has olvidado de la contraseña?</p>
                                </div>
                                <div className="py-4 flex flex-col">
                                    <button type="submit" className="w-2/3 mx-auto text-black bg-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                                    <p className="text-red-500 mx-auto mt-2">{error}</p>
                                </div>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        ¿No tienes todavía una cuenta? 
                                        <Link to='/register'>
                                            <p className="font-medium text-primary-600 hover:underline dark:text-primary-500">Registrate</p>
                                        </Link>
                                    </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LoginPage;