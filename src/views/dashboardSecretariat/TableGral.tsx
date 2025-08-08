import { TablaDefault } from "@/frontend-resourses/components";
import React from "react";

export const TableGral: React.FC = () => {
  return (
    <div className="flex flex-col w-full min-h-screen gap-5 px-5 pt-20 ">
      <div className="flex flex-col items-center justify-center w-full ">
        <div className="lg:w-[85%] xl:w-[70%] flex flex-col  gap-5">
          <h1 className="text-2xl font-medium uppercase lg:text-4xl text-green">
            Tabla General
          </h1>
        </div>
      </div>
      <TablaDefault
        props={{
          datosParaTabla: [
            {
              id: 1,
              profesional: "Dr. Lopez Juan",
              especialidad: "Odontologo",
              practica: "Consulta",
              formaDePago: "Efectivo",
              importe: 100,
              medioDePago: "Efectivo",
            },
            {
              id: 1,
              profesional: "Dr. Lopez Juan",
              especialidad: "Odontologo",
              practica: "Consulta",
              formaDePago: "Efectivo",
              importe: 100,
              medioDePago: "Efectivo",
            },
            {
              id: 1,
              profesional: "Dr. Lopez Juan",
              especialidad: "Odontologo",
              practica: "Consulta",
              formaDePago: "Efectivo",
              importe: 100,
              medioDePago: "Efectivo",
            },
          ],
          objectColumns: [
            {
              key: "id",
              label: "ID",
              minWidth: "60",
              maxWidth: "60",
            },
            {
              key: "profesional",
              label: "Profesional",
              minWidth: "180",
              maxWidth: "180",
            },
            {
              key: "especialidad",
              label: "Especialidad",
              minWidth: "180",
              maxWidth: "180",
            },
            {
              key: "practica",
              label: "Practica",
              minWidth: "180",
              maxWidth: "180",
            },
            {
              key: "formaDePago",
              label: "Forma de Pago",
              minWidth: "180",
              maxWidth: "180",
            },
            {
              key: "importe",
              label: "Importe",
              minWidth: "180",
              maxWidth: "180",
            },
            {
              key: "medioDePago",
              label: "Medio de Pago",
              minWidth: "180",
              maxWidth: "180",
            },
          ],
          objectStyles: {
            addHeaderColor: "#022539",
            containerClass: "border border-gray-400 !rounded",
            withBorder: false,
            columnasNumber: [1, 6],
          },
        }}
      />
    </div>
  );
};
