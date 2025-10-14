import { HiArrowSmLeft } from "react-icons/hi";
import dayjs from "dayjs";
import { ActionButton } from "@/frontend-resourses/components";

type SearchByDateCardProps = {
  diaSeleccionado: string;
  setDiaSeleccionado: (date: string) => void;
  presenteManana?: boolean; // Si true, el presente es mañana
};

export default function SearchByDateCard({
  diaSeleccionado,
  setDiaSeleccionado,
  presenteManana = false,
}: SearchByDateCardProps) {
  const today = dayjs().format("YYYY-MM-DD");
  const manana = dayjs().add(1, "day").format("YYYY-MM-DD");
  const selected = diaSeleccionado || today;

  // Si presenteManana, el presente es mañana, si no, es hoy
  const dayColor = getDayColor(selected, today, manana, presenteManana);
  const nameDay = getDayName(selected);

  function getDayColor(selected: string, today: string, manana: string, presenteManana: boolean) {
    if (presenteManana) {
      if (selected < manana) return "text-yellow-500"; // pasado
      if (selected === manana) return "text-primaryGreen"; // mañana es presente
      if (selected > manana) return "text-red-500"; // futuro
      return ""; // hoy u otro, sin color especial
    } else {
      if (selected < today) return "text-yellow-500"; // pasado
      if (selected > today) return "text-red-500"; // futuro
      return "text-primaryGreen"; // presente (hoy)
    }
  }

  function getDayName(dateStr: string) {
    return dayjs(dateStr).locale("es").format("dddd");
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDiaSeleccionado(e.target.value);
  }

  function handleToday() {
    setDiaSeleccionado(today);
  }

  function handleChangeDay(dias: number) {
    setDiaSeleccionado(dayjs(selected).add(dias, "day").format("YYYY-MM-DD"));
  }

  return (
    <div className="flex justify-center pb-2 w-fit px-7 lg:justify-start">
      <div className="flex items-end gap-2">
        {/* Boton Anterior */}
        <ActionButton
          onClick={() => handleChangeDay(-1)}
          color="customWhite"
          customColorText="primaryBlue"
          icon={<HiArrowSmLeft />}
          addIconClassName="text-2xl   "
        />

        {/* Input Date */}
        <div className="flex flex-col">
          <p className={`capitalize lg:text-lg font-bold ml-4 ${dayColor}`}>{nameDay}</p>
          <input
            value={selected}
            required
            type="date"
            className={`px-2 py-1 lg:text-lg font-bold border border-gray-300 rounded focus:outline-none bg-lightGray ${dayColor}`}
            onChange={handleOnChange}
          />
        </div>

        {/* Boton Siguiente */}
        <ActionButton
          onClick={() => handleChangeDay(1)}
          color="customWhite"
          customColorText="primaryBlue"
          icon={<HiArrowSmLeft />}
          addIconClassName="text-2xl rotate-180  "
        />

        {/* Boton Hoy */}
        <ActionButton
          onClick={handleToday}
          text="Hoy"
          color="customWhite"
          customColorText="primaryBlue"
          addClassName="!rounded py-1 ml-5 text-lg  border-gray-300  "
        />
      </div>
    </div>
  );
}
