import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { arrayInfoCarousel } from "../../mock/arrayInfoCarousel";

interface IProp {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  currentRol?: "paciente" | "profesional";
  handleOpenDrawer: (rol: "paciente" | "profesional") => void;
  handleCloseDrawer: () => void;
}
export default function CarrouselPortal({ handleOpenDrawer }: IProp) {
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
    <div className="relative h-full lg:h-[90vh] w-full overflow-hidden">
      <Slider {...sliderSettings}>
        {arrayInfoCarousel.map((item, index) => (
          <div className="relative" key={index}>
            <img
              src={item.img}
              alt="MitraMed"
              className={` w-full  object-cover   ${
                imageLoaded ? "" : "opacity-0"
              }`}
              onLoad={handleImageLoad}
              style={{ pointerEvents: "none" }}
            />

            <div
              className={`absolute top-0  bg-[linear-gradient(to_top_right,white_0%,rgba(255,255,255,0.8)_40%,rgba(255,255,255,0.5)_50%,rgba(255,255,255,0.2)_75%,transparent_100%)] w-full h-full `}
            >
              <div
                className={`absolute transition-opacity duration-1000 w-full md:w-1/2 lg:w-3/6 bottom-5 top-32 md:top-64 xl:top-80 2xl:top-96 left-5 md:left-12   ${
                  imageLoaded && currentSlide === index
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              >
                <h1 className="mb-3  w-[90%] font-semibold text-blue text-xl md:text-3xl lg:text-5xl">
                  {item.title}
                  <span className="text-greenHover">{item.span}</span>
                </h1>
                <p className="w-2/3 mb-2 text-sm text-blue md:text-base lg:text-lg xl:text-xl text-start md:mb-4">
                  {item.text}
                </p>
                <button
                  className="p-2 text-sm text-white rounded-lg cursor-pointer md:text-base bg-green hover:bg-greenHover mx:block lg:text-lg xl:text-xl xl:p-3 text-start"
                  onClick={() => handleOpenDrawer("paciente")}
                >
                  <p>{item.textoImportant}</p>
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
