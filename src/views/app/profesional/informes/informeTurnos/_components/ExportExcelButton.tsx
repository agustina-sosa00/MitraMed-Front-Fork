import { ActionButton } from "@/frontend-resourses/components";
import { useInformeTurnosStore } from "../store/informeTurnosStore";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import excelIcon from "@/frontend-resourses/assets/icons/excel.png";

export default function ExportExcelButton() {
  const hasSearched = useInformeTurnosStore((state) => state.hasSearched);
  const tableColumns = useInformeTurnosStore((state) => state.tableColumns);
  const filteredRows = useInformeTurnosStore((state) => state.filteredRows);

  function handleExportExcel() {
    let exportColumns = [...tableColumns];
    if (!exportColumns.some((col) => col.key === "idturno")) {
      exportColumns = [{ key: "idturno", label: "ID Turno" }, ...exportColumns];
    }

    const data = filteredRows.map((row) => {
      const obj: Record<string, any> = {};
      exportColumns.forEach((col) => {
        obj[col.label || col.key] = row[col.key];
      });
      return obj;
    });

    const worksheet = XLSX.utils.json_to_sheet(data);

    // Ajustar anchos de columna automáticamente
    const colWidths = exportColumns.map((col) => {
      const header = col.label || col.key;
      const maxLen = Math.max(
        header.length,
        ...data.map((row) => (row[header] ? String(row[header]).length : 0)),
      );
      return { wch: maxLen + 2 };
    });
    worksheet["!cols"] = colWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja1");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "informeTurnos.xlsx");
  }
  return (
    <div className="">
      <ActionButton
        disabled={!hasSearched}
        onClick={handleExportExcel}
        icon={
          <img
            src={excelIcon}
            alt="Excel"
            className={`w-4 h-4 ${hasSearched ? "" : "grayscale opacity-50"}`}
          />
        }
        text="Exportar"
        color="blue-mtm"
        addClassName="!rounded w-28"
      />
    </div>
  );
}
