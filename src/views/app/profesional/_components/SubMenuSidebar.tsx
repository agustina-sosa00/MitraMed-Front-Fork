export default function SubMenuSidebar({ setOpenSubMenu, children, menuPosition }) {
  return (
    <>
      {/* Overlay cubre todo desde el borde derecho del sidebar */}
      <div
        className="fixed inset-0 z-40 left-56 bg-black/30"
        onClick={() => setOpenSubMenu(false)}
      />
      <div className={`fixed  z-50 left-56 ${menuPosition}`}>{children}</div>
    </>
  );
}
