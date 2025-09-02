export const renameFile = ({
  archivoOriginal,
  dni,
}: {
  archivoOriginal: File | null;
  dni: string;
}) => {
  if (!archivoOriginal) return null;

  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const extension = archivoOriginal.name.split(".").pop() ?? "";
  const baseName = `${dni}${year}${month}${day}${hours}${minutes}${seconds}`;
  const nuevoNombre = `${baseName}.${extension}`;

  const fileRenombrado = new File([archivoOriginal], nuevoNombre, {
    type: archivoOriginal.type,
  });

  return {
    file: fileRenombrado,
    name: baseName,
    extension,
  };
};
