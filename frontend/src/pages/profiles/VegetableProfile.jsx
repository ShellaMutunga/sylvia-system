import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sprout, Sun, Moon, ArrowLeft, Sprout as Plant, Droplets, Sun as Weather, TrendingUp, Calendar, LogOut, UserPlus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function VegetableProfile() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const currentUser = {
    name: 'Vegetable',
    email: 'vegetable@redhill.com',
    role: 'Crop Manager',
    avatar: 'VG'
  };

  const handleLogout = () => navigate('/login');
  const handleSwitchAccount = () => navigate('/login');
  const handleCloseSystem = () => navigate('/logout');

  const cropStats = {
    total: 12,
    hectares: 28,
    ready: 4,
    growing: 8
  };

  const crops = [
    { name: 'Tomatoes', hectares: 5, status: 'Ready', yield: '2,500 kg', daysLeft: 0 },
    { name: 'Kale', hectares: 4, status: 'Growing', yield: '1,800 kg', daysLeft: 14 },
    { name: 'Spinach', hectares: 3, status: 'Growing', yield: '1,200 kg', daysLeft: 10 },
    { name: 'Carrots', hectares: 6, status: 'Growing', yield: '3,000 kg', daysLeft: 21 },
    { name: 'Onions', hectares: 4, status: 'Ready', yield: '2,000 kg', daysLeft: 0 },
    { name: 'Peppers', hectares: 6, status: 'Growing', yield: '1,500 kg', daysLeft: 18 },
  ];

  const harvestData = [
    { month: 'Jan', yield: 1200 },
    { month: 'Feb', yield: 1500 },
    { month: 'Mar', yield: 1800 },
    { month: 'Apr', yield: 2100 },
  ];

  const sections = [
    { name: 'Crop Overview', icon: Plant, color: '#22c55e', subtext: 'All crops status' },
    { name: 'Irrigation', icon: Droplets, color: '#3b82f6', subtext: 'Water management' },
    { name: 'Harvest', icon: Calendar, color: '#f59e0b', subtext: 'Harvest schedule' },
    { name: 'Weather', icon: Weather, color: '#8b5cf6', subtext: 'Weather impact' },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#0F172A]' : 'bg-gray-100'}`}>
      <nav className={`border-b px-8 py-4 flex items-center justify-between ${darkMode ? 'bg-[#14532D] border-white/10' : 'bg-[#DCFCE7] border-green-200'}`}>
        <div className="flex-1 flex items-center">
          {activeSection ? (
            <button onClick={() => setActiveSection(null)} className={`flex items-center gap-2 ${darkMode ? 'text-white/60 hover:text-white' : 'text-gray-800 hover:text-gray-900'}`}>
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="relative">
              <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">{currentUser.avatar}</span>
                </div>
                <div className="flex flex-col">
                  <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Welcome, {currentUser.name}</span>
                  <span className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>{currentUser.email}</span>
                </div>
              </button>
              {showProfileMenu && (
                <div className="absolute top-14 left-0 w-48 rounded-lg shadow-lg border z-50" style={{ background: darkMode ? '#1E293B' : 'white', borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}>
                  <button onClick={handleLogout} className={`w-full flex items-center gap-3 text-left px-4 py-3 text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}><LogOut className="w-4 h-4" />Log Out</button>
                  <button onClick={handleSwitchAccount} className={`w-full flex items-center gap-3 text-left px-4 py-3 text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}><UserPlus className="w-4 h-4" />Switch Account</button>
                  <button onClick={handleCloseSystem} className={`w-full flex items-center gap-3 text-left px-4 py-3 text-sm ${darkMode ? 'text-red-400' : 'text-red-600'}`}><X className="w-4 h-4" />Close System</button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex-1 flex justify-center">
          <span className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {activeSection ? activeSection : 'VEGETABLE PROFILE'}
          </span>
        </div>
        <div className="flex-1 flex justify-end">
          <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-full ${darkMode ? 'bg-[#0F172A]/50' : 'bg-gray-100'}`}>
            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
          </button>
        </div>
      </nav>

      <main className="p-8">
        {!activeSection ? (
          <>
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className={`rounded-xl p-4 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'}}>
                <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{cropStats.total}</p>
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>Crop Types</p>
              </div>
              <div className={`rounded-xl p-4 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'}}>
                <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{cropStats.hectares}</p>
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>Total Hectares</p>
              </div>
              <div className={`rounded-xl p-4 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'}}>
                <p className={`text-3xl font-bold text-green-500`}>{cropStats.ready}</p>
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>Ready to Harvest</p>
              </div>
              <div className={`rounded-xl p-4 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'}}>
                <p className={`text-3xl font-bold text-blue-500`}>{cropStats.growing}</p>
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>Growing</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-8">
              {sections.map((section) => (
                <motion.div
                  key={section.name}
                  whileHover={{ scale: 1.02, y: -4 }}
                  onClick={() => setActiveSection(section.name)}
                  className="rounded-[12px] p-6 cursor-pointer"
                  style={{ background: section.color, boxShadow: `0 0 30px -5px ${section.color}30` }}
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(255,255,255,0.2)' }}>
                    <section.icon className="w-7 h-7 text-white" />
                  </div>
                  <p className="font-semibold text-center text-base text-white">{section.name}</p>
                  <p className="text-center text-xs mt-1 text-white/70">{section.subtext}</p>
                </motion.div>
              ))}
            </div>

            <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'}}>
              <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Crop Status</h3>
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
                    <th className={`text-left py-3 text-sm font-medium ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Crop</th>
                    <th className={`text-left py-3 text-sm font-medium ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Hectares</th>
                    <th className={`text-left py-3 text-sm font-medium ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Status</th>
                    <th className={`text-left py-3 text-sm font-medium ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Expected Yield</th>
                    <th className={`text-left py-3 text-sm font-medium ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Days Left</th>
                  </tr>
                </thead>
                <tbody>
                  {crops.map((crop, index) => (
                    <tr key={index} className={`border-b ${darkMode ? 'border-white/10' : 'border-gray-100'}`}>
                      <td className={`py-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{crop.name}</td>
                      <td className={`py-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{crop.hectares}</td>
                      <td className="py-3">
                        <span className={`px-3 py-1 rounded-full text-xs ${crop.status === 'Ready' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>{crop.status}</span>
                      </td>
                      <td className={`py-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{crop.yield}</td>
                      <td className={`py-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{crop.daysLeft === 0 ? 'Ready!' : `${crop.daysLeft} days`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : activeSection === 'Harvest' ? (
          <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'}}>
            <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Monthly Harvest Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={harvestData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'} />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1E293B' : 'white', borderRadius: '12px' }} />
                  <Bar dataKey="yield" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : activeSection === 'Irrigation' ? (
          <div className="grid grid-cols-3 gap-6">
            <div className={`rounded-xl p-6 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'}}>
              <p className={`text-3xl font-bold text-blue-500`}>12,000 L</p>
              <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>Daily Usage</p>
            </div>
            <div className={`rounded-xl p-6 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'}}>
              <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>84,000 L</p>
              <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>Weekly Total</p>
            </div>
            <div className={`rounded-xl p-6 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'}}>
              <p className={`text-3xl font-bold text-green-500`}>3</p>
              <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>Active Systems</p>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}

export default VegetableProfile;