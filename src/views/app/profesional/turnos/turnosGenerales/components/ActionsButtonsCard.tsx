import Swal from "sweetalert2";
interface IProp {
  handleButton?: (arg: string) => void;
  classButton?: (btn: string) => string;
  buttonBox1: string[];
  buttonBox2?: string[];
  type?: string;
  classContainer?: string;
  disabled?: string;
}

export default function ActionsButtonsCard({
  handleButton,
  classButton,
  buttonBox1,
  buttonBox2,
  disabled,
}: IProp) {
  function handleClick(item: string) {
    if (disabled === "disabled") {
      Swal.fire({
        icon: "warning",
        title: "Primero debes seleccionar un profesional y un turno",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#518915",
      });
      return;
    } else {
      handleButton && handleButton(item);
    }
  }
  return (
    <div className="flex items-center justify-between w-full pb-2">
      <div className={`flex  gap-2  `}>
        {buttonBox1?.map((item) => (
          <button
            type="button"
            key={item}
            onClick={() => handleClick(item)}
            className={
              classButton
                ? classButton(item)
                : "px-2 py-1 font-medium  transition-all duration-300 border border-gray-300 rounded hover:bg-gray-300 bg-lightGray text-primaryBlue"
            }
          >
            {item}
          </button>
        ))}
      </div>
      <div className={`flex  gap-2  `}>
        {buttonBox2?.map((item) => (
          <button
            type="button"
            key={item}
            onClick={() => handleClick(item)}
            className={
              classButton
                ? classButton(item)
                : "px-2 py-1 font-medium  transition-all duration-300 border border-gray-300 rounded hover:bg-gray-300 bg-lightGray text-primaryBlue"
            }
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
