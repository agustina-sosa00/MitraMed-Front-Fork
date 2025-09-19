import { Link } from "react-router-dom";

export default function Vista404() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-5">
      <h1 className="text-4xl font-medium tracking-wide uppercase text-primaryBlue">¡UPSS!</h1>
      <div className="flex flex-col items-center justify-center">
        <img src="/icons/programmer.png" alt="programmer" className="w-20" />
        <p className="text-primaryBlue">La página que buscas esta en desarrollo</p>
        <p className="text-primaryBlue">Regresa en otro momento</p>
      </div>
      <Link
        to={"/profesionales/inicio"}
        className="px-2 py-1 font-medium text-white rounded bg-primaryBlue"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
