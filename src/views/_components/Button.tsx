import { ClipLoader } from "react-spinners";

interface IProp {
  handle?: () => void;
  label?: string;
  classButton?: string;
  icon?: React.ReactNode;
  type?: "button" | "submit";
  loader?: boolean;
  disabledButton?: boolean; // <- corregido
  height?: string;
  padding?: string;
  custom?: boolean;
  customRed?: boolean;
  buttonRef?: React.Ref<HTMLButtonElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
}

export const Button: React.FC<IProp> = ({
  handle,
  label,
  classButton,
  icon,
  type = "button",
  loader,
  disabledButton = false,
  height,
  padding,
  custom,
  customRed,
  buttonRef,
  onKeyDown,
}) => {
  const base = `${height ? `h-${height}` : "h-10"} flex items-center ${
    padding ? `px-${padding}` : "px-5"
  } rounded  font-medium gap-1 transition-all duration-300`;

  const enabled = `${
    custom
      ? "bg-gray-300 hover:bg-gray-400/60 border border-slate-400 "
      : customRed
        ? "bg-red-500 hover:bg-red-600 cursor-pointer text-white "
        : "bg-primaryGreen hover:bg-greenHover cursor-pointer text-white border"
  }`;

  const disabledCls =
    "bg-gray-200 border border-slate-400 text-slate-500/50 cursor-not-allowed pointer-events-none";

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={handle}
      onKeyDown={onKeyDown}
      disabled={disabledButton}
      className={`${base} ${classButton ?? ""} ${disabledButton ? disabledCls : enabled}`}
    >
      {loader ? (
        <>
          <ClipLoader size={15} color="#6B728080" />
          <div className="">Procesando</div>
        </>
      ) : (
        <>
          {icon}
          {label}
        </>
      )}
    </button>
  );
};
