export interface CreateOrderItemDTO {
  productId: string;
  quantity: number;
}

export interface CreateOrderDTO {
  clientId: string;
  items: CreateOrderItemDTO[];
}

export interface OrderItemResponseDTO {
  id: string;
  productId: string;
  productName: string;
  productCode: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface OrderResponseDTO {
  id: string;
  clientId: string;
  clientName: string;
  userId: string;
  userName: string;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  items: OrderItemResponseDTO[];
  createdAt: Date;
  updatedAt: Date;
}
