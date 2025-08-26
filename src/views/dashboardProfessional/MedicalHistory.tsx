import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaEye } from "react-icons/fa";

import Cookies from "js-cookie";

import Swal from "sweetalert2";

import { TablaDefault } from "@/frontend-resourses/components";
import { Modal } from "@/components/ui/Modal";
import { FormUploadHistory } from "@/components/features/PanelProfessional/FormUploadHistory";
import { ContainView } from "@/components/features/PanelProfessional/ContainView";
import { getDataDropbox, getTokenDropbox } from "@/services/dropboxServices";
import { useMedicalHistoryContext } from "../../context/MedicalHistoryContext";
import { useContextDropbox } from "../../context/DropboxContext";

import SearchPatient from "@/components/features/PanelProfessional/SearchPatient";
import getDataMedicalHistory from "@/services/ProfessionalService";

export default function MedicalHistory() {
  const queryClient = useQueryClient();
  // region context
  const { setToken, setFolder } = useContextDropbox();
  const {
    historyContext,
    setHistoryContext,
    hc,

    dniHistory,
    setDniHistory,
    hasConfirmed,
    setHasConfirmed,
    uiLoading,
    setUiLoading,
    dniInput,
    setDniInput,
  } = useMedicalHistoryContext();
  // region states, variables y cookies
  const infoProfessional = Cookies.get("dataProfessional");
  const [focusState, setFocusState] = useState(false);
  const [dataDropbox, setDataDropbox] = useState({
    app_id: "",
    app_secret: "",
    refresh_token: "",
    nfolder: "",
  }); //states para la data de dropbox
  const [showModal, setShowModal] = useState<boolean>(false);
  const sortedData = [...historyContext].sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  ); // sortedData es un array que acomoda el objeto mas reciente al principio del array

  //region mutates
  const { mutate: mutateGetDataDropbox } = useMutation({
    mutationFn: getDataDropbox,
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      setDataDropbox(data.data[0]);
      setFolder(data.data[0].nfolder);
    },
  });

  const { mutate: mutateGetTokenDropbox } = useMutation({
    mutationFn: getTokenDropbox,
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      setToken(data?.access_token);
    },
  });

  const { data: dataMedicalHistory } = useQuery({
    queryKey: ["medicalHistory", dniHistory],
    queryFn: () => getDataMedicalHistory({ dni: dniHistory }),
    enabled: hasConfirmed && !!dniHistory,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    gcTime: Infinity,
    initialData: () => queryClient.getQueryData(["medicalHistory", dniHistory]),
  });

  //region useEffect
  useEffect(() => {
    mutateGetDataDropbox();
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (e.key === "Escape") {
        handleDeletePatient();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (
      dataDropbox.app_id &&
      dataDropbox.app_secret &&
      dataDropbox.refresh_token
    ) {
      mutateGetTokenDropbox({
        refreshToken: dataDropbox.refresh_token,
        clientId: dataDropbox.app_id,
        clientSecret: dataDropbox.app_secret,
      });
    }
  }, [dataDropbox]);

  //region functions
  function handleFindPatient(hc: string) {
    setUiLoading(true);

    setTimeout(() => {
      setHasConfirmed(true);
      setUiLoading(false);
      setDniHistory(hc);
    }, 2000);
  }

  function handleOnFocusInput() {
    if (dniHistory.length === 0) {
      setFocusState(true);
      Swal.fire({
        icon: "warning",
        title: `Antes de completar , debe ingresar un número de historia clínica`,
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#518915",
      });
    } else {
      setFocusState(false);
    }
  }

  function handleDeletePatient() {
    setHasConfirmed(false);
    setUiLoading(false);
    setDniHistory("");
    setDniInput("");
  }

  function handleCancelEdit() {
    setHasConfirmed(false);
  }
  console.log(dataMedicalHistory);
  console.log("sortedData", sortedData);
  //region return
  return (
    <ContainView title="Historial médico" padding="py-5">
      <div className="flex items-center justify-start w-full gap-1 py-1 min-h-24 ">
        <SearchPatient
          noHc={hc}
          data={!dniHistory ? undefined : dataMedicalHistory?.data?.paciente}
          labelSearch={"dni"}
          onSearch={handleFindPatient}
          setStateModal={setShowModal}
          odontogram={true}
          state={dniInput}
          setState={setDniInput}
          hasConfirmed={hasConfirmed}
          loading={uiLoading}
          handleDeletePatient={handleDeletePatient}
          handleCancel={handleCancelEdit}
        />
      </div>
      <div className="flex justify-center w-full pt-5 overflow-x-auto min-h-64">
        <TablaDefault
          props={{
            datosParaTabla: dataMedicalHistory?.data?.hc || [],
            objectColumns: [
              {
                key: "fecha",
                label: "Fecha",
                minWidth: "150",
                maxWidth: "150",
              },
              {
                key: "detalle",
                label: "Motivo de Consulta",
                minWidth: "260",
                maxWidth: "260",
              },
              {
                key: "ndoctor",
                label: "Profesional",
                minWidth: "200",
                maxWidth: "200",
              },
              {
                key: "acciones",
                label: "Acciones",
                renderCell: (item) => (
                  <Link
                    to={`/profesionales/historial/${item.idhistoria}`}
                    state={item}
                    className="flex justify-center w-full"
                  >
                    <button
                      onClick={() => console.log("Acción sobre:", item)}
                      className="text-lg bg-blue-500 rounded text-blue"
                    >
                      <FaEye />
                    </button>
                  </Link>
                ),
                minWidth: "120",
                maxWidth: "120",
              },
            ],
            objectStyles: {
              addHeaderColor: "#022539",

              containerClass: "border border-gray-300 rounded-t-lg ",
              withBorder: false,
            },
          }}
        />
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)} open={showModal}>
          <FormUploadHistory
            handle={handleOnFocusInput}
            infoProfessional={JSON.parse(infoProfessional!)}
            hc={dniHistory}
            setState={setHistoryContext}
            focusState={focusState}
            folder={dataDropbox.nfolder}
            setStateModal={setShowModal}
          />
        </Modal>
      )}
    </ContainView>
  );
}
