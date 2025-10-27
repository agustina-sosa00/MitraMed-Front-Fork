import { ActionButton } from "@/frontend-resourses/components";
import { FiDownload } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { Document, Page } from "react-pdf";
import { ClipLoader } from "react-spinners";
import { useHistorialClinicoStore } from "../store/HistoriaClinicaStore";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { descargarArchivoDropbox } from "../service/HistorialClinicoService";

export default function PreviewModal({ hasFile, datosArchivo }) {
  const setPreviewOpen = useHistorialClinicoStore((state) => state.setPreviewOpen);
  const loadingBlob = useHistorialClinicoStore((state) => state.loadingBlob);
  const setLoadingBlob = useHistorialClinicoStore((state) => state.setLoadingBlob);
  const previewBlob = useHistorialClinicoStore((state) => state.previewBlob);
  const previewExt = useHistorialClinicoStore((state) => state.previewExt);
  const previewNumPages = useHistorialClinicoStore((state) => state.previewNumPages);
  const setPreviewNumPages = useHistorialClinicoStore((state) => state.setPreviewNumPages);
  const previewPage = useHistorialClinicoStore((state) => state.previewPage);
  const setPreviewPage = useHistorialClinicoStore((state) => state.setPreviewPage);
  const setDownloading = useHistorialClinicoStore((state) => state.setDownloading);
  const downloading = useHistorialClinicoStore((state) => state.downloading);
  const previewOpen = useHistorialClinicoStore((state) => state.previewOpen);
  const setPreviewBlob = useHistorialClinicoStore((state) => state.setPreviewBlob);
  const setPreviewExt = useHistorialClinicoStore((state) => state.setPreviewExt);

  const { mutate: descargarDropbox } = useMutation({
    mutationFn: descargarArchivoDropbox,
    onMutate: () => setLoadingBlob(true),
    onError: () => {
      setPreviewBlob(null);
      setPreviewExt("");
    },
    onSuccess: (data) => {
      setPreviewBlob(data);
      setPreviewExt(datosArchivo?.data?.extension ?? null);
      setPreviewPage(1);
    },
    onSettled: () => setLoadingBlob(false),
  });

  useEffect(() => {
    if (!previewOpen) return;
    setPreviewBlob(null);
    setPreviewExt("");
    setPreviewPage(1);
    setPreviewNumPages(0);
    const idOpera = datosArchivo?.data?.idopera;
    const ext = datosArchivo?.data?.extension;
    if (!idOpera || !ext) return;
    setPreviewExt(ext);
    descargarDropbox({ idopera: idOpera, extension: ext });
  }, [previewOpen, datosArchivo]);

  useEffect(() => {
    if (!previewOpen) {
      setPreviewBlob(null);
      setPreviewExt("");
      setPreviewPage(1);
      setPreviewNumPages(0);
    }
  }, [previewOpen]);

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
    <div className="flex flex-col w-full min-w-[600px] h-[520px]">
      <div className="flex items-center justify-end w-full px-2">
        <ActionButton
          onClick={() => setPreviewOpen(false)}
          addClassName="h-8  rounded text-primaryBlue hover:bg-primaryBlue hover:text-white"
          icon={<IoClose />}
        />
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
          </div>
        </div>
      )}
    </div>
  );
}
