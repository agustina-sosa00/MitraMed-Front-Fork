import ConfirmAccountModal from '../components/modals/ConfirmAccountModal';
import CreateAccountModal from '../components/modals/CreateAccountModal';
import ForgotPasswordModal from '../components/modals/ForgotPasswordModal';
import SignInForm from '../components/forms/SignInForm';
import PortalDescription from '../components/PortalDescription';

export default function PortalView() {
  return (
    <>
      <div className="relative h-60 lg:h-40 w-full">
        <div className="absolute inset-0">
          <img
            src="/img/centro-medico-recepcion.jpeg"
            alt="Centro Medico Edificio"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-black opacity-80"></div>
        </div>
      </div>

      <div className="flex flex-col items-center md:items-start md:grid md:grid-cols-5 w-full gap-4 md:gap-0 lg:px-5 lg:py-3">
        <PortalDescription />

        <div className="md:col-span-2 w-96 md:w-full my-5 mx-2 md:max-w-sm lg:max-w-xl md:mt-2 px-4 md:p-1 border-2 border-slate-400">
          <SignInForm />
        </div>
      </div>

      <CreateAccountModal />
      <ForgotPasswordModal />
      <ConfirmAccountModal />
    </>
  );
}
