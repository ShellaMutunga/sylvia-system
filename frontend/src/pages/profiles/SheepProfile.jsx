import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sprout, Sun, Moon, ArrowLeft, Thermometer, Heart, Utensils, ClipboardList, TrendingUp, AlertCircle, LogOut, UserPlus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function SheepProfile() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const currentUser = {
    name: 'Sheep',
    email: 'sheep@redhill.com',
    role: 'Sheep Manager',
    avatar: 'SH'
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

  const flockStats = {
    total: 245,
    lambs: 45,
    ewes: 150,
    rams: 50,
    thisMonth: '+12'
  };

  const healthData = [
    { name: 'Healthy', value: 220, color: '#22c55e' },
    { name: 'Under Observation', value: 18, color: '#f59e0b' },
    { name: 'Needs Attention', value: 7, color: '#ef4444' },
  ];

  const feedData = [
    { day: 'Mon', consumed: 120, cost: 2400 },
    { day: 'Tue', consumed: 115, cost: 2300 },
    { day: 'Wed', consumed: 125, cost: 2500 },
    { day: 'Thu', consumed: 118, cost: 2360 },
    { day: 'Fri', consumed: 122, cost: 2440 },
    { day: 'Sat', consumed: 110, cost: 2200 },
    { day: 'Sun', consumed: 108, cost: 2160 },
  ];

  const dailyRecords = [
    { id: 1, time: '6:00 AM', activity: 'Morning feeding completed', notes: 'All sheep fed', status: 'completed' },
    { id: 2, time: '8:00 AM', activity: 'Health check - Barn A', notes: '3 ewes showing signs of bloating', status: 'completed' },
    { id: 3, time: '10:00 AM', activity: 'Movement to grazing field', notes: 'Moved to Field 3', status: 'completed' },
    { id: 4, time: '12:00 PM', activity: 'Water refill', notes: 'Fresh water provided', status: 'completed' },
    { id: 5, time: '2:00 PM', activity: 'Afternoon feeding', notes: 'Pending', status: 'pending' },
    { id: 6, time: '4:00 PM', activity: 'Evening pen check', notes: 'Pending', status: 'pending' },
  ];

  const ageGroups = [
    { group: 'Lambs (0-3 months)', count: 45, avgWeight: '4-8 kg', health: 'Good' },
    { group: 'Growers (3-6 months)', count: 38, avgWeight: '15-25 kg', health: 'Good' },
    { group: 'Junior (6-12 months)', count: 52, avgWeight: '25-35 kg', health: 'Good' },
    { group: 'Adult Ewes (1-3 years)', count: 95, avgWeight: '45-60 kg', health: 'Excellent' },
    { group: 'Mature Ewes (3+ years)', count: 55, avgWeight: '50-65 kg', health: 'Good' },
    { group: 'Rams', count: 50, avgWeight: '60-90 kg', health: 'Good' },
  ];

  const sections = [
    { name: 'Flock Overview', icon: TrendingUp, color: '#22c55e', subtext: 'Total flock statistics' },
    { name: 'Health', icon: Heart, color: '#ef4444', subtext: 'Health status & records' },
    { name: 'Livestock Feed', icon: Utensils, color: '#f59e0b', subtext: 'Feed consumption & costs' },
    { name: 'Daily Records', icon: ClipboardList, color: '#3b82f6', subtext: 'Daily activities log' },
    { name: 'Age Groups', icon: Thermometer, color: '#8b5cf6', subtext: 'Growth & weight tracking' },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#0F172A]' : 'bg-gray-100'}`}>
      <nav className={`border-b px-8 py-4 flex items-center justify-between transition-colors duration-300 ${darkMode ? 'bg-[#064E3B] border-white/10' : 'bg-[#ECFDF5] border-green-200'}`}>
        <div className="flex-1 flex items-center">
          {activeSection ? (
            <button 
              onClick={() => setActiveSection(null)}
              className={`flex items-center gap-2 ${darkMode ? 'text-white/60 hover:text-white' : 'text-green-800 hover:text-green-900'} transition-colors`}
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
                    Welcome, {currentUser.name}
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
          <span className={`text-xl font-semibold tracking-wider ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {activeSection ? activeSection : 'SHEEP PROFILE'}
          </span>
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
        {!activeSection ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-5 gap-4 mb-8">
              <div 
                className="rounded-xl p-4 border"
                style={{ background: darkMode ? '#1E293B' : 'white', borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}
              >
                <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{flockStats.total}</p>
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>Total Flock</p>
              </div>
              <div 
                className="rounded-xl p-4 border"
                style={{ background: darkMode ? '#1E293B' : 'white', borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}
              >
                <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{flockStats.lambs}</p>
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>Lambs</p>
              </div>
              <div 
                className="rounded-xl p-4 border"
                style={{ background: darkMode ? '#1E293B' : 'white', borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}
              >
                <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{flockStats.ewes}</p>
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>Ewes</p>
              </div>
              <div 
                className="rounded-xl p-4 border"
                style={{ background: darkMode ? '#1E293B' : 'white', borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}
              >
                <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{flockStats.rams}</p>
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>Rams</p>
              </div>
              <div 
                className="rounded-xl p-4 border"
                style={{ background: darkMode ? '#1E293B' : 'white', borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}
              >
                <p className={`text-3xl font-bold text-green-500`}>{flockStats.thisMonth}</p>
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>New This Month</p>
              </div>
            </div>

            {/* Section Cards */}
            <div className="grid grid-cols-5 gap-6 mb-8">
              {sections.map((section) => (
                <motion.div
                  key={section.name}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveSection(section.name)}
                  className="rounded-[12px] p-6 cursor-pointer"
                  style={{
                    background: section.color,
                    boxShadow: `0 0 30px -5px ${section.color}30`,
                  }}
                >
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      boxShadow: `0 0 20px -5px ${section.color}60`,
                    }}
                  >
                    <section.icon className="w-7 h-7 text-white" />
                  </div>
                  <p className="font-semibold text-center text-base text-white">
                    {section.name}
                  </p>
                  <p className="text-center text-xs mt-1 text-white/70">
                    {section.subtext}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Quick Chart - Feed */}
            <div className="grid grid-cols-2 gap-8">
              <div 
                className="rounded-2xl p-6 border"
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
                    <BarChart data={feedData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'} />
                      <XAxis dataKey="day" stroke={darkMode ? '#666' : '#888'} fontSize={12} />
                      <YAxis stroke={darkMode ? '#666' : '#888'} fontSize={12} />
                      <Tooltip
                        contentStyle={{ backgroundColor: darkMode ? '#1E293B' : 'white', border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e5e5e5', borderRadius: '12px' }}
                        labelStyle={{ color: darkMode ? '#fff' : '#000' }}
                      />
                      <Bar dataKey="consumed" fill="#22c55e" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Health Status */}
              <div 
                className="rounded-2xl p-6 border"
                style={{
                  background: darkMode ? '#1E293B' : 'white',
                  borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'
                }}
              >
                <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Health Status
                </h3>
                <div className="space-y-4">
                  {healthData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ background: item.color }} />
                        <span className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>{item.name}</span>
                      </div>
                      <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : activeSection === 'Flock Overview' ? (
          <>
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className={`rounded-xl p-6 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{ borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}>
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'} mb-2`}>Total Sheep</p>
                <p className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>245</p>
                <p className="text-green-500 text-sm mt-2">+12 this month</p>
              </div>
              <div className={`rounded-xl p-6 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{ borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}>
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'} mb-2`}>Lambs</p>
                <p className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>45</p>
              </div>
              <div className={`rounded-xl p-6 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{ borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}>
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'} mb-2`}>Ewes</p>
                <p className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>150</p>
              </div>
              <div className={`rounded-xl p-6 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{ borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}>
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'} mb-2`}>Rams</p>
                <p className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>50</p>
              </div>
            </div>
            <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{ borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}>
              <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Monthly Growth Trend</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[{month: 'Jan', count: 210}, {month: 'Feb', count: 218}, {month: 'Mar', count: 225}, {month: 'Apr', count: 245}]}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'} />
                    <XAxis dataKey="month" stroke={darkMode ? '#666' : '#888'} />
                    <YAxis stroke={darkMode ? '#666' : '#888'} />
                    <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1E293B' : 'white', borderRadius: '12px' }} />
                    <Bar dataKey="count" fill="#22c55e" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        ) : activeSection === 'Health' ? (
          <>
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className={`rounded-xl p-6 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{ borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}>
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-6 h-6 text-green-500" />
                  <span className={`text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>Healthy</span>
                </div>
                <p className={`text-3xl font-bold text-green-500`}>220</p>
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>89.8% of flock</p>
              </div>
              <div className={`rounded-xl p-6 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{ borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}>
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-yellow-500" />
                  <span className={`text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>Under Observation</span>
                </div>
                <p className={`text-3xl font-bold text-yellow-500`}>18</p>
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>7.3% of flock</p>
              </div>
              <div className={`rounded-xl p-6 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{ borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}>
                <div className="flex items-center gap-3 mb-4">
                  <Thermometer className="w-6 h-6 text-red-500" />
                  <span className={`text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>Needs Attention</span>
                </div>
                <p className={`text-3xl font-bold text-red-500`}>7</p>
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>2.9% of flock</p>
              </div>
            </div>
            <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{ borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}>
              <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Health Issues Report</h3>
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-red-500/10' : 'bg-red-50'}`}>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Bloating (3 ewes)</p>
                  <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>Barn A - Treatment in progress</p>
                </div>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-yellow-500/10' : 'bg-yellow-50'}`}>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Lameness (4 sheep)</p>
                  <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>Various pens - Being monitored</p>
                </div>
              </div>
            </div>
          </>
        ) : activeSection === 'Livestock Feed' ? (
          <>
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className={`rounded-xl p-6 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{ borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}>
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'} mb-2`}>Daily Consumption</p>
                <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>818 kg</p>
              </div>
              <div className={`rounded-xl p-6 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{ borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}>
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'} mb-2`}>Weekly Total</p>
                <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>5,726 kg</p>
              </div>
              <div className={`rounded-xl p-6 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{ borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}>
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'} mb-2`}>Cost This Week</p>
                <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>KSh 114,520</p>
              </div>
              <div className={`rounded-xl p-6 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{ borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}>
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'} mb-2`}>Cost Per Kg</p>
                <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>KSh 20</p>
              </div>
            </div>
            <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{ borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}>
              <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Daily Feed Chart</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={feedData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'} />
                    <XAxis dataKey="day" stroke={darkMode ? '#666' : '#888'} />
                    <YAxis stroke={darkMode ? '#666' : '#888'} />
                    <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1E293B' : 'white', borderRadius: '12px' }} />
                    <Bar dataKey="consumed" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        ) : activeSection === 'Daily Records' ? (
          <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{ borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}>
            <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Today's Activity Log</h3>
            <div className="space-y-4">
              {dailyRecords.map((record) => (
                <div 
                  key={record.id}
                  className={`flex items-center justify-between p-4 rounded-lg border ${record.status === 'completed' ? 'opacity-60' : ''}`}
                  style={{ 
                    background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                    borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'
                  }}
                >
                  <div>
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{record.activity}</p>
                    <p className={`text-sm ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>{record.notes}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>{record.time}</p>
                    <span className={`px-3 py-1 rounded-full text-xs ${record.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {record.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeSection === 'Age Groups' ? (
          <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{ borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}>
            <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Age Groups & Weight Distribution</h3>
            <table className="w-full">
              <thead>
                <tr className={`border-b ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
                  <th className={`text-left py-3 text-sm font-medium ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Group</th>
                  <th className={`text-left py-3 text-sm font-medium ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Count</th>
                  <th className={`text-left py-3 text-sm font-medium ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Avg Weight</th>
                  <th className={`text-left py-3 text-sm font-medium ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Health Status</th>
                </tr>
              </thead>
              <tbody>
                {ageGroups.map((group, index) => (
                  <tr key={index} className={`border-b ${darkMode ? 'border-white/10' : 'border-gray-100'}`}>
                    <td className={`py-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{group.group}</td>
                    <td className={`py-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{group.count}</td>
                    <td className={`py-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{group.avgWeight} kg</td>
                    <td className="py-3">
                      <span className={`px-3 py-1 rounded-full text-xs ${group.health === 'Excellent' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                        {group.health}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </main>
    </div>
  );
}

export default SheepProfile;