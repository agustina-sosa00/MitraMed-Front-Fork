interface IProp {
  handle?: () => void;
  label?: string;
  classButton?: string;
  icon?: React.ReactNode;
  type?: "button" | "submit";
  loader?: boolean;
  disabledButton?: boolean; // <- corregido
}

export const Button: React.FC<IProp> = ({
  handle,
  label,
  classButton,
  icon,
  type = "button",
  loader,
  disabledButton = false,
}) => {
  const base =
    "h-10 flex items-center px-5 py-1 rounded !text-white capitalize font-medium gap-1 transition-all duration-300";
  const enabled = "bg-green hover:bg-greenHover cursor-pointer";
  const disabledCls = "bg-gray-400 cursor-not-allowed pointer-events-none";
  return (
    <button
      type={type}
      onClick={handle}
      disabled={disabledButton}
      className={`${base} ${classButton ?? ""} ${
        disabledButton ? disabledCls : enabled
      }`}
    >
      {loader ? (
        <svg
          className="w-5 h-5 circle-loader animate-spin"
          viewBox="25 25 50 50"
        >
          <circle r="20" cy="50" cx="50" className="circleWhite"></circle>
        </svg>
      ) : (
        <>
          {icon}
          {label}
        </>
      )}
    </button>
  );
};
