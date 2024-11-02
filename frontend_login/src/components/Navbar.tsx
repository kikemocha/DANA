import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () =>{
    const {isAuthenticated, userData} = useAuth();
    return(
    <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                {/*
                    Icon when menu is closed.

                    Menu open: "hidden", Menu closed: "block"
                */}
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                {/*
                    Icon when menu is open.

                    Menu open: "block", Menu closed: "hidden"
                */}
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
                        <div>
                            <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                            <span className="absolute -inset-1.5"></span>
                            <span className="sr-only">Open user menu</span>
                            <div className="flex items-center space-x-2">
                                <p className="text-white">{userData?.nickname}</p>
                                { userData?.img ? (
                                    <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                                ):(
                                    <div className="h-8 w-8 text-lg rounded-full bg-slate-400 flex items-center justify-center">
                                    <p>{userData?.nickname[0].toUpperCase()}</p>
                                </div>
                                )}
                            </div>
                            </button>
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