export default function TextAlert() {
  const isDevelopment = import.meta.env.VITE_ENV === "development";

  return (
    <div className="absolute left-1/3 transform -translate-x-1/2 z-50">
      {isDevelopment && (
        <span className="px-2 py-1 font-bold text-white tracking-wider uppercase bg-red-700 rounded-md">
          desarrollo
        </span>
      )}
    </div>
  );
}
