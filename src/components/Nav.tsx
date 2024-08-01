import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <div className="flex justify-evenly w-full">
      <Link to="/inicio" className="font-semibold text-2xl hover:text-amber-400">
        Inicio
      </Link>
      <Link to="/mi-perfil" className="font-semibold text-2xl hover:text-amber-400">
        Perfil
      </Link>
    </div>
  );
}
