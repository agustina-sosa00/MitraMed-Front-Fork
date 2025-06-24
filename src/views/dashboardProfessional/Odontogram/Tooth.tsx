import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export const Tooth = ({ toothNumber, isActive, setState }) => {
  const [width, setWidth] = useState<boolean>(false);
  console.log(width);
  const [positionMenu, setPositionMenu] = useState({
    x: 0,
    y: 0,
  });

  const handleContextMenu = (e) => {
    e.preventDefault();
    setState(toothNumber);
    const menuWidth = 210;
    const menuHeight = 64;
    let posX = e.clientX;
    let posY = e.clientY;

    if (posX + menuWidth > window.innerWidth) {
      posX = window.innerWidth - menuWidth;
    }

    if (posY + menuHeight > window.innerHeight) {
      posY = window.innerHeight - menuHeight;
    }

    setPositionMenu({ x: posX, y: posY });
  };

  useEffect(() => {
    const widthTotal = window.innerWidth;
    console.log("width total --->", widthTotal);
    console.log("width click --->", positionMenu.x);
    if (widthTotal - positionMenu.x > 385) {
      console.log("resta", widthTotal - positionMenu.x);
      setWidth(true);
    } else {
      console.log("resta", widthTotal - positionMenu.x);
      setWidth(false);
    }
  }, [positionMenu.x]);

  return (
    <div
      // onClick={() => handleClick(toothNumber)}
      onContextMenu={(e) => handleContextMenu(e)}
    >
      <svg
        viewBox="0 0 28 33"
        className="w-8 h-8 lg:h-14 lg:w-14 xl:w-16 xl:h-16 "
      >
        <polygon
          stroke="#a3a3a3" //border
          fill="#fff" //backgrounds
          // onClick={() => handleClick("arriba")}
          className="cursor-pointer "
          points="1.0136711597442627,1.35626420378685 7.767158031463623,9.155386298894882 21.696229934692383,9.155386298894882 28.449718475341797,1.35626420378685 "
        />

        <polygon
          stroke="#a3a3a3" //border
          fill="#fff" //background
          // onClick={() => handleClick("derecha")}
          className="cursor-pointer "
          points="21.445681169629097,9.104242324829102 21.445681169629097,25.189937591552734 28.19916971027851,32.98905944824219 28.41021592915058,0.8176754713058472 "
        />

        <polygon
          stroke="#a3a3a3" //border
          fill="#fff" //background
          // onClick={() => handleClick("abajo")}
          className="cursor-pointer "
          points="21.445680618286133,25.29296439886093 28.199169158935547,33.092128217220306 0.7631232142448425,33.092128217220306 7.516610622406006,25.29296439886093 "
        />

        <polygon
          stroke="#a3a3a3" //border
          fill="#fff" //background
          // onClick={() => handleClick("izquierda")}
          points="0.7631232291460037,1.3051201105117798 0.7631232291460037,33.232784271240234 7.516610696911812,25.189937591552734 7.516610696911812,25.189937591552734 7.516610696911812,9.104242324829102 "
          className="cursor-pointer "
        />
        <polygon
          stroke="#a3a3a3" //border
          fill="#fff" //background
          // onClick={() => handleClick("centro")}
          points="7.516610696911812,9.104242324829102 21.445681169629097,9.104242324829102 21.445681169629097,25.189937591552734 7.516610696911812,25.189937591552734 "
          className="cursor-pointer "
        />
      </svg>
      {isActive && (
        <div
          className={`absolute  bg-white shadow shadow-gray-300 h-16  w-52`}
          style={{ top: positionMenu.y, left: positionMenu.x }}
        >
          <div className="relative group">
            <div className="w-full flex justify-between items-center px-3 border-b border-[#dbdbdb] py-2 cursor-pointer text-blue bg-white text-sm group-hover:text-white group-hover:bg-green transition-all duration-300">
              Realizado <IoIosArrowDown className="-rotate-90" />
            </div>
            <div
              className={`absolute top-0 hidden bg-white group-hover:block ${
                width ? "left-full" : "right-full"
              } `}
            >
              <div className="w-44 px-3 py-2 text-sm border-b  cursor-pointer hover:text-white hover:bg-green transition-all duration-300 border-[#f1f1f1]">
                Extracción
              </div>
              <div className="w-full px-3 py-2 text-sm border-b cursor-pointer  hover:text-white hover:bg-green transition-all duration-300 border-[#f1f1f1]">
                Corona
              </div>
              <div className="w-full px-3 py-2 text-sm border-b cursor-pointer hover:text-white hover:bg-green transition-all duration-300 border-[#f1f1f1]">
                Restauraciones
              </div>
              <div className="w-full px-3 py-2 text-sm border-b cursor-pointer hover:text-white hover:bg-green transition-all duration-300 border-[#f1f1f1]">
                Sellado
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="flex items-center justify-between w-full px-3 py-2 text-sm transition-all duration-300 bg-white cursor-pointer text-blue group-hover:text-white group-hover:bg-green">
              A realizar <IoIosArrowDown className="-rotate-90" />
            </div>
            <div
              className={`absolute top-0 hidden bg-white group-hover:block ${
                width ? "left-full" : "right-full"
              } `}
            >
              <div className="w-full px-3 py-2 text-sm border-b cursor-pointer hover:text-white hover:bg-green transition-all duration-300 border-[#f1f1f1]">
                Extracción
              </div>
              <div className="w-full px-3 py-2 text-sm border-b cursor-pointer hover:text-white hover:bg-green transition-all duration-300 border-[#f1f1f1]">
                Corona
              </div>
              <div className="w-full px-3 py-2 text-sm border-b cursor-pointer hover:text-white hover:bg-green transition-all duration-300 border-[#f1f1f1]">
                Restauraciones
              </div>
              <div className="w-full px-3 py-2 text-sm border-b cursor-pointer hover:text-white hover:bg-green transition-all duration-300 border-[#f1f1f1]">
                Sellado
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
