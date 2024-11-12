import React from "react";
import { regions } from "./regions";


const UserFormData: React.FC = () =>{
    return<form className="w-full mb-4 mx-auto p-6 bg-blue-900 bg-opacity-20 border border-gray-200 rounded-3xl shadow-sm space-y-4">
    {/* Carné de Conducir */}
    <div className="mb-4">
      <label className="block text-sm font-medium text-black">Carné de Conducir</label>
      <select
        name="drivingLicense"
        className="w-full p-2 border rounded bg-gray-700 text-white"
      >
        <option value="">Selecciona una opción</option>
        <option value="none">Ninguna</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
      </select>
    </div>

    {/* Vehículo Disponible */}
    <div className="mb-4">
      <label className="block text-sm font-medium text-black">Vehículo Disponible</label>
      <input
        type="text"
        name="vehicleAvailable"
        className="w-full p-2 border rounded bg-gray-700 text-white"
      />
    </div>

    {/* Aptitudes y Nivel */}
    <div className="mb-4">
      <label className="block text-sm font-medium text-black">Aptitudes y Nivel</label>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Aptitud"
          className="w-1/2 p-2 border rounded bg-gray-700 text-white"
        />
        <select
          className="w-1/4 p-2 border rounded bg-gray-700 text-white"
        >
          {[1, 2, 3, 4, 5].map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="p-2 bg-blue-500 text-white rounded"
        >
          Añadir Aptitud
        </button>
      </div>
      {/* Mostrar etiquetas de Skills */}
      <div className="mt-2 flex flex-wrap space-x-2">
        
      </div>
    </div>

    {/* Botón para abrir el Formulario de Estado Físico */}
    <button
      type="button"
      className="p-2 w-full border border-gray-500 rounded bg-gray-700 text-white"
    >
      Formulario de Estado Físico
    </button>

    {/* Botón de Enviar */}
    <button
      type="submit"
      className="w-full p-2 bg-blue-600 text-white rounded"
    >
      Guardar
    </button>
  </form>
    
}

export default UserFormData;