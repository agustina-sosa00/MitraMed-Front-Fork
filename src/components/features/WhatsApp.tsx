import { useEffect, useState } from "react";
import { whatsAppNum } from "@/services/UserService";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function WhatsApp() {
  const [numeroWsp, setNumeroWsp] = useState<string>(""); // Inicializamos con un valor vacío
  const mensaje = encodeURIComponent(
    "Hola quiero información sobre como sacar turnos. Esta es una prueba desde el boton de la pagina"
  );

  const { data } = useQuery<{ numero: string }[], Error>({
    queryKey: ["wsp-num"],
    queryFn: whatsAppNum,
  });

  // console.log(data);

  useEffect(() => {
    if (data) {
      setNumeroWsp(data[0].numero);
    }
  }, [data]);

  // console.log(numeroWsp);

  const url = `https://api.whatsapp.com/send/?phone=${numeroWsp}&text=${mensaje}&type=phone_number&app_absent=0`;

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
