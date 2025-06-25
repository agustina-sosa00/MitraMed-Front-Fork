export const ToothTwo = () => {
  const handleClick = (tooth: string) => {
    console.log(tooth);
  };
  return (
    <div className="flex flex-col w-12 h-12 border border-gray-400">
      <div
        className="w-full border-b border-gray-400 h-1/4 "
        onClick={() => handleClick("arriba")}
      ></div>
      <div className="flex w-full h-1/2">
        <div
          className="w-1/4 h-full border-r border-gray-400"
          onClick={() => handleClick("izquierda")}
        ></div>
        <div
          className="w-1/2 h-full "
          onClick={() => handleClick("centro")}
        ></div>
        <div
          className="w-1/4 h-full border-l border-gray-400"
          onClick={() => handleClick("derecha")}
        ></div>
      </div>

      <div
        className="w-full border-t border-gray-400 h-1/4 "
        onClick={() => handleClick("abajo")}
      ></div>
    </div>
  );
};
