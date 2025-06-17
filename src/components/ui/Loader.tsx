import { DialogTitle } from "@headlessui/react";
import { ClipLoader } from "react-spinners";

interface IProp {
  message: string;
}

export const Loader = ({ message }: IProp) => {
  return (
    <div>
      <div className="flex items-center justify-center mt-5">
        <ClipLoader color="#518915" size={80} />
      </div>

      <DialogTitle as="h3" className="mt-6 text-xl font-semibold decoration-2">
        {message}
      </DialogTitle>
    </div>
  );
};
