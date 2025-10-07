import { TablaDefault } from "@/frontend-resourses/components";
import { usePacientesStore } from "../store/pacientesStore";

export default function ModalTable() {
  const dataPacientesModal = usePacientesStore((s) => s.dataPacientesModal);

  const propsTabla = {
    datosParaTabla: dataPacientesModal || [],
    objectColumns: [
      {
        key: "apellido",
        label: "Apellido",
        minWidth: "190",
        maxWidth: "270",
      },
      {
        key: "nombre",
        label: "Nombre",
        minWidth: "180",
        maxWidth: "270",
      },
      {
        key: "domicilio1",
        label: "Domicilio",
        minWidth: "190",
        maxWidth: "260",
      },
      {
        key: "nlocalidad",
        label: "Localidad",
        minWidth: "100",
        maxWidth: "200",
      },
      {
        key: "cuil",
        label: "CUIT",
        minWidth: "90",
        maxWidth: "90",
      },
      {
        key: "ctrib",
        label: "C. Trib",
        minWidth: "40",
        maxWidth: "120",
      },
    ],
    objectStyles: {
      widthContainer: "100%",
      heightContainer: "253px",
      addHeaderColor: "#022539",
      withBorder: true,
    },
  };
  return (
    <div className="w-full ">
      <TablaDefault props={propsTabla} />
    </div>
  );
}
