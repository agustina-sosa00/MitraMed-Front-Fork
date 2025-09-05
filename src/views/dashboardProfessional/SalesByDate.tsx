import { ContainView } from "@/components/features/PanelProfessional/ContainView";
import { TablaDefault } from "@/frontend-resourses/components";
import React from "react";
import { Metrics } from "./Metrics";
import { DateRangePickerPresetsExample } from "@/components/ui/DateRange";

export const SalesByDate: React.FC = () => {
  return (
    <ContainView
      title="
    ventas por fecha"
      padding="py-5"
    >
      <div className="flex w-full gap-3 py-5">
        {" "}
        <DateRangePickerPresetsExample />
      </div>

      <div className="w-full ">
        <TablaDefault
          props={{
            datosParaTabla: [
              {
                id: 1,
                fecha: "01/01/2023",
                profesional: "Dr. Lopez Juan",
                especialidad: "Otorrinolaringología",
                practica: "Consulta",
                formaDePago: "Efectivo",
                importe: 100,
                medioDePago: "Efectivo",
              },
              {
                id: 1,
                fecha: "01/01/2023",
                profesional: "Dr. Lopez Juan",
                especialidad: "Odontólogo",
                practica: "Consulta",
                formaDePago: "Efectivo",
                importe: 100,
                medioDePago: "Efectivo",
              },
              {
                id: 1,
                fecha: "01/01/2023",
                profesional: "Dr. Lopez Juan",
                especialidad: "Odontólogo",
                practica: "Consulta",
                formaDePago: "Efectivo",
                importe: 100,
                medioDePago: "Efectivo",
              },
            ],
            objectColumns: [
              {
                key: "fecha",
                label: "Fecha",
                minWidth: "100",
                maxWidth: "100",
              },
              {
                key: "profesional",
                label: "Profesional",
                minWidth: "190",
                maxWidth: "190",
              },
              {
                key: "especialidad",
                label: "Especialidad",
                minWidth: "150",
                maxWidth: "150",
              },
              {
                key: "practica",
                label: "Practica",
                minWidth: "190",
                maxWidth: "190",
              },
              {
                key: "formaDePago",
                label: "Forma de Pago",
                minWidth: "110",
                maxWidth: "110",
              },
              {
                key: "importe",
                label: "Importe",
                minWidth: "100",
                maxWidth: "100",
              },
              {
                key: "medioDePago",
                label: "Medio de Pago",
                minWidth: "120",
                maxWidth: "120",
              },
            ],
            objectStyles: {
              addHeaderColor: "#022539",
              withScrollbar: true,
              containerClass: "border border-gray-300 rounded-t-lg ",
              withBorder: false,
              columnasNumber: [6],
            },
          }}
        />
      </div>
      <Metrics />
    </ContainView>
  );
};
