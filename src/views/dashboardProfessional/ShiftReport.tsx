import { ContainView } from "@/components/features/PanelProfessional/ContainView";
import { TablaDefault } from "@/frontend-resourses/components";
import React, { useEffect, useState } from "react";
import { Metrics } from "./Metrics";
import { DateRangePickerPresetsExample } from "@/components/ui/DateRange";
import { useMutation } from "@tanstack/react-query";
import { getShiftReportData } from "@/services/ShiftReportServices";
import { calculateToAge } from "../../utils/calculateToAge";

export const ShiftReport: React.FC = () => {
  const [state, setState] = useState({
    from: "",
    to: "",
  });
  const [dataShifts, setDataShifts] = useState({
    data: [],
  });
  const [loader, setLoader] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const canClear = hasSearched && dataShifts.data.length > 0 && !loader;

  useEffect(() => {
    setHasSearched(false);
    setDataShifts({ data: [] });
  }, [state.from, state.to]);

  const { mutate: mutatedataShifts } = useMutation({
    mutationFn: getShiftReportData,
    onError: (error) => {
      setLoader(false);
      throw new Error(`${error}`);
    },
    onSuccess: (data) => {
      setTimeout(() => {
        setLoader(false);
        setDataShifts(data);
        setHasSearched(true);
      }, 1000);
    },
  });

  function handleOnSearch() {
    mutatedataShifts({
      fini: state?.from.split("/").reverse().join("-"),
      ffin: state?.to.split("/").reverse().join("-"),
    });
  }

  return (
    <ContainView
      title="informe de turnos"
      padding="py-3 px-4"
      classContainer=""
    >
      <div className="flex w-full gap-3 py-5">
        {" "}
        <DateRangePickerPresetsExample
          state={state}
          setState={setState}
          handleSearch={handleOnSearch}
          loader={loader}
          setLoader={setLoader}
          disabledButtonTrash={!canClear}
        />
      </div>

      <div className="w-full ">
        <TablaDefault
          props={{
            datosParaTabla: hasSearched ? dataShifts.data : [],
            objectColumns: [
              {
                key: "fecha",
                label: "Fecha",
                minWidth: "80",
                maxWidth: "80",
                renderCell: (item) => (
                  <span className="!text-[11px]">{item.fecha}</span>
                ),
              },
              {
                key: "hora_ini",
                label: "Hora Ini",
                minWidth: "50",
                maxWidth: "80",
                renderCell: (item) => (
                  <span className="!text-[11px]">{item.hora_ini}</span>
                ),
              },
              {
                key: "dni",
                label: "DNI",
                minWidth: "70",
                maxWidth: "70",
                renderCell: (item) => (
                  <span className="!text-[11px]">{item.dni}</span>
                ),
              },
              {
                key: "edad",
                label: "Edad",
                minWidth: "30",
                maxWidth: "60",
                renderCell: (item) => (
                  <span className="!text-[11px]">
                    {calculateToAge({ age: item.fnacim })}
                  </span>
                ),
              },
              {
                key: "paciente",
                label: "Paciente",
                minWidth: "200",
                maxWidth: "260",
                renderCell: (item) => (
                  <span className="!text-[11px] !uppercase">
                    {item.apellido}, {item.nombre}
                  </span>
                ),
              },

              {
                key: "nespecialidad",
                label: "Especialidad",
                minWidth: "150",
                maxWidth: "150",
                renderCell: (item) => (
                  <span className="!text-[11px]">{item.nespecialidad}</span>
                ),
              },
              {
                key: "ndoctor",
                label: "Profesional",
                minWidth: "180",
                maxWidth: "180",
                renderCell: (item) => (
                  <span className="!text-[11px]">{item.ndoctor}</span>
                ),
              },

              {
                key: "nosocial",
                label: "Obra Social",
                minWidth: "140",
                maxWidth: "140",
                renderCell: (item) => (
                  <span className="!text-[11px]">{item.nosocial}</span>
                ),
              },

              {
                key: "importe",
                label: "Importe",
                minWidth: "80",
                maxWidth: "80",
                renderCell: (item) => (
                  <span className="!text-[11px]">{item.importe}</span>
                ),
              },
              {
                key: "web",
                label: "web",
                minWidth: "50",
                maxWidth: "50",
                renderCell: (item) => {
                  if (item.idusuario) {
                    return <span className="!text-[11px]">{item.web}</span>;
                  }
                  return null;
                },
              },
            ],
            // objectFooter: {
            //   footer: true,

            //   footerHeight: "h-8", // opcional, Tailwind
            //   // datosFooter: {
            //   //   fecha: "g", // 👈 debajo de 'Fecha'
            //   //   importe: dataGetShifts?.data
            //   //     ? dataGetShifts?.data?.reduce(
            //   //         (acc: number, row: any) => acc + Number(row.importe || 0),
            //   //         0
            //   //       )
            //   //     : 0, // 👈 suma de importes
            //   // },
            // },
            objectStyles: {
              addHeaderColor: "#022539",
              withScrollbar: true,
              containerClass: "border border-gray-300 rounded-t-lg ",
              withBorder: false,
              columnasNumber: [3, 9],
              heightContainer: "200px",
              addFooterColor: "#022539",
            },
          }}
        />
      </div>

      <Metrics />
    </ContainView>
  );
};
