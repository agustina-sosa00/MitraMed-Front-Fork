import { Button } from "@/components/ui/Button";
import React from "react";
import { useLocation, useParams } from "react-router-dom";

export const DetailHistoryMedical: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const state = location.state;
  console.log(id, state);

  return (
    <div className="flex w-full h-screen p-10 bg-right bg-no-repeat bg-cover bg-profesional">
      <div className="flex w-full ">
        <Button label="volver" handle={() => window.history.back()} />
        <h1 className="text-2xl font-medium uppercase lg:text-4xl text-green">
          Historial médico
        </h1>
      </div>
    </div>
  );
};
