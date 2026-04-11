import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sprout, Sun, Moon, LayoutDashboard, ShoppingCart, Users, Settings, DollarSign, ArrowUpRight, ArrowDownRight, ArrowLeft, LogOut, UserPlus, X, Package, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import api from './services/api';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
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
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [employeesLoading, setEmployeesLoading] = useState(true);
  const [txSummary, setTxSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [animalGroups, setAnimalGroups] = useState([]);
  const [cropSeasons, setCropSeasons] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [inventoryLoading, setInventoryLoading] = useState(true);

  // Build display info from real logged-in user
  const currentUser = {
    name: user?.name || 'User',
    email: user?.email || '',
    role: user?.roles?.[0]?.name
      ? user.roles[0].name.charAt(0).toUpperCase() + user.roles[0].name.slice(1)
      : 'Staff',
    avatar: user?.name
      ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
      : '??',
  };

  // Fetch live dashboard stats from API
  useEffect(() => {
    api.get('/dashboard/stats')
      .then(res => setStats(res.data))
      .catch(() => setStats(null))
      .finally(() => setStatsLoading(false));
  }, []);

  // Fetch employees
  useEffect(() => {
    api.get('/employees')
      .then(res => setEmployees(res.data.data ?? res.data))
      .catch(() => setEmployees([]))
      .finally(() => setEmployeesLoading(false));
  }, []);

  // Fetch transaction summary and recent transactions
  useEffect(() => {
    api.get('/transactions/summary').then(res => setTxSummary(res.data)).catch(() => {});
    api.get('/transactions').then(res => setTransactions(res.data.data ?? res.data)).catch(() => {});
  }, []);

  // Fetch operations data
  useEffect(() => {
    api.get('/animal-groups').then(res => setAnimalGroups(res.data.data ?? res.data)).catch(() => {});
    api.get('/crop-seasons').then(res => setCropSeasons(res.data.data ?? res.data)).catch(() => {});
  }, []);

  // Fetch inventory
  useEffect(() => {
    Promise.all([
      api.get('/inventory-items').then(res => setInventoryItems(res.data.data ?? res.data)).catch(() => {}),
      api.get('/purchase-orders').then(res => setPurchaseOrders(res.data.data ?? res.data)).catch(() => {}),
    ]).finally(() => setInventoryLoading(false));
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleSwitchAccount = async () => {
    await logout();
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
    {
      name: 'Inventory',
      subtext: 'Stock, supplies & purchase orders',
      icon: Package,
      bgColor: darkMode ? '#1E3A5F' : '#EFF6FF',
      iconColor: '#3B82F6',
    },
  ];

  // KPI cards — built from live API data
  const kpis = [
    {
      label: 'Total Animals',
      value: statsLoading ? '…' : (stats?.kpis?.total_animals ?? '—').toLocaleString(),
      icon: '🐄',
      color: '#10B981',
      sub: `${stats?.alerts?.upcoming_checkups ?? 0} checkups due`,
    },
    {
      label: 'Active Crop Seasons',
      value: statsLoading ? '…' : (stats?.kpis?.active_crop_seasons ?? '—'),
      icon: '🌾',
      color: '#FBBF24',
      sub: `${stats?.alerts?.upcoming_harvests ?? 0} harvests soon`,
    },
    {
      label: 'Monthly Revenue',
      value: statsLoading ? '…' : `KSh ${((stats?.kpis?.monthly_income ?? 0) / 1000).toFixed(0)}K`,
      icon: '💰',
      color: '#8B5CF6',
      sub: `Profit: KSh ${((stats?.kpis?.monthly_profit ?? 0) / 1000).toFixed(0)}K`,
    },
    {
      label: 'Low Stock Items',
      value: statsLoading ? '…' : (stats?.kpis?.low_stock_items ?? '—'),
      icon: '📦',
      color: '#F97316',
      sub: 'Need reordering',
    },
    {
      label: 'Active Employees',
      value: statsLoading ? '…' : (stats?.kpis?.active_employees ?? '—'),
      icon: '👥',
      color: '#EC4899',
      sub: `${stats?.alerts?.pending_leaves ?? 0} leave requests`,
    },
    {
      label: 'Monthly Expenses',
      value: statsLoading ? '…' : `KSh ${((stats?.kpis?.monthly_expense ?? 0) / 1000).toFixed(0)}K`,
      icon: '📉',
      color: '#3B82F6',
      sub: 'This month',
    },
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

  // operationsData from real API
  const operationsData = {
    livestock: animalGroups.map(g => ({
      name: g.name,
      count: g.animals_count ?? g.total_count ?? '—',
      status: g.status || 'healthy',
    })),
    crops: cropSeasons.map(s => ({
      name: s.crop_type?.name ?? '—',
      hectares: s.area_planted ?? '—',
      status: s.status || 'growing',
    })),
    tasks: [],
  };

  // salesData from real transactions
  const salesData = transactions.slice(0, 10).map(tx => ({
    id: `TXN-${tx.id}`,
    customer: tx.account?.name || '—',
    item: tx.description || tx.category || '—',
    amount: `KSh ${Number(tx.amount).toLocaleString()}`,
    date: tx.date || '—',
    status: tx.type === 'income' ? 'Completed' : 'Expense',
  }));

  // employeesData is now fetched from /api/employees (mapped for display)
  const employeesData = employees.map(emp => ({
    id: emp.id,
    name: `${emp.first_name ?? ''} ${emp.last_name ?? ''}`.trim() || '—',
    role: emp.job_title || '—',
    department: emp.department?.name || '—',
    phone: emp.phone || '—',
    status: emp.status || 'inactive',
    shift: emp.salary_type === 'daily' ? 'Day' : emp.salary_type === 'monthly' ? 'Full-time' : '—',
  }));

  // accountingData from real /api/transactions/summary
  const fmtKsh = (n) => `KSh ${Number(n ?? 0).toLocaleString()}`;
  const byModule = txSummary?.by_module ?? [];
  const expenseModules = byModule.filter(r => r.type === 'expense');
  const incomeModules = byModule.filter(r => r.type === 'income');
  const totalExpense = expenseModules.reduce((s, r) => s + Number(r.total), 0) || 1;
  const totalIncome = incomeModules.reduce((s, r) => s + Number(r.total), 0) || 1;
  const accountingData = {
    totalIncome: fmtKsh(txSummary?.income ?? stats?.kpis?.monthly_income),
    totalCosts: fmtKsh(txSummary?.expense ?? stats?.kpis?.monthly_expense),
    netProfit: fmtKsh(txSummary?.profit ?? stats?.kpis?.monthly_profit),
    expenses: expenseModules.map(e => ({
      category: (e.module ?? 'general').charAt(0).toUpperCase() + (e.module ?? 'general').slice(1),
      amount: fmtKsh(e.total),
      percentage: Math.round((Number(e.total) / totalExpense) * 100),
    })),
    incomeSources: incomeModules.map(e => ({
      source: (e.module ?? 'general').charAt(0).toUpperCase() + (e.module ?? 'general').slice(1),
      amount: fmtKsh(e.total),
      percentage: Math.round((Number(e.total) / totalIncome) * 100),
    })),
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#0F172A]' : 'bg-gray-100'}`}>
      <nav className={`border-b px-8 py-4 flex items-center justify-between transition-colors duration-300 ${darkMode ? 'bg-[#1E293B] border-white/10' : 'bg-white border-gray-200'}`}>
        <div className="flex-1 flex items-center">
          {activeCategory ? (
            <button 
              onClick={() => setActiveCategory(null)}
              className={`flex items-center gap-2 hover:opacity-80 transition-colors ${darkMode ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
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
            <div className="grid grid-cols-6 gap-6 mb-8">
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
                  {cat.name === 'Inventory' && stats?.kpis?.low_stock_items > 0 && (
                    <span className="mt-2 px-2 py-0.5 rounded-full text-xs bg-red-500/20 text-red-400 block text-center">
                      {stats.kpis.low_stock_items} low stock
                    </span>
                  )}
                  {cat.name === 'Employees' && stats?.alerts?.pending_leaves > 0 && (
                    <span className="mt-2 px-2 py-0.5 rounded-full text-xs bg-yellow-500/20 text-yellow-400 block text-center">
                      {stats.alerts.pending_leaves} leave pending
                    </span>
                  )}
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
              {kpis.map((kpi, index) => (
                <motion.div
                  key={kpi.label}
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
                    <span className="text-2xl">{kpi.icon}</span>
                    <span className="text-xs" style={{ color: kpi.color }}>
                      {statsLoading ? '…' : kpi.sub}
                    </span>
                  </div>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {kpi.value}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                    {kpi.label}
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
                  Monthly Income Trend (KSh)
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats?.charts?.income_trend?.map(r => ({ name: r.month, total: Number(r.total) })) ?? []}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'} />
                      <XAxis dataKey="name" stroke={darkMode ? '#666' : '#888'} fontSize={12} />
                      <YAxis stroke={darkMode ? '#666' : '#888'} fontSize={12} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
                      <Tooltip
                        contentStyle={{ backgroundColor: darkMode ? '#1E293B' : 'white', border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e5e5e5', borderRadius: '12px' }}
                        labelStyle={{ color: darkMode ? '#fff' : '#000' }}
                        formatter={v => [`KSh ${Number(v).toLocaleString()}`, 'Income']}
                      />
                      <Bar dataKey="total" fill="url(#greenGlow)" radius={[8, 8, 0, 0]} />
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
                  Weekly Animal Production
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats?.charts?.weekly_production?.map(r => ({ name: r.production_type, total: Number(r.total) })) ?? []}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'} />
                      <XAxis dataKey="name" stroke={darkMode ? '#666' : '#888'} fontSize={12} />
                      <YAxis stroke={darkMode ? '#666' : '#888'} fontSize={12} />
                      <Tooltip
                        contentStyle={{ backgroundColor: darkMode ? '#1E293B' : 'white', border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e5e5e5', borderRadius: '12px' }}
                        labelStyle={{ color: darkMode ? '#fff' : '#000' }}
                      />
                      <Bar dataKey="total" fill="url(#blueGlow)" radius={[8, 8, 0, 0]} />
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
            {/* Alert banners from dashboard data */}
            {(stats?.alerts?.upcoming_checkups > 0 || stats?.alerts?.upcoming_harvests > 0) && (
              <div className="grid grid-cols-2 gap-4 mb-6">
                {stats.alerts.upcoming_checkups > 0 && (
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                    <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0" />
                    <span className={`text-sm ${darkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>
                      {stats.alerts.upcoming_checkups} animal checkup(s) due in the next 7 days
                    </span>
                  </div>
                )}
                {stats.alerts.upcoming_harvests > 0 && (
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20">
                    <Sprout className="w-4 h-4 text-green-400 shrink-0" />
                    <span className={`text-sm ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
                      {stats.alerts.upcoming_harvests} crop season(s) ready to harvest within 7 days
                    </span>
                  </div>
                )}
              </div>
            )}

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
                  {operationsData.livestock.length === 0 ? (
                    <p className={`text-sm text-center py-6 ${darkMode ? 'text-white/40' : 'text-gray-400'}`}>No animal groups recorded yet.</p>
                  ) : operationsData.livestock.map((animal, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }}>
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{animal.name}</p>
                        <p className={`text-sm ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>{animal.count} animals</p>
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
                  {operationsData.crops.length === 0 ? (
                    <p className={`text-sm text-center py-6 ${darkMode ? 'text-white/40' : 'text-gray-400'}`}>No active crop seasons.</p>
                  ) : operationsData.crops.map((crop, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }}>
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{crop.name}</p>
                        <p className={`text-sm ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>{crop.hectares} ha planted</p>
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
                {operationsData.tasks.length === 0 && (
                  <p className={`text-sm text-center py-6 ${darkMode ? 'text-white/40' : 'text-gray-400'}`}>No tasks for today.</p>
                )}
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
            {stats?.alerts?.pending_leaves > 0 && (
              <div className="flex items-center gap-3 mb-6 px-4 py-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0" />
                <span className={`text-sm ${darkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>
                  {stats.alerts.pending_leaves} leave request(s) pending approval.
                </span>
              </div>
            )}
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
                <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{new Set(employeesData.map(e => e.department).filter(d => d && d !== '—')).size || '—'}</p>
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
                    {employeesLoading ? (
                      <tr><td colSpan={7} className={`py-8 text-center text-sm ${darkMode ? 'text-white/40' : 'text-gray-400'}`}>Loading employees…</td></tr>
                    ) : employeesData.length === 0 ? (
                      <tr><td colSpan={7} className={`py-8 text-center text-sm ${darkMode ? 'text-white/40' : 'text-gray-400'}`}>No employees found.</td></tr>
                    ) : employeesData.map((emp) => (
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
                <p className="text-3xl font-bold text-green-500">
                  {txSummary?.income > 0 ? `${Math.round((txSummary.profit / txSummary.income) * 100)}%` : stats?.kpis?.monthly_income > 0 ? `${Math.round((stats.kpis.monthly_profit / stats.kpis.monthly_income) * 100)}%` : '—'}
                </p>
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
                  {accountingData.expenses.length === 0 ? (
                    <p className={`text-sm text-center py-6 ${darkMode ? 'text-white/40' : 'text-gray-400'}`}>No expense records this month.</p>
                  ) : accountingData.expenses.map((exp, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>{exp.category}</span>
                        <span className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>{exp.amount}</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-700">
                        <div className="h-2 rounded-full bg-red-500" style={{ width: `${exp.percentage}%` }} />
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
                  {accountingData.incomeSources.length === 0 ? (
                    <p className={`text-sm text-center py-6 ${darkMode ? 'text-white/40' : 'text-gray-400'}`}>No income records this month.</p>
                  ) : accountingData.incomeSources.map((inc, index) => (
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
        ) : activeCategory === 'Inventory' ? (
          <>
            {/* KPI row */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Items', value: inventoryLoading ? '…' : inventoryItems.length, color: 'text-blue-400' },
                { label: 'Low Stock', value: inventoryLoading ? '…' : inventoryItems.filter(i => Number(i.quantity) <= Number(i.min_stock_level)).length, color: 'text-red-400' },
                { label: 'Purchase Orders', value: inventoryLoading ? '…' : purchaseOrders.length, color: 'text-purple-400' },
                { label: 'Pending Orders', value: inventoryLoading ? '…' : purchaseOrders.filter(o => o.status === 'pending').length, color: 'text-yellow-400' },
              ].map((kpi, i) => (
                <div key={i} className="rounded-xl p-6 border" style={{ background: darkMode ? '#1E293B' : 'white', borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}>
                  <p className={`text-3xl font-bold ${kpi.color}`}>{kpi.value}</p>
                  <p className={`text-sm mt-1 ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>{kpi.label}</p>
                </div>
              ))}
            </div>

            {/* Low stock alert banner */}
            {!inventoryLoading && inventoryItems.filter(i => Number(i.quantity) <= Number(i.min_stock_level)).length > 0 && (
              <div className="flex items-center gap-3 mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                <span className={`text-sm ${darkMode ? 'text-red-300' : 'text-red-600'}`}>
                  {inventoryItems.filter(i => Number(i.quantity) <= Number(i.min_stock_level)).length} item(s) are at or below minimum stock level and need reordering.
                </span>
              </div>
            )}

            <div className="grid grid-cols-3 gap-8">
              {/* Inventory items table */}
              <div className="col-span-2 rounded-2xl p-6 border" style={{ background: darkMode ? '#1E293B' : 'white', borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Stock Items</h3>
                  <button className="px-4 py-2 rounded-lg text-sm bg-blue-500 text-white hover:bg-blue-600">+ Add Item</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`border-b ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
                        {['Item', 'SKU', 'Qty', 'Unit', 'Min Level', 'Unit Price', 'Status'].map(h => (
                          <th key={h} className={`text-left py-3 px-3 text-xs font-medium ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {inventoryLoading ? (
                        <tr><td colSpan={7} className={`py-8 text-center text-sm ${darkMode ? 'text-white/40' : 'text-gray-400'}`}>Loading…</td></tr>
                      ) : inventoryItems.length === 0 ? (
                        <tr><td colSpan={7} className={`py-8 text-center text-sm ${darkMode ? 'text-white/40' : 'text-gray-400'}`}>No inventory items yet.</td></tr>
                      ) : inventoryItems.map(item => {
                        const isLow = Number(item.quantity) <= Number(item.min_stock_level);
                        return (
                          <tr key={item.id} className={`border-b ${darkMode ? 'border-white/10' : 'border-gray-100'}`}>
                            <td className={`py-3 px-3 text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{item.name}</td>
                            <td className={`py-3 px-3 text-xs ${darkMode ? 'text-white/50' : 'text-gray-400'}`}>{item.sku || '—'}</td>
                            <td className={`py-3 px-3 text-sm font-bold ${isLow ? 'text-red-400' : darkMode ? 'text-white' : 'text-gray-800'}`}>{Number(item.quantity).toFixed(0)}</td>
                            <td className={`py-3 px-3 text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>{item.unit}</td>
                            <td className={`py-3 px-3 text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>{Number(item.min_stock_level).toFixed(0)}</td>
                            <td className={`py-3 px-3 text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>KSh {Number(item.unit_price).toLocaleString()}</td>
                            <td className="py-3 px-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${isLow ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                                {isLow ? 'Low Stock' : 'In Stock'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Purchase orders panel */}
              <div className="rounded-2xl p-6 border" style={{ background: darkMode ? '#1E293B' : 'white', borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Purchase Orders</h3>
                  <button className="px-3 py-1 rounded-lg text-xs bg-purple-500 text-white hover:bg-purple-600">+ New PO</button>
                </div>
                <div className="space-y-3">
                  {inventoryLoading ? (
                    <p className={`text-sm text-center py-6 ${darkMode ? 'text-white/40' : 'text-gray-400'}`}>Loading…</p>
                  ) : purchaseOrders.length === 0 ? (
                    <p className={`text-sm text-center py-6 ${darkMode ? 'text-white/40' : 'text-gray-400'}`}>No purchase orders yet.</p>
                  ) : purchaseOrders.slice(0, 8).map(po => (
                    <div key={po.id} className="p-3 rounded-lg border" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.08)' : '#e5e5e5', background: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.01)' }}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>PO-{String(po.id).padStart(4, '0')}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          po.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                          po.status === 'approved' ? 'bg-blue-500/20 text-blue-400' :
                          po.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>{po.status}</span>
                      </div>
                      <p className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>{po.supplier?.name || '—'}</p>
                      <p className={`text-sm font-semibold mt-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>KSh {Number(po.total_amount).toLocaleString()}</p>
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
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/logout" element={<LogoutScreen />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/sheep" element={<ProtectedRoute><SheepProfile /></ProtectedRoute>} />
        <Route path="/fish" element={<ProtectedRoute><FishProfile /></ProtectedRoute>} />
        <Route path="/vegetable" element={<ProtectedRoute><VegetableProfile /></ProtectedRoute>} />
        <Route path="/demonstration" element={<ProtectedRoute><DemoProfile /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;