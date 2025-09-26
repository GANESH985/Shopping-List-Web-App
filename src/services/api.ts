import { ShoppingItem, ApiResponse } from '../types';

const API_BASE = '/api';

class ApiService {
  private async request<T>(
    url: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE}${url}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error'
      };
    }
  }

  async getItems(): Promise<ApiResponse<ShoppingItem>> {
    return this.request<ShoppingItem>('/items');
  }

  async createItem(item: Omit<ShoppingItem, 'id' | 'completed' | 'createdAt'>): Promise<ApiResponse<ShoppingItem>> {
    return this.request<ShoppingItem>('/items', {
      method: 'POST',
      body: JSON.stringify(item),
    });
  }

  async updateItem(id: string, item: Partial<ShoppingItem>): Promise<ApiResponse<ShoppingItem>> {
    return this.request<ShoppingItem>(`/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(item),
    });
  }

  async toggleItem(id: string): Promise<ApiResponse<ShoppingItem>> {
    return this.request<ShoppingItem>(`/items/${id}/toggle`, {
      method: 'PATCH',
    });
  }

  async deleteItem(id: string): Promise<ApiResponse<ShoppingItem>> {
    return this.request<ShoppingItem>(`/items/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();