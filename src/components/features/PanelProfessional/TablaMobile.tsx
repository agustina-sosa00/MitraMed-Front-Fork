import { IDataTable } from "mock/arrayTableProfessional";
interface Column {
  key: keyof IDataTable;
  label?: string;
}
interface TablaMobileProps {
  data: IDataTable[] | undefined;
  columns: Column[];
  onSelect?: (item: number) => void;
  tableId?: string;
}

export const TablaMobile: React.FC<TablaMobileProps> = ({
  data,
  columns,
  onSelect,
  tableId,
}) => {
  const handleOnClickRow = (item) => {
    if (onSelect && tableId === "profesionales") {
      console.log(item);
      onSelect && onSelect(item.id);
    } else {
      onSelect && onSelect(item);
    }
  };
  return (
    <div className="relative flex-[2] border  border-gray-400  !rounded overflow-x-auto">
      <table className="w-full text-left text-gray-500">
        <thead className="sticky top-0 text-white uppercase bg-blue">
          <tr>
            {columns?.map(({ key, label }) => (
              <th
                key={String(key)}
                className="px-4 py-3 text-xs whitespace-nowrap"
              >
                {label
                  ?.replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((item, idx) => (
            <tr
              key={idx}
              className="bg-[#f1f1f1] border-b text-blue border-gray-200 hover:bg-greenFocus/90 transition-all duration-300 odd:bg-white even:bg-[#f1f1f1]"
            >
              {columns?.map(({ key }) => (
                <td
                  key={String(key)}
                  className="px-4 py-2 text-xs"
                  onClick={() => handleOnClickRow(item)}
                >
                  {item[key] || ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
