import { TablaDefault } from "@/frontend-resourses/components";
import { usePacientesStore } from "../store/pacientesStore";
type HcRow = {
  nombre: string;
  apellido: string;
  domicilio1: string;
  nlocalidad: string;
  cuil: string;
  ctrib: string;
};
type ApiHcRow = Omit<HcRow, "id">;

export default function ModalTable() {
  const setDataPaciente = usePacientesStore((s) => s.setDataPaciente);
  const dataPacientesModal = usePacientesStore((s) => s.dataPacientesModal);
  const selectTable = usePacientesStore((s) => s.selectTable);

  const pacientesEncontrados = Array.isArray(dataPacientesModal)
    ? dataPacientesModal.map((r: ApiHcRow, idx) => ({
        id: (idx + 1).toString(),
        ...r,
      }))
    : [];

  const propsTabla = {
    datosParaTabla: pacientesEncontrados || [],
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
        key: "dni",
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
      withScrollbar: true,
    },
    selectFn: selectTable,
    objectSelection: { setSeleccionado: setDataPaciente },
  };
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <TablaDefault props={propsTabla} />
      <div className="w-full  bg-gray-200 rounded text-gray-700 flex px-2  py-2 items- font-bold gap-1">
        <span className="h-6 text-sm flex items-center pt-1.5"> Total de Regitros: </span>
        <span className="text-xl h-6  flex items-center  text-primaryBlue ">
          {pacientesEncontrados.length}
        </span>
      </div>
    </div>
  );
}
