import React, { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

import Dropzone from "react-dropzone";
export const UploadStudy: React.FC = () => {
  // estado file para guardar el archivo y su vista previa
  const [file, setFile] = useState<File | null>(null);
  //   estado preview guarda una url temporal para mostrar el archivo
  const [preview, setPreview] = useState<string | null>(null);
  console.log(file);

  //   handleDrop: funcion que recibe por parametros un array con los archivos seleccionados
  const handleDrop = (acceptedFiles: File[]) => {
    console.log("acceptedFiles", acceptedFiles);
    // tomamos solo el primer archivo subido o seleccionado
    const uploaded = acceptedFiles[0];
    // seteamos el archivo al estado file
    setFile(uploaded);

    if (uploaded) {
      // usamos createObjectURL() para generar una url temporal
      const url = URL.createObjectURL(uploaded);
      //   se setea al estado preview
      setPreview(url);
    }
  };
  return (
    <div className="w-full h-screen pt-24">
      {/* Dropzone es un componente que espera como children una funcion */}
      <Dropzone onDrop={handleDrop}>
        {/* al soltar o seleccionar un archivo se dispara onDrop */}
        {/* esta funcion recibe getRootProps que se usa para hacer la zona de arrastre */}
        {/* esta funcion recibe getRootProps que se usa para hacer el input que al hacer click te permite seleccionar un archivo */}
        {({ getRootProps, getInputProps }) => (
          <section className="flex items-center justify-center w-full ">
            <div className="w-2/3 p-3 rounded bg-[#f1f1f1]">
              <div
                {...getRootProps()}
                className="flex flex-col items-center justify-center p-5 border border-gray-400 border-dashed rounded cursor-pointer"
              >
                <IoCloudUploadOutline className="text-3xl text-gray-500 lg:text-5xl" />
                <input {...getInputProps()} />
                <p className="text-xs text-center text-gray-500 lg:text-sm">
                  Arrastre y suelte un archivo aquí, o haga clic para
                  seleccionarlo.
                </p>
              </div>
            </div>
          </section>
        )}
      </Dropzone>
      {file && (
        <div className="flex flex-col items-center justify-start ">
          <p className="mb-2 font-semibold">
            Archivo seleccionado: {file.name}
          </p>

          {file.type.startsWith("image/") && (
            <img src={preview!} alt="Preview" className="border w-36" />
          )}

          {file.type === "application/pdf" && preview && (
            <iframe
              src={preview ?? ""}
              width="40%"
              height="500px"
              title="PDF preview"
            />
          )}
          {preview && (
            <a
              href={preview}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline "
            >
              👉 Abrir PDF en nueva pestaña
            </a>
          )}
        </div>
      )}
    </div>
  );
};
