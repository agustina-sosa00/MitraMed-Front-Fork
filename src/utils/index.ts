import emailjs from '@emailjs/browser';
import { NewAccount } from '../types';

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const generateToken = () => {
  return Math.floor(100000 + Math.random() * 900000); // Genera un número de 6 dígitos
};

type SendEmailProps = {
  userName: NewAccount['nombre'];
  userEmail: NewAccount['email'];
  token: number;
};
export const sendRegisterEmail = async ({ userName, userEmail, token }: SendEmailProps) => {
  try {
    const templateParams = {
      userName: userName,
      userEmail: userEmail,
      token: token,
    };

    const result = await emailjs.send(
      'service_84ua4i1',
      'template_cyxj48w',
      templateParams,
      'kDRsDtSZ5TO3_j3Ze'
    );
    console.log(result.status, result.text);
  } catch (error) {
    console.log(error);
  }
};

export const sendForgotPasswordEmail = async (userEmail: string) => {
  try {
    const templateParams = { userEmail };

    const result = await emailjs.send(
      'service_84ua4i1',
      'template_nvlpq2d',
      templateParams,
      'kDRsDtSZ5TO3_j3Ze'
    );
    console.log(result.status, result.text);
  } catch (error) {
    console.log(error);
  }
};
