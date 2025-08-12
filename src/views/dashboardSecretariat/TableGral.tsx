
import { ContainView } from "@/components/features/PanelProfessional/ContainView";
import { TablaDefault } from "@/frontend-resourses/components";
import React from "react";
import { Metrics } from "./Metrics";

export const TableGral: React.FC = () => {
  return (
    <ContainView title="Tabla General">
      <div className="w-auto ">
        <TablaDefault
          props={{
            datosParaTabla: [
              {
                id: 1,
                profesional: "Dr. Lopez Juan",
                especialidad: "Odontólogo",
                practica: "Consulta",
                formaDePago: "Efectivo",
                importe: 100,
                medioDePago: "Efectivo",
              },
              {
                id: 1,
                profesional: "Dr. Lopez Juan",
                especialidad: "Odontólogo",
                practica: "Consulta",
                formaDePago: "Efectivo",
                importe: 100,
                medioDePago: "Efectivo",
              },
              {
                id: 1,
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
                key: "profesional",
                label: "Profesional",
                minWidth: "190",
                maxWidth: "190",
              },
              {
                key: "especialidad",
                label: "Especialidad",
                minWidth: "190",
                maxWidth: "190",
              },
              {
                key: "practica",
                label: "Practica",
                minWidth: "200",
                maxWidth: "200",
              },
              {
                key: "formaDePago",
                label: "Forma de Pago",
                minWidth: "120",
                maxWidth: "120",
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
              containerClass:
                "border-b border-l border-r border-gray-400 !rounded-lg  ",
              withBorder: false,
              columnasNumber: [5],
            },
          }}
        />
      </div>
      <Metrics />
    </ContainView>

  );
};
