import { FilterTableSchedules } from "@/components/features/Filters/FilterTableSchedules";
import {
  IDataTable,
  IFormState,
  tableProfessionals,
} from "../../mock/arrayTableProfessional";
import React, { useEffect, useState } from "react";
import { TableProfessionals } from "./TableProfessionals";
import { BoxButton } from "../../components/features/PanelProfessional/BoxButton";
import { Modal } from "@/components/features/PanelProfessional/Modal";
import { ModalAltaTurno } from "./ModalAltaTurno";
import Swal from "sweetalert2";
import { TablaDefault } from "@/frontend-resourses/components";
import { TableNode } from "@/frontend-resourses/components/types";

export const Turnos: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalName, setModalName] = useState<string>("");
  const [selectProfessional, setSelectProfessional] = useState<{
    id: number;
    name: string;
    especiality: string;
  }>();
  const [selectTurn, setSelectTurn] = useState<IDataTable>();
  const [dataModal, setDataModal] = useState<IFormState>();
  const [arrayFilter, setArrayFilter] = useState<TableNode[]>([]);

  console.log(dataModal);
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
          item.id === selectTurn.id
            ? { ...item, state: "Factura pendiente" }
            : item
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
          item.id === selectTurn.id ? { ...item, state: "Presente" } : item
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
      const profesional = tableProfessionals.find(
        (item) => item.id === selectProfessional.id
      );

      if (profesional?.turns) {
        resultado = profesional.turns.filter(
          (turno) => turno.day === diaFormateado
        );
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
    console.log("idProfessional", idProfessional);
    setSelectProfessional(idProfessional);
  };

  const handleChangeDataTurn = (form: IFormState) => {
    if (!selectTurn || !form) return;

    const updatedArray = arrayFilter?.map((item) =>
      item.id === selectTurn.id
        ? { ...item, name: form.name, obs: form.obs, saco: "MIT" }
        : item
    );

    setArrayFilter(updatedArray);
  };

  return (
    <div className="flex justify-center max-w-[900px] lg:max-w-full min-h-screen pt-24 lg:pt-0 lg:h-screen lg:overflow-x-auto ">
      <div className="flex flex-col items-center justify-center w-full gap-8 pt-5 lg:justify-start">
        <div className="flex flex-col w-[80%] ">
          <h1 className="text-2xl font-medium uppercase lg:text-4xl text-green">
            Turnos
          </h1>
        </div>
        <div className="flex items-end justify-center w-full gap-4">
          <FilterTableSchedules
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

        <div className="flex gap-2 justify-between xl:justify-center max-h-[700px] px-1 overflow-y-auto lg:overflow-visible w-full  ">
          <TableProfessionals
            tableID="profesionales"
            onSelect={handleSelectProfessional}
          />
          <TablaDefault
            props={{
              datosParaTabla: arrayFilter,
              objectColumns: [
                { key: "id", label: "ID", minWidth: "40", maxWidth: "40" },
                {
                  key: "hourInit",
                  label: "Hora Inicio",
                  minWidth: "80",
                  maxWidth: "80",
                },
                {
                  key: "hourFinish",
                  label: "Hora Fin",
                  minWidth: "80",
                  maxWidth: "80",
                },
                {
                  key: "state",
                  label: "Estado",
                  minWidth: "150",
                  maxWidth: "150",
                },
                {
                  key: "name",
                  label: "Nombre y Apellido",
                  minWidth: "180",
                  maxWidth: "180",
                },
                {
                  key: "obs",
                  label: "Observaciones",
                  minWidth: "180",
                  maxWidth: "180",
                },
                { key: "saco", label: "", minWidth: "50", maxWidth: "50" },
              ],
              selectFn: true,
              objectSelection: {
                setSeleccionado: setSelectTurn,
              },
              objectStyles: {
                withScrollbar: true,
                addHeaderColor: "#022539",
                columnasNumber: [1, 2, 3],
                cursorPointer: true,
              },
            }}
          />
        </div>
      </div>
      {openModal && modalName === "alta turno" && (
        <Modal close={() => setOpenModal(!openModal)} title="Alta Turno">
          <ModalAltaTurno
            handleChange={handleChangeDataTurn}
            setData={setDataModal}
            close={() => setOpenModal(!openModal)}
          />
        </Modal>
      )}
    </div>
  );
};
