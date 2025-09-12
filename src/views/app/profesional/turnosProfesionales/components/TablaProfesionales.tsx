import { tableProfessionals } from "../../turnos/mock/arrayTableProfessional";
import { TablaDefault } from "@/frontend-resourses/components";
interface IProp {
  onSelect?: (item: number) => void;
  tableID?: string;
}

export default function TablaTurnosProfesionales({ onSelect }: IProp) {
  return (
    <div className="h-full ">
      <TablaDefault
        props={{
          selectFn: true,
          objectSelection: {
            setSeleccionado: onSelect,
          },
          datosParaTabla: tableProfessionals,
          objectColumns: [
            {
              key: "id",
              label: "ID",
              minWidth: "40",
              maxWidth: "40",
            },
            {
              key: "name",
              label: "Nombre y Apellido",
              minWidth: "180",
              maxWidth: "180",
            },
            {
              key: "especiality",
              label: "Especialidad",
              minWidth: "170",
              maxWidth: "170",
            },
          ],

          objectStyles: {
            withScrollbar: true,
            addHeaderColor: "#022539",
            columnasNumber: [1],
            cursorPointer: true,
          },
        }}
      />
    </div>
  );
}
