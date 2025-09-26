import React from 'react';
import { CheckCircle, Circle, Package } from 'lucide-react';
import { ShoppingItem } from '../types';

interface ShoppingListStatsProps {
  items: ShoppingItem[];
}

export const ShoppingListStats: React.FC<ShoppingListStatsProps> = ({ items }) => {
  const totalItems = items.length;
  const completedItems = items.filter(item => item.completed).length;
  const pendingItems = totalItems - completedItems;
  const completionRate = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Shopping Progress</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full mb-2">
            <Package className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
          <p className="text-sm text-gray-600">Total Items</p>
        </div>
        
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-full mb-2">
            <CheckCircle className="h-5 w-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{completedItems}</p>
          <p className="text-sm text-gray-600">Completed</p>
        </div>
        
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-orange-100 rounded-full mb-2">
            <Circle className="h-5 w-5 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{pendingItems}</p>
          <p className="text-sm text-gray-600">Remaining</p>
        </div>
      </div>
      
      {totalItems > 0 && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{completionRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};