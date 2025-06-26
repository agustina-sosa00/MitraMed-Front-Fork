interface ButtonSubMenuProps {
  width: boolean;
  actionText: string;
  updateTooth: (newData: { action?: string; tratamiento?: string }) => void;
  handle: () => void;
  y: number;
}

const treatmentList = ["Extracción", "Corona", "Sellado"];

export const ButtonSubMenu: React.FC<ButtonSubMenuProps> = ({
  width,
  actionText,
  updateTooth,
  handle,
  y,
}) => {
  const submenuHeight = 150;
  const openUpwards = y + submenuHeight > window.innerHeight;
  return (
    <div
      className={`absolute ${
        openUpwards ? "-bottom-10" : "top-0"
      } bg-white border border-gray-300 rounded ${
        width ? "left-full" : "right-full"
      }`}
    >
      {treatmentList.map((item, index) => (
        <button
          key={item}
          onClick={() => {
            updateTooth({ action: actionText, tratamiento: item });
          }}
          className={`w-44 px-3 py-2 text-start text-sm border-b cursor-pointer hover:text-white hover:bg-green transition-all duration-300 border-gray-300 ${
            index === 0 && "rounded-t"
          }`}
        >
          {item}
        </button>
      ))}
      <button
        className={`w-44 px-3 py-2 text-start text-sm border-b cursor-pointer hover:text-white hover:bg-green transition-all duration-300 border-gray-300 rounded-b`}
        onClick={() => {
          updateTooth({ action: actionText, tratamiento: "restauraciones" });
          handle();
        }}
      >
        Restauraciones
      </button>
    </div>
  );
};
