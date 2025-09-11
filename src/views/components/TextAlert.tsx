export default function TextAlert() {
  const isDevelopment = import.meta.env.VITE_ENV === "development";

  return (
    <div className="py-5">
      {isDevelopment && (
        <span className="px-2 py-1 font-bold tracking-widest text-white text-blue-500 uppercase bg-gray-900 rounded-md">
          desarrollo
        </span>
      )}
    </div>
  );
}
