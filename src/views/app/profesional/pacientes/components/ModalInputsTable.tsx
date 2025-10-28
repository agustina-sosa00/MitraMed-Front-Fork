import { TablaDefault } from "@/frontend-resourses/components";

export default function ModalInputsTable() {
  const propsParaTabla = {
    datosParaTabla: [],
    objectColumns: [
      {
        key: "codigo",
        label: "Código",
        minWidth: "190",
        maxWidth: "270",
        resaltar: true,
      },
      {
        key: "descripcion",
        label: "Descripcion",
        minWidth: "180",
        maxWidth: "270",
      },
      {
        key: "provincia",
        label: "Provincia",
        minWidth: "190",
        maxWidth: "260",
      },
      {
        key: "codP",
        label: "Codigo Postal",
        minWidth: "100",
        maxWidth: "200",
      },
    ],
    objectStyles: {
      widthContainer: "100%",
      heightContainer: "253px",
      addHeaderColor: "#022539",
      withBorder: true,
      withScrollbar: true,
      addFooterColor: "gray",
    },
  };
  return (
    <div className="w-full h-full ">
      <TablaDefault props={propsParaTabla} />
    </div>
  );
}
