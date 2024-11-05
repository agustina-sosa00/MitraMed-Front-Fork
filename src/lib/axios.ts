import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Agregar interceptor para añadir el token al header si está presente
api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken'); // btener el token de acceso de las cookies
    console.log('Interceptor Request - Token en Cookie:', accessToken);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // Agregarlo al header
      console.log('Interceptor Request - Token agregado al header Authorization');
    } else {
      console.log('Interceptor Request - No se encontró token');
    }
    return config;
  },
  (error) => {
    console.log('Interceptor Request - Error:', error); // Ver errores en la solicitud
    return Promise.reject(error);
  }
);

// Función para obtener un nuevo token de acceso
const obtenerNuevoTokenAcceso = async () => {
  const refreshToken = Cookies.get('refreshToken');
  console.log('Refresh Token en Cookies:', refreshToken); // Verificar si el refresh token está en cookies

  if (!refreshToken) throw new Error('No hay refresh token disponible');

  try {
    const response = await api.post('/auth/refresh_token', { token_refresh: refreshToken });
    const { nuevo_token_acceso } = response.data;

    console.log('Nuevo Token de Acceso:', nuevo_token_acceso); // Ver el nuevo token de acceso

    // Almacenar el nuevo token de acceso en cookies
    Cookies.set('accessToken', nuevo_token_acceso, { expires: 1 / 48 }); // 30 minutos

    return nuevo_token_acceso;
  } catch (error) {
    console.error('Error al obtener el nuevo token de acceso:', error); // Ver error al refrescar el token
    throw error; // Re-lanzar el error para que sea manejado en el interceptor
  }
};

// Modificación en el interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Respuesta recibida:', response); // Ver la respuesta de la solicitud
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log('Interceptor Error - Config original de la solicitud:', originalRequest); // Ver la solicitud original

    if (error.response && error.response.status === 401) {
      console.log('Token de acceso expirado, intentando obtener nuevo token...');

      try {
        const newAccessToken = await obtenerNuevoTokenAcceso();

        // Actualizar la solicitud original con el nuevo token de acceso
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        console.log('Nuevo token agregado a la solicitud:', newAccessToken);

        return api(originalRequest); // Reintentar la solicitud original con el nuevo token
      } catch (refreshError) {
        console.error('Error al refrescar el token:', refreshError);
        // Redirigir al usuario a la página de inicio de sesión o realizar otra acción
        // Puedes usar history.push('/') para redirigir si usas React Router
      }
    }

    return Promise.reject(error); // Rechazar el error si no es 401 o si el refresh falla
  }
);

export default api;
