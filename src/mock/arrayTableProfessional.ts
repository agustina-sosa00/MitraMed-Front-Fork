export interface IDataTable {
  id: number;
  day?: string;
  hourInit?: string;
  hourFinish?: string;
  name?: string;
  state?: string;
  obs?: string;
  saco?: string;
  especiality?: string;
}
export interface IFormState {
  hc: string;
  name: string;
  obs: string;
  codarea: number | null;
  tel: number | null;
}
export const dataTableTurns = [
  {
    id: 1,
    day: "04/07/2025",
    hourInit: "18:30",
    hourFinish: "19:00",
  },
  {
    id: 2,
    day: "04/07/2025",
    hourInit: "19:00",
    hourFinish: "19:30",
  },
  {
    id: 2,
    day: "05/07/2025",
    hourInit: "19:00",
    hourFinish: "19:30",
  },
  {
    id: 2,
    day: "09/07/2025",
    hourInit: "19:00",
    hourFinish: "19:30",
  },
  {
    id: 3,
    day: "06/07/2025",
    hourInit: "19:30",
    hourFinish: "20:00",
  },
  {
    id: 3,
    day: "05/07/2025",
    hourInit: "19:30",
    hourFinish: "20:00",
  },
  {
    id: 4,
    day: "07/07/2025",
    hourInit: "20:00",
    hourFinish: "20:30",
  },
  {
    id: 4,
    day: "06/07/2025",
    hourInit: "20:00",
    hourFinish: "20:30",
  },
  {
    id: 4,
    day: "08/07/2025",
    hourInit: "20:00",
    hourFinish: "20:30",
  },
  {
    id: 5,
    day: "08/07/2025",
    hourInit: "20:30",
    hourFinish: "21:00",
  },
  {
    id: 5,
    day: "07/07/2025",
    hourInit: "20:30",
    hourFinish: "21:00",
  },
];
export const dataTableTurnsTwo = [
  {
    id: 1,
    day: "04/07/2025",
    hourInit: "8:30",
    hourFinish: "9:00",
  },
  {
    id: 2,
    day: "04/07/2025",
    hourInit: "9:00",
    hourFinish: "9:30",
  },
  {
    id: 3,
    day: "04/07/2025",
    hourInit: "9:30",
    hourFinish: "10:00",
  },
  {
    id: 4,
    day: "04/07/2025",
    hourInit: "10:00",
    hourFinish: "10:30",
  },
  {
    id: 5,
    day: "04/07/2025",
    hourInit: "10:30",
    hourFinish: "11:00",
  },
];

export const tableProfessionals = [
  {
    id: 1,
    name: "Agustina Sosa",
    especiality: "Otorrinolaringologia",
    turns: dataTableTurns,
  },
  {
    id: 2,
    name: "Leandro Mortarini",
    especiality: "Cirugia General",
    turns: dataTableTurnsTwo,
  },
  {
    id: 3,
    name: "Jean Pietro Mortarini",
    especiality: "Cirugia General",
  },
  {
    id: 4,
    name: "Tomas Sosa",
    especiality: "Cirugia General",
  },
  {
    id: 5,
    name: "Sofia Sosa",
    especiality: "Odontologia",
  },
];

export const dataPatient = [
  {
    hc: "0011",
    name: "Florencia Cabral",
    codarea: 11,
    telefono: 12345678,
  },
  {
    hc: "0032",
    name: "Lucas Bilboa",
    codarea: 11,
    telefono: 12345678,
  },
  {
    hc: "0023",
    name: "Agustina Sosa",
    codarea: 11,
    telefono: 12345678,
  },
  {
    hc: "0054",
    name: "Leandro Mortarini",
    codarea: 11,
    telefono: 12345678,
  },
  {
    hc: "0065",
    name: "Jean Pietro Mortarini",
    codarea: 11,
    telefono: 12345678,
  },
  {
    hc: "0076",
    name: "Tomas Sosa",
    codarea: 11,
    telefono: 12345678,
  },
  {
    hc: "0087",
    name: "Sofia Sosa",
    codarea: 11,
    telefono: 12345678,
  },
];

export const tableSchedules: IDataTable[] = [
  {
    id: 1,
    day: "09/07/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Agustina Sosa",
    state: "presente",
    obs: "IOMA",
    saco: "MIT",
  },
  {
    id: 2,
    day: "09/07/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Agustina Sosa",
    state: "presente",
    obs: "IOMA",
    saco: "WEB",
  },
  {
    id: 3,
    day: "08/07/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Leandro Mortarini",
    state: "ausente",
    obs: "SWISS",
    saco: "WEB",
  },
  {
    id: 4,
    day: "08/07/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Jean Pietro Mortarini",
    state: "presente",
    obs: "IOMA",
    saco: "MTR",
  },
  {
    id: 5,
    day: "08/07/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Jean Pietro Mortarini",
    state: "",
    obs: "",
    saco: "MTR",
  },
  {
    id: 6,
    day: "08/07/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Leandro Mortarini",
    state: "presente",
    obs: "MEDIFE",
    saco: "WEB",
  },
  {
    id: 7,
    day: "08/07/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Jean Pietro Mortarini",
    state: "",
    obs: "",
    saco: "WEB",
  },
  {
    id: 8,
    day: "08/07/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Jean Pietro Mortarini",
    state: "",
    obs: "",
    saco: "WEB",
  },
  {
    id: 9,
    day: "08/07/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Jean Pietro Mortarini",
    state: "",
    obs: "",
    saco: "MTR",
  },
  {
    id: 10,
    day: "08/07/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Jean Pietro Mortarini",
    state: "",
    obs: "",
    saco: "MTR",
  },
  {
    id: 11,
    day: "08/07/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Jean Pietro Mortarini",
    state: "",
    obs: "",
    saco: "WEB",
  },
  {
    id: 12,
    day: "08/07/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Jean Pietro Mortarini",
    state: "",
    obs: "SWISS",
    saco: "MTR",
  },
  {
    id: 13,
    day: "08/07/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Jean Pietro Mortarini",
    state: "",
    obs: "",
    saco: "MTR",
  },
  {
    id: 14,
    day: "08/07/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Jean Pietro Mortarini",
    state: "",
    obs: "IOMA",
    saco: "WEB",
  },
];

export const tableColumnData = [
  {
    key: "id",
    label: "ID",
    minWidth: "50",
    maxWidth: "50",
  },
  {
    key: "day",
    label: "DÍA",
    minWidth: "120",
    maxWidth: "120",
  },
  {
    key: "hourInit",
    label: "HORA INICIO",
    minWidth: "100",
    maxWidth: "100",
  },
  {
    key: "hourFinish",
    label: "HORA FIN",
    minWidth: "100",
    maxWidth: "100",
  },
  {
    key: "name",
    label: "NOMBRE Y APELLIDO",
    minWidth: "300",
    maxWidth: "300",
  },
  {
    key: "state",
    label: "ESTADO",
    minWidth: "100",
    maxWidth: "100",
  },
  {
    key: "obs",
    label: "OBRA SOCIAL",
    minWidth: "120",
    maxWidth: "120",
  },
  {
    key: "saco",
    label: "SACO",
    minWidth: "60",
    maxWidth: "60",
  },
];

// ------------------------- H I S T O R I A L  M E D I C O

export interface SearchPatientProps {
  handleFindPatient: (arg: string) => void;
  viewImg: boolean;
  showData: boolean;
  labelSearch: string;
  data: IObjetcPatient;
  noHc?: boolean;
  setStateModal?: (arg: boolean) => void;
  odontogram?: boolean;
}

export interface IObjetcPatient {
  id?: number;
  hc?: string;
  lastName?: string;
  name?: string;
  nombre?: string;
  apellido?: string;
  fnacim?: string;
  edad?: number;
  dni?: string;
  fnac?: string;
  age?: string;
  obs?: string;
  idosocial?: number;
  idplan?: number;
  nosocial?: null | string;
  nplan?: null | string;
}

export const dataPatientHc: IObjetcPatient = {
  id: 0,
  hc: "00000000",
  lastName: "Mortarini",
  name: "Jean Pietro",
  dni: "00000000",
  fnac: "00/00/0000",
  age: "00",
  obs: "Swiss Medical",
};
