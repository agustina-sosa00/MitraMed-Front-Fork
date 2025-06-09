import React from "react";

export const FilterTableSchedules: React.FC = () => {
  return (
    <div className="w-full ">
      <div className="flex items-center justify-start w-1/3 gap-1 p-2 ">
        <label className="text-sm font-medium text-blue">
          Filtrar por dia:{" "}
        </label>
        <input
          required
          placeholder=""
          type="date"
          className="px-2 py-1 text-sm border border-gray-300 rounded bg-lightGray "
        />
      </div>
    </div>
  );
};
