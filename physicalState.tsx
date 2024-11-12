import React from "react";

// Define una interfaz para las props
interface PhysicalStatusFormProps {
  formData: {
    liftHeavyObjects: number;
    climbStairsWithWeight: number;
    carryBackpack: number;
    runWalk30Minutes: number;
    moveUnconsciousPerson: number;
  };
  handleInputChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

// Usa la interfaz en tu componente
const PhysicalStatusForm: React.FC<PhysicalStatusFormProps> = ({ formData, handleInputChange }) => {
  return (
    <div className="space-y-4">
      {["liftHeavyObjects", "climbStairsWithWeight", "carryBackpack", "runWalk30Minutes", "moveUnconsciousPerson"].map((field, index) => (
        <div key={index}>
          <label className="block font-medium text-white">
            {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
          </label>
          <select
            name={field}
            value={formData[field as keyof typeof formData]}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-gray-700 text-white"
          >
            {[1, 2, 3, 4, 5].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default PhysicalStatusForm;
