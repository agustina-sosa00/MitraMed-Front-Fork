import { isAxiosError } from 'axios';
import api from '../lib/axios';
import { NewAccount } from '../types';

export async function createAccount(formData: NewAccount) {
  try {
    const { data } = await api.post('/create-account', formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error('Hubo un error...');
    }
  }
}
