export const renombrarArchivo = ({
  iddoctor,
  archivoOriginal,
  dni,
}: {
  iddoctor: string | number;
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
  const iddoctorStr = String(iddoctor).padStart(2, "0");

  const extension = archivoOriginal.name.split(".").pop() ?? "";
  const baseName = `${iddoctorStr}${dni}${year}${month}${day}${hours}${minutes}${seconds}`;
  const nuevoNombre = `${baseName}.${extension}`;

  console.log(nuevoNombre);

  const fileRenombrado = new File([archivoOriginal], nuevoNombre, {
    type: archivoOriginal.type,
  });

  console.log(fileRenombrado);
  return {
    file: fileRenombrado,
    name: baseName,
    extension,
  };
};
