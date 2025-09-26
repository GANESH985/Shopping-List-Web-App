import React from 'react';
import { ShoppingBasket } from 'lucide-react';

interface EmptyStateProps {
  hasFilters: boolean;
  onClearFilters?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ hasFilters, onClearFilters }) => {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
        <ShoppingBasket className="h-8 w-8 text-gray-400" />
      </div>
      
      {hasFilters ? (
        <>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No items match your search</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search terms or category filter.</p>
          {onClearFilters && (
            <button
              onClick={onClearFilters}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Clear all filters
            </button>
          )}
        </>
      ) : (
        <>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your shopping list is empty</h3>
          <p className="text-gray-600">Add some items to get started with your shopping!</p>
        </>
      )}
    </div>
  );
};