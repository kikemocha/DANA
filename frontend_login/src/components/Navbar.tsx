import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () =>{

    const userRef = useRef<HTMLDivElement | null>(null);

    // Función para manejar clics fuera del div
    const handleClickOutside = (event: MouseEvent) => {
            if (userRef.current && !userRef.current.contains(event.target as Node)) {
                setShowUserInfo(false);

            }
        };

    useEffect(() => {
        // Añade el event listener cuando el componente se monta
        document.addEventListener('mousedown', handleClickOutside);

        // Remueve el event listener cuando el componente se desmonta
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const {isAuthenticated, userData, logout} = useAuth();
    const [showUserInfo, setShowUserInfo] = useState(false);

    return(
    <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                    <img className="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"/>
                </div>
                <div className="hidden sm:ml-6 sm:block">   
                </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown  */}
                <div className="relative ml-3">
                    { isAuthenticated ? (
                        <div className="relative">
                            <button 
                                type="button" 
                                className="relative flex px-5 py-2 rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:bg-gray-900" 
                                aria-expanded="false" 
                                aria-haspopup="true"
                                onClick={()=>{setShowUserInfo(!showUserInfo)}}>
                            <span className="absolute -inset-1.5"></span>
                            <span className="sr-only">Open user menu</span>
                            <div className="flex items-center space-x-2" >
                                <p className="text-white">{userData?.first_name}</p>
                                { userData?.img ? (
                                    <img 
                                    className="h-8 w-8 rounded-full" 
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                                    alt=""/>
                                ):(
                                    <div className="h-8 w-8 text-lg rounded-full bg-slate-400 flex items-center justify-center">
                                    <p>{userData?.first_name[0].toUpperCase()}</p>
                                </div>
                                )}
                            </div>
                            </button>
                            <div
                            ref={userRef} 
                            className={`${showUserInfo ? 'absolute' : 'hidden'} z-50  my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}>
                                <div 
                                className="px-4 py-3 "
                                
                                >
                                <span className="block text-sm text-gray-900 dark:text-white">{userData?.first_name} {userData?.last_name}</span>
                                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{userData?.email}</span>
                                </div>
                                <ul className="py-2" aria-labelledby="user-menu-button">
                                <li>
                                    <Link to='dashboard'>
                                        <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</p>
                                    </Link>
                                </li>
                                <li>
                                    <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</p>
                                </li>
                                <li>
                                    <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</p>
                                </li>
                                <li>
                                    <p  
                                        className="cursor-pointer block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-red-500"
                                        onClick={() => {
                                            console.log("Logout clicked"); // Verifica si esto se imprime en la consola
                                            logout();
                                            setShowUserInfo(false);
                                          }}
                                    >Sign out</p>
                                </li>
                                </ul>
                            </div>
                        </div>
                    ):(
                        <div>
                            <Link to={'/login'}>
                            <button className="bg-white h-10 w-24 rounded-xl" >
                                Log In
                            </button></Link>
                        </div>
                    )}
                </div>
            </div>
            </div>
        </div>
    </nav>
)};
export default Navbar;