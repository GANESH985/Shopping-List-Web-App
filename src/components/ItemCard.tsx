import React from 'react';
import { CreditCard as Edit3, Trash2, Check } from 'lucide-react';
import { ShoppingItem } from '../types';

interface ItemCardProps {
  item: ShoppingItem;
  onEdit: (item: ShoppingItem) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

const getCategoryIcon = (category: string) => {
  const icons: { [key: string]: string } = {
    'Fruits': '🍎',
    'Vegetables': '🥕',
    'Dairy': '🥛',
    'Meat': '🥩',
    'Bakery': '🍞',
    'Pantry': '🥫',
    'Beverages': '☕',
    'Household': '🧽',
    'Other': '📦'
  };
  return icons[category] || '📦';
};

const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    'Fruits': 'bg-red-50 text-red-700 border-red-200',
    'Vegetables': 'bg-green-50 text-green-700 border-green-200',
    'Dairy': 'bg-blue-50 text-blue-700 border-blue-200',
    'Meat': 'bg-pink-50 text-pink-700 border-pink-200',
    'Bakery': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'Pantry': 'bg-orange-50 text-orange-700 border-orange-200',
    'Beverages': 'bg-purple-50 text-purple-700 border-purple-200',
    'Household': 'bg-indigo-50 text-indigo-700 border-indigo-200',
    'Other': 'bg-gray-50 text-gray-700 border-gray-200'
  };
  return colors[category] || 'bg-gray-50 text-gray-700 border-gray-200';
};

export const ItemCard: React.FC<ItemCardProps> = ({ item, onEdit, onDelete, onToggle }) => {
  const handleToggle = () => {
    onToggle(item.id);
  };

  const handleEdit = () => {
    onEdit(item);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      onDelete(item.id);
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-4 transition-all duration-200 hover:shadow-md ${
      item.completed ? 'opacity-75' : ''
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3 mb-2">
            <button
              onClick={handleToggle}
              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                item.completed
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : 'border-gray-300 hover:border-emerald-500'
              }`}
            >
              {item.completed && <Check className="h-3 w-3" />}
            </button>
            <div className="flex-1 min-w-0">
              <h3 className={`font-medium text-gray-900 truncate ${
                item.completed ? 'line-through text-gray-500' : ''
              }`}>
                {item.name}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(item.category)}`}>
                  <span className="mr-1">{getCategoryIcon(item.category)}</span>
                  {item.category}
                </span>
                <span className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </span>
              </div>
            </div>
          </div>
          
          {item.notes && (
            <p className={`text-sm mt-2 ${
              item.completed ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {item.notes}
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={handleEdit}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            title="Edit item"
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            title="Delete item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};