import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

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
  // region context
  const { setToken, setFolder } = useContextDropbox();
  const {
    historyContext,
    setHistoryContext,
    hc,
    setHc,
    dniHistory,
    setDniHistory,
  } = useMedicalHistoryContext();
  // region states, variables y cookies
  const infoProfessional = Cookies.get("dataProfessional");
  const [showData, setShowData] = useState<boolean>(false);
  const [focusState, setFocusState] = useState(false);
  const [dataDropbox, setDataDropbox] = useState({
    app_id: "",
    app_secret: "",
    refresh_token: "",
    nfolder: "",
  }); //states para la data de dropbox
  const [showModal, setShowModal] = useState<boolean>(false);
  const [dataUser, setDataUser] = useState({});
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

  const { mutate: mutateGetDataMedicalHistory } = useMutation({
    mutationFn: getDataMedicalHistory,
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      setDataUser(data.data.paciente);
    },
  });

  //region useEffect
  useEffect(() => {
    mutateGetDataDropbox();
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
    if (dniHistory.length === 0) {
      setHc(true);
    } else {
      mutateGetDataMedicalHistory({ dni: hc });
      setHc(false);
      setDniHistory(hc);
      setShowData(!showData);
    }
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

  //region return
  return (
    <ContainView title="Historial médico" padding="py-5">
      <div className="flex items-center justify-start w-full gap-1 py-1 min-h-24 ">
        <SearchPatient
          noHc={hc}
          data={dataUser || {}}
          labelSearch={"dni"}
          showData={showData}
          handleFindPatient={handleFindPatient}
          viewImg={false}
          setStateModal={setShowModal}
          odontogram={true}
          state={dniHistory}
          setState={setDniHistory}
        />
      </div>
      <div className="flex justify-center w-full pt-5 overflow-x-auto min-h-80">
        <TablaDefault
          props={{
            datosParaTabla: sortedData,
            objectColumns: [
              {
                key: "id",
                label: "id",
                minWidth: "150",
                maxWidth: "150",
              },
              {
                key: "fecha",
                label: "Fecha",
                minWidth: "150",
                maxWidth: "150",
              },
              {
                key: "motivo",
                label: "Motivo de consulta",
                minWidth: "260",
                maxWidth: "260",
              },
              {
                key: "profesional",
                label: "Profesional",
                minWidth: "200",
                maxWidth: "200",
              },
              {
                key: "acciones",
                label: "Acciones",
                renderCell: (item) => (
                  <Link to={`/profesionales/historial/${item.id}`} state={item}>
                    <button
                      onClick={() => console.log("Acción sobre:", item)}
                      className="px-3 py-1 bg-blue-500 rounded text-blue "
                    >
                      Ver
                    </button>
                  </Link>
                ),
                minWidth: "120",
                maxWidth: "120",
              },
            ],
            objectStyles: {
              addHeaderColor: "#022539",
              columnasNumber: [1],
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
