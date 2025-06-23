import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Fragment } from "react/jsx-runtime";

interface IProp {
  message: string;
}

export const Loader = ({ message }: IProp) => {
  const navigate = useNavigate();
  return (
    <div>
      <Transition>
        <Dialog
          onClose={() => {
            navigate("/");
          }}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPanel className="flex flex-col items-center w-full max-w-2xl p-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl text-slate-800 ">
              <div className="flex items-center justify-center mt-5">
                <ClipLoader color="#518915" size={80} />
              </div>

              <DialogTitle
                as="h3"
                className="mt-6 text-xl font-semibold decoration-2"
              >
                {message}
              </DialogTitle>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </div>
  );
};
