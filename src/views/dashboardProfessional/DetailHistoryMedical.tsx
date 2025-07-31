import { Button } from "@/components/ui/Button";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Modal } from "@/components/ui/Modal";
import { downloadFileDropbox } from "@/services/dropboxServices";
import { useMutation } from "@tanstack/react-query";
import { useContextDropbox } from "../../context/DropboxContext";
import { IoClose } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";

import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker?url";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
// Configuración del worker de PDF.js

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export const DetailHistoryMedical: React.FC = () => {
  const { token, folder } = useContextDropbox();
  // const { id } = useParams();
  const location = useLocation();
  const state = location.state;

  const [showModal, setShowModal] = useState<boolean>(false);
  const [fileBlob, setFileBlob] = useState<Blob | null>(null);

  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  console.log(fileBlob);
  const { mutate: mutateDownloadDropbox } = useMutation({
    mutationFn: downloadFileDropbox,
    onSuccess: (data) => {
      setFileBlob(data);
    },
  });
  const handleDownloadDropbox = () => {
    setFileBlob(null);
    setShowModal(true);
    mutateDownloadDropbox({
      token: token,
      folder: folder,
      archivo: state.data.archivo,
    });
  };

  return (
    <div className="flex flex-col w-full h-screen px-20 py-10 bg-right bg-no-repeat bg-cover bg-profesional">
      <div>
        <Button
          label="volver al historial médico"
          handle={() => window.history.back()}
          icon={<IoMdArrowRoundBack className="text-2xl" />}
        />
      </div>
      <div className="flex justify-center w-full h-20 ">
        <h1 className="text-2xl font-medium uppercase lg:text-4xl text-green ">
          detalle de consulta
        </h1>
      </div>
      <div className="flex justify-between w-full ">
        <div className="flex gap-5">
          <h3 className="text-lg font-normal text-blue">
            Fecha:{" "}
            <span className="text-xl font-medium ">
              {state?.fecha.split("T")[0]}
            </span>
          </h3>
          <h3 className="text-lg font-normal text-blue">
            Profesional:{" "}
            <span className="text-xl font-medium ">{state?.profesional}</span>
          </h3>
        </div>

        <Button
          label="ver archivos"
          handle={handleDownloadDropbox}
          classButton="bg-blue hover:bg-blueHover px-5 py-1 text-white rounded"
        />
      </div>
      <div className="w-full p-2 my-3 bg-gray-100 rounded">
        <h1 className=" text-blue">
          Motivo de la consulta:{" "}
          <span className="font-medium">{state?.motivo}</span>
        </h1>
        <p className="text-blue">
          Descripcion:{" "}
          <span className="font-medium">{state?.data.description}</span>
        </p>
      </div>
      {
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <div className="flex  justify-center h-[500px] whitespace-pre-line ">
            {fileBlob && (
              <div className="flex flex-col items-center w-full gap-2 ">
                <div className="flex items-center justify-end w-full px-5 ">
                  <Button
                    icon={<IoClose />}
                    handle={() => setShowModal(false)}
                    classButton="text-xl text-blue rounded hover:bg-blue hover:text-white p-1"
                  />
                </div>

                {state.data.archivo.endsWith(".pdf") ? (
                  <div className="w-full">
                    <Document
                      file={fileBlob}
                      onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                      className={
                        "w-full flex justify-center  overflow-y-scroll my-3 h-[400px] "
                      }
                    >
                      <Page
                        pageNumber={currentPage}
                        width={450}
                        className={"border border-gray-300 rounded p-1"}
                      />
                    </Document>
                    <div className="flex items-center justify-between w-full h-16 gap-5 px-5 ">
                      <div className="flex-[1] flex items-center justify-center gap-3 ">
                        <button
                          disabled={currentPage <= 1}
                          onClick={() => setCurrentPage(currentPage - 1)}
                          className={`px-2 py-1 border border-gray-300 rounded ${
                            currentPage <= 1
                              ? "text-gray-400"
                              : "  hover:bg-blue text-blue hover:text-white transition-all duration-300"
                          }`}
                        >
                          <IoMdArrowRoundBack className={`text-xl  `} />
                        </button>
                        <span className="text-blue">
                          Página {currentPage} de {numPages}
                        </span>
                        <button
                          disabled={currentPage >= numPages}
                          onClick={() => setCurrentPage(currentPage + 1)}
                          className={`px-2 py-1 border border-gray-300 rounded ${
                            currentPage >= numPages
                              ? "text-gray-400"
                              : "  hover:bg-blue text-blue hover:text-white transition-all duration-300"
                          }`}
                        >
                          <IoMdArrowRoundBack
                            className={`text-xl rotate-180  `}
                          />
                        </button>
                      </div>

                      <Button
                        label="descargar"
                        handle={() => {}}
                        classButton="h-8 text-white px-5 py-1 flex justify-center items-center bg-green rounded transition-all duration-300 hover:bg-greenHover "
                        icon={<FiDownload />}
                      />
                    </div>{" "}
                  </div>
                ) : (
                  <img
                    src={URL.createObjectURL(fileBlob)}
                    alt="Archivo descargado"
                    style={{ width: "100%" }}
                  />
                )}
              </div>
            )}
          </div>
        </Modal>
      }
    </div>
  );
};
