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
import {
  getDataDropbox,
  getAccessTokenDropbox,
} from "@/services/MedicalHistoryService";
import { useMedicalHistoryContext } from "../../context/MedicalHistoryContext";

import SearchPatient from "@/components/features/PanelProfessional/SearchPatient";
import getDataMedicalHistory from "@/services/ProfessionalService";

export default function MedicalHistory() {
  const queryClient = useQueryClient();
  // region context

  const {
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
  const [showModal, setShowModal] = useState<boolean>(false);
  const hasTokenDropbox = Boolean(Cookies.get("accessTokenDropbox"));

  //region querys / mutates

  const { data: dropboxData } = useQuery({
    queryKey: ["dataDropboxQuery"],
    queryFn: () => getDataDropbox(),
    enabled: !hasTokenDropbox, //se ejecuta solo cuando no hay token
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const { mutate: mutateGetAccessTokenDropbox } = useMutation({
    mutationFn: getAccessTokenDropbox,
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      const accessTokenDropbox = data?.access_token;
      if (!accessTokenDropbox) return;
      Cookies.set("accessTokenDropbox", accessTokenDropbox, {
        expires: 5 / 24,
      });
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
    if (dropboxData?.data) {
      localStorage.setItem("mtm-folder", dropboxData?.data?.folders?.[1]);
      Cookies.set("mtm-appIdDropbox", dropboxData?.data?.app_id, {
        expires: 7,
      });
      Cookies.set("mtm-appSecretDropbox", dropboxData?.data?.app_secret, {
        expires: 7,
      });
      Cookies.set("mtm-refreshTokenDropbox", dropboxData?.data?.refresh_token, {
        expires: 7,
      });
      getTokenDropboxRefresh();
    }
  }, [dropboxData]);

  //region functions
  function handleFindPatient(hc: string) {
    setUiLoading(true);
    setTimeout(() => {
      setHasConfirmed(true);
      setUiLoading(false);
      setDniHistory(hc);
    }, 2000);
  }

  //region refresh
  function getTokenDropboxRefresh() {
    mutateGetAccessTokenDropbox({
      refreshToken: dropboxData?.data?.refresh_token,
      clientId: dropboxData?.data?.app_id,
      clientSecret: dropboxData?.data?.app_secret,
    });
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
      <div className="flex justify-center w-full pt-5 overflow-x-auto max-h-64">
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
                    <button className="text-lg bg-blue-500 rounded text-blue">
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
              withScrollbar: true,
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
            focusState={focusState}
            setStateModal={setShowModal}
          />
        </Modal>
      )}
    </ContainView>
  );
}
