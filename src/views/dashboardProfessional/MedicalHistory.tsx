import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { TablaDefault } from "@/frontend-resourses/components";

import Cookies from "js-cookie";
import Swal from "sweetalert2";

import { SearchPatient } from "@/components/features/PanelProfessional/SearchPatient";
import { FormUploadHistory } from "@/components/features/PanelProfessional/FormUploadHistory";
import { getDataDropbox, getTokenDropbox } from "@/services/dropboxServices";
import { useContextDropbox } from "../../context/DropboxContext";
import { Modal } from "@/components/ui/Modal";
import { useMedicalHistoryContext } from "../../context/MedicalHistoryContext";
import { ContainView } from "@/components/features/PanelProfessional/ContainView";

import getDataMedicalHistory from "@/services/ProfessionalService";

export default function MedicalHistory(): JSX.Element {
  const infoProfessional = Cookies.get("dataProfessional");
  //region uso de context
  const { setToken, setFolder } = useContextDropbox();
  const {
    historyContext,
    setHistoryContext,
    hc,
    setHc,
    numHistory,
    setNumHistory,
  } = useMedicalHistoryContext();
  // region estados locales
  const [showData, setShowData] = useState<boolean>(false);
  const [focusState, setFocusState] = useState(false);
  const [dataDropbox, setDataDropbox] = useState({
    app_id: "",
    app_secret: "",
    refresh_token: "",
    nfolder: "",
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [infoUser, setInfoUser] = useState({
    code: 0,
    data: [
      {
        apellido: "",
        dni: "",
        edad: "",
        fnacim: "",
        idosocial: 0,
        idplan: 0,
        nombre: "",
        nosocial: 0,
        nplan: 0,
      },
    ],
    message: "",
    status: false,
  });
  // sortedData es un array que acomoda el objeto mas reciente al principio del array
  const sortedData = [...historyContext].sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );

  // region mutate
  const { mutate: mutateFindPatient } = useMutation({
    mutationFn: getDataMedicalHistory,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log("respues en medical history", data);
      if (!numHistory.length || !data?.data?.length) {
        setHc(true);
        setShowData(false);
        return;
      }
      setHc(false);
      setShowData(true);
      setInfoUser(data);
    },
  });
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

  // region functions
  function handleFindPatient(arg: string) {
    setNumHistory(arg);
    mutateFindPatient({ dni: arg });
  }

  function handleOnFocusInput() {
    if (numHistory.length === 0) {
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
    <ContainView title="Historial médico">
      <div className="flex items-end justify-between w-full gap-1 py-1 min-h-20 ">
        <SearchPatient
          noHc={hc}
          data={infoUser?.data?.[0] ?? null}
          labelSearch={"HC"}
          showData={showData}
          handleFindPatient={handleFindPatient}
          viewImg={false}
          setStateModal={setShowModal}
          odontogram={true}
        />
      </div>
      <div className="flex justify-center w-full pt-5 overflow-x-auto min-h-80">
        <TablaDefault
          props={{
            datosParaTabla: sortedData,
            objectColumns: [
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
            hc={numHistory}
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
