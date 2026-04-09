import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sprout, Sun, Moon, LayoutDashboard, ShoppingCart, Users, TrendingUp, Wallet } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login';

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

function Dashboard() {
  const [darkMode, setDarkMode] = useState(true);

  const categories = [
    { name: 'Dashboard', icon: LayoutDashboard, color: '#2563EB', iconColor: '#2563EB' },
    { name: 'Operations', icon: TrendingUp, color: '#024D30', iconColor: '#024D30' },
    { name: 'Sales & Orders', icon: ShoppingCart, color: '#7C3AED', iconColor: '#7C3AED' },
    { name: 'Employees', icon: Users, color: '#EA580C', iconColor: '#EA580C' },
    { name: 'Accounting', icon: Wallet, color: '#0D9488', iconColor: '#0D9488' },
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

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#121212]' : 'bg-[#f5f5f5]'}`}>
      <nav className={`border-b px-8 py-4 flex items-center justify-between transition-colors duration-300 ${darkMode ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <span className={`text-xl font-semibold tracking-wider transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            REDHILL FARM
          </span>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full transition-all ${darkMode ? 'bg-[#2a2a2a] hover:bg-[#3a3a3a]' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </nav>

      <main className="p-8">
        <div className="grid grid-cols-5 gap-6 mb-8">
          {categories.map((cat) => (
            <motion.div
              key={cat.name}
              whileHover={{ scale: 1.02, y: -4 }}
              className="rounded-[12px] p-6 cursor-pointer backdrop-blur-md"
              style={{
                background: darkMode ? 'rgba(30, 30, 30, 0.7)' : 'rgba(255, 255, 255, 0.9)',
                border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                boxShadow: `0 0 30px -5px ${cat.color}40, inset 0 0 20px -10px ${cat.color}30`,
              }}
            >
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: cat.color,
                  boxShadow: `0 0 20px -5px ${cat.color}60`,
                }}
              >
                <cat.icon className="w-7 h-7 text-white" />
              </div>
              <p className={`font-medium text-center text-sm transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {cat.name}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div 
            className="rounded-2xl p-8 border transition-colors duration-300"
            style={{
              background: darkMode ? '#1a1a1a' : 'white',
              borderColor: darkMode ? '#2a2a2a' : '#e5e5e5'
            }}
          >
            <h3 className={`text-xl font-semibold mb-8 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Food Levels (kg)
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={foodData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#2a2a2a' : '#e5e5e5'} />
                  <XAxis dataKey="name" stroke={darkMode ? '#666' : '#888'} fontSize={12} />
                  <YAxis stroke={darkMode ? '#666' : '#888'} fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: darkMode ? '#1a1a1a' : 'white', border: `1px solid ${darkMode ? '#2a2a2a' : '#e5e5e5'}`, borderRadius: '12px' }}
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
            className="rounded-2xl p-8 border transition-colors duration-300"
            style={{
              background: darkMode ? '#1a1a1a' : 'white',
              borderColor: darkMode ? '#2a2a2a' : '#e5e5e5'
            }}
          >
            <h3 className={`text-xl font-semibold mb-8 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Water Levels (L)
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={waterData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#2a2a2a' : '#e5e5e5'} />
                  <XAxis dataKey="name" stroke={darkMode ? '#666' : '#888'} fontSize={12} />
                  <YAxis stroke={darkMode ? '#666' : '#888'} fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: darkMode ? '#1a1a1a' : 'white', border: `1px solid ${darkMode ? '#2a2a2a' : '#e5e5e5'}`, borderRadius: '12px' }}
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
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;