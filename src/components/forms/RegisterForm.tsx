import { useState } from 'react';
import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import ErrorMessage from '../ErrorMessage';
import { NewAccount } from '@/types/index';
import InputField from '../InputField';

type RegisterFormProps = {
  register: UseFormRegister<NewAccount>;
  errors: FieldErrors<NewAccount>;
  watch: UseFormWatch<NewAccount>;
};

export default function RegisterForm({ register, errors, watch }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <InputField
              id={'nombre'}
              type={'text'}
              label={'Nombre'}
              placeholder={'Ingresa tu nombre'}
              register={register('nombre', {
                required: {
                  value: true,
                  message: 'El nombre es obligatorio',
                },
              })}
            />
            {errors.nombre && <ErrorMessage>{errors.nombre.message}</ErrorMessage>}
          </div>
          <div className="flex flex-col mr-12">
            <InputField
              id={'apellido'}
              type={'text'}
              label={'Apellido'}
              placeholder={'Ingresa tu apellido'}
              register={register('apellido', {
                required: {
                  value: true,
                  message: 'El apellido es obligatorio',
                },
              })}
            />
            {errors.apellido && <ErrorMessage>{errors.apellido.message}</ErrorMessage>}
          </div>
        </div>
        <div className="flex flex-col w-full">
          <InputField
            id={'fnac'}
            type={'date'}
            label={'Fecha de Nacimiento'}
            placeholder={''}
            register={register('fnac', {
              required: {
                value: true,
                message: 'La fecha de nacimiento es obligatoria',
              },
              validate: (value) => {
                const fechaNacimiento = new Date(value);
                const fechaActual = new Date();
                const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

                return edad >= 18 || 'Debes ser mayor de edad para registrarte';
              },
            })}
          />
          {errors.fnac && <ErrorMessage>{errors.fnac.message}</ErrorMessage>}
        </div>
        <div className="flex flex-col mb-1">
          <label htmlFor="genero" className="font-semibold text-lg p-1">
            Sexo:
          </label>
          <select
            id="genero"
            className="w-full p-2 max-w-2xl font-semibold bg-white border-2 border-opacity-40 border-slate-500 outline-none transition duration-200 focus:border-blue-500"
            {...register('genero', {
              required: {
                value: true,
                message: 'El sexo es obligatorio',
              },
            })}
          >
            <option value="">--- Seleccione ---</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
          {errors.genero && <ErrorMessage>{errors.genero.message}</ErrorMessage>}
        </div>
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
            className="absolute right-3 top-11 text-xl"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </button>
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>
        <div className="flex flex-col relative">
          <InputField
            id={'confirmPassword'}
            type={showPassword ? 'text' : 'password'}
            label={'Confirmar Contraseña'}
            placeholder={'Ingresa nuevamente tu contraseña'}
            register={register('confirmPassword', {
              required: {
                value: true,
                message: 'Confirmar la contraseña es obligatorio',
              },
              validate: (value) =>
                value === watch('password') || 'Las contraseñas deben ser idénticas',
            })}
          />
          <button
            type="button"
            className="absolute right-3 top-11 text-xl"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </button>
          {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
        </div>
      </div>
    </>
  );
}
