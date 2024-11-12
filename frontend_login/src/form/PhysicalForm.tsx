import React from "react";

const PhysicalForm: React.FC = () =>{
    return(
        <div className="w-full mx-auto p-6 bg-blue-900 bg-opacity-20 border border-gray-200 rounded-3xl shadow-sm space-y-4">
        {["liftHeavyObjects", "climbStairsWithWeight", "carryBackpack", "runWalk30Minutes", "moveUnconsciousPerson"].map((field, index) => (
          <div key={index}>
            <label className="block font-medium text-white">
              {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
            </label>
            <select
              name={field}

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
    )
}

export default PhysicalForm;