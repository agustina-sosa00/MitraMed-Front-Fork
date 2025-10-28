import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { TablaDefault } from "@/frontend-resourses/components";
import { pdfjs } from "react-pdf";
// import { IoTrashOutline } from "react-icons/io5";
import { getIdOpera } from "@/views/app/profesional/hc/service/HistorialClinicoService";
import FormHistoria from "./_components/FormHistoria";
// import Cookies from "js-cookie";
import workerSrc from "pdfjs-dist/build/pdf.worker?url";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import TitleView from "../../_components/features/TitleView";
import { Modal } from "@/views/_components/Modal";
import { useHistorialClinicoStore } from "./store/HistoriaClinicaStore";
import BuscadorPacientesCard from "./_components/BuscadorPacientesCard";
import BotoneraAccionesCard from "./_components/BotoneraAccionesCard";
import ObservacionesCard from "./_components/ObservacionesCard";
import PreviewModal from "./_components/PreviewModal";
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
  const dataPaciente = useHistorialClinicoStore((state) => state.dataPaciente);
  const editMode = useHistorialClinicoStore((state) => state.editMode);
  const setEditMode = useHistorialClinicoStore((state) => state.setEditMode);
  const hcSelected = useHistorialClinicoStore((state) => state.hcSelected);
  const setHcSelected = useHistorialClinicoStore((state) => state.setHcSelected);
  const dniHistory = useHistorialClinicoStore((state) => state.dniHistory);
  const hasConfirmed = useHistorialClinicoStore((state) => state.hasConfirmed);
  const reset = useHistorialClinicoStore((state) => state.reset);
  const previewOpen = useHistorialClinicoStore((state) => state.previewOpen);
  const setPreviewOpen = useHistorialClinicoStore((state) => state.setPreviewOpen);
  const showModal = useHistorialClinicoStore((state) => state.showModal);
  const setShowModal = useHistorialClinicoStore((state) => state.setShowModal);
  const setPreviewBlob = useHistorialClinicoStore((state) => state.setPreviewBlob);
  const setPreviewExt = useHistorialClinicoStore((state) => state.setPreviewExt);
  // const infoProfessional = Cookies.get("dataProfessional");

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
      reset();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  //region return
  return (
    <>
      <TitleView title="Historia Clínica" />
      {/* Buscador */}
      <BuscadorPacientesCard />

      {/* Botones */}
      <BotoneraAccionesCard />

      {/* Tabla y Observaciones */}
      <div className="flex items-start justify-between w-full gap-2 pt-1 xl:justify-center ">
        {/* Tabla */}
        <div className="flex min-w-[550px] justify-center overflow-x-auto ">
          <TablaDefault props={propsTabla} />
        </div>

        {/* Observaciones */}
        <ObservacionesCard />
      </div>

      {/* Modal de PREVIEW con botón de Descargar */}
      {previewOpen && (
        <Modal
          open={previewOpen}
          onClose={() => {
            setPreviewOpen(false);
            setPreviewBlob(null);
            setPreviewExt("");
          }}
        >
          <PreviewModal datosArchivo={datosArchivo} hasFile={hasFile} />
        </Modal>
      )}

      {showModal && (
        <Modal
          onClose={() => {
            setEditMode(false);
            setShowModal(false);
          }}
          open={showModal}
        >
          <FormHistoria
            hc={dniHistory}
            setStateModal={setShowModal}
            hcSelected={editMode ? hcSelected : undefined}
          />
        </Modal>
      )}
    </>
  );
}
