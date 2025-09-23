import { ContainView } from "../../_components/features/ContainView";
import { useMutation } from "@tanstack/react-query";
import { enviarEmailRecordatorio, obtenerTurnosDoctoresDia } from "./service";

type TurnosDoctoresDiaResponse = {
  data: any;
};

export default function EnvioEmailView() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yyyy = tomorrow.getFullYear();
  const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const dd = String(tomorrow.getDate()).padStart(2, "0");
  const fechaStr = `${yyyy}-${mm}-${dd}`;

  // Segundo mutation: enviar email
  const mutationEnviar = useMutation({
    mutationFn: ({ fecha, body }: { fecha: string; body: any }) =>
      enviarEmailRecordatorio(fecha, body),
    onError: (error) => {
      alert("Error al enviar emails");
      console.error(error);
    },
    onSuccess: (data) => {
      alert("¡Emails enviados!");
      console.log(data);
    },
  });

  // Primer mutation: obtener turnos
  const mutationTurnos = useMutation<TurnosDoctoresDiaResponse, Error, string>({
    mutationFn: (fecha: string) => obtenerTurnosDoctoresDia(fecha),
    onError: (error) => {
      alert("Error al obtener turnos");
      console.error(error);
    },
    onSuccess: (data) => {
      mutationEnviar.mutate({ fecha: fechaStr, body: data.data });
    },
  });

  function handleProcesar() {
    mutationTurnos.mutate(fechaStr);
  }

  return (
    <ContainView title="Envío de Emails">
      <div className="flex w-full mt-6">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200 w-full flex flex-col md:flex-row items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-primaryBlue mb-2">Recordatorio de turnos</h2>
            <p className="text-gray-700 mb-0 max-w-2xl">
              Este proceso automatiza el envío masivo de emails a los doctores, informando los
              turnos programados para mañana.
            </p>
          </div>
          <div className="mt-4 md:mt-0 md:ml-8 flex-shrink-0 self-end md:self-center">
            <button
              className="px-6 py-2 rounded bg-primaryGreen text-white font-semibold shadow hover:bg-greenHover transition-all duration-200 text-lg"
              type="button"
              onClick={handleProcesar}
              disabled={mutationTurnos.isPending || mutationEnviar.isPending}
            >
              {mutationTurnos.isPending
                ? "Obteniendo turnos..."
                : mutationEnviar.isPending
                  ? "Enviando emails..."
                  : "Procesar"}
            </button>
          </div>
        </div>
      </div>
    </ContainView>
  );
}
