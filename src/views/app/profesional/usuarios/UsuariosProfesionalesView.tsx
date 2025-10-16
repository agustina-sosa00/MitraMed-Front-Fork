import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { useUsuariosProfesionalStore } from "./store/usuariosProfesionalesStore";
import { obtenerDoctores, obtenerUsuariosProf } from "./service/usuariosProfService";
import { OutletContext } from "@/context/types";
import TableCard from "./_components/TableCard";
import HeaderCard from "./_components/HeaderCard";
import TitleView from "../../_components/features/TitleView";

export default function UsuariosProfesionalesView() {
  const { setDisabledButtonSidebar } = useOutletContext<OutletContext>();

  const {
    setDataUsuarios,
    setDataDoctores,
    shouldRefetchUsuarios,
    resetRefetchFlag,
    updateUsuarioSeleccionado,
    consulta,
    edicion,
    alta,
  } = useUsuariosProfesionalStore();

  const {
    data: usuariosProf,
    isSuccess: isSuccessUsuProf,
    refetch: refetchUsuarios,
  } = useQuery({
    queryKey: ["usuarios-prof"],
    queryFn: () => obtenerUsuariosProf(),
  });

  const { data: doctores, isSuccess: isSuccessDoctores } = useQuery({
    queryKey: ["doctores"],
    queryFn: () => obtenerDoctores(),
  });

  useEffect(() => {
    if (isSuccessUsuProf) {
      setDataUsuarios(usuariosProf.data);
      // Actualizar el usuario seleccionado con los datos frescos
      updateUsuarioSeleccionado();
    }
  }, [isSuccessUsuProf, setDataUsuarios, usuariosProf, updateUsuarioSeleccionado]);

  useEffect(() => {
    if (isSuccessDoctores) {
      setDataDoctores(doctores.data);
    }
  }, [isSuccessDoctores, setDataDoctores, doctores]);

  useEffect(() => {
    if (shouldRefetchUsuarios) {
      refetchUsuarios().then(() => {
        resetRefetchFlag();
      });
    }
  }, [shouldRefetchUsuarios, refetchUsuarios, resetRefetchFlag]);

  useEffect(() => {
    const shouldDisableSidebar = edicion || alta;

    setDisabledButtonSidebar({
      inicio: shouldDisableSidebar,
      turnos: shouldDisableSidebar,
      historial: shouldDisableSidebar,
      odontograma: shouldDisableSidebar,
      tablaGral: shouldDisableSidebar,
      turnosGrales: shouldDisableSidebar,
      informe: shouldDisableSidebar,
      informes: shouldDisableSidebar,
      usuarios: shouldDisableSidebar,
      configuracion: shouldDisableSidebar,
    });

    // Cleanup: cuando se desmonta el componente, resetear el sidebar
    return () => {
      setDisabledButtonSidebar({
        inicio: false,
        turnos: false,
        historial: false,
        odontograma: false,
        tablaGral: false,
        turnosGrales: false,
        informe: false,
        informes: false,
        usuarios: false,
        configuracion: false,
      });
    };
  }, [consulta, edicion, alta, setDisabledButtonSidebar]);
  //region return
  return (
    <>
      <TitleView title="Usuarios" />
      <div className="flex flex-col justify-center gap-2 px-6 py-4 border-2 rounded shadow-lg w-fit bg-slate-100">
        <HeaderCard />
        <TableCard />
      </div>
    </>
  );
}
