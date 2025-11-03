export interface IncompleteUserAttributes {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type IncompleteUserCreationAttributes = Pick<
    IncompleteUserAttributes,
    'firstName' | 'lastName' | 'phone'
  >;