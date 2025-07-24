export const renameFile = (archivoOriginal: File | null) => {
  if (!archivoOriginal) return null;

  const extension = archivoOriginal.name.split(".").pop();
  const nuevoNombre = `archivo_${Date.now()}.${extension}`;

  return new File([archivoOriginal], nuevoNombre, {
    type: archivoOriginal.type,
  });
};
