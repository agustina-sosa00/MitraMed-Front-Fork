import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { obtenerUsuProfesional } from "@/views/auth/services/ProfessionalService";
import { iniciarSesion } from "@/views/auth/services/UserService";
import { Account } from "@/views/auth/types";
import { IoClose } from "react-icons/io5";
import Cookies from "js-cookie";
// import Captcha from "@/views/auth/_components/ui/Captcha";
import Swal from "sweetalert2";
import InputField from "@/views/auth/_components/ui/InputField";
import ErrorMessage from "@/views/auth/_components/ui/ErrorMessage";

interface SignInFormProps {
  rol?: string;
  handle?: () => void;
}

export default function SignInForm({ rol, handle }: SignInFormProps) {
  // const [validateCaptcha, setValidateCaptcha] = useState(false);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues: Account = {
    email: "",
    password: "",
    usuario: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setFocus,
  } = useForm({ defaultValues: initialValues, mode: "onChange", reValidateMode: "onChange" });
  const disabled = isValid;
  useEffect(() => {
    if (rol === "paciente") {
      setFocus("email");
    } else if (rol === "profesional") {
      setFocus("usuario");
    }
  }, [rol, setFocus]);

  // Enter navega entre campos
  const handleKeyDown =
    (field: "email" | "usuario" | "password") => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (field === "email" || field === "usuario") {
          setFocus("password");
        } else if (field === "password") {
          if (rol === "paciente") setFocus("email");
          else setFocus("usuario");
        }
      }
    };

  const { mutate: loginPaciente } = useMutation({
    mutationFn: iniciarSesion,
    onError: (_error) => {
      Swal.fire({
        icon: "error",
        text: "Credenciales Incorrectas, verifique los datos",
        timer: 1800,
        timerProgressBar: true,
      });
    },
    onSuccess: (data) => {
      console.log(data);
      localStorage.setItem("nombreUsuario", data.nombre_usuario);
      // Almacenar los tokens en cookies
      Cookies.set("accessToken", data.token_acceso, { expires: 0.3333 }); // 8 horas
      Cookies.set("refreshToken", data.token_refresh, { expires: 0.5 }); // 12 horas

      const viteEnv = import.meta.env.VITE_ENV;
      if (viteEnv === "development") {
        localStorage.setItem("_m", "homo");
        localStorage.setItem("_env", "des");
      } else {
        localStorage.setItem("_m", "prod");
        localStorage.setItem("_env", "prod");
      }
      localStorage.setItem("_e", "20");
      navigate("/inicio");
    },
  });

  const { mutate: loginProfessional } = useMutation({
    mutationFn: obtenerUsuProfesional,
    onError: (_error) => {
      Swal.fire({
        icon: "error",
        text: "Credenciales incorrectas, verifique los datos",
        timer: 1800,
        timerProgressBar: true,
      });
    },

    onSuccess: (resp) => {
      const user = resp?.data?.data?.[0];

      if (!user) {
        Swal.fire({ icon: "error", title: "Credenciales Incorrectas" });
        return;
      }

      if (resp?.data?.code === 204) {
        Swal.fire({
          icon: "error",
          title: "El usuario no pertenece a ningún profesional registrado.",
          confirmButtonColor: "#022539",
        });

        return;
      }

      localStorage.setItem("_tu", user?.tusuario);
      localStorage.setItem("_iddoc", user?.iddoctor);
      localStorage.setItem("_idprof", user?.idprofesional);

      localStorage.setItem("mtm-tusuario", String(user?.tusuario));
      localStorage.setItem("mtm-iddoctor", String(user?.iddoctor));

      Cookies.set("dataProfessional", JSON.stringify(user));
      navigate("/dashboard/inicio", { replace: true });

      // Swal.fire({ icon: "error", title: resp?.data?.message });
    },
  });

  function handleForm(formData: Account) {
    if (rol === "paciente") {
      loginPaciente(formData);
    } else {
      const data = {
        usuario: formData.usuario,
        password: formData.password,
      };
      loginProfessional(data);
    }
  }

  function handleSetShow() {
    setShowPassword((prev) => !prev);
  }

  return (
    <>
      {/* HEADER */}
      <div className="relative flex flex-col items-center w-full ">
        <button
          onClick={handle}
          className="absolute top-0 right-0 flex items-center justify-center text-2xl text-center"
        >
          <IoClose />
        </button>
        <h3 className="mb-2 text-3xl font-bold text-gray-800 underline">
          {rol === "paciente" ? "Pacientes" : "Profesionales"}
        </h3>
      </div>

      <form className="flex flex-col gap-4 px-0.5 " noValidate onSubmit={handleSubmit(handleForm)}>
        {/* Input Email/Usuario */}
        {rol === "paciente" ? (
          <>
            <div className="flex flex-col">
              <InputField
                id={"email"}
                type={"text"}
                label={"Email"}
                placeholder={"Ingresa tu email"}
                register={register("email", {
                  required: {
                    value: true,
                    message: "El email es obligatorio",
                  },
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Email inválido",
                  },
                })}
                onKeyDown={handleKeyDown("email")}
                autoFocus={rol === "paciente"}
              />
              {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            </div>
          </>
        ) : (
          <div className="flex flex-col">
            <InputField
              id={"usuario"}
              type={"text"}
              label={"Usuario"}
              placeholder={"Ingresa tu usuario"}
              register={register("usuario", {
                required: {
                  value: true,
                  message: "El Usuario es obligatorio",
                },
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: "Usuario inválido",
                },
              })}
              onKeyDown={handleKeyDown("usuario")}
              autoFocus={rol === "profesional"}
            />
            {errors.usuario && <ErrorMessage>{errors.usuario.message}</ErrorMessage>}
          </div>
        )}

        {/* Input Password */}
        <div className="relative flex flex-col w-full ">
          <InputField
            id={"password"}
            type={showPassword ? "text" : "password"}
            label={"Contraseña"}
            placeholder={"Ingresa tu contraseña"}
            show={showPassword}
            setShow={handleSetShow}
            register={register("password", {
              required: {
                value: true,
                message: "La contraseña es obligatoria",
              },
              minLength: {
                value: 5,
                message: "La contraseña debe tener mínimo 8 caracteres",
              },
            })}
            onKeyDown={handleKeyDown("password")}
          />

          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>

        {/* CAPTCHA */}
        {/* <div className="flex justify-center ">
          <Captcha setState={setValidateCaptcha} />
        </div> */}

        {/* Boton Submit */}
        <input
          disabled={!disabled}
          type="submit"
          value="Iniciar sesión"
          className={`w-full p-2 mt-4 text-base font-semibold uppercase transition-all rounded-lg shadow-md xl:p-3 xl:text-lg  ${
            !disabled
              ? "bg-gray-200 text-gray-400 cursor-text"
              : "bg-primaryGreen  hover:bg-greenHover text-white cursor-pointer"
          }`}
        />
      </form>

      {/* Inicio con Google Y Botones */}
      {rol === "paciente" ? (
        <>
          {/* GOOGLE */}
          <div className="flex justify-center my-6">
            <button
              type="button"
              aria-label="Continuar con Google ID"
              className="flex items-center gap-2 p-2 bg-gray-100 border border-gray-600 rounded bg-opacity-20 hover:bg-opacity-30"
              onClick={() => {
                window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
                  import.meta.env.VITE_CLIENT_ID
                }&redirect_uri=${
                  import.meta.env.VITE_REDIRECT_URI
                }&response_type=code&scope=openid%20email%20https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/user.birthday.read%20https://www.googleapis.com/auth/user.gender.read%20https://www.googleapis.com/auth/user.phonenumbers.read&prompt=select_account`;
              }}
            >
              <img src="/google-icon.png" alt="Google Icon" className="w-8 h-8" />
              <span className="text-sm font-medium text-gray-700">Continuar con Google</span>
            </button>
          </div>

          {/* BOTONES */}
          <div className="flex flex-col items-start gap-2 pl-1 text-sm text-gray-700 lg:pl-3 xl:text-base">
            <p>
              No tienes cuenta?{" "}
              <button
                className="font-medium hover:underline text-primaryGreen"
                onClick={() => navigate(location.pathname + "?createAccount=true")}
              >
                Regístrate aquí
              </button>
            </p>
            <button
              className="font-medium hover:underline text-primaryGreen"
              onClick={() => navigate(location.pathname + "?forgotPassword=true")}
            >
              Olvidé mi contraseña
            </button>

            <button
              className="font-medium hover:underline text-primaryGreen"
              onClick={() => navigate(location.pathname + "?newTokenConfirm=true")}
            >
              Reenviar correo de confirmación
            </button>
          </div>
        </>
      ) : null}
    </>
  );
}
