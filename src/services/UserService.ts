import { isAxiosError } from 'axios';
import { Account, NewAccount } from '../types';
import apiNoAuth from '@/lib/axiosNoAuth';

export async function crearCuenta(formData: NewAccount) {
  try {
    const { confirmPassword, ...dataToSend } = formData;

    const { data } = await apiNoAuth.post('/auth/registrar', dataToSend);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log(error.response.data);
      throw new Error(error.response.data.error);
    } else {
      throw new Error('Hubo un error...');
    }
  }
}

export async function olvidePassword(email: { email: string }) {
  try {
    const { data } = await apiNoAuth.post('/auth/olvide_password', email);
    console.log(data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log(error.response.data);
      throw new Error(error.response.data.error);
    } else {
      throw new Error('Hubo un error...');
    }
  }
}

export async function nuevoToken(email: { email: string }) {
  try {
    const { data } = await apiNoAuth.post('/auth/reenviar_tokenconfirm', email);
    console.log(data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log(error.response.data);
      throw new Error(error.response.data.error);
    } else {
      throw new Error('Hubo un error...');
    }
  }
}

export async function iniciarSesion(formData: Account) {
  try {
    const { data } = await apiNoAuth.post('/auth/iniciar_sesion', formData);
    // console.log(data);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log(error.response.data);
      throw new Error(error.response.data.error);
    } else {
      throw new Error('Hubo un error...');
    }
  }
}

export async function reestablecerPassword({
  token,
  password,
}: {
  token: string;
  password: string;
}) {
  try {
    const { data } = await apiNoAuth.post(`/auth/reestablecer_password?token=${token}`, {
      password,
    });
    console.log(data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log(error.response.data);
      throw new Error(error.response.data.error);
    } else {
      throw new Error('Hubo un error...');
    }
  }
}
