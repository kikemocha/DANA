import React, { useState } from "react";
import './App.css';
import UserForm from './components/userForm';
import PhysicalStatusForm from './components/physicalState';

interface FormData {
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

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    location: "",
    drivingLicense: "",
    vehicleAvailable: "",
    liftHeavyObjects: 1,
    climbStairsWithWeight: 1,
    carryBackpack: 1,
    runWalk30Minutes: 1,
    moveUnconsciousPerson: 1,
    skills: [{ skillName: "", level: 1 }],
    tags: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  // Funciones para manejar el modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Manejar los cambios en los inputs
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSkillChange = (index: number, field: "skillName" | "level", value: string | number) => {
    const updatedSkills = formData.skills.map((skill, i) =>
      i === index ? { ...skill, [field]: value } : skill
    );
    setFormData((prevData) => ({ ...prevData, skills: updatedSkills }));
  };

  const addSkillToList = () => {
    const newSkill = formData.skills[0];
    if (newSkill.skillName && newSkill.level) {
      setFormData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, newSkill],
        skills: [{ skillName: "", level: 1 }], // Resetea la habilidad actual
      }));
    }
  };

  const removeSkillFromList = (index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      {!isModalOpen ? ( // Si el modal no está abierto, muestra el formulario de usuario
        <UserForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSkillChange={handleSkillChange}
          addSkillToList={addSkillToList}
          removeSkillFromList={removeSkillFromList}
          openModal={openModal} // Pasa la función para abrir el modal
        />
      ) : ( // Si el modal está abierto, muestra el formulario de estado físico
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/2">
            <PhysicalStatusForm formData={formData} handleInputChange={handleInputChange} />
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="p-2 bg-blue-600 text-white rounded"
                onClick={closeModal}
              >
                Guardar
              </button>
              <button
                className="p-2 bg-gray-500 text-white rounded"
                onClick={closeModal}
              >
                Salir sin Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
