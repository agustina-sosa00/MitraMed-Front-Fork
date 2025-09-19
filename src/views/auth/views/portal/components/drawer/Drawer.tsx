import SignInForm from "../forms/SignInForm";

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
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={handle}
      >
        <div
          className={`w-3/4 md:w-1/4 px-4 flex gap-5 py-1 flex-col   bg-white  transform transition-transform duration-500 ease-in-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {rol === "paciente" && <SignInForm rol="paciente" handle={handle} />}
          {rol === "profesional" && <SignInForm rol="profesional" handle={handle} />}
        </div>
      </div>
    </>
  );
};
