import { IDataTable, IFormState, tableProfessionals } from "../turnos/mock/arrayTableProfessional";
import { useEffect, useState } from "react";
import { BoxButton } from "../../components/ui/buttons/BoxButton";
import { Modal } from "@/views/app/components/ui/modals/Modal";
import Swal from "sweetalert2";
import { TablaDefault } from "@/frontend-resourses/components";
import { TableNode } from "@/frontend-resourses/components/types";

import { ContainView } from "@/views/app/components/features/ContainView";
import FiltrosTablaMisTurnos from "../../components/ui/Filters/FiltrosTablaMisTurnos";
import TablaTurnosProfesionales from "./components/TablaProfesionales";
import ModalAltaTurno from "./components/ModalAltaTurno";

export default function TurnosProfesionalesView() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalName, setModalName] = useState<string>("");
  const [selectProfessional, setSelectProfessional] = useState<{
    id: number;
    name: string;
    especiality: string;
  }>();
  const [selectTurn, setSelectTurn] = useState<IDataTable>();
  const [arrayFilter, setArrayFilter] = useState<TableNode[]>([]);

  const handleBoxButton = (item: string) => {
    if (item === "alta turno") {
      handleOpenModal(item);
    } else if (item === "presentación") {
      handlePresentacion();
    } else if (item === "facturación") {
      handleFacturacion();
    }
  };

  const handleOpenModal = (item: string) => {
    setModalName(item);
    setOpenModal(!openModal);
  };

  const handleFacturacion = () => {
    Swal.fire({
      icon: "question",
      title: "¿Desea cambiar el estado a Factura pendiente?",
      confirmButtonText: "Si",
      confirmButtonColor: "#518915",
      cancelButtonText: "No",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        if (!selectTurn) return;

        const updatedArray = arrayFilter?.map((item) =>
          item.id === selectTurn.id ? { ...item, state: "Factura pendiente" } : item,
        );
        setArrayFilter(updatedArray);
      }
    });
  };

  const handlePresentacion = () => {
    Swal.fire({
      icon: "question",
      title: "¿Confirama la presencia del paciente?",
      confirmButtonText: "Si",
      confirmButtonColor: "#518915",
      cancelButtonText: "No",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        if (!selectTurn) return;

        const updatedArray = arrayFilter?.map((item) =>
          item.id === selectTurn.id ? { ...item, state: "Presente" } : item,
        );
        setArrayFilter(updatedArray);
      }
    });
  };

  const getToday = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [daySchedule, setDaySchedule] = useState(getToday);

  const changeDay = (dias: number) => {
    const nuevaFecha = new Date(daySchedule);
    nuevaFecha.setDate(nuevaFecha.getDate() + dias);
    setDaySchedule(nuevaFecha.toISOString().split("T")[0]);
  };

  useEffect(() => {
    const diaFormateado = daySchedule.split("-").reverse().join("/");

    let resultado: TableNode[] = [];

    if (selectProfessional) {
      const profesional = tableProfessionals.find((item) => item.id === selectProfessional.id);

      if (profesional?.turns) {
        resultado = profesional.turns.filter((turno) => turno.day === diaFormateado);
      }
    }

    if (resultado.length > 0) {
      setArrayFilter(resultado);
    } else {
      const emptyRows = Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        day: "",
        hourInit: "",
        hourFinish: "",
        name: "",
        state: "",
        obs: "",
      }));
      setArrayFilter(emptyRows);
    }
  }, [daySchedule, selectProfessional]);

  const handleSelectProfessional = (idProfessional) => {
    setSelectProfessional(idProfessional);
  };

  const handleChangeDataTurn = (form: IFormState) => {
    if (!selectTurn || !form) return;

    const updatedArray = arrayFilter?.map((item) =>
      item.id === selectTurn.id ? { ...item, name: form.name, obs: form.obs, saco: "MIT" } : item,
    );

    setArrayFilter(updatedArray);
  };

  //region return
  return (
    <ContainView
      title="turnos"
      padding="py-3 2xl:py-20  px-10"
      gapChildren="gap-1"
      sizeTitle="text-3xl 2xl:text-4xl"
      classContainer="gap-3"
    >
      <div className="flex items-end justify-center w-full gap-4 ">
        <FiltrosTablaMisTurnos
          handle={changeDay}
          state={daySchedule}
          setState={setDaySchedule}
          styles="w-1/2"
          subStyles="flex justify-center items-end"
        />
        <BoxButton
          disabled={!selectTurn || !selectProfessional ? "disabled" : ""}
          handleButton={handleBoxButton}
          button={["alta turno", "presentación", "facturación"]}
        />
      </div>

      <div className="flex justify-between w-full gap-1 xl:justify-between">
        <TablaTurnosProfesionales tableID="profesionales" onSelect={handleSelectProfessional} />

        {/* wrapper con scroll solo para la tabla grande */}
        <div className="w-full ">
          <div className="flex min-w-[550px] justify-center overflow-x-auto min-h-64">
            <TablaDefault
              props={{
                datosParaTabla: arrayFilter,
                objectColumns: [
                  // { key: "id", label: "ID", minWidth: "40", maxWidth: "40" },
                  {
                    key: "hourInit",
                    label: "Hora Ini",
                    minWidth: "60",
                    maxWidth: "120",
                  },
                  {
                    key: "hourFinish",
                    label: "Hora Fin",
                    minWidth: "60",
                    maxWidth: "120",
                  },
                  {
                    key: "state",
                    label: "Estado",
                    minWidth: "70",
                    maxWidth: "190",
                  },
                  {
                    key: "name",
                    label: "Paciente",
                    minWidth: "150",
                    maxWidth: "310",
                  },
                  {
                    key: "obs",
                    label: "Observaciones",
                    minWidth: "90",
                    maxWidth: "310",
                  },
                  {
                    key: "",
                    label: "",
                    minWidth: "30",
                    maxWidth: "50",
                    // renderCell: (item) => {
                    //   if (item.idusuario) {
                    //     return <span className="!text-[11px]">Web</span>;
                    //   }
                    //   return null;
                    // },
                  },
                ],
                selectFn: true,
                objectSelection: { setSeleccionado: setSelectTurn },
                objectStyles: {
                  withBorder: true,
                  addHeaderColor: "#022539",
                  columnasNumber: [1, 2, 3],
                  cursorPointer: true,
                  widthContainer: "700px",
                  heightContainer: "300px",
                  viewport1440: {
                    widthContainer1440px: "750px",
                    heightContainer1440px: "400px",
                  },
                  viewport1536: {
                    widthContainer1536px: "800px",
                    heightContainer1536px: "400px",
                  },
                  viewport1920: {
                    widthContainer1920px: "1100px",
                    heightContainer1920px: "500px",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {openModal && modalName === "alta turno" && (
        <Modal close={() => setOpenModal(!openModal)} title="Alta Turno">
          <ModalAltaTurno
            handleChange={handleChangeDataTurn}
            close={() => setOpenModal(!openModal)}
          />
        </Modal>
      )}
    </ContainView>
  );
}
