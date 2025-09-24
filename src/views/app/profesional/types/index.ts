import { IconType } from "react-icons/lib";

export interface DropboxContextType {
  folder: string;
  setFolder: React.Dispatch<React.SetStateAction<string>>;
}

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

export interface BuscadorDePacientesProps {
  onSearch: (arg: string) => void;
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
  handleCancel?: () => void;
  handleDeletePatient?: () => void;
  changes?: boolean;
  errorState?: string;
  setErrorState?: (arg: string) => void;
  isActive?: boolean;
  hasConfirmed?: boolean;
  loading?: boolean;
  setPreviewOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export type ContextType = {
  setDisabledButtonSidebar: React.Dispatch<
    React.SetStateAction<{
      inicio: boolean;
      turnos: boolean;
      historial: boolean;
      odontograma: boolean;
      tablaGral: boolean;
      turnosGrales: boolean;
    }>
  >;
  disabledButtonSidebar: {
    inicio: boolean;
    turnos: boolean;
    historial: boolean;
    odontograma: boolean;
    tablaGral: boolean;
    turnosGrales: boolean;
  };
  buttonsSidebar: [
    {
      key: string;
      name: string;
      icon: IconType;
      link: string;
      disabled: boolean;
      description: string;
    },
  ];
};
