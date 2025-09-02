import { Button } from "@/components/ui/Button";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Modal } from "@/components/ui/Modal";
import { downloadFileDropbox } from "@/services/MedicalHistoryService";
import { useMutation } from "@tanstack/react-query";
import { IoClose } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import Swal from "sweetalert2";
import { LuFileX2 } from "react-icons/lu";

import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker?url";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import TextAlert from "@/components/ui/TextAlert";

// Configuración del worker de PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export const DetailHistoryMedical: React.FC = () => {
  const folder = localStorage.getItem("folder") || "";
  // const { id } = useParams();
  const location = useLocation();
  const state = location.state;

  const [showModal, setShowModal] = useState<boolean>(false);
  const [fileBlob, setFileBlob] = useState<Blob | null>(null);

  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loader, setLoader] = useState<boolean>(false);
  const [loadingFile, setLoadingFile] = useState<boolean>(false);

  const { mutate: mutateDownloadDropbox } = useMutation({
    mutationFn: downloadFileDropbox,
    onMutate: () => {
      setLoadingFile(true);
    },
    onSuccess: (data) => {
      setFileBlob(data);
      setLoadingFile(false);
    },
    onError: () => {
      setLoadingFile(false);
    },
  });
  const handleDownloadDropbox = () => {
    setFileBlob(null);
    setShowModal(true);
    mutateDownloadDropbox({
      folder: folder,
      archivo: state.data.archivo,
    });
  };

  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    Swal.fire({
      title: "¿Descargar Archivo?",
      text: "Se Descargará el Archivo en tu Dispositivo.",

      showCancelButton: true,
      confirmButtonText: "Sí, Descargar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#518915",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoader(true);
        setTimeout(() => {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(fileBlob!);
          link.download = state.data.archivo;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setLoader(false);
        }, 2000);
      }
    });
  };

  return (
    <div className="flex flex-col w-full h-screen px-20 py-10 bg-right bg-no-repeat bg-cover bg-profesional">
      <div className="absolute right-5 top-5">
        <TextAlert />
      </div>
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
            <span className="text-xl font-medium ">{state?.ndoctor}</span>
          </h3>
        </div>

        <Button
          label="ver archivos"
          handle={handleDownloadDropbox}
          classButton="bg-blue hover:bg-blueHover px-5 py-1 text-white rounded"
        />
      </div>
      <div className="flex flex-col w-full gap-2 p-2 my-3 bg-gray-100 rounded">
        <h1 className=" text-blue">
          Motivo de la Consulta:{" "}
          <span className="font-medium">{state?.detalle}</span>
        </h1>
        <div className="border-b border-gray-300 "></div>
        <p className="break-words whitespace-normal text-blue">
          Descripcion: {""}
          <span className="font-medium">{state?.obs}</span>
        </p>
      </div>
      {
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <div className="flex  justify-center h-[500px] whitespace-pre-line ">
            {loadingFile ? (
              // Loader grande mientras descarga desde Dropbox
              <div className="flex items-center justify-center w-full h-full">
                <svg
                  className="circle-loader animate-spin"
                  viewBox="25 25 50 50"
                >
                  <circle
                    className="circleNormal"
                    r="20"
                    cy="50"
                    cx="50"
                  ></circle>
                </svg>
              </div>
            ) : fileBlob ? (
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

                      <a
                        href="#"
                        onClick={handleDownload}
                        className="flex items-center justify-center h-8 gap-2 px-5 py-1 font-medium text-white capitalize transition-all duration-300 rounded bg-green hover:bg-greenHover "
                      >
                        {loader ? (
                          <svg
                            className="w-5 h-5 circle-loader animate-spin"
                            viewBox="25 25 50 50"
                          >
                            <circle
                              r="20"
                              cy="50"
                              cx="50"
                              className="circleWhite"
                            ></circle>
                          </svg>
                        ) : (
                          <>
                            Descargar <FiDownload />
                          </>
                        )}
                      </a>
                    </div>{" "}
                  </div>
                ) : (
                  <div className="flex flex-col items-end justify-end h-full px-5 ">
                    <div className="flex items-center justify-center h-full">
                      <img
                        src={URL.createObjectURL(fileBlob)}
                        alt="Archivo descargado"
                        style={{ width: "100%", maxHeight: "400px" }}
                      />
                    </div>

                    <a
                      href="#"
                      onClick={handleDownload}
                      className="flex items-center justify-center h-8 gap-2 px-5 py-1 font-medium text-white capitalize transition-all duration-300 rounded bg-green hover:bg-greenHover "
                    >
                      {loader ? (
                        <svg
                          className="w-5 h-5 circle-loader animate-spin"
                          viewBox="25 25 50 50"
                        >
                          <circle
                            r="20"
                            cy="50"
                            cx="50"
                            className="circleWhite"
                          ></circle>
                        </svg>
                      ) : (
                        <>
                          Descargar <FiDownload />
                        </>
                      )}
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full text-gray-500 ">
                <div className="flex items-start justify-end w-full h-10 ">
                  <Button
                    icon={<IoClose />}
                    handle={() => setShowModal(false)}
                    classButton="text-xl text-blue rounded hover:bg-blue hover:text-white p-1"
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-full h-full">
                  {" "}
                  <LuFileX2 className="text-7xl " />
                  <h2 className="font-bold ">No Hay Archivos Disponibles</h2>
                </div>
              </div>
            )}
          </div>
        </Modal>
      }
    </div>
  );
};
