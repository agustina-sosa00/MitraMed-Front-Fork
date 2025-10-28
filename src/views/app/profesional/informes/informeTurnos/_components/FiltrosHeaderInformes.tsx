import { ActionButton } from "@/frontend-resourses/components";
import { useInformeTurnosStore } from "../store/informeTurnosStore";
import { FaFilter } from "react-icons/fa";
import { useEffect, useMemo } from "react";

export default function FiltrosHeaderInformes({
  setDataModal,
  setModalTitle,
  setTipoFiltroActivo,
  setShowModalFiltro,
  customColor,
  customColorHover,
}) {
  //region store
  const informeTurnosData = useInformeTurnosStore((state) => state.informeTurnosData);
  const hasSearched = useInformeTurnosStore((state) => state.hasSearched);
  const filteredRows = useInformeTurnosStore((state) => state.filteredRows);
  const especialidadesSeleccionadas = useInformeTurnosStore(
    (state) => state.especialidadesSeleccionadas,
  );
  const profesionalesSeleccionados = useInformeTurnosStore(
    (state) => state.profesionalesSeleccionados,
  );
  const obrasSocialesSeleccionadas = useInformeTurnosStore(
    (state) => state.obrasSocialesSeleccionadas,
  );
  const setHasSearched = useInformeTurnosStore((state) => state.setHasSearched);
  const setEspecialidadesSeleccionadas = useInformeTurnosStore(
    (state) => state.setEspecialidadesSeleccionadas,
  );
  const setProfesionalesSeleccionados = useInformeTurnosStore(
    (state) => state.setProfesionalesSeleccionados,
  );
  const setObrasSocialesSeleccionadas = useInformeTurnosStore(
    (state) => state.setObrasSocialesSeleccionadas,
  );
  const setFilteredRows = useInformeTurnosStore((state) => state.setFilteredRows);

  const filtroButtons = [
    { key: "especialidades", label: "Especialidades", campo: "especialidades" },
    { key: "doctores", label: "Profesionales", campo: "doctores" },
    { key: "obrasSociales", label: "Obras Sociales", campo: "obrasSociales" },
  ];

  const especialidades = useMemo(() => {
    if (!informeTurnosData?.data) return [];

    const especialidadesUnicas = Array.from(
      new Set(
        informeTurnosData.data
          .map((item) => item.nespecialidad)
          .filter(
            (especialidad) =>
              especialidad !== null && especialidad !== undefined && especialidad !== "",
          ),
      ),
    );

    return especialidadesUnicas.sort(); // Ordenar alfabéticamente
  }, [informeTurnosData]);

  const profesionales = useMemo(() => {
    if (!informeTurnosData?.data) return [];

    const profesionalesUnicos = Array.from(
      new Set(
        informeTurnosData.data
          .map((item) => item.ndoctor)
          .filter(
            (profesional) =>
              profesional !== null && profesional !== undefined && profesional !== "",
          ),
      ),
    );

    return profesionalesUnicos.sort(); // Ordenar alfabéticamente
  }, [informeTurnosData]);

  // useEffect para inicializar todos los filtros con todos los datos seleccionados
  const obrasSociales = useMemo(() => {
    if (!informeTurnosData?.data) return [];

    // Agrupa por idosocial y toma el primer nosocial válido
    const mapa = new Map();
    informeTurnosData.data.forEach((item) => {
      if (item.idosocial !== null && item.idosocial !== undefined && item.idosocial !== "") {
        if (!mapa.has(item.idosocial)) {
          mapa.set(item.idosocial, item.nosocial || String(item.idosocial));
        }
      }
    });

    // Si hay particulares, agregalos
    const hayParticulares = informeTurnosData.data.some((item) => item.idosocial === 0);
    if (hayParticulares) {
      mapa.set(0, "PARTICULAR");
    }

    // Devuelve array de objetos { value, name }
    return Array.from(mapa.entries()).map(([value, name]) => ({
      value: value.toString(),
      name,
    }));
  }, [informeTurnosData]);

  //region useEffect
  // Limpiar filteredRows al montar si no hay búsqueda activa
  useEffect(() => {
    if (informeTurnosData?.data?.length) {
      setHasSearched(true);
    }
  }, []);

  useEffect(() => {
    if (!hasSearched && filteredRows.length > 0) {
      setFilteredRows([]);
    }
  }, []);

  // useEffect para sincronizacion cruzada segun filtros elegidos
  useEffect(() => {
    if (!informeTurnosData?.data || !hasSearched) return;

    // Filtrar la data según los filtros activos
    const dataFiltrada = informeTurnosData.data.filter((item) => {
      const especialidadValida =
        especialidadesSeleccionadas.length === 0 ||
        especialidadesSeleccionadas.some((esp) => esp.value === item.idespecialidad?.toString());
      const profesionalValido =
        profesionalesSeleccionados.length === 0 ||
        profesionalesSeleccionados.some((prof) => prof.value === item.iddoctor?.toString());
      const obraSocialValida =
        obrasSocialesSeleccionadas.length === 0 ||
        obrasSocialesSeleccionadas.some((os) => os.value === item.idosocial?.toString());
      return especialidadValida && profesionalValido && obraSocialValida;
    });

    // Calcular los ids válidos en la data filtrada
    const especialidadesValidas = Array.from(
      new Set(dataFiltrada.map((item) => item.idespecialidad?.toString())),
    );
    const doctoresValidos = Array.from(
      new Set(dataFiltrada.map((item) => item.iddoctor?.toString())),
    );
    const obrasSocialesValidas = Array.from(
      new Set(dataFiltrada.map((item) => item.idosocial?.toString())),
    );

    // Solo actualizar si hay cambios reales para evitar bucles infinitos
    const nuevasEspecialidades = especialidadesSeleccionadas.filter((e) =>
      especialidadesValidas.includes(e.value),
    );
    const nuevosProfesionales = profesionalesSeleccionados.filter((d) =>
      doctoresValidos.includes(d.value),
    );
    const nuevasObrasSociales = obrasSocialesSeleccionadas.filter((o) =>
      obrasSocialesValidas.includes(o.value),
    );

    const arraysIguales = (a, b) =>
      a.length === b.length && a.every((v, i) => v.value === b[i].value);

    if (!arraysIguales(nuevasEspecialidades, especialidadesSeleccionadas)) {
      setEspecialidadesSeleccionadas(nuevasEspecialidades);
    }
    if (!arraysIguales(nuevosProfesionales, profesionalesSeleccionados)) {
      setProfesionalesSeleccionados(nuevosProfesionales);
    }
    if (!arraysIguales(nuevasObrasSociales, obrasSocialesSeleccionadas)) {
      setObrasSocialesSeleccionadas(nuevasObrasSociales);
    }
  }, [
    especialidadesSeleccionadas,
    profesionalesSeleccionados,
    obrasSocialesSeleccionadas,
    informeTurnosData,
    hasSearched,
    setEspecialidadesSeleccionadas,
    setProfesionalesSeleccionados,
    setObrasSocialesSeleccionadas,
  ]);

  useEffect(() => {
    if (!hasSearched) return;
    if (informeTurnosData?.data && informeTurnosData.data.length > 0) {
      // Inicializar especialidades con todas seleccionadas
      const especialidadesFormateadas = especialidades.map((nombre, index) => {
        const registro = informeTurnosData.data.find((item) => item.nespecialidad === nombre);
        return {
          id: index.toString(),
          name: nombre,
          value: registro?.idespecialidad?.toString() || "",
        };
      });

      // Inicializar profesionales con todos seleccionados
      const profesionalesFormateados = profesionales.map((nombre, index) => {
        const registro = informeTurnosData.data.find((item) => item.ndoctor === nombre);
        return {
          id: index.toString(),
          name: nombre,
          value: registro?.iddoctor?.toString() || "",
        };
      });

      // Inicializar obras sociales con todas seleccionadas
      const obrasSocialesFormateadas = obrasSociales.map((os, index) => ({
        id: index.toString(),
        name: os.name,
        value: os.value,
      }));

      setEspecialidadesSeleccionadas(especialidadesFormateadas);
      setProfesionalesSeleccionados(profesionalesFormateados);
      setObrasSocialesSeleccionadas(obrasSocialesFormateadas);
    }
  }, [informeTurnosData, especialidades, profesionales, obrasSociales, hasSearched]);

  //region function
  function getDatosFiltro(tipo: string) {
    switch (tipo) {
      case "especialidades":
        return especialidades;
      case "doctores":
        return profesionales;
      case "obrasSociales":
        return obrasSociales;
      default:
        return [];
    }
  }

  function handleOpenModal(tipoFiltro: string, labelFiltro: string) {
    if (tipoFiltro === "obrasSociales") {
      const datosFormateados = obrasSociales.map((os, index) => ({
        id: index.toString(),
        name: os.name,
        value: os.value,
      }));
      setDataModal(datosFormateados);
      setModalTitle(`${labelFiltro}`);
      setTipoFiltroActivo(tipoFiltro);
      setShowModalFiltro(true);
      return;
    }

    // Para especialidades y doctores, mantener la lógica anterior
    const datos = getDatosFiltro(tipoFiltro);
    const datosFormateados = datos.map((nombre, index) => {
      let idCorrespondiente = "";
      if (informeTurnosData?.data) {
        const registro = informeTurnosData.data.find((item) => {
          switch (tipoFiltro) {
            case "especialidades":
              return item.nespecialidad === nombre;
            case "doctores":
              return item.ndoctor === nombre;
            default:
              return false;
          }
        });
        if (registro) {
          switch (tipoFiltro) {
            case "especialidades":
              idCorrespondiente = registro.idespecialidad?.toString() || "";
              break;
            case "doctores":
              idCorrespondiente = registro.iddoctor?.toString() || "";
              break;
          }
        }
      }
      return {
        id: index.toString(),
        name: nombre,
        value: idCorrespondiente,
      };
    });
    setDataModal(datosFormateados);
    setModalTitle(`${labelFiltro}`);
    setTipoFiltroActivo(tipoFiltro);
    setShowModalFiltro(true);
  }

  //region return
  return (
    <div className="flex max-w-lg gap-2 px-4 py-2 mt-2 bg-white border rounded">
      {/* Botones de Filtro */}
      {filtroButtons.map((filtro) => (
        <ActionButton
          key={filtro.key}
          onClick={() => handleOpenModal(filtro.key, filtro.label)}
          disabled={!hasSearched}
          custom={true}
          customColor={customColor}
          customColorHover={customColorHover}
          size="sm"
          addClassName={`px-3 py-2 text-sm border ${hasSearched ? "text-white" : "text-slate-400"}`}
          icon={<FaFilter size={10} />}
          text={filtro.label}
        />
      ))}
    </div>
  );
}
