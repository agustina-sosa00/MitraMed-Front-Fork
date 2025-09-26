export type RawRow = [iddiente: number, idcara: number, idtratamiento: number, habilitado: 0 | 1];

export type ToothItemIds = [idcara: number, idtratamiento: number, habilitado: 0 | 1];

export type TeethIdsState = Record<number, ToothItemIds[]>;

export type ToothChangeTuple = [number, number, number, 0 | 1];
