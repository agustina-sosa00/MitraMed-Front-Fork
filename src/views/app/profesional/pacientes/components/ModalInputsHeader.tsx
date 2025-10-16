import { ActionButton, FlexibleInputField } from "@/frontend-resourses/components";
import { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useProfesionalStore } from "../../_store/ProfesionalStore";

export default function ModalInputsHeader({ handleCloseModalInput }) {
  const loader = useProfesionalStore((s) => s.loader);
  const setLoader = useProfesionalStore((s) => s.setLoader);
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleEscInInput(
    e: React.KeyboardEvent<HTMLInputElement>,
    onCloseModal: () => void,
    setValue: (v: string) => void,
  ) {
    if (e.key !== "Escape") return;
    e.preventDefault();
    e.stopPropagation();

    const hasText = (e.currentTarget.value ?? "").trim().length > 0;
    if (hasText)
      setValue(""); // limpia input
    else onCloseModal(); // cierra modal
  }
  return (
    <div className="w-full h-20 flex items-center gap-2">
      <FlexibleInputField
        label="Descripción"
        inputWidth="w-80"
        labelWidth="80px"
        inputClassName="rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen"
        inputRef={inputRef}
        value={input}
        onChange={setInput}
        onKeyDown={(e) => handleEscInInput(e, handleCloseModalInput, setInput)}
      />
      <ActionButton
        icon={<FaCheck />}
        addClassName="h-8"
        color="green-mtm"
        loader={loader}
        onClick={() => {
          setLoader(true);
          setTimeout(() => {
            setLoader(false);
          }, 1000);
        }}
      />
      <ActionButton icon={<IoClose />} addClassName="h-8" color="red" />
    </div>
  );
}
