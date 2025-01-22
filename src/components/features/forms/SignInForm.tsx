import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Account } from '@/types/index';
import { iniciarSesion } from '../../../services/UserService';
import Cookies from 'js-cookie';
import InputField from '../../ui/InputField';
import ErrorMessage from '../../ui/ErrorMessage';

export default function SignInForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues: Account = {
    email: '',
    password: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: iniciarSesion,
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
    onSuccess: (data) => {
      // console.log(data);
      // toast.success(data.message);

      localStorage.setItem('nombreUsuario', data.nombre_usuario);

      // Almacenar los tokens en cookies
      Cookies.set('accessToken', data.token_acceso, { expires: 0.3333 }); // 8 horas
      Cookies.set('refreshToken', data.token_refresh, { expires: 0.5 }); // 12 horas

      navigate('/inicio');
    },
  });

  const handleForm = (formData: Account) => {
    // console.log(formData);
    mutate(formData);
  };
  return (
    <>
      <form
        className="flex flex-col gap-4 px-0.5 lg:px-2"
        noValidate
        onSubmit={handleSubmit(handleForm)}
      >
        <div className="flex flex-col">
          <InputField
            id={'email'}
            type={'text'}
            label={'Email'}
            placeholder={'Ingresa tu email'}
            register={register('email', {
              required: {
                value: true,
                message: 'El email es obligatorio',
              },
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: 'Email inválido',
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col relative">
          <InputField
            id={'password'}
            type={showPassword ? 'text' : 'password'}
            label={'Contraseña'}
            placeholder={'Ingresa tu contraseña'}
            register={register('password', {
              required: {
                value: true,
                message: 'La contraseña es obligatoria',
              },
              minLength: {
                value: 8,
                message: 'La contraseña debe tener mínimo 8 caracteres',
              },
            })}
          />
          <button
            type="button"
            className="absolute right-4 xl:right-6 top-[42px] sm:top-12 xl:top-[62px] xl:text-2xl  text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </button>
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>

        <input
          type="submit"
          value="Iniciar sesión"
          className="p-2 xl:p-3 mt-4 w-full text-white text-base xl:text-lg font-semibold uppercase bg-blue-600 hover:bg-blue-700 transition-all cursor-pointer shadow-md rounded-lg"
        />
      </form>

      {/* <div className="flex justify-center my-6">
        <button
          type="button"
          aria-label="Continuar con Google ID"
          className="flex items-center gap-2 p-2 border border-gray-600 rounded bg-gray-100 bg-opacity-20 hover:bg-opacity-30"
          onClick={() => {
            window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
              import.meta.env.VITE_CLIENT_ID
            }&redirect_uri=${
              import.meta.env.VITE_REDIRECT_URI
            }&response_type=code&scope=openid%20email%20https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/user.birthday.read%20https://www.googleapis.com/auth/user.gender.read%20https://www.googleapis.com/auth/user.phonenumbers.read`;
          }}
        >
          <img src="/google-icon.png" alt="Google Icon" className="w-8 h-8" />
          <span className="text-sm font-medium text-gray-700">Continuar con Google</span>
        </button>
      </div> */}

      <div className="flex flex-col items-start pl-1 lg:pl-3 mt-5 gap-2 text-sm xl:text-base text-gray-700">
        <p>
          No tienes cuenta?{' '}
          <button
            className="hover:underline hover:text-indigo-600"
            onClick={() => navigate(location.pathname + '?createAccount=true')}
          >
            Regístrate aquí
          </button>
        </p>
        <button
          className="hover:underline hover:text-indigo-600"
          onClick={() => navigate(location.pathname + '?forgotPassword=true')}
        >
          Olvidé mi contraseña
        </button>
        <button
          className="hover:underline hover:text-indigo-600"
          onClick={() => navigate(location.pathname + '?newTokenConfirm=true')}
        >
          Reenviar correo de confirmación
        </button>
      </div>
    </>
  );
}
