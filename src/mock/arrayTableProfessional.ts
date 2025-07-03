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

export const tableProfessionals = [
  {
    id: 1,
    name: "Agustina Sosa",
    especiality: "Pediatria",
  },
  {
    id: 2,
    name: "Leandro Mortarini",
    especiality: "Cirugia General",
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

export const dataTableTurns = [
  {
    id: 1,
    day: "03/07/2025",
    hourInit: "18:30",
    hourFinish: "19:00",
  },
  {
    id: 2,
    day: "03/07/2025",
    hourInit: "19:00",
    hourFinish: "19:30",
  },
  {
    id: 3,
    day: "03/07/2025",
    hourInit: "19:30",
    hourFinish: "20:00",
  },
  {
    id: 4,
    day: "03/07/2025",
    hourInit: "20:00",
    hourFinish: "20:30",
  },
  {
    id: 5,
    day: "03/07/2025",
    hourInit: "20:30",
    hourFinish: "21:00",
  },
];

export const tableSchedules: IDataTable[] = [
  {
    id: 1,
    day: "19/06/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Agustina Sosa",
    state: "presente",
    obs: "IOMA",
    saco: "WEB",
  },
  {
    id: 2,
    day: "18/06/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Agustina Sosa",
    state: "presente",
    obs: "IOMA",
    saco: "MTR",
  },
  {
    id: 3,
    day: "19/06/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Leandro Mortarini",
    state: "ausente",
    obs: "SWISS",
    saco: "WEB",
  },
  {
    id: 4,
    day: "20/06/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Jean Pietro Mortarini",
    state: "presente",
    obs: "IOMA",
    saco: "MTR",
  },
  {
    id: 5,
    day: "20/06/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Jean Pietro Mortarini",
    state: "",
    obs: "",
    saco: "MTR",
  },
  {
    id: 6,
    day: "19/06/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Leandro Mortarini",
    state: "presente",
    obs: "MEDIFE",
    saco: "WEB",
  },
  {
    id: 7,
    day: "18/06/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Jean Pietro Mortarini",
    state: "",
    obs: "",
    saco: "WEB",
  },
  {
    id: 8,
    day: "18/06/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Jean Pietro Mortarini",
    state: "",
    obs: "",
    saco: "WEB",
  },
  {
    id: 9,
    day: "18/06/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Jean Pietro Mortarini",
    state: "",
    obs: "",
    saco: "MTR",
  },
  {
    id: 10,
    day: "20/06/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Jean Pietro Mortarini",
    state: "",
    obs: "",
    saco: "MTR",
  },
  {
    id: 11,
    day: "19/06/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Jean Pietro Mortarini",
    state: "",
    obs: "",
    saco: "WEB",
  },
  {
    id: 12,
    day: "19/06/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Jean Pietro Mortarini",
    state: "",
    obs: "SWISS",
    saco: "MTR",
  },
  {
    id: 13,
    day: "20/06/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Jean Pietro Mortarini",
    state: "",
    obs: "",
    saco: "MTR",
  },
  {
    id: 14,
    day: "19/06/2025",
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
