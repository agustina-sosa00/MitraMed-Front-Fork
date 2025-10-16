export type OutletContext = {
  setDisabledButtonSidebar: React.Dispatch<
    React.SetStateAction<{
      inicio: boolean;
      turnos: boolean;
      historial: boolean;
      odontograma: boolean;
      tablaGral: boolean;
      turnosGrales: boolean;
      informe: boolean;
      informes: boolean;
      usuarios: boolean;
      configuracion: boolean;
    }>
  >;
  disabledButtonSidebar: {
    inicio: boolean;
    turnos: boolean;
    historial: boolean;
    odontograma: boolean;
    tablaGral: boolean;
    turnosGrales: boolean;
    informe: boolean;
    informes: boolean;
    usuarios: boolean;
    configuracion: boolean;
  };
  buttonsSidebar: any[];
};
