import { useState } from "react";

export const Tooth = ({ toothNumber, isActive, setState }) => {
  const [positionMenu, setPositionMenu] = useState({
    x: 0,
    y: 0,
  });

  const handleClick = (tooth: number) => {
    console.log(tooth);
  };
  console.log(toothNumber);
  const handleContextMenu = (e) => {
    e.preventDefault();
    setState(toothNumber); // sólo este diente activa el menú
    setPositionMenu({ x: e.pageX, y: e.pageY });
  };

  return (
    <div
      onClick={() => handleClick(toothNumber)}
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
          className={`absolute bg-[#f1f1f1] shadow shadow-gray-300 w-28`}
          style={{ top: positionMenu.y, left: positionMenu.x }}
        >
          <div className="relative group">
            <div className="w-full px-5 py-2 cursor-pointer text-blue bg-ligthGray hover:text-white hover:bg-green">
              Realizado
            </div>
            <div className="absolute top-0 hidden bg-white group-hover:block left-full">
              <div className="w-full px-6 py-1 border-b border-[#f1f1f1]">
                Extracción
              </div>
              <div className="w-full px-6 py-1 border-b border-[#f1f1f1]">
                Corona
              </div>
              <div className="w-full px-6 py-1 border-b border-[#f1f1f1]">
                Restauraciones
              </div>
              <div className="w-full px-6 py-1 border-b border-[#f1f1f1]">
                Sellado
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="w-full px-5 py-2 cursor-pointer text-blue bg-ligthGray hover:text-white hover:bg-green">
              A realizar
            </div>
            <div className="absolute top-0 hidden bg-white group-hover:block left-full">
              <div className="w-full px-6 py-1 border-b border-[#f1f1f1]">
                Extracción
              </div>
              <div className="w-full px-6 py-1 border-b border-[#f1f1f1]">
                Corona
              </div>
              <div className="w-full px-6 py-1 border-b border-[#f1f1f1]">
                Restauraciones
              </div>
              <div className="w-full px-6 py-1 border-b border-[#f1f1f1]">
                Sellado
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
