import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <div className="flex gap-8">
      <Link to="/mis-turnos" className="font-semibold text-xl hover:text-amber-400">
        Mis turnos
      </Link>
      <Link to="/mi-perfil" className="font-semibold text-xl hover:text-amber-400">
        Mi cuenta
      </Link>
    </div>
  );
}
