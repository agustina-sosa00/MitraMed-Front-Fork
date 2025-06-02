import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    autoplaySpeed: 10000,
    afterChange: (current: number) => {
      setCurrentSlide(current); // Actualiza el índice del slide cuando cambia
    },
  };

  return (
    <div className="relative h-full lg:h-[480px] xl:h-[600px] w-full overflow-hidden mb-5">
      <Slider {...sliderSettings}>
        <div className="relative">
          <img
            src="/med/doc-1.webp"
            alt="Doctor"
            className={`w-full h-full object-cover ${
              imageLoaded ? "" : "opacity-0"
            }`}
            onLoad={handleImageLoad}
            style={{ pointerEvents: "none" }}
          />
          <div
            className={`absolute top-1/2 mx:top-1/3 text-center mb-5 ml-5 mx:mt-5 transition-opacity duration-1000 ${
              imageLoaded && currentSlide === 0 ? "opacity-100" : "opacity-0"
            } sm:block hidden`}
          >
            <div className="flex flex-col items-start max-w-sm px-2 py-4 mt-6 ml-3 bg-black rounded-lg bg-opacity-60 mx:max-w-md xl:max-w-xl mx:px-6 mx:py-6 xl:p-10">
              <h2 className="mb-3 text-xl font-semibold text-white mx:text-2xl xl:text-3xl">
                Simplifica tu acceso a la {""}{" "}
                <span className="text-blue-400">salud</span>!
              </h2>
              <p className="text-xs text-white mx:text-base xl:text-lg text-start mx:mb-4">
                Agenda tus consultas médicas en pocos pasos y sin
                complicaciones.
              </p>
              <div className="hidden p-2 text-xs text-white bg-blue-600 rounded-lg mx:block mx:text-base xl:text-lg xl:p-3 text-start">
                <p>
                  ¡Crea tu {""}
                  <span className="underline"> cuenta</span> y conoce todos
                  nuestros servicios!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Agrega el mismo comportamiento para las otras imágenes */}
        <div className="relative">
          <img
            src="/med/doc-7.webp"
            alt="Doctor2"
            className={`w-full h-full object-cover ${
              imageLoaded ? "" : "opacity-0"
            }`}
            onLoad={handleImageLoad}
            style={{ pointerEvents: "none" }}
          />

          <div
            className={`absolute top-1/2 mx:top-1/3 text-center mb-5 ml-5 mx:mt-5 transition-opacity duration-1000 ${
              imageLoaded && currentSlide === 1 ? "opacity-100" : "opacity-0"
            } sm:block hidden`}
          >
            <div className="flex flex-col items-start max-w-sm px-2 py-4 mt-6 ml-3 bg-black rounded-lg bg-opacity-60 mx:max-w-md xl:max-w-lg mx:px-6 mx:py-6 xl:p-10">
              <h2 className="mb-3 text-xl font-semibold text-white mx:text-2xl xl:text-3xl">
                Atención {""}{" "}
                <span className="text-blue-400"> personalizada</span>
              </h2>
              <p className="text-xs text-white mx:text-base xl:text-lg text-start mx:mb-4">
                Ofrecemos un {""}
                <span className="underline"> servicio {""}</span> cercano y
                adaptado a tus necesidades.
              </p>
              <div className="hidden p-2 text-xs text-white bg-blue-600 rounded-lg mx:block mx:text-base xl:text-lg text-start">
                <p>
                  ¡Comienza tu camino hacia la {""}
                  <span className="underline"> salud {""}</span> hoy!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <img
            src="/med/doc-2.jpg"
            alt="Doctor"
            className={`w-full h-full object-cover ${
              imageLoaded ? "" : "opacity-0"
            }`}
            onLoad={handleImageLoad}
            style={{ pointerEvents: "none" }}
          />
          <div
            className={`absolute top-1/2 mx:top-1/3 text-center mb-5 ml-5 mx:mt-5 transition-opacity duration-1000 ${
              imageLoaded && currentSlide === 2 ? "opacity-100" : "opacity-0"
            } sm:block hidden`}
          >
            <div className="flex flex-col items-start max-w-sm px-2 py-4 mt-6 ml-3 bg-black rounded-lg bg-opacity-60 mx:max-w-md xl:max-w-xl mx:px-6 mx:py-6 xl:p-10">
              <h2 className="mb-3 text-xl font-semibold text-white mx:text-2xl xl:text-3xl">
                Cuidado médico a tu {""}{" "}
                <span className="text-blue-400"> alcance</span>
              </h2>

              <p className="text-xs text-white mx:text-base xl:text-lg text-start mx:mb-4">
                Accede a consultas médicas con solo {""}
                <span className="underline"> iniciar sesión{""}</span>.
              </p>
              <div className="hidden p-2 text-xs text-white bg-blue-600 rounded-lg mx:block mx:text-base xl:text-lg text-start">
                <p>
                  ¡Haz un seguimiento de tus {""}
                  <span className="underline"> turnos</span>!
                </p>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}
