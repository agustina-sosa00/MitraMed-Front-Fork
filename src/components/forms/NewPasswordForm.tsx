import { useState } from 'react';
import InputField from '../InputField';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import ErrorMessage from '../ErrorMessage';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface NewPasswordFormProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

export default function NewPasswordForm({ register, errors }: NewPasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="flex flex-col relative max-w-md">
        <InputField
          id={'password'}
          type={showPassword ? 'text' : 'password'}
          label={'Nueva contraseña'}
          placeholder={'Ingresa nueva contraseña'}
          register={register('password', {
            required: {
              value: true,
              message: 'La nueva contraseña es obligatoria',
            },
            minLength: {
              value: 6,
              message: 'La contraseña debe tener al menos 6 caracteres',
            },
          })}
        />
        <button
          type="button"
          className="absolute right-2 sm:right-3 top-10 sm:top-12 text-xl"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FiEye /> : <FiEyeOff />}
        </button>
        {errors.password && typeof errors.password.message === 'string' && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </div>
      <div className="flex flex-col relative max-w-md">
        <InputField
          id={'repite_password'}
          type={showPassword ? 'text' : 'password'}
          label={'Repite tu contraseña'}
          placeholder={'Ingresa nuevamente tu contraseña'}
          register={register('repite_password', {
            required: {
              value: true,
              message: 'Debes repetir tu contraseña',
            },
            minLength: {
              value: 6,
              message: 'La contraseña debe tener al menos 6 caracteres',
            },
          })}
        />
        <button
          type="button"
          className="absolute right-2 sm:right-3 top-10 sm:top-12 text-xl"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FiEye /> : <FiEyeOff />}
        </button>
        {errors.repite_password && typeof errors.repite_password.message === 'string' && (
          <ErrorMessage>{errors.repite_password.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
