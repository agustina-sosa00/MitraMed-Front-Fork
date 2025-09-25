import React from "react";

interface Column {
  key: string;
  label: string;
  minWidth?: string;
  maxWidth?: string;
}

interface DataGridProps {
  columnas: Column[];
  data: any[];
}

const DataGrid: React.FC<{ props: DataGridProps }> = ({ props }) => {
  const { columnas, data } = props;

  // Generar filas planas: una por cada elemento de info[] de cada doctor
  const safeData = Array.isArray(data) ? data : [];
  const rows = safeData.flatMap((doctor) =>
    doctor.info && Array.isArray(doctor.info) && doctor.info.length > 0
      ? doctor.info.map((info: any) => ({ ...doctor, ...info }))
      : [{ ...doctor }],
  );

  return (
    <div style={{ overflowX: "auto" }} className="mt-4">
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {columnas.map((col) => (
              <th
                key={col.key}
                style={{
                  minWidth: `${col.minWidth}px`,
                  maxWidth: `${col.maxWidth}px`,
                  border: "1px solid #ccc",
                  padding: "2px 4px",
                  background: "#022539",
                  color: "white",
                  textAlign: "center",
                  fontSize: "12px",
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={idx}
              style={{
                background: idx % 2 === 0 ? "#f9f9f9" : "#c7e3f7",
              }}
            >
              {columnas.map((col) => (
                <td
                  key={col.key}
                  style={{
                    minWidth: col.minWidth,
                    maxWidth: col.maxWidth,
                    border: "1px solid #eee",
                    padding: "3px 4px",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  {row[col.key] ?? ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataGrid;
