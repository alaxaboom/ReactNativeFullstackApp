
export interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  jmbg: string;
  password: string;
  email?: string | null;
  avatarPath?: string | null;
  location?: string | null;
}
export type UserLoginAttributes = Pick<UserAttributes, 'phone' | 'password'>;
export type UserCreationAttributes = Omit<UserAttributes, 'id' | 'createdAt' | 'updatedAt'>;