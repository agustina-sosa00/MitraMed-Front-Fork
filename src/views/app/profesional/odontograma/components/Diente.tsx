import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaRegCircle } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { IoMdArrowDropup } from "react-icons/io";
import { MenuDiente } from "./MenuDiente";
import { ToothChangeTuple, ToothItemIds } from "../types/odontogramaTypes";
import {
  CARA,
  fillHex,
  isLeftQuadrantByTooth,
  tipoDe,
  toneClass,
  TRAT,
} from "../utils/odontogram.lookups";

interface DienteV2Props {
  toothNumber: number;
  isActive: boolean;
  setContextMenu: (num: number | null) => void;
  handle: () => void;
  toothSelectState: number;
  setToothSelectState: (arg: number) => void;
  dataIds: ToothItemIds[];
  updateToothIds: (item: ToothItemIds) => void;
  clearTooth: () => void;
  stateTeethChanged?: Dispatch<SetStateAction<ToothChangeTuple[]>>;
  styleDisabled?: boolean;
}

export default function Diente({
  toothNumber,
  isActive,
  setContextMenu,
  handle,
  setToothSelectState,
  dataIds,
  updateToothIds,
  clearTooth,
  stateTeethChanged,
  styleDisabled,
}: DienteV2Props) {
  //region states y variables
  const [width, setWidth] = useState(false);
  const [positionMenu, setPositionMenu] = useState({ x: 0, y: 0 });
  const isLeft = isLeftQuadrantByTooth(toothNumber);

  //region useEffects
  useEffect(() => {
    const menuWidth = 210,
      menuHeight = 130;
    const widthTotal = window.innerWidth,
      heightTotal = window.innerHeight;
    let { x, y } = positionMenu;
    if (x + menuWidth > widthTotal) x = widthTotal - menuWidth;
    if (y + menuHeight > heightTotal) y = heightTotal - menuHeight;
    setPositionMenu({ x, y });
    setWidth(widthTotal - x > 385);
  }, [positionMenu.x, positionMenu.y]);

  //region functions
  function handleContextMenu(e: React.MouseEvent) {
    e.preventDefault();
    setContextMenu(toothNumber);
    setToothSelectState(toothNumber);
    setPositionMenu({ x: e.clientX, y: e.clientY });
  }

  function fillForFace(caraId: number) {
    const item = dataIds.find(
      ([idcara, idtrat, hab]) =>
        hab === 1 && idcara === caraId && tipoDe(idtrat) === TRAT.RESTAURACIONES,
    );
    if (item) {
      return fillHex(item[1]);
    }
    return styleDisabled ? "#fff" : "#ececec";
  }

  const lateralFill = (side: "left" | "right") =>
    isLeft
      ? fillForFace(side === "left" ? CARA.DISTAL : CARA.MESIAL)
      : fillForFace(side === "left" ? CARA.MESIAL : CARA.DISTAL);

  //region return
  return (
    <div onContextMenu={handleContextMenu}>
      <div className="!relative ">
        {
          //region iconos de tratamientos
        }
        {dataIds.length > 0 && (
          <div className="absolute w-8 h-8 lg:h-14 lg:w-14 xl:w-16 xl:h-16">
            {dataIds.map(([idcara, idtrat, hab], idx) => {
              if (hab !== 1) return null;
              const tipo = tipoDe(idtrat);
              const tone = toneClass(idtrat);
              //region box trat. con iconos
              return (
                <div key={idx}>
                  {tipo === TRAT.CORONA && (
                    <FaRegCircle className={`absolute z-40 w-14 h-14 xl:w-16 xl:h-16 ${tone}`} />
                  )}
                  {tipo === TRAT.EXTRACCION && (
                    <GrClose className={`absolute z-40 w-14 h-14 xl:w-16 xl:h-16 ${tone}`} />
                  )}
                  {tipo === TRAT.SELLADO && (
                    <>
                      {idcara === CARA.OCLUSAL && (
                        <IoMdArrowDropup
                          className={`absolute top-[1.1rem] left-[1.1rem] xl:top-5 xl:left-5 z-40 text-2xl ${tone}`}
                        />
                      )}
                      {idcara === CARA.VESIBULAR && (
                        <IoMdArrowDropup
                          className={`absolute -top-1 left-[1.1rem] xl:-top-1 xl:left-5 z-40 text-2xl ${tone}`}
                        />
                      )}
                      {idcara === CARA.PALATINO && (
                        <IoMdArrowDropup
                          className={`absolute top-[2.3rem] left-[1.1rem] xl:top-11 xl:left-5 z-40 text-2xl ${tone}`}
                        />
                      )}
                      {idcara === CARA.DISTAL && isLeft && (
                        <IoMdArrowDropup
                          className={`absolute top-[1.1rem] left-0 xl:top-5 xl:left-[0.1rem] z-40 text-xl ${tone}`}
                        />
                      )}
                      {idcara === CARA.DISTAL && !isLeft && (
                        <IoMdArrowDropup
                          className={`absolute top-[1.1rem] left-9 xl:top-5 xl:left-11 z-40 text-xl ${tone}`}
                        />
                      )}
                      {idcara === CARA.MESIAL && isLeft && (
                        <IoMdArrowDropup
                          className={`absolute top-[1.1rem] left-9 xl:top-5 xl:left-11 z-40 text-xl ${tone}`}
                        />
                      )}
                      {idcara === CARA.MESIAL && !isLeft && (
                        <IoMdArrowDropup
                          className={`absolute top-[1.1rem] left-0 xl:top-5 xl:left-[0.1rem] z-40 text-xl ${tone}`}
                        />
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {
          //region svg
        }
        <svg
          viewBox="0 0 28 33"
          className="w-10 h-10 lg2:w-12 lg2:h-12 lg3:w-14 lg3:h-14 xl:w-16 xl:h-16"
        >
          {/* VESIBULAR */}
          <polygon
            stroke={`${!styleDisabled ? "#d8d5d5" : "#a3a3a3"}`}
            fill={fillForFace(CARA.VESIBULAR)}
            className={`${styleDisabled && "cursor-pointer"} `}
            points="1.0136711597442627,1.35626420378685 7.767158031463623,9.155386298894882 21.696229934692383,9.155386298894882 28.449718475341797,1.35626420378685 "
          />
          {/* LATERAL DERECHO */}
          <polygon
            stroke={`${!styleDisabled ? "#d8d5d5" : "#a3a3a3"}`}
            fill={lateralFill("right")}
            className={`${styleDisabled && "cursor-pointer"} `}
            points="21.445681169629097,9.104242324829102 21.445681169629097,25.189937591552734 28.19916971027851,32.98905944824219 28.41021592915058,0.8176754713058472"
          />
          {/* PALATINO */}
          <polygon
            stroke={`${!styleDisabled ? "#d8d5d5" : "#a3a3a3"}`}
            fill={fillForFace(CARA.PALATINO)}
            className={`${styleDisabled && "cursor-pointer"} `}
            points="21.445680618286133,25.29296439886093 28.199169158935547,33.092128217220306 0.7631232142448425,33.092128217220306 7.516610622406006,25.29296439886093"
          />
          {/* LATERAL IZQUIERDO */}
          <polygon
            stroke={`${!styleDisabled ? "#d8d5d5" : "#a3a3a3"}`}
            fill={lateralFill("left")}
            className={`${styleDisabled && "cursor-pointer"} `}
            points="0.7631232291460037,1.3051201105117798 0.7631232291460037,33.232784271240234 7.516610696911812,25.189937591552734 7.516610696911812,9.104242324829102"
          />
          {/* OCLUSAL */}
          <polygon
            stroke={`${!styleDisabled ? "#d8d5d5" : "#a3a3a3"}`}
            fill={fillForFace(CARA.OCLUSAL)}
            className={`${styleDisabled && "cursor-pointer"} `}
            points="7.516610696911812,9.104242324829102 21.445681169629097,9.104242324829102 21.445681169629097,25.189937591552734 7.516610696911812,25.189937591552734"
          />
        </svg>

        {
          //region menu
        }
        {isActive && (
          <MenuDiente
            tooth={toothNumber}
            width={width}
            positionMenu={positionMenu}
            updateToothIds={updateToothIds}
            handle={handle}
            clearTooth={clearTooth}
            onClose={() => setContextMenu(null)}
            stateTeethChanged={stateTeethChanged}
            toothNumber={toothNumber}
            dataIds={dataIds}
          />
        )}
      </div>
    </div>
  );
}
