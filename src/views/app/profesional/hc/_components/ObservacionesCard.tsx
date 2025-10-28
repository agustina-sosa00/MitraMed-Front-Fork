import { useHistorialClinicoStore } from "../store/HistoriaClinicaStore";

export default function ObservacionesCard() {
  const hcSelected = useHistorialClinicoStore((state) => state.hcSelected);
  return (
    <div className="flex flex-col gap-2 p-2 bg-white border border-gray-300 rounded w-[600px] xl:w-[700px] h-[355px] xg:h-[400px] xxl:h-[700px] ">
      <div className="flex flex-col items-start w-full">
        <div className="w-full ">
          <label className="text-sm font-medium text-primaryBlue">Motivo de Consulta:</label>
        </div>
        <div className="w-full h-8 px-2 py-1 font-bold border border-gray-300 rounded cursor-default bg-lightGray text-primaryBlue">
          {hcSelected && hcSelected.detalle}
        </div>
      </div>

      <div className="flex flex-col items-start w-full ">
        <div className="w-full">
          <label className="text-sm font-medium text-primaryBlue">Evolución:</label>
        </div>
        <div
          className="w-full h-[250px] xl:h-[590px] px-2 py-1 font-bold border border-gray-300 rounded bg-lightGray text-primaryBlue overflow-y-auto cursor-default"
          style={{ whiteSpace: "pre-line" }}
        >
          {hcSelected && hcSelected.obs
            ? hcSelected.obs
                .split("_")
                .map((item) => item.split("@")[0])
                .filter((val) => val && val !== "10")
                .join("\n")
            : ""}
        </div>
      </div>
    </div>
  );
}
