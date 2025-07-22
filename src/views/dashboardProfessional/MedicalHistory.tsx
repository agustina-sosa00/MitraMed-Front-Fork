import React, { useState } from "react";
import { SearchPatient } from "@/components/features/PanelProfessional/SearchPatient";
import { FormUploadHistory } from "@/components/features/PanelProfessional/FormUploadHistory";
import { TablaDefault } from "@/frontend-resourses/components";

export const MedicalHistory: React.FC = () => {
  const [infoUser, setInfoUser] = useState<boolean>(false);

  const handleFindPatient = () => {
    setInfoUser(!infoUser);
  };
  return (
    <div className="flex flex-col w-full min-h-screen px-6 pt-10 ">
      <div className="flex flex-col w-full ">
        <h1 className="text-2xl font-medium uppercase lg:text-4xl text-green">
          Historial médico
        </h1>
      </div>

      <div className="flex items-center justify-start w-full h-16 gap-1 py-1 ">
        <SearchPatient
          infoUser={infoUser}
          handleFindPatient={handleFindPatient}
          viewImg={false}
        />
      </div>

      <div className="flex w-full gap-2 ">
        <div className="w-1/2">
          <TablaDefault
            props={{
              datosParaTabla: [
                {
                  id: "1",
                  fecha: "08/07/2025",
                  motivo: "Consulta",
                  profesional: "Jean Pietro Mortarini",
                },
                {
                  id: "1",
                  fecha: "08/07/2025",
                  motivo: "Consulta",
                  profesional: "Jean Pietro Mortarini",
                },
                {
                  id: "1",
                  fecha: "08/07/2025",
                  motivo: "Consulta",
                  profesional: "Jean Pietro Mortarini",
                },
                {
                  id: "1",
                  fecha: "08/07/2025",
                  motivo: "Consulta",
                  profesional: "Jean Pietro Mortarini",
                },
                {
                  id: "1",
                  fecha: "08/07/2025",
                  motivo: "Consulta",
                  profesional: "Jean Pietro Mortarini",
                },
                {
                  id: "1",
                  fecha: "08/07/2025",
                  motivo: "Consulta",
                  profesional: "Jean Pietro Mortarini",
                },
              ],
              objectColumns: [
                {
                  key: "id",
                  label: "id",
                  minWidth: "40",
                  maxWidth: "40",
                },
                {
                  key: "fecha",
                  label: "Fecha",
                  minWidth: "100",
                  maxWidth: "100",
                },
                {
                  key: "motivo",
                  label: "Motivo de consulta",
                  minWidth: "250",
                  maxWidth: "250",
                },

                {
                  key: "profesional",
                  label: "Profesional",
                  minWidth: "160",
                  maxWidth: "160",
                },
              ],
              objectStyles: {
                addHeaderColor: "#022539",
                columnasNumber: [1],
                containerClass: "border border-gray-300 rounded-t-lg",
                withBorder: false,
              },
            }}
          />
        </div>
        <FormUploadHistory />
      </div>
    </div>
  );
};
