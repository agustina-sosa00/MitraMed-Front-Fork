import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

import { TablaDefault } from "@/frontend-resourses/components";
import { Modal } from "@/views/auth/components/ui/Modal";
import { ContainView } from "@/views/app/components/features/ContainView";
import obtenerPacienteHc, {
  getDataDropbox,
  getAccessTokenDropbox,
  getIdOpera,
  downloadFileDropbox,
} from "@/views/app/profesional/hc/service/HistorialClinicoService";
import { useMedicalHistoryContext } from "../../../../context/MedicalHistoryContext";
import SearchPatient from "@/views/app/components/features/BuscadorDePacientes";

import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker?url";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

import { FiDownload } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import FormNuevoRegistroHc from "./components/FormNuevoRegistroHc";

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
  const queryClient = useQueryClient();

  const {
    hc,
    dniHistory,
    setDniHistory,
    hasConfirmed,
    setHasConfirmed,
    uiLoading,
    setUiLoading,
    dniInput,
    setDniInput,
  } = useMedicalHistoryContext();

  const infoProfessional = Cookies.get("dataProfessional");
  const [focusState, setFocusState] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [hcSelected, setHcSelected] = useState<HcRow | null>(null);
  const hasAccessTokenDropbox = Boolean(Cookies.get("accessTokenDropbox"));

  // preview archivo (thumbnail + modal)
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewBlob, setPreviewBlob] = useState<Blob | null>(null);
  const [previewExt, setPreviewExt] = useState<string | null>(null);
  const [previewPage, setPreviewPage] = useState(1);
  const [previewNumPages, setPreviewNumPages] = useState(0);
  const [loadingBlob, setLoadingBlob] = useState(false);
  const [downloading, setDownloading] = useState(false);

  //region queries
  const { data: dropboxData } = useQuery({
    queryKey: ["dataDropboxQuery"],
    queryFn: () => getDataDropbox(),
    enabled: !hasAccessTokenDropbox,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const { data: dataMedicalHistory } = useQuery({
    queryKey: ["medicalHistory", dniHistory],
    queryFn: () => obtenerPacienteHc({ dni: dniHistory }),
    enabled: hasConfirmed && !!dniHistory,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    gcTime: Infinity,
    initialData: () => queryClient.getQueryData(["medicalHistory", dniHistory]),
  });

  const { mutate: mutateGetAccessTokenDropbox } = useMutation({
    mutationFn: getAccessTokenDropbox,
    onError: (error) => console.error(error),
    onSuccess: (data) => {
      const accessTokenDropbox = data?.access_token;
      if (!accessTokenDropbox) return;
      Cookies.set("accessTokenDropbox", accessTokenDropbox, {
        expires: 5 / 24,
      });
    },
  });

  //region querys y mutates
  // meta del archivo según fila seleccionada
  const { data: fileMeta, isFetching: loadingMeta } = useQuery({
    queryKey: ["fileMeta", dniHistory, hcSelected?.idhistoria],
    enabled: Boolean(dniHistory && hcSelected?.idhistoria),
    queryFn: () =>
      getIdOpera({
        dni: Number(dniHistory),
        idhistoria: Number(hcSelected!.idhistoria),
      }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const hasFile = Boolean(fileMeta?.data?.idopera && fileMeta?.data?.extension);

  // descarga del blob para thumbnail/modal
  const { mutate: fetchBlob } = useMutation({
    mutationFn: downloadFileDropbox,
    onMutate: () => setLoadingBlob(true),
    onSuccess: (blob) => {
      setPreviewBlob(blob);
      setPreviewExt(fileMeta?.data?.extension ?? null);
      setPreviewPage(1);
    },
    onSettled: () => setLoadingBlob(false),
    onError: () => {
      setPreviewBlob(null);
      setPreviewExt(null);
    },
  });
  // region useEffect
  useEffect(() => {
    setPreviewPage(1);
    setPreviewNumPages(0);
    const idOpera = fileMeta?.data?.idopera;
    const ext = fileMeta?.data?.extension;

    if (!idOpera || !ext) {
      setPreviewBlob(null);
      setPreviewExt(null);
      return;
    }

    setPreviewExt(ext);
    fetchBlob({ archivo: `${idOpera}.${ext}` });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileMeta?.data?.idopera, fileMeta?.data?.extension]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      handleDeletePatient();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!dropboxData?.data) return;
    localStorage.setItem("mtm-folder", dropboxData?.data?.folders?.[1]);
    Cookies.set("mtm-appIdDropbox", dropboxData?.data?.app_id, { expires: 7 });
    Cookies.set("mtm-appSecretDropbox", dropboxData?.data?.app_secret, {
      expires: 7,
    });
    Cookies.set("mtm-refreshTokenDropbox", dropboxData?.data?.refresh_token, {
      expires: 7,
    });
    mutateGetAccessTokenDropbox({
      refreshToken: dropboxData?.data?.refresh_token,
      clientId: dropboxData?.data?.app_id,
      clientSecret: dropboxData?.data?.app_secret,
    });
  }, [dropboxData, mutateGetAccessTokenDropbox]);

  //region function
  function handleFindPatient(hc: string) {
    setUiLoading(true);
    setTimeout(() => {
      setHasConfirmed(true);
      setUiLoading(false);
      setDniHistory(hc);
    }, 2000);
  }

  function handleOnFocusInput() {
    if (dniHistory.length > 0) return setFocusState(false);
    setFocusState(true);
    Swal.fire({
      icon: "warning",
      title: "Antes de completar , debe ingresar un número de historia clínica",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#518915",
    });
  }

  function handleDeletePatient() {
    setHasConfirmed(false);
    setUiLoading(false);
    setDniHistory("");
    setDniInput("");
  }
  function handleCancelEdit() {
    setHasConfirmed(false);
  }

  function handleDownload(e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) {
    e.preventDefault();
    if (!previewBlob || !hasFile) return;

    Swal.fire({
      title: "¿Descargar Archivo?",
      text: "Se descargará el archivo en tu dispositivo.",
      showCancelButton: true,
      confirmButtonText: "Sí, descargar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#518915",
      cancelButtonColor: "#d33",
    }).then((res) => {
      if (!res.isConfirmed) return;
      setDownloading(true);
      setTimeout(() => {
        const url = URL.createObjectURL(previewBlob);
        const nombre = `${fileMeta?.data?.idopera}.${fileMeta?.data?.extension}`;
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

  const rows: HcRow[] = (dataMedicalHistory?.data?.hc || []).map((r: ApiHcRow) => ({
    id: r.idhistoria ?? `${r.fecha}-${r.ndoctor}`,
    ...r,
  }));

  //region return
  return (
    <ContainView
      title="HC"
      padding="py-1 2xl:py-20  px-10"
      gapChildren="gap-1"
      sizeTitle="text-3xl 2xl:text-4xl"
    >
      <div className="flex items-center justify-start w-full gap-1 py-1 min-h-24 ">
        <SearchPatient
          noHc={hc}
          data={!dniHistory ? undefined : dataMedicalHistory?.data?.paciente}
          labelSearch={"dni"}
          onSearch={handleFindPatient}
          setStateModal={setShowModal}
          odontogram={true}
          state={dniInput}
          setState={setDniInput}
          hasConfirmed={hasConfirmed}
          loading={uiLoading}
          handleDeletePatient={handleDeletePatient}
          handleCancel={handleCancelEdit}
        />
      </div>

      <div className="flex items-start justify-between w-full gap-2 pt-2 xl:justify-center min-h-64">
        <div className="flex min-w-[550px] justify-center overflow-x-auto min-h-64">
          <TablaDefault
            props={{
              datosParaTabla: rows,
              objectColumns: [
                {
                  key: "fecha",
                  label: "Fecha",
                  minWidth: "90",
                  maxWidth: "120",
                  renderCell: (item) => {
                    const raw = item.fecha;
                    const fecha = raw.split("-").reverse().join("/");
                    return fecha;
                  },
                },
                {
                  key: "detalle",
                  label: "Motivo de Consulta",
                  minWidth: "260",
                  maxWidth: "320",
                },
                {
                  key: "ndoctor",
                  label: "Profesional",
                  minWidth: "190",
                  maxWidth: "320",
                },
              ],
              objectStyles: {
                addHeaderColor: "#022539",
                withScrollbar: true,
                withBorder: true,
              },
              selectFn: true,
              objectSelection: { setSeleccionado: setHcSelected },
            }}
          />
        </div>

        <div className="flex flex-col gap-2 p-2 bg-white border border-gray-300 rounded w-[600px] xl:w-[700px] min-h-72">
          <div className="flex items-start w-full">
            <div className=" w-36">
              <label className="mr-2 text-sm font-medium capitalize text-blue">
                motivo de consulta:
              </label>
            </div>
            <div className="flex-[1] h-8 px-2 py-1 font-bold border border-gray-300 rounded bg-lightGray text-blue">
              {hcSelected && hcSelected.detalle}
            </div>
          </div>

          <div className="flex items-start w-full">
            <div className=" w-36">
              <label className="mr-2 text-sm font-medium capitalize text-blue">
                observaciones:
              </label>
            </div>
            <div className="flex-[1] h-32 px-2 py-1 font-bold border border-gray-300 rounded bg-lightGray text-blue">
              {hcSelected && hcSelected.obs}
            </div>
          </div>

          <div className="flex items-start w-full">
            <div className=" w-36">
              <label className="mr-2 text-sm font-medium capitalize text-blue">archivos:</label>
            </div>

            <div className="flex-[1] h-36 px-2 py-1 border border-gray-300 rounded bg-lightGray">
              {loadingMeta || (hasFile && (loadingBlob || !previewBlob)) ? (
                <div className="grid w-full h-full place-items-center text-blue/60">
                  Cargando archivo…
                </div>
              ) : !hasFile ? (
                <div className="grid w-full h-full place-items-center text-blue/60" />
              ) : previewExt === "pdf" ? (
                <button
                  onClick={() => setPreviewOpen(true)}
                  className="block w-[120px] border rounded overflow-hidden hover:ring-2 ring-blue transition"
                  title="Ver archivo"
                >
                  <Document file={previewBlob!} className="w-[120px] h-[120px]">
                    <Page pageNumber={1} width={120} />
                  </Document>
                </button>
              ) : (
                <button
                  onClick={() => setPreviewOpen(true)}
                  className="block w-[120px] h-[120px] border rounded overflow-hidden hover:ring-2 ring-blue transition"
                  title="Ver archivo"
                >
                  <img
                    src={URL.createObjectURL(previewBlob!)}
                    className="object-cover w-full h-full"
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de PREVIEW con botón de Descargar */}
      {previewOpen && (
        <Modal open={previewOpen} onClose={() => setPreviewOpen(false)}>
          <div className="flex flex-col w-full h-[520px]">
            <div className="flex items-center justify-end w-full px-2">
              <button
                onClick={() => setPreviewOpen(false)}
                className="p-1 text-xl rounded text-blue hover:bg-blue hover:text-white"
                aria-label="Cerrar"
                title="Cerrar"
              >
                <IoClose />
              </button>
            </div>

            {!previewBlob ? (
              <div className="grid flex-1 place-items-center text-blue/60">
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
                      className={`px-2 py-1 border rounded ${
                        previewPage <= 1
                          ? "text-gray-400"
                          : "hover:bg-blue text-blue hover:text-white"
                      }`}
                    >
                      ◀
                    </button>
                    <span className="text-blue">
                      Página {previewPage} de {previewNumPages}
                    </span>
                    <button
                      disabled={previewPage >= previewNumPages}
                      onClick={() => setPreviewPage((p) => p + 1)}
                      className={`px-2 py-1 border rounded ${
                        previewPage >= previewNumPages
                          ? "text-gray-400"
                          : "hover:bg-blue text-blue hover:text-white"
                      }`}
                    >
                      ▶
                    </button>
                  </div>

                  <a
                    href="#"
                    onClick={handleDownload}
                    className="flex items-center justify-center gap-2 px-4 font-medium text-white rounded h-9 bg-green hover:bg-greenHover"
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
              <div className="flex flex-col flex-1 px-4">
                <div className="grid flex-1 place-items-center">
                  <img
                    src={URL.createObjectURL(previewBlob)}
                    className="max-h-[440px] w-auto object-contain border rounded"
                  />
                </div>

                <div className="flex items-center justify-end w-full py-2">
                  <a
                    href="#"
                    onClick={handleDownload}
                    className="flex items-center justify-center gap-2 px-4 font-medium text-white rounded h-9 bg-green hover:bg-greenHover"
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
            )}
          </div>
        </Modal>
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)} open={showModal}>
          <FormNuevoRegistroHc
            handle={handleOnFocusInput}
            infoProfessional={JSON.parse(infoProfessional!)}
            hc={dniHistory}
            focusState={focusState}
            setStateModal={setShowModal}
          />
        </Modal>
      )}
    </ContainView>
  );
}
