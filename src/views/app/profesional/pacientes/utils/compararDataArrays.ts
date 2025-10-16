export function compararDataArrays(
  original: Record<string, any> | null | undefined,
  modificado: Record<string, any> | null | undefined,
  ignorarClaves: string[] = [],
): boolean {
  if (!original || !modificado) return original !== modificado;

  const normalizar = (v: any) => (typeof v === "string" ? v.trim() : v);

  // union de claves (por si falta/sobra alguna)
  const claves = new Set([...Object.keys(original), ...Object.keys(modificado)]);
  for (const clave of claves) {
    if (ignorarClaves.includes(clave)) continue;
    const v1 = normalizar(original[clave]);
    const v2 = normalizar(modificado[clave]);
    if (v1 !== v2) return true;
  }
  return false;
}
