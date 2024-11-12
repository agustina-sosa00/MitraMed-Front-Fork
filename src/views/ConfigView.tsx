import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ConfigView() {
  const [isEditing, setIsEditing] = useState(false);

  // Estado inicial de datos del usuario
  const [userData, setUserData] = useState({
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan.perez@example.com',
    fechaNacimiento: '1990-01-01',
    genero: 'Masculino',
  });

  // Función para formatear la fecha
  const formatDate = (date: string) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Meses empiezan desde 0
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Maneja cambios en los inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex p-6 relative mb-28">
      <div className="absolute mt-5 left-5 top-1">
        <Link
          to="/inicio"
          className="py-1 px-6 text-sm font-semibold bg-gray-700 hover:bg-gray-800 text-white transition duration-200"
        >
          Volver
        </Link>
      </div>
      {/* Sección de imagen de perfil */}
      <div className="flex-shrink-0 mr-8 w-1/3 flex items-center justify-center">
        <div className="w-40 h-40 bg-white border rounded-full flex items-center justify-center">
          <span className="text-5xl text-gray-500">👤</span>
        </div>
      </div>

      {/* Sección de datos (editable o solo lectura) */}
      <div className="flex-grow w-2/3">
        <h2 className="text-2xl font-semibold mb-4">Datos del Perfil</h2>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(userData).map(([key, value]) => (
            <div key={key}>
              <label className="text-sm font-medium text-gray-600">
                {key === 'fechaNacimiento'
                  ? 'Fecha de Nacimiento'
                  : key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              {isEditing ? (
                key === 'fechaNacimiento' ? (
                  <input
                    type="text"
                    name="fechaNacimiento"
                    value={formatDate(userData.fechaNacimiento)}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <input
                    type={key === 'fechaNacimiento' ? 'text' : 'text'}
                    name={key}
                    value={value}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                )
              ) : (
                <p className="p-2 border border-gray-300 rounded-md bg-gray-200">
                  {key === 'fechaNacimiento' ? formatDate(value) : value}
                </p>
              )}
            </div>
          ))}
        </div>
        {/* Botones para cambiar contraseña y alternar entre modos */}
        <div className="flex flex-col items-start gap-3 mt-6">
          <button onClick={() => setIsEditing(!isEditing)} className="text-blue-600 mr-4">
            {isEditing ? 'Guardar Cambios' : 'Editar Perfil'}
          </button>
          <button className="text-blue-600">Cambiar Contraseña</button>
        </div>
      </div>
    </div>
  );
}

/*
import { useState } from 'react';

export default function ConfigView() {
  const [userData, setUserData] = useState({
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan.perez@example.com',
    fechaNacimiento: '1990-01-01',
    genero: 'Masculino',
  });

  return (
    <div className="flex p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex-shrink-0 mr-8 w-1/3 flex items-center justify-center">
        <div className="w-40 h-40 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-5xl text-gray-700">👤</span>
        </div>
      </div>

      <div className="flex-grow w-2/3">
        <h2 className="text-2xl font-semibold mb-4">Datos del Perfil</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Nombre</label>
            <input
              type="text"
              value={userData.nombre}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Apellido</label>
            <input
              type="text"
              value={userData.apellido}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              value={userData.email}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Fecha de Nacimiento</label>
            <input
              type="date"
              value={userData.fechaNacimiento}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Género</label>
            <select
              value={userData.genero}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option>Masculino</option>
              <option>Femenino</option>
              <option>Otro</option>
            </select>
          </div>
        </div>
        <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md">
          Guardar Cambios
        </button>
        <div className="mt-4">
          <button className="text-blue-600">Cambiar Contraseña</button>
        </div>
      </div>
    </div>
  );
}

*/
