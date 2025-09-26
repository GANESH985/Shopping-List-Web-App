export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  category: string;
  notes: string;
  completed: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  error?: string;
  item?: T;
  items?: T[];
}