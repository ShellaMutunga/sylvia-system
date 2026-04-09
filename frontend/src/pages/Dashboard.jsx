import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LayoutDashboard, Tractor, ShoppingCart, Users, DollarSign } from 'lucide-react';

const inventoryData = [
  { name: 'Wheat', stock: 120, capacity: 150 },
  { name: 'Corn', stock: 95, capacity: 120 },
  { name: 'Rice', stock: 80, capacity: 100 },
  { name: 'Soybeans', stock: 60, capacity: 80 },
  { name: 'Barley', stock: 45, capacity: 60 },
  { name: 'Oats', stock: 30, capacity: 50 },
];

const inventoryData2 = [
  { name: 'Fertilizer', stock: 200, capacity: 250 },
  { name: 'Seeds', stock: 150, capacity: 200 },
  { name: 'Pesticides', stock: 80, capacity: 100 },
  { name: 'Fuel', stock: 70, capacity: 90 },
  { name: 'Feed', stock: 110, capacity: 150 },
  { name: 'Tools', stock: 45, capacity: 60 },
];

const categories = [
  { name: 'Dashboard', icon: LayoutDashboard, color: 'from-blue-500 to-blue-600' },
  { name: 'Operations', icon: Tractor, color: 'from-green-500 to-green-600' },
  { name: 'Sales', icon: ShoppingCart, color: 'from-orange-500 to-orange-600' },
  { name: 'Employees', icon: Users, color: 'from-purple-500 to-purple-600' },
  { name: 'Accounting', icon: DollarSign, color: 'from-emerald-500 to-emerald-600' },
];

function Dashboard() {
  const { darkMode } = useOutletContext();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className={`${darkMode ? 'bg-[#2d2d2d]' : 'bg-white'} rounded-xl p-5 shadow-lg ${
              darkMode ? 'shadow-gray-900/30' : 'shadow-gray-200/50'
            } border ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}
          >
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4`}>
              <cat.icon className="w-6 h-6 text-white" />
            </div>
            <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {cat.name}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${darkMode ? 'bg-[#2d2d2d]' : 'bg-white'} rounded-xl p-6 shadow-lg ${
          darkMode ? 'shadow-gray-900/30' : 'shadow-gray-200/50'
        } border ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
          <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Crop Inventory
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#404040' : '#e5e7eb'} />
                <XAxis dataKey="name" stroke={darkMode ? '#9ca3af' : '#6b7280'} fontSize={12} />
                <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? '#1f2937' : '#fff',
                    border: darkMode ? '1px solid #374151' : '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: darkMode ? '#fff' : '#000' }}
                />
                <Bar dataKey="stock" fill="url(#greenGradient)" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`${darkMode ? 'bg-[#2d2d2d]' : 'bg-white'} rounded-xl p-6 shadow-lg ${
          darkMode ? 'shadow-gray-900/30' : 'shadow-gray-200/50'
        } border ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
          <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Supplies Inventory
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventoryData2}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#404040' : '#e5e7eb'} />
                <XAxis dataKey="name" stroke={darkMode ? '#9ca3af' : '#6b7280'} fontSize={12} />
                <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? '#1f2937' : '#fff',
                    border: darkMode ? '1px solid #374151' : '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: darkMode ? '#fff' : '#000' }}
                />
                <Bar dataKey="stock" fill="url(#blueGradient)" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;