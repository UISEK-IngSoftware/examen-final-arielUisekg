export interface FuturamaCharacter {
  id: number;
  name: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  status: 'ALIVE' | 'DEAD' | 'UNKNOWN';
  species: string;
  createdAt: string;
  image: string;
}

export interface FuturamaApiResponse {
  items: FuturamaCharacter[];
}
