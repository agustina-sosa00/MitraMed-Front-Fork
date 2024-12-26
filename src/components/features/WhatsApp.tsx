import { Link } from 'react-router-dom';

export default function WhatsApp() {
  const mensaje = encodeURIComponent("Hola quiero información sobre como sacar turnos. Esta es una prueba desde el boton de la pagina");
  const numero = "542612176999";  // Número actualizado
  const url = `https://api.whatsapp.com/send/?phone=${numero}&text=${mensaje}&type=phone_number&app_absent=0`;

  return (
    <Link 
      to={url} 
      target="_blank" 
      className="fixed bottom-10 right-10 sm:right-16 flex justify-center items-center hover:scale-110 transition"
    >
      <img 
        src="/whatsapp-logo-icon.jpg" 
        alt="WhatsApp"
        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full"
      />
    </Link>
  );
}
