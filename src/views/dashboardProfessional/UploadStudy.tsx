// import React, { useEffect, useState } from "react";
import React, { useEffect, useState } from "react"; //luego borrar esta linea y descomentar la de arriba
import { IoCloudUploadOutline } from "react-icons/io5";
import Dropzone from "react-dropzone";

interface IProp {
  setState: (arg: File) => void;
}

export const UploadStudy: React.FC<IProp> = ({ setState }) => {
  // estado file para guardar el archivo y su vista previa
  const [file, setFile] = useState<File | null>(null);
  //   estado preview guarda una url temporal para mostrar el archivo
  const [preview, setPreview] = useState<string | null>(null);

  //   handleDrop: función que recibe por parámetros un array con los archivos seleccionados
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

  useEffect(() => {
    file && setState(file);
  }, [file]);

  return (
    <div className="flex-[1]">
      {/* Dropzone es un componente que espera como children una función */}
      <Dropzone onDrop={handleDrop}>
        {/* al soltar o seleccionar un archivo se dispara onDrop */}
        {/* esta función recibe getRootProps que se usa para hacer la zona de arrastre */}
        {/* esta función recibe getRootProps que se usa para hacer el input que al hacer click te permite seleccionar un archivo */}
        {({ getRootProps, getInputProps }) => (
          <section className="flex items-center justify-center w-full ">
            <div className="w-full p-3 border border-gray-300 rounded bg-lightGray">
              {file ? (
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
                      height="400px"
                      title="PDF preview"
                    />
                  )}
                </div>
              ) : (
                <div
                  {...getRootProps()}
                  className="flex flex-col items-center justify-center py-5 border border-gray-400 border-dashed rounded cursor-pointer"
                >
                  <IoCloudUploadOutline className="text-3xl text-gray-500 lg:text-3xl" />
                  <input {...getInputProps()} />
                  <p className="text-xs text-center text-gray-500 ">
                    Arrastre y suelte un archivo aquí, o haga clic para
                    seleccionarlo.
                  </p>
                </div>
              )}
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
};
