import React from "react";
import Swal from "sweetalert2";
interface IProp {
  handleButton?: (arg: string) => void;
  classButton?: (btn: string) => string;
  button: string[];
  type?: string;
  classContainer?: string;
  disabled?: string;
}
export const BoxButton: React.FC<IProp> = ({
  handleButton,
  classButton,
  button,
  classContainer,
  disabled,
}) => {
  const handleClick = (item: string) => {
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
  };

  return (
    <div
      className={
        classContainer
          ? classContainer
          : "flex items-end justify-center w-1/2 h-full gap-2 py-2"
      }
    >
      {button.map((item) => (
        <button
          type="button"
          key={item}
          onClick={() => handleClick(item)}
          className={
            classButton
              ? classButton(item)
              : "px-2 py-1 font-medium capitalize transition-all duration-300 border border-gray-300 rounded hover:bg-gray-300 bg-lightGray text-blue"
          }
        >
          {item}
        </button>
      ))}
    </div>
  );
};
