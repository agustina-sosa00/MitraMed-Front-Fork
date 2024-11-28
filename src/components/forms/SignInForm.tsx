import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Account } from '@/types/index';
import { iniciarSesion } from '../../services/UserService';
import Cookies from 'js-cookie';
import InputField from '../InputField';
import ErrorMessage from '../ErrorMessage';

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
      {/* <div className="px-3 my-2 text-center">
        <h1 className="text-3xl text-indigo-600 font-bold underline">Iniciar sesión</h1>
      </div> */}

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
            className="absolute right-4 top-[50px] text-blue-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </button>
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>

        <input
          type="submit"
          value="Iniciar sesión"
          className="p-2 mt-4 w-full text-white text-base font-semibold uppercase bg-blue-600 hover:bg-blue-700 transition-all cursor-pointer shadow-md rounded-lg"
        />
      </form>

      <div className="flex flex-col items-start pl-1 lg:pl-3 mt-5 gap-2 text-sm text-gray-700">
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
