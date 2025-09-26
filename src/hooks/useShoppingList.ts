import { useState, useEffect } from 'react';
import { ShoppingItem } from '../types';
import { apiService } from '../services/api';

export const useShoppingList = () => {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    
    const response = await apiService.getItems();
    
    if (response.success && response.items) {
      setItems(response.items);
    } else {
      setError(response.error || 'Failed to fetch items');
    }
    
    setLoading(false);
  };

  const addItem = async (itemData: Omit<ShoppingItem, 'id' | 'completed' | 'createdAt'>) => {
    const response = await apiService.createItem(itemData);
    
    if (response.success && response.item) {
      setItems(prev => [response.item!, ...prev]);
      return { success: true };
    } else {
      setError(response.error || 'Failed to add item');
      return { success: false, error: response.error };
    }
  };

  const updateItem = async (id: string, updates: Partial<ShoppingItem>) => {
    const response = await apiService.updateItem(id, updates);
    
    if (response.success && response.item) {
      setItems(prev => prev.map(item => 
        item.id === id ? response.item! : item
      ));
      return { success: true };
    } else {
      setError(response.error || 'Failed to update item');
      return { success: false, error: response.error };
    }
  };

  const toggleItem = async (id: string) => {
    const response = await apiService.toggleItem(id);
    
    if (response.success && response.item) {
      setItems(prev => prev.map(item => 
        item.id === id ? response.item! : item
      ));
      return { success: true };
    } else {
      setError(response.error || 'Failed to toggle item');
      return { success: false, error: response.error };
    }
  };

  const deleteItem = async (id: string) => {
    const response = await apiService.deleteItem(id);
    
    if (response.success) {
      setItems(prev => prev.filter(item => item.id !== id));
      return { success: true };
    } else {
      setError(response.error || 'Failed to delete item');
      return { success: false, error: response.error };
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return {
    items,
    loading,
    error,
    fetchItems,
    addItem,
    updateItem,
    toggleItem,
    deleteItem,
    clearError: () => setError(null)
  };
};