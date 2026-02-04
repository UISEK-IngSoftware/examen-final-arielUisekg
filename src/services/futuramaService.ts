import axios from 'axios';
import { FuturamaCharacter } from '../types/Futurama';

const API_URL = 'https://futuramaapi.com/api/characters';

export const futuramaService = {
  // Función para obtener personajes de la API
  async fetchCharacters(size: number = 50): Promise<FuturamaCharacter[]> {
    try {
      const response = await axios.get(API_URL, {
        params: {
          size,
        },
      });
      return response.data.items;
    } catch (error) {
      throw new Error('Failed to fetch characters. Please try again later.');
    }
  },
};
