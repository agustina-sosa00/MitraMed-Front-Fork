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

/**
 * Convierte una fecha a "dd-mm-yyyy".
 * Si incluirHora === true, devuelve "dd-mm-yyyy hh-mm".
 *
 * Acepta: Date | string | number.
 * - Para strings tipo "2025-09-15 16:15:14" reemplaza el espacio por 'T' para parsear mejor.
 * - Si la fecha es inválida, devuelve "".
 */
export function formatearFechaDMA(
  fechaEntrada: Date | string | number,
  incluirHora: boolean = false,
): string {
  const parsear = (v: Date | string | number): Date | null => {
    if (v instanceof Date) return isNaN(v.getTime()) ? null : v;
    if (typeof v === "string") {
      const normalizada = v.includes(" ") ? v.replace(" ", "T") : v;
      const d = new Date(normalizada);
      return isNaN(d.getTime()) ? null : d;
    }
    const d = new Date(v);
    return isNaN(d.getTime()) ? null : d;
  };

  const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  const fecha = parsear(fechaEntrada);
  if (!fecha) return "";

  const dd = pad2(fecha.getDate());
  const mm = pad2(fecha.getMonth() + 1);
  const yyyy = `${fecha.getFullYear()}`;

  if (!incluirHora) return `${dd}-${mm}-${yyyy}`;

  const hh = pad2(fecha.getHours());
  const min = pad2(fecha.getMinutes());
  const sec = pad2(fecha.getSeconds());
  return `${dd}-${mm}-${yyyy} ${hh}:${min}:${sec}`;
}
