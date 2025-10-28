import { ActionButton, FlexibleInputField } from "@/frontend-resourses/components";
import { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useProfesionalStore } from "../../_store/ProfesionalStore";

export default function ModalInputsHeader({ handleCloseModalInput }) {
  const loader = useProfesionalStore((s) => s.loader);
  const setLoader = useProfesionalStore((s) => s.setLoader);
  const loaderKey = useProfesionalStore((s) => s.loaderKey);
  const setLoaderKey = useProfesionalStore((s) => s.setLoaderKey);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(
    function handleEscape() {
      function onKeyDownEsc(e: KeyboardEvent) {
        if (e.key !== "Escape") return;

        e.preventDefault();
        e.stopPropagation();

        const hasInput = inputValue.trim().length > 0;
        if (hasInput) {
          setInputValue("");

          requestAnimationFrame(() => inputRef.current?.focus());
        } else {
          handleCloseModalInput();
        }
      }
      document.addEventListener("keydown", onKeyDownEsc);
      return () => {
        document.removeEventListener("keydown", onKeyDownEsc);
      };
    },
    [inputValue],
  );

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const btn = buttonRef.current;
      if (!btn) return;
      requestAnimationFrame(() => {
        if (!btn.disabled) btn.focus();
      });
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      const hasText = (e.currentTarget.value ?? "").trim().length > 0;
      if (hasText) setInputValue("");
      else handleCloseModalInput();
    }
  }

  function handleButtonKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (e.key === "Enter") {
      console.log("button enter");
      return;
    }
  }
  return (
    <div className="w-full h-20 flex items-center gap-2">
      <FlexibleInputField
        label="Descripción"
        inputWidth="w-80"
        labelWidth="80px"
        inputClassName="rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen"
        inputRef={inputRef}
        value={inputValue}
        onChange={setInputValue}
        onKeyDown={handleInputKeyDown}
      />
      <ActionButton
        icon={<FaCheck />}
        addClassName="h-8"
        color="green-mtm"
        loader={loaderKey === "modalInputsHeader-pacientes" && loader}
        colorLoader="#ffffff"
        onClick={() => {
          setLoader(true);
          setLoaderKey("modalInputsHeader-pacientes");
          setTimeout(() => {
            console.log("button");
            setLoader(false);
          }, 1000);
        }}
        ref={buttonRef}
        onKeyDown={handleButtonKeyDown}
      />
      <ActionButton
        icon={<IoClose />}
        addClassName="h-8"
        color="red"
        onClick={handleCloseModalInput}
      />
    </div>
  );
}
