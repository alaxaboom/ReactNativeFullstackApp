export interface LocationAttributes {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string | null;
  website: string | null;
  mail: string | null;
  category: string | null;
  closed_at: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type LocationCreationAttributes = Omit<
  LocationAttributes,
  'id' | 'createdAt' | 'updatedAt'
>;

