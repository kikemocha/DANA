import React, { useDebugValue } from "react";
import { regions } from "./regions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { UserDataType } from '../context/AuthContext'; // Asegúrate de importar el tipo correcto

// Definir el tipo de las props que espera UserInfo
interface UserInfoProps {
  userData: UserDataType | null;
}

const UserInfo: React.FC<UserInfoProps>  = ({userData}) =>{
    return(
        <form className="w-full mx-auto mb-6 p-8 bg-blue-900 bg-opacity-20 border border-gray-300 rounded-3xl shadow-lg space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Información Personal</h2>

            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input
                            type="text"
                            value={userData?.first_name}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400 focus:outline-none"
                        />
                    </div>
                    <div className="mx-auto">
                        <label className="block text-sm font-medium text-gray-700">
                            Fecha de Nacimiento
                        </label>
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400 focus:outline-none"
                            placeholderText="Selecciona una fecha"
                            showYearDropdown
                            showMonthDropdown
                            dropdownMode="select" // Hace que los dropdowns sean más eficientes
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Primer Apellido</label>
                        <input
                        type="text"
                        value={userData?.last_name}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Segundo Apellido</label>
                        <input
                        type="text"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400 focus:outline-none"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                        <input
                        type="text"
                        value={userData?.phone_number}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">email</label>
                        <input
                        type="text"
                        value={userData?.email}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400 focus:outline-none"
                        />
                    </div>
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700">DNI/NIE/NIF</label>
                <input
                    type="text"
                    value={userData?.NIF}
                    disabled={true}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400 focus:outline-none"
                />
                </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-800">Dirección de Hogar</h2>

            <div className="space-y-4">
                <div>
                <label className="block text-sm font-medium text-gray-700">Calle</label>
                <input
                    type="text"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400 focus:outline-none"
                />
                </div>

                <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Número</label>
                    <input
                    type="text"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Piso</label>
                    <input
                    type="text"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Puerta</label>
                    <input
                    type="text"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400 focus:outline-none"
                    />
                </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Código Postal</label>
                        <input
                        type="text"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ciudad</label>
                        <select
                            name="location"
                            className="w-full p-2 border rounded-lg bg-white text-black"
                        >
                        <option value="">Selecciona una ciudad</option>
                        {regions.map((region) => (
                            <optgroup key={region.name} label={region.name}>
                            {region.provinces.map((province) => (
                                <option key={province} value={province}>
                                {province}
                                </option>
                            ))}
                            </optgroup>
                        ))}
                        </select>
                    </div>
                </div>


                <div>
                <label className="block text-sm font-medium text-gray-700">País</label>
                <input
                    type="text"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400 focus:outline-none"
                />
                </div>
            </div>

            <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
                Guardar
            </button>
            </form>

    )
    
}

export default UserInfo;