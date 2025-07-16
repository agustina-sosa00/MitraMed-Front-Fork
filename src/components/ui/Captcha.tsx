import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
interface IProps {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Captcha({ setState }: IProps) {
  const api_site = import.meta.env.VITE_API_KEY_SITE_CAPTCHA;

  const captcha = useRef(ReCAPTCHA || null);
  const onChange = () => {
    if (captcha.current && captcha.current.getValue()) {
      setState(true);
    }
  };
  return <ReCAPTCHA ref={captcha} sitekey={api_site} onChange={onChange} />;
}
