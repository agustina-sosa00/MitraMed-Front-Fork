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
  }[];
  updateTooth: (newData: {
    action?: string;
    tratamiento?: string;
    cara?: string;
  }) => void;
  clearTooth: () => void;
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
  clearTooth,
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

  const getFillColor = (cara: string) => {
    const target = data.find(
      (trat) => trat.tratamiento === "restauraciones" && trat.cara === cara
    );

    if (!target) return "#fff"; // sin tratamiento, fondo blanco

    return target.action === "realizado" ? "#ef4444" : "#0369a1";
  };

  return (
    <div onContextMenu={handleContextMenu}>
      <div className="relative">
        {data.length > 0 && (
          <div className="absolute w-8 h-8 lg:h-14 lg:w-14 xl:w-16 xl:h-16">
            {data.map((trat, index) => (
              <div key={index}>
                {trat.tratamiento === "Corona" && (
                  <FaRegCircle
                    className={`absolute z-40 w-14 h-14 xl:w-16 xl:h-16 ${
                      trat.action === "realizado"
                        ? "text-red-500"
                        : "text-sky-700"
                    }`}
                  />
                )}
                {trat.tratamiento === "Extracción" && (
                  <GrClose
                    className={`absolute z-40 w-14 h-14 xl:w-16 xl:h-16 ${
                      trat.action === "realizado"
                        ? "text-red-500"
                        : "text-sky-700"
                    }`}
                  />
                )}
                {trat.tratamiento === "sellado" && (
                  <>
                    {trat.cara === "oclusal" && (
                      <IoMdArrowDropup
                        className={`absolute top-[1.1rem] left-[1.1rem] xl:top-5 xl:left-5 z-40 text-2xl  ${
                          trat.action === "realizado"
                            ? "text-red-500"
                            : "text-sky-700"
                        }`}
                      />
                    )}
                    {trat.cara === "vesibular" && (
                      <IoMdArrowDropup
                        className={`absolute -top-1 left-[1.1rem] xl:-top-1 xl:left-5 z-40 text-2xl ${
                          trat.action === "realizado"
                            ? "text-red-500"
                            : "text-sky-700"
                        }`}
                      />
                    )}
                    {trat.cara === "palatino" && (
                      <IoMdArrowDropup
                        className={`absolute top-[2.3rem] left-[1.1rem] xl:top-11 xl:left-5 z-40 text-2xl ${
                          trat.action === "realizado"
                            ? "text-red-500"
                            : "text-sky-700"
                        }`}
                      />
                    )}
                    {trat.cara === "distal" &&
                      position?.includes("izquierda") && (
                        <IoMdArrowDropup
                          className={`absolute top-[1.1rem] left-0 xl:top-5 xl:left-[0.1rem] z-40 text-xl ${
                            trat.action === "realizado"
                              ? "text-red-500"
                              : "text-sky-700"
                          }`}
                        />
                      )}
                    {trat.cara === "distal" &&
                      position?.includes("derecha") && (
                        <IoMdArrowDropup
                          className={`absolute top-[1.1rem] left-9 xl:top-5 xl:left-11 z-40 text-xl  ${
                            trat.action === "realizado"
                              ? "text-red-500"
                              : "text-sky-700"
                          }`}
                        />
                      )}
                    {trat.cara === "mesial" &&
                      position?.includes("izquierda") && (
                        <IoMdArrowDropup
                          className={`absolute top-[1.1rem] left-9 xl:top-5 xl:left-11 z-40 text-xl ${
                            trat.action === "realizado"
                              ? "text-red-500"
                              : "text-sky-700"
                          }`}
                        />
                      )}
                    {trat.cara === "mesial" &&
                      position?.includes("derecha") && (
                        <IoMdArrowDropup
                          className={`absolute top-[1.1rem] left-0 xl:top-5 xl:left-[0.1rem] z-40 text-xl ${
                            trat.action === "realizado"
                              ? "text-red-500"
                              : "text-sky-700"
                          }`}
                        />
                      )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        <svg
          viewBox="0 0 28 33"
          className="w-8 h-8 lg:h-14 lg:w-14 xl:w-16 xl:h-16"
        >
          <polygon
            stroke="#a3a3a3" //border
            fill={getFillColor("vesibular")} //backgrounds
            className="cursor-pointer "
            points="1.0136711597442627,1.35626420378685 7.767158031463623,9.155386298894882 21.696229934692383,9.155386298894882 28.449718475341797,1.35626420378685 "
          />
          <polygon
            stroke="#a3a3a3" //border
            fill={
              position?.includes("izquierda")
                ? getFillColor("mesial")
                : getFillColor("distal")
            } //backgrounds
            points="21.445681169629097,9.104242324829102 21.445681169629097,25.189937591552734 28.19916971027851,32.98905944824219 28.41021592915058,0.8176754713058472"
            className="cursor-pointer"
          />
          <polygon
            stroke="#a3a3a3" //border
            fill={getFillColor("palatino")} //background
            points="21.445680618286133,25.29296439886093 28.199169158935547,33.092128217220306 0.7631232142448425,33.092128217220306 7.516610622406006,25.29296439886093"
            className="cursor-pointer"
          />
          <polygon
            stroke="#a3a3a3" //border
            fill={
              position?.includes("izquierda")
                ? getFillColor("distal")
                : getFillColor("mesial")
            } //background
            points="0.7631232291460037,1.3051201105117798 0.7631232291460037,33.232784271240234 7.516610696911812,25.189937591552734 7.516610696911812,25.189937591552734 7.516610696911812,9.104242324829102"
            className="cursor-pointer"
          />
          <polygon
            stroke="#a3a3a3" //border
            fill={getFillColor("oclusal")} // background
            points="7.516610696911812,9.104242324829102 21.445681169629097,9.104242324829102 21.445681169629097,25.189937591552734 7.516610696911812,25.189937591552734"
            className="cursor-pointer"
          />
        </svg>
      </div>

      {isActive && (
        <MenuTooth
          tooth={toothNumber}
          width={width}
          positionMenu={positionMenu}
          updateTooth={updateTooth}
          handle={handle}
          clearTooth={clearTooth}
        />
      )}
    </div>
  );
};
