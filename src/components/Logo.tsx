import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-3 p-2 border-[3px] border-slate-400 rounded-lg">
      <Link to="/" className="mx-3 flex gap-3">
        <img src="/logos/mitra-med-logo-no-bg.png" alt="logo" className="max-w-20 max-h-20" />
      </Link>
      <div className="hidden md:flex items-center">
        <img
          src="/logos/mitra-med-letras_no-bg1.png"
          alt="logo-letras"
          className="max-w-44 max-h-44"
        />
      </div>
    </div>
  );
}
