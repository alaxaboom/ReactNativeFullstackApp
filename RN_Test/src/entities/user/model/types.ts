export interface User {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  jmbg: string;
  email?: string | null;
  avatarPath?: string | null;
  location?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

