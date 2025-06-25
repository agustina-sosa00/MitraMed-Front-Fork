import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Account } from "@/types/index";
import { iniciarSesion } from "../../../services/UserService";
import Cookies from "js-cookie";
import InputField from "../../ui/InputField";
import ErrorMessage from "../../ui/ErrorMessage";
import Swal from "sweetalert2";
import { authProfessional } from "@/services/ProfessionalService";

interface IProp {
  rol?: string;
}

export default function SignInForm({ rol }: IProp) {
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
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: iniciarSesion,
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: error.message,
      });
    },
    onSuccess: (data) => {
      localStorage.setItem("nombreUsuario", data.nombre_usuario);

      // Almacenar los tokens en cookies
      Cookies.set("accessToken", data.token_acceso, { expires: 0.3333 }); // 8 horas
      Cookies.set("refreshToken", data.token_refresh, { expires: 0.5 }); // 12 horas

      navigate("/inicio");
    },
  });

  const { mutate: loginProfessional } = useMutation({
    mutationFn: authProfessional,
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: error.message,
      });
    },
    onSuccess: (data) => {
      if (data?.data?.data?.[0]?.idprofesional >= 1) {
        console.log(data?.data?.data?.[0]?.idprofesional >= 1);
        Cookies.set("accessProfessional", "true");
        navigate("/profesionales/inicio");
      } else if (data?.data?.code === 204) {
        console.log("data", data);
        Swal.fire({
          icon: "error",
          title: "El usuario no pertenece a ningún profesional registrado.",
          confirmButtonColor: "#022539",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: data?.data?.message,
        });
      }
    },
  });

  const handleForm = (formData: Account) => {
    if (rol === "paciente") {
      mutate(formData);
    } else {
      const data = {
        usuario: formData.usuario,
        password: formData.password,
      };
      loginProfessional(data);
    }
  };

  const handleSetShow = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <form
        className="flex flex-col gap-4 px-0.5 "
        noValidate
        onSubmit={handleSubmit(handleForm)}
      >
        {rol === "paciente" ? (
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
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>
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
            />
            {errors.usuario && (
              <ErrorMessage>{errors.usuario.message}</ErrorMessage>
            )}
          </div>
        )}

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
          />

          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Iniciar sesión"
          className="w-full p-2 mt-4 text-base font-semibold text-white uppercase transition-all rounded-lg shadow-md cursor-pointer xl:p-3 xl:text-lg bg-green hover:bg-greenHover"
        />
      </form>

      {/* B U T T O N  G O O G L E */}
      {/* B U T T O N  G O O G L E */}
      {/* B U T T O N  G O O G L E */}
      {/* B U T T O N  G O O G L E */}
      {/* B U T T O N  G O O G L E */}
      {/* B U T T O N  G O O G L E */}

      {rol === "paciente" ? (
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
            <span className="text-sm font-medium text-gray-700">
              Continuar con Google
            </span>
          </button>
        </div>
      ) : null}

      <div className="flex flex-col items-start gap-2 pl-1 mt-5 text-sm text-gray-700 lg:pl-3 xl:text-base">
        {rol === "paciente" ? (
          <p>
            No tienes cuenta?{" "}
            <button
              className="hover:underline hover:text-green"
              onClick={() =>
                navigate(location.pathname + "?createAccount=true")
              }
            >
              Regístrate aquí
            </button>
          </p>
        ) : null}

        <button
          className="hover:underline hover:text-green"
          onClick={() => navigate(location.pathname + "?forgotPassword=true")}
        >
          Olvidé mi contraseña
        </button>
        <button
          className="hover:underline hover:text-green"
          onClick={() => navigate(location.pathname + "?newTokenConfirm=true")}
        >
          Reenviar correo de confirmación
        </button>
      </div>
    </>
  );
}
