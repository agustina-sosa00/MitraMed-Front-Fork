import React from "react";
import Slider from "react-slick";

export const ImgAbout: React.FC = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
  };
  return (
    <>
      <div className="relative block w-full h-full overflow-hidden lg:hidden">
        <Slider {...sliderSettings}>
          <div className="flex relative justify-center w-full items-center h-[300px]">
            <img
              src="https://i.imgur.com/yjcxNLD.png"
              alt="MitraMed-About"
              className="object-cover w-full h-full rounded"
              style={{ pointerEvents: "none" }}
            />
          </div>
          <div className="flex relative justify-center w-full items-center h-[300px]">
            <img
              src="https://i.imgur.com/NA1X3Dp.png"
              alt="MitraMed-About2"
              className="object-cover w-full h-full rounded"
              style={{ pointerEvents: "none" }}
            />
          </div>
        </Slider>
      </div>
      <div className="relative items-center justify-end hidden w-full lg:flex lg:h-full lg:w-1/2">
        <img
          src="https://i.imgur.com/yjcxNLD.png"
          alt="MitraMed-About"
          className="absolute z-10 w-[350px] rounded  top-[25%] left-[10%]  "
        />

        <img
          src="https://i.imgur.com/NA1X3Dp.png"
          alt="MitraMed-About2"
          className="absolute z-20 w-[300px] rounded bottom-[20%] right-[10%]  "
        />
      </div>
    </>
  );
};
