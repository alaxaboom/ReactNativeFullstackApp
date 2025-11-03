export interface ProfilePageProps {}

export interface UpdateProfileData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  jmbg?: string;
  residentialAddress?: string;
  avatar?: string;
}

export interface UserProfile {
  id: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  jmbg?: string;
  residentialAddress?: string;
  avatar?: string;
}