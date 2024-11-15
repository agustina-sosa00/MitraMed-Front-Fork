import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useMutation } from '@tanstack/react-query';
import { Account } from '@/types/index';
import { iniciarSesion } from '../../services/UserService';
// import Captcha from '../Captcha';
import Cookies from 'js-cookie';
import InputField from '../InputField';
import ErrorMessage from '../ErrorMessage';
import { toast } from 'react-toastify';

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

      // Almacenar los tokens en cookies
      Cookies.set('accessToken', data.token_acceso, { expires: 1 });
      Cookies.set('refreshToken', data.token_refresh, { expires: 1 });

      navigate('/inicio');
    },
  });

  const handleForm = (formData: Account) => {
    // console.log(formData);
    mutate(formData);
  };
  return (
    <>
      <div className="px-3 my-2">
        <h1 className="text-2xl text-slate-800 font-semibold underline underline-offset-4 decoration-2">
          Iniciar sesión
        </h1>
      </div>

      <form className="flex flex-col gap-2 p-2" noValidate onSubmit={handleSubmit(handleForm)}>
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
                message: 'La contraseña debe tener mínimo 8 carácteres',
              },
            })}
          />
          <button
            type="button"
            className="absolute right-3 top-12 text-xl"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </button>
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>

        {/* <Captcha /> */}
        <input
          type="submit"
          value="Iniciar sesión"
          className="p-3 mt-4 max-w-lg text-white text-base uppercase bg-lime-700 hover:bg-lime-800  transition-colors cursor-pointer shadow-lg"
        />
      </form>

      <div className="flex flex-col items-start mt-3 mx-2 gap-2">
        <p className="">
          No tienes cuenta?{' '}
          <button
            className="text-blue-600 hover:underline"
            onClick={() => navigate(location.pathname + '?createAccount=true')}
          >
            Regístrate aquí
          </button>
        </p>
        <button
          className="text-blue-600 hover:underline"
          onClick={() => navigate(location.pathname + '?forgotPassword=true')}
        >
          Olvidé mi contraseña
        </button>
        <button
          className="text-blue-600 hover:underline"
          onClick={() => navigate(location.pathname + '?newTokenConfirm=true')}
        >
          Reenviar correo de confirmación
        </button>
      </div>
    </>
  );
}
