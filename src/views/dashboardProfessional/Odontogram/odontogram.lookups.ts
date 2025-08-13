// src/views/dashboardProfessional/Odontogram/odontogram.lookups.ts

// Caras del backend -> nombre que usa tu UI
export const CARA_BY_ID: Record<
  number,
  "todo" | "vesibular" | "mesial" | "palatino" | "distal" | "oclusal"
> = {
  0: "todo",
  1: "vesibular",
  2: "mesial",
  3: "palatino",
  4: "distal",
  5: "oclusal",
};

// Tipos (1..4) -> texto EXACTO que espera tu componente Tooth
// OJO con mayúsculas/minúsculas según lo que ya pintás en Tooth.
export const TIPO_TO_TEXT: Record<
  number,
  "Extracción" | "Corona" | "sellado" | "restauraciones"
> = {
  1: "Extracción",
  2: "Corona",
  3: "sellado",
  4: "restauraciones",
};

// idtratamiento >= 100 => "a realizar"; id < 100 => "realizado".
// 101..104 => 1..4 (Extracción, Corona, Sellado, Restauraciones).
export function parseTratamiento(idtratamiento: number) {
  const isARealizar = idtratamiento >= 100;
  const tipo = isARealizar ? idtratamiento % 100 : idtratamiento;
  const tratamiento = TIPO_TO_TEXT[tipo as 1 | 2 | 3 | 4];
  const action = isARealizar ? "a realizar" : "realizado";
  return { tratamiento, action };
}

// (Opcional) Inverso para guardar:
export const ID_CARA_BY_NAME = Object.fromEntries(
  Object.entries(CARA_BY_ID).map(([k, v]) => [v, Number(k)])
) as Record<
  "todo" | "vesibular" | "mesial" | "palatino" | "distal" | "oclusal",
  number
>;

export const TIPO_BY_TEXT: Record<
  "Extracción" | "Corona" | "sellado" | "restauraciones",
  1 | 2 | 3 | 4
> = {
  Extracción: 1,
  Corona: 2,
  sellado: 3,
  restauraciones: 4,
};

export function buildIdTratamiento(
  tratamiento: "Extracción" | "Corona" | "sellado" | "restauraciones",
  action: string
) {
  const tipo = TIPO_BY_TEXT[tratamiento];
  return action === "a realizar" ? 100 + tipo : tipo;
}
