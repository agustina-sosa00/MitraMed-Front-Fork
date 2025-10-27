import { useMutation } from "@tanstack/react-query";
import SearchPatientCard from "../../_components/features/SearchPatientCard";
import { useHistorialClinicoStore } from "../store/HistoriaClinicaStore";
import { obtenerPacienteHc } from "../service/HistorialClinicoService";
import { useEffect } from "react";
import { useProfesionalStore } from "../../_store/ProfesionalStore";

export default function BuscadorPacientesCard() {
  const setLoader = useProfesionalStore((s) => s.setLoader);
  const setLoaderKey = useProfesionalStore((s) => s.setLoaderKey);
  const dataPaciente = useHistorialClinicoStore((state) => state.dataPaciente);
  const setDataPaciente = useHistorialClinicoStore((state) => state.setDataPaciente);
  const setIdPaciente = useHistorialClinicoStore((state) => state.setIdPaciente);
  const setDniHistory = useHistorialClinicoStore((state) => state.setDniHistory);
  const errorState = useHistorialClinicoStore((state) => state.errorState);
  const setErrorState = useHistorialClinicoStore((state) => state.setErrorState);
  const dniInput = useHistorialClinicoStore((state) => state.dniInput);
  const setDniInput = useHistorialClinicoStore((state) => state.setDniInput);
  const hasConfirmed = useHistorialClinicoStore((state) => state.hasConfirmed);
  const setHasConfirmed = useHistorialClinicoStore((state) => state.setHasConfirmed);
  const setPreviewOpen = useHistorialClinicoStore((state) => state.setPreviewOpen);
  const setShowModal = useHistorialClinicoStore((state) => state.setShowModal);
  const reset = useHistorialClinicoStore((state) => state.reset);
  const refetchHC = useHistorialClinicoStore((state) => state.refetchHC);
  const setRefetchHC = useHistorialClinicoStore((state) => state.setRefetchHC);
  const dniHistory = useHistorialClinicoStore((state) => state.dniHistory);
  useEffect(() => {
    if (refetchHC && dniHistory) {
      mutationObtenerPacienteHc.mutate(dniHistory);
      setRefetchHC(false);
    }
  }, [refetchHC, dniHistory]);

  const mutationObtenerPacienteHc = useMutation({
    mutationFn: (dni: string) => obtenerPacienteHc(dni),
    onError: (error) => {
      console.error("Error obtenerPacienteHc:", error);
    },
    onSuccess: (data) => {
      if (!data.data) {
        setErrorState(data.message || "Paciente inexistente");
        return;
      }

      setDataPaciente(data?.data);
      setIdPaciente(data?.data?.paciente?.idpaciente);
      setDniHistory(data?.data?.paciente?.dni);
      setHasConfirmed(true);
    },
  });
  function handleFindPatient(dni: string) {
    setLoader(true);
    setLoaderKey("buscador-hc");
    setTimeout(() => {
      mutationObtenerPacienteHc.mutate(dni);
      setLoader(false);
    }, 1000);
  }

  function handleCancelEdit() {
    setHasConfirmed(false);
  }

  function handleCleanPatient() {
    reset();
  }

  return (
    <div className="flex items-center justify-start w-full gap-1 py-1 min-h-24 ">
      <SearchPatientCard
        data={hasConfirmed ? dataPaciente?.paciente : null}
        dniInput={dniInput}
        setDniInput={setDniInput}
        onSearch={handleFindPatient}
        setPreviewOpen={setPreviewOpen}
        setStateModal={setShowModal}
        hasConfirmed={hasConfirmed}
        loaderKeyProp={"buscador-hc"}
        handleCleanPatient={handleCleanPatient}
        handleCancel={handleCancelEdit}
        errorState={errorState}
        setErrorState={setErrorState}
      />
    </div>
  );
}
