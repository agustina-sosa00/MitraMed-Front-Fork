import React, { useEffect, useState } from "react";
import { SearchPatient } from "@/components/features/PanelProfessional/SearchPatient";
import { FormUploadHistory } from "@/components/features/PanelProfessional/FormUploadHistory";
import { TablaDefault } from "@/frontend-resourses/components";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { dataPatientHc } from "../../mock/arrayTableProfessional";
import { useMutation } from "@tanstack/react-query";
import { getDataDropbox, getTokenDropbox } from "@/services/dropboxServices";
import { useContextDropbox } from "../../context/DropboxContext";
import { Link } from "react-router-dom";
import { Modal } from "@/components/ui/Modal";
import { useMedicalHistoryContext } from "../../context/MedicalHistoryContext";

export const MedicalHistory: React.FC = () => {
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // -------------------- T O K E N---------------------------
  // ---------------------------------------------------------
  const { setToken, setFolder } = useContextDropbox();

  const {
    historyContext,
    setHistoryContext,
    hc,
    setHc,
    numHistory,
    setNumHistory,
  } = useMedicalHistoryContext();
  // data profesional
  const infoProfessional = Cookies.get("dataProfessional");
  const [showData, setShowData] = useState<boolean>(false);

  const [focusState, setFocusState] = useState(false);

  // state para guardar data de getDataDropbox
  const [dataDropbox, setDataDropbox] = useState({
    app_id: "",
    app_secret: "",
    refresh_token: "",
    nfolder: "",
  });

  const [showModal, setShowModal] = useState<boolean>(false);

  // sortedData es un array que acomoda el objeto mas reciente al principio del array
  const sortedData = [...historyContext].sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );

  const handleFindPatient = (hc: string) => {
    if (numHistory.length === 0) {
      setHc(true);
    } else {
      setHc(false);
      setNumHistory(hc);
      setShowData(!showData);
    }
  };

  const handleOnFocusInput = () => {
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
  };

  // ------------------------------------------ ----------
  const { mutate: mutateGetDataDropbox } = useMutation({
    mutationFn: getDataDropbox,
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      console.log("data", data);
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

  return (
    <div className="flex flex-col w-full min-h-screen px-5 pt-20 ">
      <div className="flex flex-col items-center justify-center w-full ">
        <div className="lg:w-[85%] xl:w-[70%] flex flex-col  gap-5">
          <h1 className="text-2xl font-medium uppercase lg:text-4xl text-green">
            Historial médico
          </h1>
          <div className="flex items-center justify-start w-full h-24 gap-1 px-16 py-1 ">
            <SearchPatient
              noHc={hc}
              data={dataPatientHc}
              labelSearch={"HC"}
              showData={showData}
              handleFindPatient={handleFindPatient}
              viewImg={false}
              setStateModal={setShowModal}
              odontogram={true}
            />
          </div>
        </div>
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
            hc={numHistory}
            setState={setHistoryContext}
            focusState={focusState}
            folder={dataDropbox.nfolder}
            setStateModal={setShowModal}
          />
        </Modal>
      )}
    </div>
  );
};
