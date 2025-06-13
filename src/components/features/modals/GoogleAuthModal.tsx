import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ClipLoader } from "react-spinners";
import { useMutation } from "@tanstack/react-query";
import { googleAuth } from "@/services/UserService";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export default function GoogleAuthModal() {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const modal = queryParams.get("google_auth");
  const show = modal ? true : false;
  const [tokenGoogle, setTokenGoogle] = useState("");
  const [dataUserGoogle, setDataUserGoogle] = useState({
    nombre: "",
    apellido: "",
    email: "",
    fnac: "",
    genero: "",
    codarea: "",
    telefono: "",
  });

  // Estado para manejar el código de Google
  const [authCode, setAuthCode] = useState<string | null>(null);

  const { mutate } = useMutation({
    mutationFn: googleAuth,
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
    onSuccess: (data) => {
      // toast.success(data.message);

      if (data && data.status === 202) {
        navigate(location.pathname + "?confirmDataUser=true", {
          state: {
            dataBack: data?.faltantes,
            dataGoogle: dataUserGoogle,
            token: tokenGoogle,
          },
          replace: true,
        });
      } else {
        localStorage.setItem("nombreUsuario", data.nombre_usuario);

        // Almacenar los tokens en cookies
        Cookies.set("accessToken", data.token_acceso, { expires: 0.3333 }); // 8 horas
        Cookies.set("refreshToken", data.token_refresh, { expires: 0.5 }); // 12 horas

        navigate("/inicio");
      }
    },
  });

  useEffect(() => {
    const code = queryParams.get("code");
    if (code) {
      setAuthCode(code); // Capturamos el código de la URL
    }
  }, [location.search]); // Se ejecuta cada vez que cambian los parámetros de la URL

  // Función para manejar la validación del código
  useEffect(() => {
    if (authCode) {
      // Hacer la solicitud POST a Google para obtener los tokens
      fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          code: authCode,
          client_id: import.meta.env.VITE_CLIENT_ID,
          client_secret: import.meta.env.VITE_CLIENT_SECRET,
          redirect_uri: import.meta.env.VITE_REDIRECT_URI,
          grant_type: "authorization_code",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          const accessToken = data.access_token;

          // Hacer una segunda solicitud para obtener los datos del usuario
          if (accessToken) {
            setTokenGoogle(accessToken);
            fetch(
              "https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,birthdays,genders,phoneNumbers",
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            )
              .then((response) => response.json())
              .then((userData) => {
                const dataSend = {
                  nombre: userData?.names[0]?.givenName || "",
                  apellido: userData?.names[0]?.familyName || "",
                  email: userData?.emailAddresses[0]?.value || "",
                  fnac:
                    `${userData?.birthdays[0]?.date?.year}-${String(
                      userData?.birthdays[0]?.date?.month
                    ).padStart(2, "0")}-${String(
                      userData?.birthdays[0]?.date?.day
                    ).padStart(2, "0")}` || "",
                  genero: userData?.genders?.[0]?.value
                    ? userData?.genders[0].value === "male"
                      ? "Masculino"
                      : "Femenino"
                    : "",
                  codarea: "",
                  telefono: "",
                };
                setDataUserGoogle(dataSend);

                console.log("data de google", dataSend);
                mutate(dataSend);
              })
              .catch((error) => {
                console.error("Error al obtener datos adicionales:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error al obtener los tokens:", error);
        });
    }
  }, [authCode, navigate]);

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => navigate("/")}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="flex flex-col items-center w-full max-w-2xl p-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl text-slate-800 ">
                  <div className="flex items-center justify-center mt-5">
                    <ClipLoader color="#36d7b7" size={80} />
                  </div>

                  <DialogTitle
                    as="h3"
                    className="mt-6 text-xl font-semibold decoration-2"
                  >
                    Verificando datos de Google. Aguarda un momento...
                  </DialogTitle>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
