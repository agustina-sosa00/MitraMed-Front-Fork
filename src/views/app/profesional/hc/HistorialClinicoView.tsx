import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TablaDefault } from "@/frontend-resourses/components";
import { Document, Page, pdfjs } from "react-pdf";
import { FiDownload } from "react-icons/fi";
// import { IoTrashOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useMedicalHistoryContext } from "../../../../context/MedicalHistoryContext";
import {
  getIdOpera,
  obtenerPacienteHc,
  descargarArchivoDropbox,
} from "@/views/app/profesional/hc/service/HistorialClinicoService";
import SearchPatientCard from "@/views/app/profesional/_components/features/SearchPatientCard";
import FormHistoria from "./_components/FormHistoria";
// import Cookies from "js-cookie";
import Swal from "sweetalert2";
import workerSrc from "pdfjs-dist/build/pdf.worker?url";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import TitleView from "../../_components/features/TitleView";
import { Modal } from "@/views/_components/Modal";
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

type HcRow = {
  id: string | number;
  idhistoria?: number | string;
  fecha: string;
  detalle: string;
  ndoctor: string;
  obs: string;
};

type ApiHcRow = Omit<HcRow, "id">;

export default function HistorialClinicoView() {
  const {
    dataPaciente,
    setDataPaciente,
    editMode,
    hcSelected,
    setHcSelected,
    refetchHC,
    setRefetchHC,
    // idpaciente,
    setIdpaciente,
    dniHistory,
    setDniHistory,
    hasConfirmed,
    setHasConfirmed,
    uiLoading,
    setUiLoading,
    dniInput,
    setDniInput,
    clearContext,
    // getContext,
  } = useMedicalHistoryContext();

  // const infoProfessional = Cookies.get("dataProfessional");
  const [focusState, _setFocusState] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const padre = 1;

  // preview archivo (thumbnail + modal)
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewBlob, setPreviewBlob] = useState<Blob | null>(null);
  const [previewExt, setPreviewExt] = useState<string | null>(null);
  const [previewPage, setPreviewPage] = useState(1);
  const [previewNumPages, setPreviewNumPages] = useState(0);
  const [loadingBlob, setLoadingBlob] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const [errorState, setErrorState] = useState("");

  const mutationObtenerPacienteHc = useMutation({
    mutationFn: (dni: string) => obtenerPacienteHc(dni),
    onError: (error) => {
      console.error("Error obtenerPacienteHc:", error);
    },
    onSuccess: (data) => {
      // console.log(data);
      if (!data.data) {
        setErrorState(data.message || "Paciente inexistente");
        return;
      }

      setDataPaciente(data?.data);
      setIdpaciente(data?.data?.paciente?.idpaciente);
      setDniHistory(data?.data?.paciente?.dni);
      setHasConfirmed(true);
    },
  });

  const { data: datosArchivo } = useQuery({
    queryKey: ["datosArchivo", dniHistory, hcSelected?.idhistoria],
    queryFn: () =>
      getIdOpera({
        dni: Number(dniHistory),
        idhistoria: Number(hcSelected!.idhistoria),
      }),
    enabled: previewOpen,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const hasFile = Boolean(datosArchivo?.data?.idopera && datosArchivo?.data?.extension);

  const { mutate: descargarDropbox } = useMutation({
    mutationFn: descargarArchivoDropbox,
    onMutate: () => setLoadingBlob(true),
    onError: () => {
      setPreviewBlob(null);
      setPreviewExt(null);
    },
    onSuccess: (data) => {
      setPreviewBlob(data);
      setPreviewExt(datosArchivo?.data?.extension ?? null);
      setPreviewPage(1);
    },
    onSettled: () => setLoadingBlob(false),
  });

  const columnasTabla = [
    // ID
    {
      key: "id",
      label: "ID",
      minWidth: "37",
      maxWidth: "45",
      renderCell: (item) => item.id,
    },
    // FECHA
    {
      key: "fecha",
      label: "Fecha",
      minWidth: "100",
      maxWidth: "120",
      renderCell: (item) => {
        const raw = item.fecha;
        const fecha = raw.split("-").reverse().join("/");
        return fecha;
      },
    },
    // DETALLE
    {
      key: "detalle",
      label: "Motivo de Consulta",
      minWidth: "230",
      maxWidth: "500",
    },
    // NDOCTOR
    {
      key: "ndoctor",
      label: "Profesional",
      minWidth: "170",
      maxWidth: "300",
    },
  ];

  const dataHistoria = Array.isArray(dataPaciente?.hc)
    ? dataPaciente.hc.map((r: ApiHcRow, idx) => ({
        id: (idx + 1).toString(),
        ...r,
      }))
    : [];

  const propsTabla = {
    datosParaTabla: dataHistoria,
    objectColumns: columnasTabla,
    objectStyles: {
      heightContainer: "353px",
      addHeaderColor: "#022539",
      withScrollbar: true,
      withBorder: true,
      viewport1440: {
        heightContainer1440px: "700px",
      },
      // viewport1536: {
      //   widthContainer1536px: "600px",
      //   heightContainer1536px: "400px",
      // },
      // viewport1920: {
      //   widthContainer1920px: "700px",
      //   heightContainer1920px: "500px",
      // },
    },
    selectFn: hasConfirmed,
    objectSelection: { setSeleccionado: setHcSelected },
  };

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      handleDeletePatient();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Limpiar siempre al cerrar el modal
  useEffect(() => {
    if (!previewOpen) {
      setPreviewBlob(null);
      setPreviewExt(null);
      setPreviewPage(1);
      setPreviewNumPages(0);
    }
  }, [previewOpen]);

  // Descargar archivo solo cuando previewOpen y datosArchivo están listos
  useEffect(() => {
    if (!previewOpen) return;
    setPreviewBlob(null);
    setPreviewExt(null);
    setPreviewPage(1);
    setPreviewNumPages(0);
    const idOpera = datosArchivo?.data?.idopera;
    const ext = datosArchivo?.data?.extension;
    if (!idOpera || !ext) return;
    setPreviewExt(ext);
    descargarDropbox({ idopera: idOpera, extension: ext });
  }, [previewOpen, datosArchivo]);

  useEffect(() => {
    if (refetchHC && dniHistory) {
      mutationObtenerPacienteHc.mutate(dniHistory);
      setRefetchHC(false);
      setHcSelected(null);
    }
  }, [refetchHC, dniHistory]);

  function handleFindPatient(dni: string) {
    setUiLoading(true);
    setTimeout(() => {
      mutationObtenerPacienteHc.mutate(dni);
      setUiLoading(false);
    }, 1000);
  }

  function handleDeletePatient() {
    clearContext();
  }

  function handleCancelEdit() {
    // setHcSelected(null);
    setHasConfirmed(false);
  }

  function handleDownload(e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) {
    e.preventDefault();
    if (!previewBlob || !hasFile) return;

    Swal.fire({
      title: "¿Descargar Archivo?",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
      confirmButtonColor: "#518915",
      cancelButtonColor: "#d33",
    }).then((res) => {
      if (!res.isConfirmed) return;
      setDownloading(true);
      setTimeout(() => {
        const url = URL.createObjectURL(previewBlob);
        const nombre = `${datosArchivo?.data?.idopera}.${datosArchivo?.data?.extension}`;
        const a = document.createElement("a");
        a.href = url;
        a.download = nombre;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setDownloading(false);
      }, 300);
    });
  }

  return (
    <>
      <TitleView title="Historia Clínica" />
      {/* Buscador */}
      <div className="flex items-center justify-start w-full gap-1 py-1 min-h-24 ">
        <SearchPatientCard
          padre={padre}
          data={hasConfirmed ? dataPaciente?.paciente : null}
          dniInput={dniInput}
          setDniInput={setDniInput}
          onSearch={handleFindPatient}
          setPreviewOpen={setPreviewOpen}
          setStateModal={setShowModal}
          hasConfirmed={hasConfirmed}
          loading={uiLoading}
          handleDeletePatient={handleDeletePatient}
          handleCancel={handleCancelEdit}
          errorState={errorState}
          setErrorState={setErrorState}
        />
      </div>

      {/* Tabla y Observaciones */}
      <div className="flex items-start justify-between w-full gap-2 pt-1 xl:justify-center ">
        {/* Tabla */}
        <div className="flex min-w-[550px] justify-center overflow-x-auto ">
          <TablaDefault props={propsTabla} />
        </div>

        {/* Observaciones */}
        <div className="flex flex-col gap-2 p-2 bg-white border border-gray-300 rounded w-[600px] xl:w-[700px] h-[355px] xg:h-[400px] xxl:h-[700px] ">
          <div className="flex flex-col items-start w-full">
            <div className="w-full ">
              <label className="text-sm font-medium text-primaryBlue">Motivo de Consulta:</label>
            </div>
            <div className="w-full h-8 px-2 py-1 font-bold border border-gray-300 rounded cursor-default bg-lightGray text-primaryBlue">
              {hcSelected && hcSelected.detalle}
            </div>
          </div>

          <div className="flex flex-col items-start w-full ">
            <div className="w-full">
              <label className="text-sm font-medium text-primaryBlue">Evolución:</label>
            </div>
            <div
              className="w-full h-[250px] xl:h-[590px] px-2 py-1 font-bold border border-gray-300 rounded bg-lightGray text-primaryBlue overflow-y-auto cursor-default"
              style={{ whiteSpace: "pre-line" }}
            >
              {hcSelected && hcSelected.obs
                ? hcSelected.obs
                    .split("_")
                    .map((item) => item.split("@")[0])
                    .filter((val) => val && val !== "10")
                    .join("\n")
                : ""}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de PREVIEW con botón de Descargar */}
      {previewOpen && (
        <Modal
          open={previewOpen}
          onClose={() => {
            setPreviewOpen(false);
            setPreviewBlob(null);
            setPreviewExt(null);
          }}
        >
          <div className="flex flex-col w-full min-w-[600px] h-[520px]">
            <div className="flex items-center justify-end w-full px-2">
              <button
                onClick={() => setPreviewOpen(false)}
                className="p-1 text-xl rounded text-primaryBlue hover:bg-primaryBlue hover:text-white"
                aria-label="Cerrar"
                title="Cerrar"
              >
                <IoClose />
              </button>
            </div>

            {loadingBlob ? (
              <div className="flex items-center justify-center flex-1">
                <ClipLoader color="#2563eb" size={48} speedMultiplier={0.8} />
                <span className="ml-4 text-lg text-primaryBlue">Cargando archivo...</span>
              </div>
            ) : !previewBlob ? (
              <div className="grid flex-1 place-items-center text-primaryBlue/60">
                No hay archivo para mostrar
              </div>
            ) : previewExt === "pdf" ? (
              <div className="flex flex-col items-center flex-1">
                <Document
                  file={previewBlob}
                  onLoadSuccess={({ numPages }) => setPreviewNumPages(numPages)}
                  className="w-full flex justify-center  overflow-y-scroll my-3 h-[400px]"
                >
                  <Page pageNumber={previewPage} width={600} className="border rounded" />
                </Document>

                <div className="flex items-center justify-between w-full max-w-[720px] gap-3 py-2 px-2">
                  <div className="flex items-center gap-3">
                    <button
                      disabled={previewPage <= 1}
                      onClick={() => setPreviewPage((p) => p - 1)}
                      className={`px-2 py-1  ${previewPage <= 1 ? "text-gray-400" : " text-primaryBlue "}`}
                    >
                      ◀
                    </button>
                    <span className="text-primaryBlue">
                      Página {previewPage} de {previewNumPages}
                    </span>
                    <button
                      disabled={previewPage >= previewNumPages}
                      onClick={() => setPreviewPage((p) => p + 1)}
                      className={`px-2 py-1  ${
                        previewPage >= previewNumPages ? "text-gray-400" : " text-primaryBlue "
                      }`}
                    >
                      ▶
                    </button>
                  </div>

                  <a
                    href="#"
                    onClick={handleDownload}
                    className="flex items-center justify-center gap-2 px-4 font-medium text-white rounded h-9 bg-primaryGreen hover:bg-greenHover"
                  >
                    {downloading ? (
                      <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 100 8z"
                        />
                      </svg>
                    ) : (
                      <>
                        Descargar <FiDownload />
                      </>
                    )}
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex flex-1 px-4">
                <div className="grid flex-1 place-items-center">
                  <img
                    src={URL.createObjectURL(previewBlob)}
                    className="max-w-[500px]  w-auto object-contain border rounded"
                  />
                </div>

                {/* Botones */}
                <div className="flex flex-col items-center justify-start gap-2 py-2">
                  <a
                    href="#"
                    onClick={handleDownload}
                    className="flex items-center justify-center gap-2 px-4 font-medium text-white rounded h-9 bg-primaryGreen hover:bg-greenHover"
                  >
                    {downloading ? (
                      <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 100 8z"
                        />
                      </svg>
                    ) : (
                      <>
                        <FiDownload />
                      </>
                    )}
                  </a>
                  {/* <button
                    onClick={handleDeleteFile}
                    className="flex items-center justify-center gap-2 px-4 font-medium text-white bg-red-500 rounded h-9 hover:bg-red-600"
                    title="Eliminar archivo"
                  >
                    <IoTrashOutline />
                  </button> */}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)} open={showModal}>
          <FormHistoria
            // handle={handleOnFocusInput}
            // infoProfessional={JSON.parse(infoProfessional!)}
            hc={dniHistory}
            focusState={focusState}
            setStateModal={setShowModal}
            hcSelected={editMode ? hcSelected : undefined}
          />
        </Modal>
      )}
    </>
  );
}
