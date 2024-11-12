import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import UserFormData from "../form/UserFormData";
import UserInfo from "../form/UserInfo";
import PhysicalForm from "../form/PhysicalForm";

const Dashboard: React.FC = () =>{
    const {userData} = useAuth();
    const [showPopUp, setShowPopUp] = useState(true);
    useEffect(()=>{
        if (userData?.data_exist === true){
            setShowPopUp(false);
        }
    },[userData])
    
    return (
        <div className="h-screen flex flex-col">
            <nav className="bg-gray-800">
                <div className="h-16 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="flex flex-1 h-full items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center justify-center mx-auto">
                            <Link to='/'>
                                <img className="h-8 w-auto mx-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"/>
                            </Link>                        
                        </div>
                        <div className="hidden sm:ml-6 sm:block">   
                        </div>
                    </div>
                </div>
            </nav>
            
            <div className="flex-1 w-full bg-slate-200 overflow-hidden">
                <div className="flex mx-auto w-3/4 h-full pt-4">
                    <div className="w-[30%] flex-shrink-0">
                        {/* Foto de Perfil, más nombre y email*/}
                        <div className="h-1/2 w-full bg-blue-900 bg-opacity-20 rounded-3xl shadow-sm">
                            <div className="h-[60%] flex justify-center items-center relative group">
                                {userData?.img ? (
                                    <img 
                                        className="h-56 w-56 rounded-full object-cover" 
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                                        alt=""
                                    />
                                ) : (
                                    <div className="h-56 w-56 text-8xl rounded-full bg-slate-400 flex items-center justify-center overflow-hidden relative group-hover:bg-opacity-75 cursor-pointer">
                                        <p>{userData?.first_name[0].toUpperCase()}</p>

                                        {/* Overlay que aparece cuando se hace hover en el contenedor */}
                                        <div className="hidden group-hover:flex absolute inset-0 bg-gray-500 bg-opacity-75 items-center justify-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-12 h-12 text-white"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="h-[40%]">
                                <ul className="text-center h-3/4 flex flex-col justify-around">
                                    <li className="font-bold">{userData?.first_name} {userData?.last_name}</li>
                                    <li>{userData?.email}</li>
                                    <li>{userData?.phone_number}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="w-[70%] h-full overflow-y-auto px-4">
                        <UserInfo userData={userData} />
                        <UserFormData/>
                        <PhysicalForm/>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;