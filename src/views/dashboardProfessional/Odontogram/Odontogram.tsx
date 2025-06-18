import { Tooth } from "./Tooth";

export const Odontogram = () => {
  return (
    <div className="flex flex-col w-full h-screen px-5 py-20 bg-white ">
      <div className="flex flex-wrap w-full h-1/2">
        <div className="flex items-end justify-end w-1/2 gap-1 p-1 border-b border-r border-black h-1/2 ">
          {Array.from({ length: 8 }).map((_, index) => (
            <Tooth key={index} />
          ))}
        </div>
        <div className="flex items-end justify-start w-1/2 gap-1 p-1 border-b border-l border-black h-1/2 ">
          {Array.from({ length: 8 }).map((_, index) => (
            <Tooth key={index} />
          ))}
        </div>
        <div className="flex justify-end w-1/2 gap-1 p-1 border-t border-r border-black h-1/2 ">
          {Array.from({ length: 8 }).map((_, index) => (
            <Tooth key={index} />
          ))}
        </div>
        <div className="flex justify-start w-1/2 gap-1 p-1 border-t border-l border-black h-1/2 ">
          {Array.from({ length: 8 }).map((_, index) => (
            <Tooth key={index} />
          ))}
        </div>
      </div>
      <div className="flex flex-wrap w-full h-1/2">
        <div className="flex items-end justify-end w-1/2 gap-1 p-1 border-b border-r border-black h-1/2 ">
          {Array.from({ length: 5 }).map((_, index) => (
            <Tooth key={index} />
          ))}
        </div>
        <div className="flex items-end justify-start w-1/2 gap-1 p-1 border-b border-l border-black h-1/2 ">
          {Array.from({ length: 5 }).map((_, index) => (
            <Tooth key={index} />
          ))}
        </div>
        <div className="flex justify-end w-1/2 gap-1 p-1 border-t border-r border-black h-1/2 ">
          {Array.from({ length: 5 }).map((_, index) => (
            <Tooth key={index} />
          ))}
        </div>
        <div className="flex justify-start w-1/2 gap-1 p-1 border-t border-l border-black h-1/2 ">
          {" "}
          {Array.from({ length: 5 }).map((_, index) => (
            <Tooth key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
