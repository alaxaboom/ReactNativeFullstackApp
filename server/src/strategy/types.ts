export interface JwtPayload {
    id: number;
    type: 'access' | 'refresh';
  }