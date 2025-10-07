import { TablaDefault } from "@/frontend-resourses/components";

export default function ModalTable() {
  const propsTabla = {
    datosParaTabla: [
      {
        id: 1,
        nombre: "Paciente 1",
        domicilio: "Calle 123, Ciudad, Provincia",
        localidad: "Localidad 1",
        cuit: "1234567890",
        cTrib: "1",
      },
    ],
    objectColumns: [
      {
        key: "nombre",
        label: "Nombre",
        minWidth: "270",
        maxWidth: "270",
      },
      {
        key: "domicilio",
        label: "Domicilio",
        minWidth: "260",
        maxWidth: "260",
      },
      {
        key: "localidad",
        label: "Localidad",
        minWidth: "200",
        maxWidth: "200",
      },
      {
        key: "cuit",
        label: "CUIT",
        minWidth: "90",
        maxWidth: "90",
      },
      {
        key: "cTrib",
        label: "C. Trib",
        minWidth: "100",
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
