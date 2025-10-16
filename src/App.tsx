import { useEffect, useState } from "react";
import Router from "./router";

export default function App() {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    const timer = setTimeout(() => {
      setLoader(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loader ? (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
          {/* <img src="/logos/mitra-med-letras_no-bg1.webp" alt="" /> */}
          <div className="border-2 rounded-full w-14 h-14 border-primaryBlue border-t-transparent animate-spin"></div>
        </div>
      ) : null}
      <Router loader={loader} setLoader={setLoader} />
    </>
  );
}
