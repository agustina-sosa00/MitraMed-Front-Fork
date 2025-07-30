import React, { useEffect, useState } from "react";
import { SearchPatient } from "@/components/features/PanelProfessional/SearchPatient";
import { FormUploadHistory } from "@/components/features/PanelProfessional/FormUploadHistory";
import { TablaDefault } from "@/frontend-resourses/components";
import { IArrayTableHistorial } from "@/types/index";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { dataPatientHc } from "../../mock/arrayTableProfessional";
import { useMutation } from "@tanstack/react-query";
import { getDataDropbox, getTokenDropbox } from "@/services/dropboxServices";
import { useContextDropbox } from "../../context/DropboxContext";
import { Link } from "react-router-dom";
import { Modal } from "@/components/ui/Modal";

export const MedicalHistory: React.FC = () => {
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // -------------------- T O K E N---------------------------
  // ---------------------------------------------------------
  const { setToken } = useContextDropbox();

  // data profesional
  const infoProfessional = Cookies.get("dataProfessional");
  const [showData, setShowData] = useState<boolean>(false);

  const [history, setHistory] = useState<string>("");
  const [arrayTableHistorialState, setArrayTableHistorialState] = useState<
    IArrayTableHistorial[]
  >([]);

  const [hc, setHc] = useState<boolean>(false);
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
  const sortedData = [...arrayTableHistorialState].sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );

  const handleFindPatient = (hc: string) => {
    if (hc.length === 0) {
      setHc(true);
    } else {
      setHc(false);
      setHistory(hc);
      setShowData(!showData);
    }
  };

  const handleOnFocusInput = () => {
    if (history.length === 0) {
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
      setDataDropbox(data.data[0]);
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
    if (dataDropbox) {
      mutateGetTokenDropbox({
        refreshToken: dataDropbox.refresh_token,
        clientId: dataDropbox.app_id,
        clientSecret: dataDropbox.app_secret,
      });
    }
  }, [dataDropbox]);

  return (
    <div className="flex flex-col w-full min-h-screen px-5 pt-20 ">
      <div className="flex flex-col w-full px-16">
        <h1 className="text-2xl font-medium uppercase lg:text-4xl text-green">
          Historial médico
        </h1>
      </div>

      <div className="flex items-center justify-start w-full h-16 gap-1 px-16 py-1">
        <SearchPatient
          noHc={hc}
          data={dataPatientHc}
          labelSearch={"HC"}
          showData={showData}
          handleFindPatient={handleFindPatient}
          viewImg={false}
          setStateModal={setShowModal}
        />
      </div>

      <div className="flex justify-center w-full pt-5 overflow-x-auto min-h-96">
        <TablaDefault
          props={{
            datosParaTabla: sortedData,
            objectColumns: [
              {
                key: "id",
                label: "id",
                minWidth: "40",
                maxWidth: "40",
              },
              {
                key: "fecha",
                label: "Fecha",
                minWidth: "100",
                maxWidth: "100",
              },
              {
                key: "motivo",
                label: "Motivo de consulta",
                minWidth: "200",
                maxWidth: "200",
              },
              {
                key: "profesional",
                label: "Profesional",
                minWidth: "160",
                maxWidth: "160",
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
                minWidth: "80",
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
            hc={history}
            setState={setArrayTableHistorialState}
            focusState={focusState}
            folder={dataDropbox.nfolder}
            setStateModal={setShowModal}
          />
        </Modal>
      )}
    </div>
  );
};
