// import React, { useEffect, useState } from "react";

import { useState, useEffect } from "react";
import { IoCloudUploadOutline, IoTrashOutline } from "react-icons/io5";
import Dropzone from "react-dropzone";

interface IProp {
  state: File | null;
  setState: (arg: File | null) => void;
}

export default function SelectorDeArchivos({ state, setState }: IProp) {
  // estado file para guardar el archivo y su vista previa
  // const [file, setFile] = useState<File | null>(null);
  //   estado preview guarda una url temporal para mostrar el archivo
  const [preview, setPreview] = useState<string | null>(null);

  // Clean up preview URL when file changes or component unmounts
  useEffect(() => {
    if (!state) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(state);
    setPreview(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [state]);

  //   handleDrop: función que recibe por parámetros un array con los archivos seleccionados
  const handleDrop = (acceptedFiles: File[]) => {
    const uploaded = acceptedFiles[0];
    setState(uploaded);
  };
  // useEffect(() => {
  //   file &&
  // }, [file]);

  return (
    <div className="flex-[1]">
      {/* Dropzone es un componente que espera como children una función */}
      <Dropzone onDrop={handleDrop}>
        {/* al soltar o seleccionar un archivo se dispara onDrop */}
        {/* esta función recibe getRootProps que se usa para hacer la zona de arrastre */}
        {/* esta función recibe getRootProps que se usa para hacer el input que al hacer click te permite seleccionar un archivo */}
        {({ getRootProps, getInputProps }) => (
          <section className="flex items-center justify-center w-full ">
            <div className="w-full p-3 border border-gray-300 rounded bg-white">
              {state ? (
                <div className="flex flex-col items-center justify-start relative">
                  <button
                    type="button"
                    className="absolute top-0 right-0 p-1 text-gray-500 hover:text-red-600"
                    title="Eliminar archivo"
                    onClick={() => setState(null)}
                  >
                    <IoTrashOutline className="text-xl" />
                  </button>
                  <p className="mb-2 font-semibold">{state.name}</p>
                  {state.type.startsWith("image/") && preview && (
                    <img src={preview} alt="Preview" className="border w-36" />
                  )}
                  {/*
                  {state.type === "application/pdf" && preview && (
                    <iframe
                      src={preview}
                      width="40%"
                      height="400px"
                      title="PDF preview"
                    />
                  )}
                  */}
                </div>
              ) : (
                <div
                  {...getRootProps()}
                  className="flex flex-col items-center justify-center py-5 border border-gray-400 border-dashed rounded cursor-pointer"
                >
                  <IoCloudUploadOutline className="text-3xl text-gray-500 lg:text-3xl" />
                  <input {...getInputProps()} />
                  <p className="text-xs text-center text-gray-500 ">
                    Arrastre y suelte un archivo aquí, o haga clic para seleccionarlo.
                  </p>
                </div>
              )}
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
}
