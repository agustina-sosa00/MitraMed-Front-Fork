import { apiPhp } from "@/lib/axiosPhp";

// POST para guardar archivos en vps
export const updateArchive = async (file: File) => {
  const saveArchiveUrl = "/apinovades/archivos/subirArchivo.php";
  const formData = new FormData();
  formData.append("empresa", "20");
  formData.append("modo", "homo");
  formData.append("archivo", file);

  try {
    const response = await apiPhp.post(saveArchiveUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

// POST para descargar un archivo de vps
export const downloadArchive = async (nameArchive: string) => {
  const downloadArchiveUrl = "/apinovades/archivos/descargarArchivo.php";
  try {
    const response = await apiPhp.post(
      downloadArchiveUrl,
      {
        empresa: "20",
        modo: "homo",
        nArchivo: nameArchive,
      },
      {
        responseType: "blob",
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
