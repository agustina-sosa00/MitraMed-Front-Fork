import { Button } from "@/components/ui/Button";
import React from "react";
import { useLocation } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

export const DetailHistoryMedical: React.FC = () => {
  // const { id } = useParams();
  const location = useLocation();
  const state = location.state;

  return (
    <div className="flex flex-col w-full h-screen px-20 py-10 bg-right bg-no-repeat bg-cover bg-profesional">
      <div>
        <Button
          label="volver al historial médico"
          handle={() => window.history.back()}
          icon={<IoMdArrowRoundBack className="text-2xl" />}
        />
      </div>
      <div className="flex justify-center w-full h-20 ">
        <h1 className="text-2xl font-medium uppercase lg:text-4xl text-green ">
          detalle de consulta
        </h1>
      </div>
      <div className="flex justify-between w-full ">
        <div className="flex gap-5">
          <h3 className="text-lg font-normal text-blue">
            Fecha:{" "}
            <span className="text-xl font-medium ">
              {state?.fecha.split("T")[0]}
            </span>
          </h3>
          <h3 className="text-lg font-normal text-blue">
            Profesional:{" "}
            <span className="text-xl font-medium ">{state?.profesional}</span>
          </h3>
        </div>

        <Button
          label="ver archivos"
          handle={() => console.log("ver archivos")}
          classButton="bg-blue hover:bg-blueHover py-1 px-2 text-white rounded"
        />
      </div>
      <div className="w-full p-2 my-3 bg-gray-100 rounded">
        <h1 className=" text-blue">
          Motivo de la consulta:{" "}
          <span className="font-medium">{state?.motivo}</span>
        </h1>
        <p className="text-blue">
          Descripcion:{" "}
          <span className="font-medium">{state?.data.description}</span>
        </p>
      </div>
    </div>
  );
};
