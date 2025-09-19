export function generarFilasVacias<T = any>(
  cantidad: number,
  columns: { key: string }[],
  startId: number = 1,
): T[] {
  return Array.from({ length: cantidad }, (_, idx) => {
    const row: any = { id: (startId + idx).toString() };
    columns.forEach((col) => {
      if (col.key !== "id") row[col.key] = "";
    });
    return row;
  });
}
