import { useMutation } from "@tanstack/react-query";
import SearchPatientCard from "../../_components/features/SearchPatientCard";
import { useOdontogramaStore } from "../store/OdontogramaStore";
import { getOdontogram } from "../service/odontogramaService";
import { buildIdsState } from "../utils/buildTeethState";
import { RawRow } from "../types/odontogramaTypes";

export default function BusquedaPacienteCard() {
  const setContextMenu = useOdontogramaStore((state) => state.setContextMenu);
  const dniInput = useOdontogramaStore((state) => state.dniInput);
  const setDniInput = useOdontogramaStore((state) => state.setDniInput);
  const uiLoading = useOdontogramaStore((state) => state.uiLoading);
  const setUiLoading = useOdontogramaStore((state) => state.setUiLoading);
  const errorState = useOdontogramaStore((state) => state.errorState);
  const setErrorState = useOdontogramaStore((state) => state.setErrorState);
  const setHasConfirmed = useOdontogramaStore((state) => state.setHasConfirmed);
  const odontogramaData = useOdontogramaStore((state) => state.odontogramaData);
  const setOdontogramaData = useOdontogramaStore((state) => state.setOdontogramaData);
  const setOriginalData = useOdontogramaStore((state) => state.setOriginalData);
  const setTeethIdsState = useOdontogramaStore((state) => state.setTeethIdsState);
  const hasConfirmed = useOdontogramaStore((state) => state.hasConfirmed);
  const handleCleanPatient = useOdontogramaStore((state) => state.handleCleanPatient);
  const editOdontograma = useOdontogramaStore((state) => state.editOdontograma);
  const handleCancelEdit = useOdontogramaStore((state) => state.handleCancelEdit);
  const setIdPaciente = useOdontogramaStore((state) => state.setIdPaciente);

  const { mutate: obtenerOdontograma } = useMutation({
    mutationFn: getOdontogram,
    onError: (err) => console.log(err),
    onSuccess: (data: any) => {
      if (!data.data) {
        setErrorState(data.message || "Paciente inexistente");
        return;
      }
      const raw = (data.data.odontograma || []) as RawRow[];
      const dientes = buildIdsState(raw);
      setHasConfirmed(true);
      setOdontogramaData(data);
      setIdPaciente(data.data.paciente.idpaciente);
      setOriginalData(dientes);
      setTeethIdsState(dientes);
      // if (Object.keys(originalData).length === 0)
      // if (Object.keys(teethIdsState).length === 0)
    },
  });

  function handleSearch(dni: string) {
    setUiLoading(true);

    setTimeout(() => {
      obtenerOdontograma({ dni });
      setUiLoading(false);
      // setDniOdontograma(dni.trim());
    }, 800);
  }
  return (
    <div
      className="flex items-center justify-start w-full gap-1 py-1 min-h-24"
      onClick={() => setContextMenu(null)}
    >
      <SearchPatientCard
        data={hasConfirmed ? odontogramaData?.data?.paciente : null}
        dniInput={dniInput}
        setDniInput={setDniInput}
        onSearch={handleSearch}
        handleCleanPatient={handleCleanPatient}
        editOdontogram={editOdontograma}
        handleCancel={handleCancelEdit}
        errorState={errorState}
        setErrorState={setErrorState}
        hasConfirmed={hasConfirmed}
        loading={uiLoading}
      />
    </div>
  );
}
