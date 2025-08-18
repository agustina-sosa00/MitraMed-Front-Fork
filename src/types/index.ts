import { z } from "zod";

export const accountSchema = z.object({
  nombre: z.string(),
  apellido: z.string(),
  email: z.string(),
  fnac: z.string(),
  codarea: z.string(),
  telefono: z.string(),
  genero: z.string(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
  usuario: z.string().optional(),
});

export type NewAccount = z.infer<typeof accountSchema>;
export type Account = Pick<NewAccount, "email" | "password" | "usuario">;

export type Usuario = {
  nombre: string;
  apellido: string;
  email: string;
  codarea: string;
  telefono: string;
  fnac: string;
  genero: string;
};

export type UserGoogle = {
  idToken: string;
  nombre: string;
  apellido: string;
  email: string;
  fnac: string;
  genero: string;
};

export type TurnosUsuario = {
  idturno: number;
  nespecialidad: string;
  ndoctor: string;
  fecha: string;
  dia: string;
  hora_ini: string;
};

export interface Especialidad {
  idespecialidad: number;
  nombre: string;
}

export interface Doctor {
  iddoctor: number;
  nombre: string;
  apellido: string;
}

export interface Horario {
  idhorario: number;
  hora_ini: string;
  hora_fin: string;
  habilitado: number;
}

export interface Turno {
  idEspecialidad: string;
  nombreEspecialidad: string;
  idDoctor: string;
  nombreDoctor: string;
  fecha: string;
  turno: number;
  idhorario: number;
  hora_ini: string;
  hora_fin: string;
}

// region professional layout
export interface IArrayTableHistorial {
  id: number;
  fecha: string;
  motivo: string;
  data: {
    description: string;
    archivo: string;
    medicamentos?: string;
  };
  profesional: string;
}

// region context
export interface DropboxContextType {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  folder: string;
  setFolder: React.Dispatch<React.SetStateAction<string>>;
}

// region odontogram
export type RawRow = [
  iddiente: number,
  idcara: number,
  idtratamiento: number,
  habilitado: 0 | 1
];

export type ToothItemIds = [
  idcara: number,
  idtratamiento: number,
  habilitado: 0 | 1
];

export type TeethIdsState = Record<number, ToothItemIds[]>;

export type Paciente = {
  nombre: string;
  apellido: string;
  dni: string;
  fnacim: string;
  edad: string;
  idosocial: number;
  nosocial: string | null;
  idplan: number;
  nplan: string | null;
};

export type InfoUser = {
  code: number;
  data: {
    odontograma: RawRow[];
    paciente: Paciente;
  };
  message: string;
  status: boolean;
};

export type ToothChangeTuple = [number, number, number, 0 | 1, number];

export interface SearchPatientProps {
  handleFindPatient: (arg: string) => void;
  viewImg: boolean;
  showData?: boolean;
  setShowData?: (arg: boolean) => void;
  labelSearch: string;
  data: Partial<Paciente>;
  noHc?: boolean;
  setStateModal?: (arg: boolean) => void;
  odontogram?: boolean;
  state: string;
  setState: (arg: string) => void;
  editOdontogram?: boolean;
  setEditOdontogram?: (arg: boolean) => void;
  handleSave?: () => void;
}
