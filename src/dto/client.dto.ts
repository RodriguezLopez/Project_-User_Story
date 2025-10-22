export interface CreateClientDTO {
  name: string;
  email?: string;
  phone?: string;
}

export interface UpdateClientDTO {
  name?: string;
  email?: string;
  phone?: string;
}

export interface ClientResponseDTO {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
