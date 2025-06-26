import { useEffect, useState } from "react";
import { Tooth } from "./Tooth";

export const ToothContainer = ({
  toothNumber,
  isActive,
  setState,
  position,
  handle,
  registerHandlers,
}) => {
  const [trataiment, setTrataiment] = useState("");
  const [action, setAction] = useState("");
  const [face, setFace] = useState("");
  console.log("selectedTreatments------>>>>>", trataiment);
  console.log("selectedAction------>>>>>>>", action);
  console.log("selectedFace----------->>>>>>>>>>", face);
  useEffect(() => {
    if (registerHandlers) {
      registerHandlers({
        setAction,
        setFace,
        setTreatment: setTrataiment,
      });
    }
  }, [registerHandlers]);

  return (
    <Tooth
      toothNumber={toothNumber}
      isActive={isActive}
      setState={setState}
      setTrataimentState={setTrataiment}
      trataimentState={trataiment}
      setActionState={setAction}
      actionState={action}
      setFaceState={setFace}
      faceState={face}
      position={position}
      handle={handle}
    />
  );
};
