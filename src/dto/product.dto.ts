export interface CreateProductDTO {
  code: string;
  name: string;
  price: number;
  stock: number;
}

export interface UpdateProductDTO {
  code?: string;
  name?: string;
  price?: number;
  stock?: number;
}

export interface ProductResponseDTO {
  id: string;
  code: string;
  name: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}
