import { useEffect, useRef } from "react";
import { TablaDefault } from "@/frontend-resourses/components";
import { useUsuariosProfesionalStore } from "../store/usuariosProfesionalesStore";
import FormCard from "./FormCard";

export default function TableCard() {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    dataUsuarios,
    setUsuarioSeleccionado,
    consulta,
    edicion,
    alta,
    usuarioSeleccionado,
    dataDoctores,
    setConsulta,
    setEdicion,
  } = useUsuariosProfesionalStore();

  // Focus inicial al montar el componente (solo en modo consulta)
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

  const columnasTabla = [
    { key: "usuario", label: "Usuario", minWidth: "120", maxWidth: "140" },
    { key: "nusuario", label: "Nombre", minWidth: "170", maxWidth: "220" },
    { key: "tipo", label: "Tipo", minWidth: "130", maxWidth: "170" },
  ];

  const datosTabla = Array.isArray(dataUsuarios)
    ? dataUsuarios.map((item, idx) => ({
        ...item,
        rowId: idx + 1,
        id: item.id !== undefined ? item.id : idx + 1,
      }))
    : [];

  const propsTabla = {
    datosParaTabla: datosTabla,
    objectColumns: columnasTabla,
    objectStyles: {
      heightContainer: "300px",
      widthContainer: "500px",
      addHeaderColor: edicion || alta ? "#4a6b7a" : "#022539",
      withScrollbar: true,
      withBorder: true,
    },
    selectFn: consulta,
    selectFirst: true,
    estaProcesado: true,
    objectSelection: { setSeleccionado: handleSeleccionado },
    disableRowSelect: edicion || alta,
  };

  function handleSeleccionado(usuario) {
    if (consulta) {
      setUsuarioSeleccionado(usuario);
    }
  }

  return (
    <div className="flex w-full gap-3 border p-4 bg-white rounded">
      <div className="">
        <TablaDefault props={propsTabla} />
      </div>
      <div className="flex h-full items-start">
        <FormCard
          dataDoctores={dataDoctores}
          usuarioSeleccionado={usuarioSeleccionado}
          consulta={consulta}
          setConsulta={setConsulta}
          edicion={edicion}
          setEdicion={setEdicion}
        />
      </div>
    </div>
  );
}
