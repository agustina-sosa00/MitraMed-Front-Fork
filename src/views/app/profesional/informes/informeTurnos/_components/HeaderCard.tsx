import { useState } from "react";
import { useInformeTurnosStore } from "../store/informeTurnosStore";
import "dayjs/locale/es";
import ModalFiltro1 from "@/frontend-resourses/components/Modales/ModalFiltro1";
import DatePickerInformes from "./DatePickerInformes";
import FiltrosHeaderInformes from "./FiltrosHeaderInformes";
import TotalesCardInformes from "./TotalesCardInformes";
import ExportExcelButton from "./ExportExcelButton";

export default function HeaderCard() {
  const {
    hasSearched,
    especialidadesSeleccionadas,
    profesionalesSeleccionados,
    obrasSocialesSeleccionadas,
    setEspecialidadesSeleccionadas,
    setProfesionalesSeleccionados,
    setObrasSocialesSeleccionadas,
  } = useInformeTurnosStore();

  // Colores personalizados para los botones del modal
  const customColor = "#518915";
  const customColorHover = "#417a11";

  // Estados para el modal de filtro
  const [showModalFiltro, setShowModalFiltro] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [dataModal, setDataModal] = useState<any[]>([]);
  const [tipoFiltroActivo, setTipoFiltroActivo] = useState<string>("");

  function getSetter(tipo: string) {
    switch (tipo) {
      case "especialidades":
        return setEspecialidadesSeleccionadas;
      case "doctores":
        return setProfesionalesSeleccionados;
      case "obrasSociales":
        return setObrasSocialesSeleccionadas;
      default:
        return () => {};
    }
  }

  // Función para obtener los items seleccionados según el tipo de filtro
  function getItemsSeleccionados(tipo: string) {
    switch (tipo) {
      case "especialidades":
        return especialidadesSeleccionadas;
      case "doctores":
        return profesionalesSeleccionados;
      case "obrasSociales":
        return obrasSocialesSeleccionadas;
      default:
        return [];
    }
  }

  //region return
  return (
    <div className="flex justify-between w-full p-2 mb-1 border rounded bg-slate-100">
      {/* Date Picker y Filtro */}
      <div className="flex flex-col justify-between">
        {/* Date Picker */}
        <DatePickerInformes />
        {/* Filtro */}
        <FiltrosHeaderInformes
          setDataModal={setDataModal}
          setModalTitle={setModalTitle}
          setTipoFiltroActivo={setTipoFiltroActivo}
          setShowModalFiltro={setShowModalFiltro}
          customColor={customColor}
          customColorHover={customColorHover}
        />
      </div>

      {/*  Totales */}
      <TotalesCardInformes />

      {/* Botón Exportar */}
      <ExportExcelButton />

      {/* Modal de Filtro */}
      <ModalFiltro1
        datos={dataModal}
        showModal={showModalFiltro}
        setShowModal={setShowModalFiltro}
        itemsDisponibles={dataModal}
        setItemsDisponibles={setDataModal}
        itemsSeleccionados={getItemsSeleccionados(tipoFiltroActivo)}
        setItemsSeleccionados={getSetter(tipoFiltroActivo)}
        title={modalTitle}
        renderItem={(item) => <span className="text-sm">{item.name || item.value}</span>}
        customColor={customColor}
        customColorHover={customColorHover}
        // iconReact={<FaFilter />}
        disabled={!hasSearched}
      />
    </div>
  );
}
