import { useEffect, useState } from "react";

type Props = {
  setOpenSubMenu: (v: boolean | ((prev: boolean) => boolean)) => void;
  children: React.ReactNode;
  menuPosition: string | number;
  onPanelEnter?: () => void;
  onPanelLeave?: () => void;
};

export default function SubMenuSidebar({
  setOpenSubMenu,
  children,
  menuPosition,
  onPanelEnter,
  onPanelLeave,
}: Props) {
  const [show, setShow] = useState(false);
  useEffect(() => setShow(true), []);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 left-56 bg-black/30 transition-opacity duration-200 ${
          show ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setOpenSubMenu(false)}
      />

      <div
        className={`fixed z-50 left-56 ${menuPosition} transition-opacity duration-200 ${
          show ? "opacity-100" : "opacity-0"
        }`}
        onMouseEnter={onPanelEnter}
        onMouseLeave={onPanelLeave}
      >
        {children}
      </div>
    </>
  );
}
