import React from "react";

export const BoxButton: React.FC = () => {
  const button = ["alta turno", "prestación", "facturación"];
  return (
    <div className="flex items-end justify-center w-1/2 h-full gap-2 py-2 ">
      {button.map((item) => (
        <button className="px-2 py-1 font-medium capitalize transition-all duration-300 border border-gray-300 rounded hover:bg-gray-300 bg-lightGray text-blue">
          {item}
        </button>
      ))}
    </div>
  );
};
