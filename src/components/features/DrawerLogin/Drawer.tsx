import SignInForm from "../forms/SignInForm";
import { IoClose } from "react-icons/io5";

interface IProp {
  handle: () => void;
  open: boolean;
  rol?: string;
}
export const Drawer = ({ handle, open, rol }: IProp) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity flex justify-end duration-300 ease-in-out ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={handle}
      >
        <div
          className={`w-3/4 md:w-1/4 px-4 flex gap-5 py-5 flex-col   bg-white  transform transition-transform duration-500 ease-in-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between w-full ">
            <h3 className="text-3xl font-semibold text-center text-gray-800 ">
              Inicia sesión
            </h3>
            <button
              onClick={handle}
              className="flex items-center justify-center text-2xl text-center"
            >
              <IoClose />
            </button>
          </div>
          {rol === "paciente" ? (
            <SignInForm rol="paciente" />
          ) : (
            <div className="flex flex-col items-center justify-start w-full h-full pt-20">
              {" "}
              <h2 className="text-lg font-bold uppercase text-blue ">
                Área en desarrollo
              </h2>{" "}
              <img
                src="/icons/programmer.png"
                alt=""
                className="opacity-50 w-28"
              />{" "}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
