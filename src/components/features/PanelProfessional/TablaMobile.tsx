import { IDataTable } from "mock/arrayTableProfessional";

interface TablaMobileProps {
  data: IDataTable[];
}

export const TablaMobile: React.FC<TablaMobileProps> = ({ data }) => {
  return (
    <div className="relative max-w-[600px] lg:max-w-[800px]  !rounded overflow-x-auto">
      <table className="w-full text-left text-gray-500 ">
        <thead className="sticky top-0 text-white uppercase bg-blue">
          <tr className="">
            <th className="px-2 py-1 text-xs whitespace-nowrap">ID</th>
            <th className="px-4 py-3 text-xs whitespace-nowrap">Día</th>
            <th className="px-4 py-3 text-xs whitespace-nowrap">Hora Inicio</th>
            <th className="px-4 py-3 text-xs whitespace-nowrap">Hora Fin</th>
            <th className="px-4 py-3 text-xs whitespace-nowrap">
              Nombre y Apellido
            </th>
            <th className="px-4 py-3 text-xs whitespace-nowrap">Estado</th>
            <th className="px-4 py-3 text-xs whitespace-nowrap">Obra Social</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={`${item.id}-${item.day}`}
              className="bg-[#f1f1f1] border-b text-blue border-gray-200 hover:bg-gray-50 odd:bg-white even:bg-[#f1f1f1]"
            >
              <td className="px-4 py-2 text-xs text-end">{item.id}</td>
              <td className="px-4 py-2 text-xs">{item.day}</td>
              <td className="px-4 py-2 text-xs">{item.hourInit}</td>
              <td className="px-4 py-2 text-xs">{item.hourFinish}</td>
              <td className="px-4 py-2 text-xs">{item.name}</td>
              <td className="px-4 py-2 text-xs">{item.state || "-"}</td>
              <td className="px-4 py-2 text-xs">{item.obs || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
