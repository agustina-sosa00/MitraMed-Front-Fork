import React from "react";

interface IPropsModal {
  close?: () => void;
  title: string;
  children: React.ReactNode;
  modalWidth?: string;
}

export const Modal: React.FC<IPropsModal> = ({ close, title, children, modalWidth }) => {
  const handleClose = () => {
    close && close();
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`flex flex-col items-center  p-8 bg-white rounded shadow-xl ${modalWidth ? modalWidth : "w-full max-w-2xl"}`}
      >
        <h3 className="mb-6 text-2xl font-semibold text-center text-primaryBlue">{title}</h3>

        {children}
      </div>
    </div>
  );
};
