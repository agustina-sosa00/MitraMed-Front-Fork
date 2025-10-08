export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export function getToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getLocalStorageParams() {
  const empresa = localStorage.getItem("_e");
  const modo = localStorage.getItem("_m");
  const entornoStorage = localStorage.getItem("_env");
  const entorno = entornoStorage === "des" ? "apinovades" : "apinova";
  const tusuario = localStorage.getItem("_tu");
  const iddoctor = localStorage.getItem("_iddoc");
  const idProfesional = localStorage.getItem("_idprof");

  return { empresa, modo, entorno, tusuario, iddoctor, idProfesional };
}

export function inputTrim(value: any) {
  return (typeof value === "string" ? value : (value?.target?.value ?? "")).trim();
}
