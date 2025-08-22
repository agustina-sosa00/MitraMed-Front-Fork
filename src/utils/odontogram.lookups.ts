import { TeethIdsState } from "../types";

export type BoxName =
  | "arriba-izquierda"
  | "arriba-derecha"
  | "abajo-izquierda"
  | "abajo-derecha"
  | "arriba-izquierda-niño"
  | "arriba-derecha-niño"
  | "abajo-izquierda-niño"
  | "abajo-derecha-niño";

type LadoVisual = "izquierda" | "derecha";

export const box: {
  name: BoxName;
  numbers: number[];
  ladoVisual: LadoVisual;
}[] = [
  // ADULTOS
  {
    name: "arriba-izquierda",
    numbers: [18, 17, 16, 15, 14, 13, 12, 11],
    ladoVisual: "izquierda",
  },
  {
    name: "arriba-derecha",
    numbers: [21, 22, 23, 24, 25, 26, 27, 28],
    ladoVisual: "derecha",
  },
  {
    name: "abajo-izquierda",
    numbers: [48, 47, 46, 45, 44, 43, 42, 41],
    ladoVisual: "izquierda",
  },
  {
    name: "abajo-derecha",
    numbers: [31, 32, 33, 34, 35, 36, 37, 38],
    ladoVisual: "derecha",
  },

  // NIÑOS
  {
    name: "arriba-izquierda-niño",
    numbers: [55, 54, 53, 52, 51],
    ladoVisual: "izquierda",
  },
  {
    name: "arriba-derecha-niño",
    numbers: [61, 62, 63, 64, 65],
    ladoVisual: "derecha",
  },
  {
    name: "abajo-izquierda-niño",
    numbers: [85, 84, 83, 82, 81],
    ladoVisual: "izquierda",
  },
  {
    name: "abajo-derecha-niño",
    numbers: [71, 72, 73, 74, 75],
    ladoVisual: "derecha",
  },
];

export function allTeeth(): number[] {
  return box.flatMap((b) => b.numbers);
}

export function boxByTooth(toothNumber: number): {
  name: BoxName;
  ladoVisual: LadoVisual;
} {
  const cuadrante = Math.floor(toothNumber / 10);

  switch (cuadrante) {
    case 1:
      return { name: "arriba-izquierda", ladoVisual: "izquierda" };
    case 2:
      return { name: "arriba-derecha", ladoVisual: "derecha" };
    case 3:
      return { name: "abajo-derecha", ladoVisual: "derecha" };
    case 4:
      return { name: "abajo-izquierda", ladoVisual: "izquierda" };
    case 5:
      return { name: "arriba-izquierda-niño", ladoVisual: "izquierda" };
    case 6:
      return { name: "arriba-derecha-niño", ladoVisual: "derecha" };
    case 7:
      return { name: "abajo-derecha-niño", ladoVisual: "derecha" };
    case 8:
      return { name: "abajo-izquierda-niño", ladoVisual: "izquierda" };
    default:
      return { name: "arriba-izquierda", ladoVisual: "izquierda" };
  }
}

export const ID_CARA_BY_NAME = {
  todo: 0,
  vesibular: 1,
  mesial: 2,
  palatino: 3,
  distal: 4,
  oclusal: 5,
} as const;

export type CaraName = keyof typeof ID_CARA_BY_NAME;

export const CARA_BY_ID: Record<0 | 1 | 2 | 3 | 4 | 5, CaraName> = {
  0: "todo",
  1: "vesibular",
  2: "mesial",
  3: "palatino",
  4: "distal",
  5: "oclusal",
};

export function isLeftQuadrantByTooth(toothNumber: number) {
  const q = Math.floor(toothNumber / 10);
  return q === 1 || q === 4 || q === 5 || q === 8;
}

export const CARA = {
  TODO: 0,
  VESIBULAR: 1,
  MESIAL: 2,
  PALATINO: 3,
  DISTAL: 4,
  OCLUSAL: 5,
} as const;
export const TRAT = {
  EXTRACCION: 1,
  CORONA: 2,
  SELLADO: 3,
  RESTAURACIONES: 4,
} as const;

export const isARealizar = (idtrat: number) => idtrat >= 100;
export const tipoDe = (idtrat: number) =>
  idtrat >= 100 ? idtrat % 100 : idtrat;
export const fillHex = (idtrat: number) =>
  isARealizar(idtrat) ? "#0369a1" : "#ef4444";
export const toneClass = (idtrat: number) =>
  isARealizar(idtrat) ? "text-sky-700" : "text-red-500";

type Tuple = [number, number, 0 | 1];

const sortTuples = (arr: Tuple[]) =>
  [...arr].sort(([c1, t1, h1], [c2, t2, h2]) => c1 - c2 || t1 - t2 || h1 - h2);

export function isEqualTeeth(a: TeethIdsState, b: TeethIdsState) {
  const keysA = Object.keys(a)
    .map(Number)
    .sort((x, y) => x - y);
  const keysB = Object.keys(b)
    .map(Number)
    .sort((x, y) => x - y);
  if (keysA.length !== keysB.length) return false;
  for (let i = 0; i < keysA.length; i++)
    if (keysA[i] !== keysB[i]) return false;

  for (const k of keysA) {
    const arrA = sortTuples(a[k] || []);
    const arrB = sortTuples(b[k] || []);
    if (arrA.length !== arrB.length) return false;
    for (let i = 0; i < arrA.length; i++) {
      const [c1, t1, h1] = arrA[i],
        [c2, t2, h2] = arrB[i];
      if (c1 !== c2 || t1 !== t2 || h1 !== h2) return false;
    }
  }
  return true;
}

export const sinProvisoriosDeTratamientosConCara = (
  m: TeethIdsState
): TeethIdsState => {
  const out: TeethIdsState = {};
  for (const key of Object.keys(m)) {
    const k = Number(key);
    const arr = m[k] || [];
    // Filtra solo las tuplas provisorias (cara 0) de SELLADO/RESTAURACIONES.
    const filtrado = arr.filter(([cara, trat]) => {
      const base = tipoDe(trat);
      const requiereCara =
        base === TRAT.SELLADO || base === TRAT.RESTAURACIONES;
      return !(cara === 0 && requiereCara);
    });
    if (filtrado.length) out[k] = filtrado;
  }
  return out;
};
