import { TablaDefault } from "@/frontend-resourses/components";
import { tableProfessionals } from "../../turnosProfesional/mock/arrayTableProfessional";
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
            // {
            //   key: "id",
            //   label: "ID",
            //   minWidth: "40",
            //   maxWidth: "40",
            // },
            {
              key: "name",
              label: "Profesional",
              minWidth: "150",
              maxWidth: "300",
            },
            {
              key: "especiality",
              label: "Especialidad",
              minWidth: "150",
              maxWidth: "210",
            },
          ],

          objectStyles: {
            withScrollbar: true,
            addHeaderColor: "#022539",
            // columnasNumber: [1],
            cursorPointer: true,
            widthContainer: "320px",
            heightContainer: "300px",
            viewport1440: {
              widthContainer1440px: "400px",
              heightContainer1440px: "400px",
            },
            viewport1536: {
              widthContainer1536px: "450px",
              heightContainer1536px: "400px",
            },
            viewport1920: {
              widthContainer1920px: "500px",
              heightContainer1920px: "500px",
            },
          },
        }}
      />
    </div>
  );
}
