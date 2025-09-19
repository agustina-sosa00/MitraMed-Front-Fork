import { useState, useEffect, useRef } from "react";
import { FaUserPlus, FaUserEdit, FaUserMinus } from "react-icons/fa";
import { useUsuariosProfesionalStore } from "../store/usuariosProfesionalesStore";
import { grabarUsuarioProf } from "../service/usuariosProfService";
import ActionButton from "@/frontend-resourses/components/Buttons/ActionButton";
import showAlert from "@/frontend-resourses/utils/showAlert";
import AltaUserModal from "./AltaUserModal";
// import RadioInput from "@/frontend-resourses/components/Inputs/RadioInput";

export default function HeaderCard() {
  // const [filtroTipo, setFiltroTipo] = useState("usuario");
  // const [filtroValue, setFiltroValue] = useState("");
  const [showModalAlta, setShowModalAlta] = useState(false);

  // Referencia al input de búsqueda
  const inputRef = useRef<HTMLInputElement>(null);

  const customColor = "#518915";
  const customColorHover = "#417a11";

  const {
    setUsuarioSeleccionado,
    usuarioSeleccionado,
    dataUsuarios,
    consulta,
    edicion,
    alta,
    setConsulta,
    setEdicion,
    setAlta,
    setSelectEnabled,
    triggerRefetchUsuarios,
  } = useUsuariosProfesionalStore();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (inputRef.current && !edicion && !alta) {
  //       inputRef.current.focus();
  //     }
  //   }, 100);

  //   return () => clearTimeout(timer);
  // }, [filtroTipo, edicion, alta]);

  useEffect(() => {
    if (consulta && !edicion && !alta) {
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 150);

      return () => clearTimeout(timer);
    }
  }, []);

  //   const radioOptions = [
  //     { value: "usuario", label: "Usuario" },
  //     { value: "nusuario", label: "Nombre" },
  //     { value: "tipo", label: "Tipo" },
  //   ];

  function handleAlta() {
    setShowModalAlta(true);
    setAlta(true);
  }

  function handleCloseModal() {
    setShowModalAlta(false);
    setAlta(false);
    setConsulta(true);
    setEdicion(false);
  }

  function handleEditar() {
    // setEditMode(true);
    setSelectEnabled(false);
    // Cambiar a estado de edición
    setConsulta(false);
    setEdicion(true);
    setAlta(false);
  }

  async function handleBaja() {
    const usuario = usuarioSeleccionado?.nusuario || usuarioSeleccionado?.usuario || "este usuario";

    const result = await showAlert({
      icon: "warning",
      text: `¿Dar de Baja al Usuario "${usuario}"?`,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
      confirmButtonColor: "#518915",
      cancelButtonColor: "#ef4444",
    });

    if (result.isConfirmed) {
      try {
        const payload = {
          ...usuarioSeleccionado,
          esBaja: 1,
        };

        await grabarUsuarioProf(payload);

        // Actualizar lista y seleccionar el primer usuario después del refetch
        triggerRefetchUsuarios?.();

        // Pequeño delay para asegurar que los datos se actualicen
        setTimeout(() => {
          if (dataUsuarios && dataUsuarios.length > 0) {
            setUsuarioSeleccionado(dataUsuarios[0]);
          }
        }, 500);

        showAlert({
          icon: "success",
          text: `Baja Realizada correctamente`,
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        showAlert({
          icon: "error",
          text: "Error al dar de baja el usuario",
          showConfirmButton: true,
        });
      }
    }
  }

  return (
    <div className="flex items-end justify-start gap-2">
      {/* Filtro */}
      {/* <div className={`flex flex-col w-[800px] gap-2 px-4 py-2 border rounded bg-white `}>
        <label
          htmlFor="filtroUsuarios"
          className={`text-sm font-medium ${edicion || alta ? "text-gray-400" : "text-gray-700"}`}
        >
          Filtrar por:
        </label>

        <div className="flex gap-3 mb-0.5 ">
          {radioOptions.map((opt) => (
            <RadioInput
              key={opt.value}
              checked={filtroTipo === opt.value}
              onChange={() => !edicion && !alta && setFiltroTipo(opt.value)}
              label={opt.label}
              inputClassName="accent-green-600"
              labelClassName={`text-xs ${
                edicion || alta ? "cursor-default text-slate-400" : "cursor-pointer"
              }`}
              disabled={edicion || alta}
            />
          ))}
        </div>

        <input
          ref={inputRef}
          id="filtroUsuarios"
          type="text"
          className={`h-6 w-90 px-2 py-1 text-sm border border-gray-300 rounded ${
            edicion || alta ? "bg-gray-100 text-gray-400 cursor-default" : ""
          }`}
          value={filtroValue}
          onChange={(e) => !edicion && !alta && setFiltroValue(e.target.value)}
          placeholder={`Buscar por ${radioOptions.find((opt) => opt.value === filtroTipo)?.label.toLowerCase()}...`}
          disabled={edicion || alta}
        />
      </div> */}

      {/* Botones de acción */}
      <div className="flex w-full max-w-[390px] gap-2 items-center border p-2 bg-white rounded">
        <ActionButton
          text="Alta"
          type="button"
          size="sm"
          addClassName="w-full"
          onClick={handleAlta}
          disabled={!consulta}
          custom
          customColor={customColor}
          customColorHover={customColorHover}
          icon={<FaUserPlus size={16} />}
        />

        <ActionButton
          text="Editar"
          type="button"
          size="sm"
          addClassName="w-full"
          onClick={handleEditar}
          disabled={!consulta} // Solo habilitado en consulta
          custom
          customColor={customColor}
          customColorHover={customColorHover}
          icon={<FaUserEdit size={16} />}
        />

        <ActionButton
          text="Baja"
          type="button"
          size="sm"
          addClassName="w-full"
          onClick={handleBaja}
          disabled={!consulta} // Solo habilitado en consulta
          custom
          customColor={customColor}
          customColorHover={customColorHover}
          icon={<FaUserMinus size={16} />}
        />
      </div>

      {/* Modal para Alta de Usuario */}
      {showModalAlta && (
        <AltaUserModal
          isOpen={showModalAlta}
          onClose={handleCloseModal}
          onSuccess={triggerRefetchUsuarios}
        />
      )}
    </div>
  );
}
