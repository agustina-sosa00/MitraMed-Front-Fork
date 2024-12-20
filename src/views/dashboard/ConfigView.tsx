import { actualizarEmail, actualizarTelefono, obtenerDatosUsuario } from '@/services/TurnosService';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { Usuario } from '@/types/index';
import { SlUser, SlUserFemale } from 'react-icons/sl';

interface EmailTelefono {
  email: string;
  codarea: string;
  telefono: string;
}

export default function ConfigView() {
  const navigate = useNavigate();

  const [isEditingTelefono, setIsEditingTelefono] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [emailInput, setEmailInput] = useState<string>('');
  const [codareaInput, setCodareaInput] = useState<string>('');
  const [telefonoInput, setTelefonoInput] = useState<string>('');
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [shouldRefetch, setShouldRefetch] = useState(true);

  console.log('Codarea: ', codareaInput.trim());
  // console.log('Telefono: ', telefonoInput);

  const { register, setValue, handleSubmit } = useForm<EmailTelefono>({
    defaultValues: {
      email: '',
      codarea: '',
      telefono: '',
    },
  });

  const formatDate = (date: string) => {
    // Si el formato es DD-MM-YYYY, lo cambiamos a YYYY-MM-DD
    const parts = date.split('-');
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    const d = new Date(formattedDate);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const { data: dataUsuario } = useQuery<Usuario[], Error>({
    queryKey: ['usuario'],
    queryFn: obtenerDatosUsuario,
    initialData: [],
    enabled: shouldRefetch,
  });

  // console.log(dataUsuario[0]);

  useEffect(() => {
    if (dataUsuario) {
      setUsuario(dataUsuario[0]);
      setShouldRefetch(false);
    }
  }, [dataUsuario]);

  useEffect(() => {
    if (usuario) {
      setValue('email', usuario.email);
      setValue('codarea', usuario.codarea);
      setValue('telefono', usuario.telefono);
    }
  }, [usuario, setValue]);

  const queryClient = useQueryClient();

  const { mutate: mutateEmail } = useMutation({
    mutationFn: (email: string) => actualizarEmail(email),
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.message);
      setIsEditingEmail(false);
      if (usuario) {
        const updatedUsuario = { ...usuario, email: emailInput };
        setUsuario(updatedUsuario);
      }
      queryClient.invalidateQueries({ queryKey: ['usuario'] });

      queryClient.refetchQueries({ queryKey: ['usuario'] });
      setShouldRefetch(true);
    },
  });

  const { mutate: mutateTelefono } = useMutation({
    mutationFn: ({ codarea, telefono }: { codarea: string; telefono: string }) =>
      actualizarTelefono({ codarea, telefono }),
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.message);
      setIsEditingTelefono(false);
      if (usuario) {
        const updatedUsuario = { ...usuario, codarea: codareaInput, telefono: telefonoInput };
        setUsuario(updatedUsuario);
      }
      queryClient.invalidateQueries({ queryKey: ['usuario'] });

      queryClient.refetchQueries({ queryKey: ['usuario'] });
      setShouldRefetch(true);
    },
  });

  const handleCambiarTelefono = (data: { codarea: string; telefono: string }) => {
    setCodareaInput(data.codarea);
    setTelefonoInput(data.telefono);

    console.log('data.codarea: ', data.codarea.trim());

    mutateTelefono(data);
  };

  const handleEmail = (data: EmailTelefono) => {
    setEmailInput(data.email);
    mutateEmail(data.email);
  };

  return (
    <div className="flex p-6 relative mb-28">
      <div className="absolute -top-5 left-1">
        <Link
          to="/inicio"
          className="py-2 px-4 text-xs sm:text-base font-semibold bg-gray-700 hover:bg-gray-800 text-white rounded-lg transition duration-200"
        >
          Volver
        </Link>
      </div>

      <div className="flex flex-col w-full lg:flex-row items-center lg:items-start gap-6 lg:gap-8">
        {/* Imagen de perfil */}
        <div className="flex-shrink-0 w-full lg:w-1/3 flex items-center justify-center">
          <div className="w-40 h-40 text-5xl bg-white border rounded-full flex items-center justify-center">
            <span className="text-5xl">
              {usuario?.genero === 'Masculino' ? <SlUser /> : <SlUserFemale />}
            </span>
          </div>
        </div>

        {/* Datos solo lectura */}
        <div className="flex flex-col max-w-lg lg:max-w-3xl w-full sm:flex-grow lg:w-2/3">
          <h2 className="text-2xl sm:text-4xl font-semibold mb-4 text-center sm:text-left">
            Datos del Perfil
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 lg:mt-5">
            {(['nombre', 'apellido', 'fnac', 'genero'] as (keyof Usuario)[]).map((field) => (
              <div key={field} className="flex items-center sm:gap-3">
                <label className="w-1/3 text-sm sm:text-base font-medium text-gray-600">
                  {field === 'fnac'
                    ? 'Fecha de Nacimiento'
                    : (field as string).charAt(0).toUpperCase() + (field as string).slice(1)}
                </label>
                <p
                  className={`w-2/3 py-1 px-2 min-h-[35px] text-sm sm:text-base border border-gray-300 rounded-md bg-gray-200`}
                >
                  {usuario ? (field === 'fnac' ? formatDate(usuario[field]) : usuario[field]) : ''}
                </p>
              </div>
            ))}
          </div>

          {/* Telefono */}
          <div className="grid grid-cols-1 mb-5">
            <div className="flex items-center w-full">
              <label className="w-1/6 text-sm sm:text-base font-medium text-gray-600">
                Teléfono
              </label>
              {isEditingTelefono ? (
                <div className="w-2/3 flex gap-2">
                  <input
                    type="text"
                    className="w-1/4 text-sm sm:text-base py-1 px-2 min-h-[35px] border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 focus:ring-1 transition"
                    {...register('codarea')}
                  />
                  <span className="text-sm sm:text-base flex items-center">15</span>
                  <input
                    type="text"
                    className="w-2/5 text-sm sm:text-base py-1 px-2 min-h-[35px] border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 focus:ring-1 transition"
                    {...register('telefono')}
                  />
                </div>
              ) : (
                <div className="w-2/3 flex gap-2">
                  <p className="w-1/4 text-sm sm:text-base py-1 px-2 min-h-[35px] border border-gray-300 rounded-md bg-gray-200">
                    {usuario?.codarea}
                  </p>
                  <span className="text-sm sm:text-base flex items-center">15</span>
                  <p className="w-2/5 text-sm sm:text-base py-1 px-2 min-h-[35px] border border-gray-300 rounded-md bg-gray-200">
                    {usuario?.telefono}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="grid grid-cols-1">
            <div className="flex items-center w-full">
              <label className="w-1/6 text-sm sm:text-base font-medium text-gray-600">Email</label>
              {isEditingEmail ? (
                <input
                  type="email"
                  className="w-2/3 text-sm sm:text-base sm:w-2/4 py-1 px-2 min-h-[35px]  border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 focus:ring-1 transition"
                  {...register('email')}
                />
              ) : (
                <p className="w-2/3 text-sm sm:text-base sm:w-2/4 py-1 px-2 min-h-[35px]  border border-gray-300 rounded-md bg-gray-200">
                  {usuario?.email}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 mt-5">
            {!isEditingTelefono ? (
              <button
                type="button"
                onClick={() => setIsEditingTelefono(true)}
                className="text-sm sm:text-base text-gray-600 bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded-lg font-semibold transition duration-200"
              >
                Cambiar Telefono
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleSubmit(handleCambiarTelefono)}
                  className="text-sm sm:text-base text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg font-semibold transition duration-200"
                >
                  Confirmar
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingTelefono(false)}
                  className="text-sm sm:text-base  text-white bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg font-semibold transition duration-200"
                >
                  Cancelar
                </button>
              </div>
            )}

            {!isEditingEmail ? (
              <button
                type="button"
                onClick={() => setIsEditingEmail(true)}
                className="text-sm sm:text-base text-gray-600 bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded-lg font-semibold transition duration-200"
              >
                Cambiar Email
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleSubmit(handleEmail)}
                  className="text-sm sm:text-base text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg font-semibold transition duration-200"
                >
                  Confirmar
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingEmail(false)}
                  className="text-sm sm:text-base  text-white bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg font-semibold transition duration-200"
                >
                  Cancelar
                </button>
              </div>
            )}
            <button
              className="text-sm sm:text-base  text-gray-600 bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded-lg font-semibold transition duration-200"
              onClick={() => navigate('?reestablecer_password=true&internal=true')}
            >
              Cambiar Contraseña
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
