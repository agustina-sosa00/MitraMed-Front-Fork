import { formatDate } from '../../utils/index';

export default function FormTurno() {
  const today = new Date();
  const todayFormatted = formatDate(today);
  return (
    <>
      <div className="flex flex-col gap-3 max-w-3xl">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="especialidad"
            className="text-lg text-gray-800 underline uppercase font-bold"
          >
            Especialidad:
          </label>
          <select name="especialidad" id="especialidad" className="p-2 bg-white">
            <option value="">-- Seleccione --</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="doctor" className="text-lg text-gray-800 underline uppercase font-bold">
            Profesional:
          </label>
          <select name="doctor" id="doctor" className="p-2 bg-white">
            <option value="">-- Seleccione --</option>
          </select>
        </div>

        {/* <div className="flex flex-col gap-2">
          <label htmlFor="date" className="text-lg text-gray-800 underline uppercase font-bold">
            Fecha:
          </label>
          <input
            id="date"
            className="w-full p-2 bg-white border border-gray-100"
            type="date"
            value={todayFormatted}
            min={todayFormatted}
            max="2024/12/31"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="observaciones"
            className="text-lg text-gray-800 underline uppercase font-bold"
          >
            Observaciones:
          </label>
          <textarea
            id="observaciones"
            className="w-full p-3 bg-white border border-gray-100"
          ></textarea>
        </div> */}
      </div>
    </>
  );
}
