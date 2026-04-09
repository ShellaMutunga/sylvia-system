import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sprout, Sun, Moon, LayoutDashboard, ShoppingCart, Users, Settings, DollarSign, ArrowUpRight, ArrowDownRight, ArrowLeft, LogOut, UserPlus, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import SheepProfile from './pages/profiles/SheepProfile';
import FishProfile from './pages/profiles/FishProfile';
import VegetableProfile from './pages/profiles/VegetableProfile';
import DemoProfile from './pages/profiles/DemoProfile';

function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div
      className="fixed inset-0 bg-[#024D30] flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 2.7 }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -4, 0] }}
        transition={{ opacity: { duration: 0.5 }, y: { duration: 0.8, repeat: Infinity, repeatDelay: 0.5 } }}
      >
        <Sprout className="w-14 h-14 text-[#4ade80] mb-2" strokeWidth={1.5} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-8 mb-10"
      >
        <div className="h-[1px] bg-white w-8 opacity-40" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-white font-extralight tracking-[0.9em] text-xl uppercase"
      >
        Welcome to Redhill Farm
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-[#fbbf24] font-light italic text-sm ml-[11em]"
      >
        ~by Sylvia Karebe
      </motion.p>
    </motion.div>
  );
}

function LogoutScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      window.close();
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-[#024D30] flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 2.7 }}
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-white font-extralight tracking-[0.9em] text-xl uppercase mb-4"
      >
        Goodbye
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-[#fbbf24] font-light italic text-sm ml-[11em]"
      >
        See you soon!
      </motion.p>
    </motion.div>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const currentUser = {
    name: 'Sylvia Karebe',
    email: 'sylvia@redhill.com',
    role: 'Administrator',
    avatar: 'SK'
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleSwitchAccount = () => {
    navigate('/login');
  };

  const handleCloseSystem = () => {
    navigate('/logout');
  };

  const categories = [
    { 
      name: 'Dashboard', 
      subtext: 'Main overview and analytics',
      icon: LayoutDashboard, 
      bgColor: darkMode ? '#1E293B' : '#fff', 
      iconColor: '#2563EB' 
    },
    { 
      name: 'Operations', 
      subtext: 'Farm operations & management',
      icon: Settings, 
      bgColor: darkMode ? '#064E3B' : '#ECFDF5', 
      iconColor: '#10B981' 
    },
    { 
      name: 'Sales & Orders', 
      subtext: 'Revenue and order management',
      icon: ShoppingCart, 
      bgColor: darkMode ? '#4C1D95' : '#F5F3FF', 
      iconColor: '#8B5CF6' 
    },
    { 
      name: 'Employees', 
      subtext: 'Staff management & HR',
      icon: Users, 
      bgColor: darkMode ? '#7C2D12' : '#FFFBEB', 
      iconColor: '#F97316' 
    },
    { 
      name: 'Accounting', 
      subtext: 'Financial reports & accounting',
      icon: DollarSign, 
      bgColor: darkMode ? '#065F46' : '#ECFDF5', 
      iconColor: '#34D399' 
    },
  ];

  const stats = [
    { label: 'Total Animals', value: '1,247', change: '+12', icon: '🐄', color: '#10B981' },
    { label: 'Crop Yield (kg)', value: '45,230', change: '+8.5%', icon: '🌾', color: '#FBBF24' },
    { label: 'Revenue (KSh)', value: '2.4M', change: '+23%', icon: '💰', color: '#8B5CF6' },
    { label: 'Water Usage (L)', value: '125,400', change: '-5%', icon: '💧', color: '#3B82F6' },
    { label: 'Feed Stock (kg)', value: '8,500', change: '+15%', icon: '🍃', color: '#F97316' },
    { label: 'Active Staff', value: '24', change: '0', icon: '👥', color: '#EC4899' },
  ];

  const recentActivities = [
    { action: 'Milk production recorded', time: '2 mins ago', type: 'production' },
    { action: 'New order received #1245', time: '15 mins ago', type: 'order' },
    { action: 'Feed replenishment completed', time: '1 hour ago', type: 'inventory' },
    { action: 'Staff shift updated', time: '2 hours ago', type: 'hr' },
    { action: 'Weather alert: Rain expected', time: '3 hours ago', type: 'alert' },
  ];

  const foodData = [
    { name: 'Mon', level: 85 },
    { name: 'Tue', level: 72 },
    { name: 'Wed', level: 90 },
    { name: 'Thu', level: 65 },
    { name: 'Fri', level: 78 },
    { name: 'Sat', level: 55 },
    { name: 'Sun', level: 45 },
  ];

  const waterData = [
    { name: 'Mon', level: 1200 },
    { name: 'Tue', level: 1050 },
    { name: 'Wed', level: 1400 },
    { name: 'Thu', level: 900 },
    { name: 'Fri', level: 1100 },
    { name: 'Sat', level: 800 },
    { name: 'Sun', level: 650 },
  ];

  const operationsData = {
    livestock: [
      { name: 'Dairy Cows', count: 45, status: 'healthy' },
      { name: 'Beef Cattle', count: 30, status: 'healthy' },
      { name: 'Goats', count: 80, status: 'healthy' },
      { name: 'Chickens', count: 250, status: 'under observation' },
    ],
    crops: [
      { name: 'Maize', hectares: 15, status: 'growing' },
      { name: 'Wheat', hectares: 8, status: 'harvest ready' },
      { name: 'Vegetables', hectares: 5, status: 'growing' },
    ],
    tasks: [
      { id: 1, title: 'Morning milking - Barn A', assignedTo: 'John', due: '8:00 AM', priority: 'high', completed: false },
      { id: 2, title: 'Feed cattle - Section B', assignedTo: 'Mary', due: '10:00 AM', priority: 'medium', completed: true },
      { id: 3, title: 'Irrigation check - Maize field', assignedTo: 'Peter', due: '12:00 PM', priority: 'low', completed: false },
      { id: 4, title: 'Vaccination - Goats', assignedTo: 'Sarah', due: '2:00 PM', priority: 'high', completed: false },
      { id: 5, title: 'Harvest vegetables - Plot 3', assignedTo: 'John', due: '4:00 PM', priority: 'medium', completed: false },
    ],
  };

  const salesData = [
    { id: 'ORD-001', customer: 'Fresh Mart', item: 'Milk (50L)', amount: 'KSh 15,000', date: '2026-04-09', status: 'Completed' },
    { id: 'ORD-002', customer: 'Hotel Safari', item: 'Beef (20kg)', amount: 'KSh 12,000', date: '2026-04-09', status: 'Pending' },
    { id: 'ORD-003', customer: 'Green Grocers', item: 'Vegetables (15kg)', amount: 'KSh 4,500', date: '2026-04-08', status: 'Completed' },
    { id: 'ORD-004', customer: 'Dairy Queen', item: 'Milk (100L)', amount: 'KSh 30,000', date: '2026-04-08', status: 'Completed' },
    { id: 'ORD-005', customer: 'Local Butcher', item: 'Goat Meat (10kg)', amount: 'KSh 8,000', date: '2026-04-07', status: 'Delivered' },
    { id: 'ORD-006', customer: 'School Canteen', item: 'Eggs (200 pcs)', amount: 'KSh 4,000', date: '2026-04-07', status: 'Completed' },
    { id: 'ORD-007', customer: 'Restaurant Hub', item: 'Chicken (25kg)', amount: 'KSh 7,500', date: '2026-04-06', status: 'Cancelled' },
  ];

  const employeesData = [
    { id: 1, name: 'John Kamau', role: 'Farm Manager', department: 'Operations', phone: '+254 712 345 678', status: 'active', shift: 'Morning' },
    { id: 2, name: 'Mary Wanjiku', role: 'Milker', department: 'Livestock', phone: '+254 723 456 789', status: 'active', shift: 'Morning' },
    { id: 3, name: 'Peter Ochieng', role: 'Crop Technician', department: 'Crops', phone: '+254 734 567 890', status: 'active', shift: 'Day' },
    { id: 4, name: 'Sarah Akinyi', role: 'Veterinary Assistant', department: 'Health', phone: '+254 745 678 901', status: 'active', shift: 'Morning' },
    { id: 5, name: 'James Odhiambo', role: 'Security Guard', department: 'Security', phone: '+254 756 789 012', status: 'active', shift: 'Night' },
    { id: 6, name: 'Grace Atieno', role: 'Harvest Supervisor', department: 'Crops', phone: '+254 767 890 123', status: 'on leave', shift: 'Day' },
    { id: 7, name: 'Daniel Mwangi', role: 'Feed Manager', department: 'Livestock', phone: '+254 778 901 234', status: 'active', shift: 'Morning' },
    { id: 8, name: 'Faith Nekesa', role: 'Cleaner', department: 'Maintenance', phone: '+254 789 012 345', status: 'active', shift: 'Morning' },
  ];

  const accountingData = {
    totalIncome: 'KSh 2,450,000',
    totalCosts: 'KSh 1,320,000',
    netProfit: 'KSh 1,130,000',
    expenses: [
      { category: 'Feed & Supplements', amount: 'KSh 450,000', percentage: 34 },
      { category: 'Veterinary Services', amount: 'KSh 280,000', percentage: 21 },
      { category: 'Labor Wages', amount: 'KSh 320,000', percentage: 24 },
      { category: 'Equipment & Maintenance', amount: 'KSh 150,000', percentage: 11 },
      { category: 'Utilities (Water, Electricity)', amount: 'KSh 80,000', percentage: 6 },
      { category: 'Other Expenses', amount: 'KSh 40,000', percentage: 4 },
    ],
    incomeSources: [
      { source: 'Milk Sales', amount: 'KSh 1,200,000', percentage: 49 },
      { source: 'Crop Sales', amount: 'KSh 650,000', percentage: 27 },
      { source: 'Livestock Sales', amount: 'KSh 400,000', percentage: 16 },
      { source: 'Other Income', amount: 'KSh 200,000', percentage: 8 },
    ],
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#0F172A]' : 'bg-gray-100'}`}>
      <nav className={`border-b px-8 py-4 flex items-center justify-between transition-colors duration-300 ${darkMode ? 'bg-[#1E293B] border-white/10' : 'bg-white border-gray-200'}`}>
        <div className="flex-1 flex items-center">
          {activeCategory ? (
            <button 
              onClick={() => setActiveCategory(null)}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">{currentUser.avatar}</span>
                </div>
                <div className="flex flex-col">
                  <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Welcome, {currentUser.name.split(' ')[0]}
                  </span>
                  <span className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                    {currentUser.email}
                  </span>
                </div>
              </button>
              {showProfileMenu && (
                <div 
                  className="absolute top-14 left-0 w-48 rounded-lg shadow-lg border z-50"
                  style={{ 
                    background: darkMode ? '#1E293B' : 'white',
                    borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'
                  }}
                >
                  <button 
                    onClick={handleLogout}
                    className={`w-full flex items-center gap-3 text-left px-4 py-3 text-sm hover:opacity-80 ${darkMode ? 'text-white' : 'text-gray-800'}`}
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                  <button 
                    onClick={handleSwitchAccount}
                    className={`w-full flex items-center gap-3 text-left px-4 py-3 text-sm hover:opacity-80 ${darkMode ? 'text-white' : 'text-gray-800'}`}
                  >
                    <UserPlus className="w-4 h-4" />
                    Switch Account
                  </button>
                  <button 
                    onClick={handleCloseSystem}
                    className={`w-full flex items-center gap-3 text-left px-4 py-3 text-sm hover:opacity-80 ${darkMode ? 'text-red-400' : 'text-red-600'}`}
                  >
                    <X className="w-4 h-4" />
                    Close System
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex-1 flex justify-center">
          {activeCategory ? (
            <span className={`text-xl font-semibold tracking-wider ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {activeCategory}
            </span>
          ) : (
            <span className={`text-xl font-semibold tracking-wider ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              REDHILL FARM
            </span>
          )}
        </div>
        <div className="flex-1 flex justify-end">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full transition-all ${darkMode ? 'bg-[#0F172A]/50 hover:bg-[#0F172A]/70' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </nav>

      <main className="p-8">
        {!activeCategory ? (
          <>
            <div className="grid grid-cols-5 gap-6 mb-8">
              {categories.map((cat) => (
                <motion.div
                  key={cat.name}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveCategory(cat.name)}
                  className="rounded-[12px] p-6 cursor-pointer"
                  style={{
                    background: cat.bgColor,
                    boxShadow: `0 0 30px -5px ${cat.iconColor}30`,
                  }}
                >
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: cat.iconColor,
                      boxShadow: `0 0 20px -5px ${cat.iconColor}60`,
                    }}
                  >
                    <cat.icon className="w-7 h-7 text-white" />
                  </div>
                  <p className={`font-semibold text-center text-base ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {cat.name}
                  </p>
                  <p className={`text-center text-xs mt-1 ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                    {cat.subtext}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div 
                className="rounded-2xl p-8 border"
                style={{
                  background: darkMode ? '#1E293B' : 'white',
                  borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'
                }}
              >
                <h3 className={`text-xl font-semibold mb-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Feed Consumption (kg)
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={foodData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'} />
                      <XAxis dataKey="name" stroke={darkMode ? '#666' : '#888'} fontSize={12} />
                      <YAxis stroke={darkMode ? '#666' : '#888'} fontSize={12} />
                      <Tooltip
                        contentStyle={{ backgroundColor: darkMode ? '#1E293B' : 'white', border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e5e5e5', borderRadius: '12px' }}
                        labelStyle={{ color: darkMode ? '#fff' : '#000' }}
                      />
                      <Bar dataKey="level" fill="url(#greenGlow)" radius={[20, 20, 0, 0]} />
                      <defs>
                        <linearGradient id="greenGlow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#22c55e" />
                          <stop offset="100%" stopColor="#16a34a" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div 
                className="rounded-2xl p-8 border"
                style={{
                  background: darkMode ? '#1E293B' : 'white',
                  borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'
                }}
              >
                <h3 className={`text-xl font-semibold mb-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Water Usage (L)
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={waterData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'} />
                      <XAxis dataKey="name" stroke={darkMode ? '#666' : '#888'} fontSize={12} />
                      <YAxis stroke={darkMode ? '#666' : '#888'} fontSize={12} />
                      <Tooltip
                        contentStyle={{ backgroundColor: darkMode ? '#1E293B' : 'white', border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e5e5e5', borderRadius: '12px' }}
                        labelStyle={{ color: darkMode ? '#fff' : '#000' }}
                      />
                      <Bar dataKey="level" fill="url(#blueGlow)" radius={[20, 20, 0, 0]} />
                      <defs>
                        <linearGradient id="blueGlow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#0ea5e9" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </>
        ) : activeCategory === 'Dashboard' ? (
          <>
            <div className="grid grid-cols-6 gap-4 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl p-4 border"
                  style={{
                    background: darkMode ? '#1E293B' : 'white',
                    borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5',
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{stat.icon}</span>
                    <span className={`flex items-center text-xs ${stat.change.startsWith('+') ? 'text-green-500' : stat.change.startsWith('-') ? 'text-red-500' : 'text-gray-500'}`}>
                      {stat.change.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : stat.change.startsWith('-') ? <ArrowDownRight className="w-3 h-3" /> : null}
                      {stat.change}
                    </span>
                  </div>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {stat.value}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-8 mb-8">
              <div 
                className="rounded-2xl p-6 border col-span-2"
                style={{
                  background: darkMode ? '#1E293B' : 'white',
                  borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'
                }}
              >
                <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Weekly Feed Consumption (kg)
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={foodData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'} />
                      <XAxis dataKey="name" stroke={darkMode ? '#666' : '#888'} fontSize={12} />
                      <YAxis stroke={darkMode ? '#666' : '#888'} fontSize={12} />
                      <Tooltip
                        contentStyle={{ backgroundColor: darkMode ? '#1E293B' : 'white', border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e5e5e5', borderRadius: '12px' }}
                        labelStyle={{ color: darkMode ? '#fff' : '#000' }}
                      />
                      <Bar dataKey="level" fill="url(#greenGlow)" radius={[8, 8, 0, 0]} />
                      <defs>
                        <linearGradient id="greenGlow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#22c55e" />
                          <stop offset="100%" stopColor="#16a34a" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div 
                className="rounded-2xl p-6 border"
                style={{
                  background: darkMode ? '#1E293B' : 'white',
                  borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'
                }}
              >
                <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${activity.type === 'alert' ? 'bg-yellow-500' : activity.type === 'order' ? 'bg-purple-500' : activity.type === 'production' ? 'bg-green-500' : 'bg-blue-500'}`} />
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>{activity.action}</p>
                        <p className={`text-xs ${darkMode ? 'text-white/40' : 'text-gray-400'}`}>{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div 
                className="rounded-2xl p-6 border"
                style={{
                  background: darkMode ? '#1E293B' : 'white',
                  borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'
                }}
              >
                <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Water Usage (L)
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={waterData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'} />
                      <XAxis dataKey="name" stroke={darkMode ? '#666' : '#888'} fontSize={12} />
                      <YAxis stroke={darkMode ? '#666' : '#888'} fontSize={12} />
                      <Tooltip
                        contentStyle={{ backgroundColor: darkMode ? '#1E293B' : 'white', border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e5e5e5', borderRadius: '12px' }}
                        labelStyle={{ color: darkMode ? '#fff' : '#000' }}
                      />
                      <Bar dataKey="level" fill="url(#blueGlow)" radius={[8, 8, 0, 0]} />
                      <defs>
                        <linearGradient id="blueGlow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#0ea5e9" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div 
                className="rounded-2xl p-6 border"
                style={{
                  background: darkMode ? '#1E293B' : 'white',
                  borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'
                }}
              >
                <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Record Milking', icon: '🥛', color: '#10B981' },
                    { label: 'New Order', icon: '📦', color: '#8B5CF6' },
                    { label: 'Add Expense', icon: '💸', color: '#F97316' },
                    { label: 'Report Issue', icon: '⚠️', color: '#EF4444' },
                  ].map((action) => (
                    <motion.button
                      key={action.label}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-4 rounded-xl border flex flex-col items-center gap-2"
                      style={{
                        background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                        borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5',
                      }}
                    >
                      <span className="text-2xl">{action.icon}</span>
                      <span className={`text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>{action.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : activeCategory === 'Operations' ? (
          <>
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div 
                className="rounded-2xl p-6 border"
                style={{
                  background: darkMode ? '#1E293B' : 'white',
                  borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'
                }}
              >
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Livestock Overview
                </h3>
                <div className="space-y-4">
                  {operationsData.livestock.map((animal, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }}>
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{animal.name}</p>
                        <p className={`text-sm ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>{animal.count} heads</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs ${animal.status === 'healthy' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                        {animal.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div 
                className="rounded-2xl p-6 border"
                style={{
                  background: darkMode ? '#1E293B' : 'white',
                  borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'
                }}
              >
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Crop Status
                </h3>
                <div className="space-y-4">
                  {operationsData.crops.map((crop, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }}>
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{crop.name}</p>
                        <p className={`text-sm ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>{crop.hectares} hectares</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs ${crop.status === 'harvest ready' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                        {crop.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div 
              className="rounded-2xl p-6 border"
              style={{
                background: darkMode ? '#1E293B' : 'white',
                borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Today's Tasks
                </h3>
                <button className="px-4 py-2 rounded-lg text-sm bg-green-500 text-white hover:bg-green-600">
                  + Add Task
                </button>
              </div>
              <div className="space-y-3">
                {operationsData.tasks.map((task) => (
                  <div 
                    key={task.id} 
                    className={`flex items-center justify-between p-4 rounded-lg border ${task.completed ? 'opacity-50' : ''}`}
                    style={{ 
                      background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                      borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <input 
                        type="checkbox" 
                        checked={task.completed}
                        onChange={() => {}}
                        className="w-5 h-5 rounded border-gray-500"
                      />
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'} ${task.completed ? 'line-through' : ''}`}>
                          {task.title}
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                          {task.assignedTo} • {task.due}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      task.priority === 'high' ? 'bg-red-500/20 text-red-400' : 
                      task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : activeCategory === 'Sales & Orders' ? (
          <>
            <div 
              className="rounded-2xl p-6 border"
              style={{
                background: darkMode ? '#1E293B' : 'white',
                borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Sales & Orders
                </h3>
                <button className="px-4 py-2 rounded-lg text-sm bg-green-500 text-white hover:bg-green-600">
                  + New Order
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`border-b ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
                      <th className={`text-left py-3 px-4 text-sm font-medium ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>ID</th>
                      <th className={`text-left py-3 px-4 text-sm font-medium ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Customer</th>
                      <th className={`text-left py-3 px-4 text-sm font-medium ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Item</th>
                      <th className={`text-left py-3 px-4 text-sm font-medium ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Amount</th>
                      <th className={`text-left py-3 px-4 text-sm font-medium ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Date</th>
                      <th className={`text-left py-3 px-4 text-sm font-medium ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesData.map((sale, index) => (
                      <tr key={index} className={`border-b ${darkMode ? 'border-white/10' : 'border-gray-100'}`}>
                        <td className={`py-3 px-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{sale.id}</td>
                        <td className={`py-3 px-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{sale.customer}</td>
                        <td className={`py-3 px-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{sale.item}</td>
                        <td className={`py-3 px-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{sale.amount}</td>
                        <td className={`py-3 px-4 ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>{sale.date}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs ${
                            sale.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                            sale.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' :
                            sale.status === 'Delivered' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {sale.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : activeCategory === 'Employees' ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-4">
                <button className={`px-4 py-2 rounded-lg text-sm ${darkMode ? 'bg-[#1E293B] text-white' : 'bg-white text-gray-800'} border ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
                  All Employees
                </button>
                <button className={`px-4 py-2 rounded-lg text-sm ${darkMode ? 'bg-green-600 text-white' : 'bg-green-500 text-white'}`}>
                  Active ({employeesData.filter(e => e.status === 'active').length})
                </button>
                <button className={`px-4 py-2 rounded-lg text-sm ${darkMode ? 'bg-[#1E293B] text-white' : 'bg-white text-gray-800'} border ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
                  On Leave
                </button>
              </div>
              <button className="px-4 py-2 rounded-lg text-sm bg-green-500 text-white hover:bg-green-600">
                + Add Employee
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8">
              <div 
                className="rounded-xl p-4 border"
                style={{ background: darkMode ? '#1E293B' : 'white', borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}
              >
                <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{employeesData.length}</p>
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>Total Employees</p>
              </div>
              <div 
                className="rounded-xl p-4 border"
                style={{ background: darkMode ? '#1E293B' : 'white', borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}
              >
                <p className={`text-3xl font-bold text-green-500`}>{employeesData.filter(e => e.status === 'active').length}</p>
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>Active</p>
              </div>
              <div 
                className="rounded-xl p-4 border"
                style={{ background: darkMode ? '#1E293B' : 'white', borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}
              >
                <p className={`text-3xl font-bold text-yellow-500`}>{employeesData.filter(e => e.status === 'on leave').length}</p>
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>On Leave</p>
              </div>
              <div 
                className="rounded-xl p-4 border"
                style={{ background: darkMode ? '#1E293B' : 'white', borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}
              >
                <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>8</p>
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>Departments</p>
              </div>
            </div>

            <div 
              className="rounded-2xl p-6 border"
              style={{
                background: darkMode ? '#1E293B' : 'white',
                borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'
              }}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`border-b ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
                      <th className={`text-left py-3 px-4 text-sm font-medium ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Name</th>
                      <th className={`text-left py-3 px-4 text-sm font-medium ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Role</th>
                      <th className={`text-left py-3 px-4 text-sm font-medium ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Department</th>
                      <th className={`text-left py-3 px-4 text-sm font-medium ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Phone</th>
                      <th className={`text-left py-3 px-4 text-sm font-medium ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Shift</th>
                      <th className={`text-left py-3 px-4 text-sm font-medium ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Status</th>
                      <th className={`text-left py-3 px-4 text-sm font-medium ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeesData.map((emp) => (
                      <tr key={emp.id} className={`border-b ${darkMode ? 'border-white/10' : 'border-gray-100'}`}>
                        <td className={`py-3 px-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{emp.name}</td>
                        <td className={`py-3 px-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{emp.role}</td>
                        <td className={`py-3 px-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{emp.department}</td>
                        <td className={`py-3 px-4 ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>{emp.phone}</td>
                        <td className={`py-3 px-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{emp.shift}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs ${emp.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                            {emp.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-600'} hover:underline`}>
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : activeCategory === 'Accounting' ? (
          <>
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div 
                className="rounded-xl p-6 border"
                style={{ background: darkMode ? '#1E293B' : 'white', borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}
              >
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'} mb-2`}>Total Income</p>
                <p className={`text-3xl font-bold text-green-500`}>{accountingData.totalIncome}</p>
              </div>
              <div 
                className="rounded-xl p-6 border"
                style={{ background: darkMode ? '#1E293B' : 'white', borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}
              >
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'} mb-2`}>Total Costs</p>
                <p className={`text-3xl font-bold text-red-500`}>{accountingData.totalCosts}</p>
              </div>
              <div 
                className="rounded-xl p-6 border"
                style={{ background: darkMode ? '#1E293B' : 'white', borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}
              >
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'} mb-2`}>Net Profit</p>
                <p className={`text-3xl font-bold text-blue-500`}>{accountingData.netProfit}</p>
              </div>
              <div 
                className="rounded-xl p-6 border"
                style={{ background: darkMode ? '#1E293B' : 'white', borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}
              >
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'} mb-2`}>Profit Margin</p>
                <p className="text-3xl font-bold text-green-500">46%</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div 
                className="rounded-2xl p-6 border"
                style={{
                  background: darkMode ? '#1E293B' : 'white',
                  borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'
                }}
              >
                <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Expenses Breakdown
                </h3>
                <div className="space-y-4">
                  {accountingData.expenses.map((exp, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>{exp.category}</span>
                        <span className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>{exp.amount}</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-700">
                        <div 
                          className="h-2 rounded-full bg-red-500" 
                          style={{ width: `${exp.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div 
                className="rounded-2xl p-6 border"
                style={{
                  background: darkMode ? '#1E293B' : 'white',
                  borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'
                }}
              >
                <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Income Sources
                </h3>
                <div className="space-y-4">
                  {accountingData.incomeSources.map((inc, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>{inc.source}</span>
                        <span className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>{inc.amount}</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-700">
                        <div 
                          className="h-2 rounded-full bg-green-500" 
                          style={{ width: `${inc.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<LogoutScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sheep" element={<SheepProfile />} />
        <Route path="/fish" element={<FishProfile />} />
        <Route path="/vegetable" element={<VegetableProfile />} />
        <Route path="/demonstration" element={<DemoProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;