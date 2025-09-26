import React, { useState, useMemo } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useShoppingList } from './hooks/useShoppingList';
import { AddItemForm } from './components/AddItemForm';
import { SearchAndFilter } from './components/SearchAndFilter';
import { ItemCard } from './components/ItemCard';
import { EditItemModal } from './components/EditItemModal';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { EmptyState } from './components/EmptyState';
import { ShoppingListStats } from './components/ShoppingListStats';
import { ShoppingItem } from './types';

function App() {
  const {
    items,
    loading,
    error,
    addItem,
    updateItem,
    toggleItem,
    deleteItem,
    clearError
  } = useShoppingList();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(items.map(item => item.category)));
    return uniqueCategories.sort();
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.notes.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [items, searchTerm, selectedCategory]);

  const { pendingItems, completedItems } = useMemo(() => {
    const pending = filteredItems.filter(item => !item.completed);
    const completed = filteredItems.filter(item => item.completed);
    
    return {
      pendingItems: pending,
      completedItems: completed
    };
  }, [filteredItems]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
  };

  const hasFilters = searchTerm || selectedCategory;
  const hasItems = items.length > 0;
  const hasFilteredItems = filteredItems.length > 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
            <ShoppingCart className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping List</h1>
          <p className="text-gray-600">Organize your shopping with ease</p>
        </div>

        {error && (
          <ErrorMessage message={error} onClose={clearError} />
        )}

        
        <AddItemForm onAdd={addItem} />

        
        {hasItems && (
          <ShoppingListStats items={items} />
        )}

    
        {hasItems && (
          <SearchAndFilter
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            onSearchChange={setSearchTerm}
            onCategoryChange={setSelectedCategory}
            categories={categories}
          />
        )}

      
        {!hasFilteredItems ? (
          <EmptyState 
            hasFilters={hasFilters} 
            onClearFilters={hasFilters ? handleClearFilters : undefined}
          />
        ) : (
          <div className="space-y-6">
        
            {pendingItems.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Shopping List ({pendingItems.length})
                </h2>
                <div className="space-y-3">
                  {pendingItems.map(item => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      onEdit={setEditingItem}
                      onDelete={deleteItem}
                      onToggle={toggleItem}
                    />
                  ))}
                </div>
              </div>
            )}

            {completedItems.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Completed ({completedItems.length})
                </h2>
                <div className="space-y-3">
                  {completedItems.map(item => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      onEdit={setEditingItem}
                      onDelete={deleteItem}
                      onToggle={toggleItem}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {editingItem && (
          <EditItemModal
            item={editingItem}
            isOpen={!!editingItem}
            onClose={() => setEditingItem(null)}
            onUpdate={updateItem}
          />
        )}
      </div>
    </div>
  );
}

export default App;