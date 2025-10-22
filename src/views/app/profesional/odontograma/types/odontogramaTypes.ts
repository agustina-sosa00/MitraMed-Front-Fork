export type RawRow = [iddiente: number, idcara: number, idtratamiento: number, habilitado: 0 | 1];

export type ToothItemIds = [idcara: number, idtratamiento: number, habilitado: 0 | 1];

export type TeethIdsState = Record<number, ToothItemIds[]>;

export type ToothChangeTuple = [number, number, number, 0 | 1];

export type OdontogramaData = {
  code: number;
  message: string;
  status: string;
  data: {
    odontograma: [];
    paciente: {
      apellido: string;
      dni: string;
      edad: number;
      fnacim: string;
      idosocial: number;
      idpaciente: number;
      idplan: number;
      nombre: string;
      nosocial: string | null;
      nplan: string | null;
    };
  };
};
