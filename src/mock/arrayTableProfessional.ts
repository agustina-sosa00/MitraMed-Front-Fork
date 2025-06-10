export interface IDataTable {
  id: number;
  day: string;
  hourInit: string;
  hourFinish: string;
  name: string;
  state: string;
  obs: string;
}
export const tableSchedules: IDataTable[] = [
  {
    id: 1,
    day: "15/06/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Agustina Sosa",
    state: "presente",
    obs: "IOMA",
  },
  {
    id: 1,
    day: "10/06/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Agustina Sosa",
    state: "presente",
    obs: "IOMA",
  },
  {
    id: 2,
    day: "15/06/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Leandro Mortarini",
    state: "ausente",
    obs: "SWISS",
  },
  {
    id: 3,
    day: "15/06/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Jean Pietro Mortarini",
    state: "presente",
    obs: "IOMA",
  },
  {
    id: 3,
    day: "23/06/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Jean Pietro Mortarini",
    state: "",
    obs: "",
  },
  {
    id: 4,
    day: "19/06/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Leandro Mortarini",
    state: "presente",
    obs: "MEDIFE",
  },
  {
    id: 5,
    day: "10/06/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Jean Pietro Mortarini",
    state: "",
    obs: "",
  },
  {
    id: 6,
    day: "08/06/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Jean Pietro Mortarini",
    state: "",
    obs: "",
  },
  {
    id: 7,
    day: "07/07/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Jean Pietro Mortarini",
    state: "",
    obs: "",
  },
  {
    id: 8,
    day: "10/07/2025",
    hourInit: "18:30",
    hourFinish: "18:30",
    name: "Jean Pietro Mortarini",
    state: "",
    obs: "",
  },
];

export const tableColumnData = [
  {
    key: "id",
    label: "ID",
    minWidth: "40",
    maxWidth: "40",
  },
  {
    key: "day",
    label: "DÍA",
    minWidth: "150",
    maxWidth: "150",
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
    minWidth: "400",
    maxWidth: "400",
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
    minWidth: "100",
    maxWidth: "100",
  },
];
