export default function Card({ children }) {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-3 px-2 py-5 bg-white border shadow-xl shadow-black/30 border-lightGray rounded-2xl">
      {children}
    </div>
  );
}
