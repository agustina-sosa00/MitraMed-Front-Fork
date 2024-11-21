import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function CarrouselPortal() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    afterChange: (current: number) => {
      setCurrentSlide(current); // Actualiza el índice del slide cuando cambia
    },
  };

  return (
    <div>
      <div className="relative h-60 lg:h-[500px] w-full overflow-hidden mb-11">
        <Slider {...sliderSettings}>
          <div className="relative">
            <img
              src="/med/doc-1.jpg"
              alt="Doctor"
              className={`w-full h-full object-bottom ${imageLoaded ? '' : 'opacity-0'}`}
              onLoad={handleImageLoad}
            />
            <div
              className={`absolute inset-10 flex justify-start items-end text-center mb-20 transition-opacity duration-1000 ${
                imageLoaded && currentSlide === 0 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="flex flex-col items-start bg-black bg-opacity-60 p-6 rounded-lg max-w-xl">
                <h2 className="text-3xl font-semibold text-white mb-3">
                  Bienvenido a nuestro Centro Médico
                </h2>
                <p className="text-base text-white text-start max-w-xl mb-6">
                  Agenda tus consultas médicas de manera fácil y rápida.
                  <br />
                  ¡Comienza a cuidar de ti y tu familia hoy mismo!
                </p>
                <div className="bg-blue-600 p-4 rounded-md text-white text-center">
                  <p>¡Crea tu cuenta y conoce todos nuestros servicios!</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="/med/doc-7.jpg"
              alt="Doctor"
              className={`w-full h-full object-bottom ${imageLoaded ? '' : 'opacity-0'}`}
              onLoad={handleImageLoad}
            />
            <div
              className={`absolute inset-10 flex justify-start items-end text-center mb-20 transition-opacity duration-1000 ${
                imageLoaded && currentSlide === 1 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="flex flex-col items-start bg-black bg-opacity-60 p-6 rounded-lg max-w-xl">
                <h2 className="text-3xl font-semibold text-white mb-3">Atención personalizada</h2>
                <p className="text-base text-white text-start max-w-xl mb-6">
                  Ofrecemos un servicio cercano, comprensivo y adaptado a tus necesidades.
                </p>
                <div className="bg-blue-600 p-4 rounded-md text-white text-center">
                  <p>¡Comienza tu camino hacia la salud hoy!</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="/med/doc-8.jpg"
              alt="Doctor"
              className={`w-full h-full object-bottom ${imageLoaded ? '' : 'opacity-0'}`}
              onLoad={handleImageLoad}
            />
            <div
              className={`absolute inset-10 flex justify-start items-end text-center mb-10 transition-opacity duration-1000 ${
                imageLoaded && currentSlide === 2 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="flex flex-col items-start bg-black bg-opacity-60 p-6 rounded-lg max-w-xl">
                <h2 className="text-3xl font-semibold text-white mb-3">
                  Cuidado médico a tu alcance
                </h2>
                <p className="text-base text-white text-start max-w-xl mb-6">
                  Accede a consultas médicas de calidad para ti y tu familia
                  <br />
                  con tan solo iniciar sesión.
                </p>
                <div className="bg-blue-600 p-4 rounded-md text-white text-center">
                  <p>¡Haz tu primera consulta ahora mismo!</p>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
}
