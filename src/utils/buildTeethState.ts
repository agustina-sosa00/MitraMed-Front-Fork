import { ApiFila, TeethState } from "../types";
import {
  CARA_BY_ID,
  parseTratamiento,
} from "../views/dashboardProfessional/Odontogram/odontogram.lookups";

// CHANGED: normalizador backend -> estado interno
export default function buildTeethState(filas: ApiFila[]): TeethState {
  const state: TeethState = {};

  for (const f of filas) {
    if (f.habilitado !== 1) continue;

    const cara = CARA_BY_ID[f.idcara];
    const { tratamiento, action } = parseTratamiento(f.idtratamiento);

    if (!state[f.iddiente]) state[f.iddiente] = { tratamientos: [] };

    // dedup simple para evitar duplicados exactos
    const exists = state[f.iddiente].tratamientos.some(
      (t) =>
        t.tratamiento === tratamiento && t.cara === cara && t.action === action
    );
    if (!exists)
      state[f.iddiente].tratamientos.push({ tratamiento, cara, action });
  }

  return state;
}
