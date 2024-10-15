import { isAxiosError } from 'axios';
import api from '../lib/axios';
import { Account, NewAccount } from '../types';

export async function crearCuenta(formData: NewAccount) {
  try {
    const { confirmPassword, ...dataToSend } = formData;

    const { data } = await api.post('/auth/registrar', dataToSend);
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
    const { data } = await api.post('/auth/olvide_password', email);
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
    const { data } = await api.post('/auth/iniciar_sesion', formData);
    console.log(data);

    if (data.token) localStorage.setItem('authToken', data.token);

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
    const { data } = await api.post(`/auth/reestablecer_password?token=${token}`, { password });
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
