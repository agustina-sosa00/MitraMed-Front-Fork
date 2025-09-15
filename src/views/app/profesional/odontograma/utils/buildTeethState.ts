import {
  RawRow,
  TeethIdsState,
  ToothItemIds,
} from "@/views/app/profesional/odontograma/types/odontogramaTypes";
import { allTeeth } from "./odontogram.lookups";

export function buildIdsState(rows: RawRow[]): TeethIdsState {
  const state: TeethIdsState = Object.fromEntries(allTeeth().map((n) => [n, []]));

  for (const [iddiente, idcara, idtratamiento, habilitado] of rows) {
    if (state[iddiente] === undefined) {
      state[iddiente] = [];
    }
    if (habilitado === 1) {
      const item: ToothItemIds = [idcara, idtratamiento, habilitado];
      state[iddiente].push(item);
    }
  }
  return state;
}
