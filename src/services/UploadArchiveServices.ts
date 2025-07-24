import { apiPhp } from "@/lib/axiosPhp";

// POST para guardar archivos en vps
export const updateArchive = async (file: File) => {
  console.log("file en el service", file);

  const saveArchiveUrl = `/apinovades/archivos/subirArchivo.php`;
  const formData = new FormData();
  formData.append("empresa", "20");
  formData.append("modo", "homo");
  formData.append("archivo", file);

  console.log("formData", formData);
  try {
    const response = await apiPhp.post(saveArchiveUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
  } catch (error) {
    throw new Error(`${error}`);
  }
};
