# Mitra Med Frontend

Este es el frontend de Mitra Med, una plataforma de gestión de turnos médicos. Este proyecto está construido con **Vite**, **React**, y **TypeScript**, con un enfoque en la modularidad y la facilidad de mantenimiento.

## Tecnologías usadas:

- Vite
- React
- TypeScript
- Tailwind CSS

## Estructura del Proyecto

mitra-med-front/
│
├── public/ # Archivos estáticos (imágenes, iconos, etc.)
│ ├── icons/
│ ├── img/
│ ├── logos/
│ └── med/
│
├── src/ # Código fuente
│ ├── components/ # Componentes reutilizables
│ │ ├── features/ # Componentes relacionados con funcionalidades
│ │ │ ├── forms/ # Formularios
│ │ │ └── modals/ # Modales
│ │ └── ui/ # Componentes de interfaz (Header, Footer, etc.)
│ ├── layouts/ # Componentes de layout (estructura de la página)
│ ├── lib/ # Librerías y utilidades generales
│ ├── services/ # Servicios para la API, lógica de negocio
│ ├── types/ # Tipos y interfaces de TypeScript
│ ├── utils/ # Funciones utilitarias y helpers
│ ├── views/ # Vistas o páginas
│ │ ├── auth/ # Páginas relacionadas con autenticación
│ │ └── dashboard/ # Páginas del dashboard

## Observaciones generales

lib/apiNoAuth se usa para las rutas que aún no tienen token. Es decir, antes del Login
lib/api se utiliza para todas las demas rutas que necesitan pasar el token acceso en el Header de la consulta

los modales se abren porque estan escuchando por parametros en la url. por eso cuando el user hace click en algun boton que dispare un modal, se agrega a la url cierto parámetro y eso abre el modal

## ✅ Configuración de reCAPTCHA

1. Crear una aplicación en: [https://www.google.com/recaptcha/admin/create]
2. Elegir la opción **"Desafío (v2)" -> Casilla de verificación "No soy un robot"**
3. Agregar los dominios permitidos:
   - `localhost`
   - `mitramed.vercel.app`
4. Guardar y copiar la **clave del sitio (site key)**
5. Crear una **variable de entorno** con esa clave:
   - En desarrollo: agregarla en el archivo `.env.local`
   - En producción (Vercel): desde el panel → **Settings -> Environment Variables**
6. Instalar e importar el componente [`ReCAPTCHA`] (https://www.npmjs.com/package/react-google-recaptcha) desde `react-google-recaptcha`
7. Pasar la `sitekey` como prop al componente:

   `tsx `
   <ReCAPTCHA sitekey={import.meta.env.VITE_API_KEY_SITE_CAPTCHA} />

## PUNTOS CLAVES:

Se puede usar una referencia (ref) al componente para obtener el valor actual del captcha:

const captcha = useRef<ReCAPTCHA | null>(null);

// Acceder al valor del token:
const token = captcha.current?.getValue();
