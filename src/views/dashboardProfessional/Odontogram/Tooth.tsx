export const Tooth = ({ key }) => {
  const handleClick = (tooth: string) => {
    console.log(tooth);
  };
  console.log(key);

  return (
    <div className="">
      <svg
        viewBox="0 0 28 33"
        className="w-8 h-8 xl:bg-yellow-500 lg:h-14 lg:w-14 xl:w-16 xl:h-16 "
      >
        <polygon
          stroke="#a3a3a3" //border
          fill="#fff" //backgrounds
          onClick={() => handleClick("arriba")}
          className="transition duration-300 cursor-pointer hover:fill-gray-200"
          points="1.0136711597442627,1.35626420378685 7.767158031463623,9.155386298894882 21.696229934692383,9.155386298894882 28.449718475341797,1.35626420378685 "
        />

        <polygon
          stroke="#a3a3a3" //border
          fill="#fff" //background
          onClick={() => handleClick("derecha")}
          className="transition duration-300 cursor-pointer hover:fill-gray-200"
          points="21.445681169629097,9.104242324829102 21.445681169629097,25.189937591552734 28.19916971027851,32.98905944824219 28.41021592915058,0.8176754713058472 "
        />

        <polygon
          stroke="#a3a3a3" //border
          fill="#fff" //background
          onClick={() => handleClick("abajo")}
          className="transition duration-300 cursor-pointer hover:fill-gray-200"
          points="21.445680618286133,25.29296439886093 28.199169158935547,33.092128217220306 0.7631232142448425,33.092128217220306 7.516610622406006,25.29296439886093 "
        />

        <polygon
          stroke="#a3a3a3" //border
          fill="#fff" //background
          onClick={() => handleClick("izquierda")}
          points="0.7631232291460037,1.3051201105117798 0.7631232291460037,33.232784271240234 7.516610696911812,25.189937591552734 7.516610696911812,25.189937591552734 7.516610696911812,9.104242324829102 "
          className="transition duration-200 cursor-pointer hover:fill-gray-300"
        />
        <polygon
          stroke="#a3a3a3" //border
          fill="#fff" //background
          onClick={() => handleClick("centro")}
          points="7.516610696911812,9.104242324829102 21.445681169629097,9.104242324829102 21.445681169629097,25.189937591552734 7.516610696911812,25.189937591552734 "
          className="transition duration-300 cursor-pointer hover:fill-gray-200"
        />
      </svg>
    </div>
  );
};
