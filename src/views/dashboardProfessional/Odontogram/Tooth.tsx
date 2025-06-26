import { useEffect, useState } from "react";
import { MenuTooth } from "./MenuTooth";
import { FaRegCircle } from "react-icons/fa";
import { IoMdArrowDropup } from "react-icons/io";
import { GrClose } from "react-icons/gr";

interface ToothProps {
  toothNumber: number;
  isActive: boolean;
  setState: (num: number) => void;
  position?: string;
  handle: () => void;
  toothSelectState: number;
  setToothSelectState: (arg: number) => void;
  data: {
    action: string;
    tratamiento: string;
    cara: string;
  };
  updateTooth: (newData: {
    action?: string;
    tratamiento?: string;
    cara?: string;
  }) => void;
}

export const Tooth: React.FC<ToothProps> = ({
  toothNumber,
  isActive,
  setState,
  position,
  handle,
  setToothSelectState,
  data,
  updateTooth,
}) => {
  const [width, setWidth] = useState<boolean>(false);
  const [positionMenu, setPositionMenu] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e) => {
    e.preventDefault();
    setState(toothNumber);
    setToothSelectState(toothNumber);
    setPositionMenu({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const widthTotal = window.innerWidth;
    const heightTotal = window.innerHeight;

    const menuWidth = 210;
    const menuHeight = 130;

    let newX = positionMenu.x;
    let newY = positionMenu.y;

    if (newX + menuWidth > widthTotal) {
      newX = widthTotal - menuWidth;
    }

    if (newY + menuHeight > heightTotal) {
      newY = heightTotal - menuHeight;
    }

    setPositionMenu({ x: newX, y: newY });
    setWidth(widthTotal - newX > 385);
  }, [positionMenu.x, positionMenu.y]);

  return (
    <div onContextMenu={handleContextMenu}>
      <div className="relative">
        {data.tratamiento && data.action && (
          <div className="absolute w-8 h-8 lg:h-14 lg:w-14 xl:w-16 xl:h-16">
            {data.tratamiento === "Corona" && (
              <FaRegCircle
                className={`absolute z-40 w-14 h-14 ${
                  data.action === "realizado" ? "text-red-500" : "text-sky-700"
                }`}
              />
            )}
            {data.tratamiento === "Extracción" && (
              <GrClose
                className={`absolute z-40 w-14 h-14 ${
                  data.action === "realizado" ? "text-red-500" : "text-sky-700"
                }`}
              />
            )}
            <div className="w-full h-1/4 "></div>
            <div className="flex w-full">
              <div className="w-1/4 h-7 "></div>
              <div className="flex items-center justify-center w-1/2 h-7">
                {data.tratamiento === "Sellado" && (
                  <IoMdArrowDropup
                    className={`text-2xl ${
                      data.action === "realizado"
                        ? "text-red-500"
                        : "text-sky-700"
                    }`}
                  />
                )}
              </div>
              <div className="w-1/4 h-7 "></div>
            </div>
            <div className="w-full h-1/4 "></div>
          </div>
        )}

        <svg
          viewBox="0 0 28 33"
          className="w-8 h-8 lg:h-14 lg:w-14 xl:w-16 xl:h-16"
        >
          <polygon
            stroke="#a3a3a3" //border
            fill={
              position?.includes("izquierda") && data.cara === "vesibular"
                ? data.action === "realizado"
                  ? "#ef4444"
                  : "#0369a1"
                : position?.includes("derecha") && data.cara === "vesibular"
                ? data.action === "realizado"
                  ? "#ef4444"
                  : "#0369a1"
                : "#fff"
            } //backgrounds
            className="cursor-pointer "
            points="1.0136711597442627,1.35626420378685 7.767158031463623,9.155386298894882 21.696229934692383,9.155386298894882 28.449718475341797,1.35626420378685 "
          />
          <polygon
            stroke="#a3a3a3" //border
            fill={
              position?.includes("izquierda") && data.cara === "mesial"
                ? data.action === "realizado"
                  ? "#ef4444"
                  : "#0369a1"
                : position?.includes("derecha") && data.cara === "distal"
                ? data.action === "realizado"
                  ? "#ef4444"
                  : "#0369a1"
                : "#fff"
            } //backgrounds
            points="21.445681169629097,9.104242324829102 21.445681169629097,25.189937591552734 28.19916971027851,32.98905944824219 28.41021592915058,0.8176754713058472"
            className="cursor-pointer"
          />
          <polygon
            stroke="#a3a3a3" //border
            fill={
              position?.includes("izquierda") && data.cara === "palatino"
                ? data.action === "realizado"
                  ? "#ef4444"
                  : "#0369a1"
                : position?.includes("derecha") && data.cara === "palatino"
                ? data.action === "realizado"
                  ? "#ef4444"
                  : "#0369a1"
                : "#fff"
            } //background
            points="21.445680618286133,25.29296439886093 28.199169158935547,33.092128217220306 0.7631232142448425,33.092128217220306 7.516610622406006,25.29296439886093"
            className="cursor-pointer"
          />
          <polygon
            stroke="#a3a3a3" //border
            fill={
              position?.includes("izquierda") && data.cara === "distal"
                ? data.action === "realizado"
                  ? "#ef4444"
                  : "#0369a1"
                : position?.includes("derecha") && data.cara === "mesial"
                ? data.action === "realizado"
                  ? "#ef4444"
                  : "#0369a1"
                : "#fff"
            } //background
            points="0.7631232291460037,1.3051201105117798 0.7631232291460037,33.232784271240234 7.516610696911812,25.189937591552734 7.516610696911812,25.189937591552734 7.516610696911812,9.104242324829102"
            className="cursor-pointer"
          />
          <polygon
            stroke="#a3a3a3" //border
            fill={
              position?.includes("izquierda") && data.cara === "oclusal"
                ? data.action === "realizado"
                  ? "#ef4444"
                  : "#0369a1"
                : position?.includes("derecha") && data.cara === "oclusal"
                ? data.action === "realizado"
                  ? "#ef4444"
                  : "#0369a1"
                : "#fff"
            } // background
            points="7.516610696911812,9.104242324829102 21.445681169629097,9.104242324829102 21.445681169629097,25.189937591552734 7.516610696911812,25.189937591552734"
            className="cursor-pointer"
          />
        </svg>
      </div>

      {isActive && (
        <MenuTooth
          width={width}
          positionMenu={positionMenu}
          updateTooth={updateTooth}
          handle={handle}
        />
      )}
    </div>
  );
};
