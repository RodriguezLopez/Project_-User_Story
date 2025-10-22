export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'vendedor';
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RefreshTokenDTO {
  refreshToken: string;
}

export interface AuthResponseDTO {
  user: {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'vendedor';
  };
  accessToken: string;
  refreshToken: string;
}

export interface TokenPayload {
  userId: string;
  email: string;
  role: 'admin' | 'vendedor';
}
