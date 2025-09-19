import { TablaDefault } from "@/frontend-resourses/components";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import showAlert from "@/frontend-resourses/utils/showAlert";
import { SlRefresh } from "react-icons/sl";

import ActionButton from "@/frontend-resourses/components/Buttons/ActionButton";
import { useUsuariosProfesionalStore } from "../../usuarios/store/usuariosProfesionalesStore";
import { obtenerDoctores, obtenerUsuariosProf } from "../../usuarios/service/usuariosProfService";

type UsuarioProf = {
  id: string | number;
  rowId?: number;
  idprofesional: number;
  usuario: string;
  nusuario: string;
  iddoctor: number;
  ndoctor: string;
  tusuario: number;
  tipo: string;
  passprof: string;
};

type Doctores = {
  id: number;
  ndoctor: string;
};

export default function UsuariosProfCard() {
  const [alta, setAlta] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);

  const {
    editMode,
    setEditMode,
    setSelectEnabled,
    usuarioSeleccionado,
    setUsuarioSeleccionado,
    enabledFetchUsu,
    setEnabledFetchUsu,
  } = useUsuariosProfesionalStore();

  const customColor = "#4F8EF7"; // azul claro
  const customColorHover = "#2563eb"; // azul más oscuro

  // Estados para botones
  const haySeleccion = !!usuarioSeleccionado;
  const puedeAlta = !haySeleccion && !alta && !modoEdicion;
  const puedeBaja = haySeleccion && !alta && !modoEdicion;
  const puedeEditar = haySeleccion && !alta && !modoEdicion;

  const [firstLoadDoctores, setFirstLoadDoctores] = useState(true);

  const columnasTabla = [
    { key: "usuario", label: "Usuario", minWidth: "120", maxWidth: "120" },
    { key: "nusuario", label: "Nombre", minWidth: "120", maxWidth: "120" },
    { key: "tipo", label: "Tipo", minWidth: "130", maxWidth: "130" },
    // { key: "ndoctor", label: "Doctor", minWidth: "300", maxWidth: "300" },
  ];

  const {
    data: dataUsuProf,
    refetch: refetchUsuProf,
    isSuccess: isSuccessUsuProf,
  } = useQuery<{ data: UsuarioProf[] }>({
    queryKey: ["usuarios-prof"],
    queryFn: () => obtenerUsuariosProf(),
    enabled: enabledFetchUsu,
  });

  const {
    data: _dataDoctores,
    refetch: refetchDoctores,
    isSuccess: isSuccessDoctores,
  } = useQuery<{ data: Doctores[] }>({
    queryKey: ["doctores"],
    queryFn: () => obtenerDoctores(),
    enabled: firstLoadDoctores,
  });

  const datosTabla: UsuarioProf[] = Array.isArray(dataUsuProf?.data)
    ? dataUsuProf.data.map((item, idx) => ({
        ...item,
        rowId: idx + 1,
        id: item.id !== undefined ? item.id : idx + 1,
      }))
    : [];

  const handleSeleccionado = (usuario: UsuarioProf) => {
    if (!editMode && !modoEdicion && !alta) {
      setUsuarioSeleccionado(usuario);
    }
  };

  const propsTabla = {
    datosParaTabla: datosTabla,
    objectColumns: columnasTabla,
    objectStyles: {
      heightContainer: "300px",
      addHeaderColor: "#022539",
      withScrollbar: true,
      withBorder: true,
    },
    selectFn: !alta,
    objectSelection: { setSeleccionado: handleSeleccionado },
    disableRowSelect: editMode,
  };

  useEffect(() => {
    if (isSuccessUsuProf && enabledFetchUsu) {
      setEnabledFetchUsu(false);
    }
  }, [isSuccessUsuProf, enabledFetchUsu, setEnabledFetchUsu]);

  useEffect(() => {
    if (isSuccessDoctores && firstLoadDoctores) setFirstLoadDoctores(false);
  }, [isSuccessDoctores, firstLoadDoctores]);

  function handleAlta() {
    setUsuarioSeleccionado(undefined);
    setEditMode(true);
    setSelectEnabled(false);
    setAlta(true);
    setModoEdicion(false);
  }

  function handleEditar() {
    setEditMode(true);
    setSelectEnabled(false);
    setModoEdicion(true);
    setAlta(false);
  }

  async function handleBaja() {
    const result = await showAlert({
      icon: "warning",
      text: "¿Seguro que quieres dar de baja este usuario?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Sí, dar de baja",
      cancelButtonText: "No",
    });
    if (result.isConfirmed) {
      // Aquí iría la lógica real de baja
      setUsuarioSeleccionado(undefined);
      showAlert({ icon: "success", text: "Usuario dado de baja (simulado)" });
    }
  }

  // function handleEndAltaOEdicion() {
  //   setAlta(false);
  //   setModoEdicion(false);
  //   setUsuarioSeleccionado(undefined);
  //   setEditMode(false);
  //   setSelectEnabled(true);
  // }
  //region return
  return (
    <div className="flex flex-col gap-5 p-4 ">
      {/* Botones  */}
      <div className="flex items-center w-full gap-2 px-2">
        <ActionButton
          type="button"
          text="Refrescar datos"
          icon={<SlRefresh size={16} />}
          size="sm"
          custom
          customColor={customColor}
          customColorHover={customColorHover}
          addClassName="w-full"
          onClick={() => {
            refetchUsuProf();
            refetchDoctores();
          }}
        />
        <ActionButton
          type="button"
          text="+ Alta Usuario"
          size="sm"
          addClassName="w-full"
          onClick={handleAlta}
          disabled={!puedeAlta}
          custom
          customColor={customColor}
          customColorHover={customColorHover}
        />
        <ActionButton
          type="button"
          text="- Baja Usuario"
          size="sm"
          addClassName="w-full"
          onClick={handleBaja}
          disabled={!puedeBaja}
          custom
          customColor={customColor}
          customColorHover={customColorHover}
        />
        <ActionButton
          type="button"
          text="Editar Usuario"
          size="sm"
          addClassName="w-full"
          onClick={handleEditar}
          disabled={!puedeEditar}
          custom
          customColor={customColor}
          customColorHover={customColorHover}
        />
      </div>

      {/* Tabla y Formulario */}
      <div className="flex gap-5">
        <TablaDefault props={propsTabla} />
        {/* <UsuariosProfCard 
          modoEdicion={modoEdicion}
          usuarioSeleccionado={usuarioSeleccionado}
          setUsuarioSeleccionado={setUsuarioSeleccionado}
          editMode={editMode}
          setEditMode={setEditMode}
          
          setSelectEnabled={setSelectEnabled}
          endAltaOEdicion={handleEndAltaOEdicion}
        /> */}
      </div>
    </div>
  );
}
