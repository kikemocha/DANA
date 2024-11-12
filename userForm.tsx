import React from "react";
import { regions } from "./regions";

interface UserFormData {
  location: string;
  drivingLicense: string;
  vehicleAvailable: string;
  liftHeavyObjects: number;
  climbStairsWithWeight: number;
  carryBackpack: number;
  runWalk30Minutes: number;
  moveUnconsciousPerson: number;
  skills: { skillName: string; level: number }[];
  tags: { skillName: string; level: number }[];
}

interface UserFormProps {
  formData: UserFormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  handleSkillChange: (index: number, field: "skillName" | "level", value: string | number) => void;
  addSkillToList: () => void;
  removeSkillFromList: (index: number) => void;
  openModal: () => void; // Añade esta nueva función para abrir el modal
}

const UserForm: React.FC<UserFormProps> = ({
  formData,
  handleInputChange,
  handleSkillChange,
  addSkillToList,
  removeSkillFromList,
  openModal, // Recoge la función openModal
}) => {
  return (
    <form className="w-1/2 mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 space-y-4">
      {/* Ubicación */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-white">Ubicación</label>
        <select
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          className="w-full p-2 border rounded bg-gray-700 text-white"
        >
          <option value="">Selecciona una provincia</option>
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

      {/* Carné de Conducir */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-white">Carné de Conducir</label>
        <select
          name="drivingLicense"
          value={formData.drivingLicense}
          onChange={handleInputChange}
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
        <label className="block text-sm font-medium text-white">Vehículo Disponible</label>
        <input
          type="text"
          name="vehicleAvailable"
          value={formData.vehicleAvailable}
          onChange={handleInputChange}
          className="w-full p-2 border rounded bg-gray-700 text-white"
        />
      </div>

      {/* Aptitudes y Nivel */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-white">Aptitudes y Nivel</label>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Aptitud"
            value={formData.skills[0].skillName}
            onChange={(e) => handleSkillChange(0, "skillName", e.target.value)}
            className="w-1/2 p-2 border rounded bg-gray-700 text-white"
          />
          <select
            value={formData.skills[0].level}
            onChange={(e) => handleSkillChange(0, "level", Number(e.target.value))}
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
            onClick={addSkillToList}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Añadir Aptitud
          </button>
        </div>
        {/* Mostrar etiquetas de Skills */}
        <div className="mt-2 flex flex-wrap space-x-2">
          {formData.tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center px-2 py-1 bg-gray-600 text-white rounded"
            >
              {tag.skillName} (Nivel {tag.level})
              <button
                type="button"
                onClick={() => removeSkillFromList(index)}
                className="ml-2 text-red-500"
              >
                x
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Botón para abrir el Formulario de Estado Físico */}
      <button
        type="button"
        onClick={openModal}
        className="p-2 w-full border border-gray-500 rounded bg-gray-700 text-white"
      >
        Formulario de Estado Físico
      </button>

      {/* Botón de Enviar */}
      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white rounded"
      >
        Enviar
      </button>
    </form>
  );
};

export default UserForm;
