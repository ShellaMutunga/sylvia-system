import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sprout, Sun, Moon, ArrowLeft, Waves, Thermometer, Heart, Droplets, TrendingUp, AlertCircle, LogOut, UserPlus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function FishProfile() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const currentUser = {
    name: 'Fish',
    email: 'fish@redhill.com',
    role: 'Fish Manager',
    avatar: 'FI'
  };

  const handleLogout = () => navigate('/login');
  const handleSwitchAccount = () => navigate('/login');
  const handleCloseSystem = () => navigate('/logout');

  const pondStats = {
    total: 3500,
    tilapia: 2000,
    catfish: 1200,
    carp: 300,
    thisMonth: '+450'
  };

  const waterQuality = [
    { parameter: 'pH Level', value: '7.2', status: 'Good', range: '6.5-8.0' },
    { parameter: 'Dissolved Oxygen', value: '6.8 mg/L', status: 'Good', range: '5.0-8.0' },
    { parameter: 'Temperature', value: '24°C', status: 'Good', range: '22-28°C' },
    { parameter: 'Ammonia', value: '0.02 mg/L', status: 'Excellent', range: '<0.1' },
    { parameter: 'Nitrite', value: '0.05 mg/L', status: 'Good', range: '<0.1' },
  ];

  const feedingData = [
    { day: 'Mon', consumed: 45, cost: 9000 },
    { day: 'Tue', consumed: 42, cost: 8400 },
    { day: 'Wed', consumed: 48, cost: 9600 },
    { day: 'Thu', consumed: 44, cost: 8800 },
    { day: 'Fri', consumed: 46, cost: 9200 },
    { day: 'Sat', consumed: 40, cost: 8000 },
    { day: 'Sun', consumed: 38, cost: 7600 },
  ];

  const healthData = [
    { name: 'Healthy', value: 3350, color: '#22c55e' },
    { name: 'Under Observation', value: 120, color: '#f59e0b' },
    { name: 'Needs Attention', value: 30, color: '#ef4444' },
  ];

  const sections = [
    { name: 'Pond Overview', icon: Waves, color: '#3b82f6', subtext: 'Fish population stats' },
    { name: 'Water Quality', icon: Droplets, color: '#06b6d4', subtext: 'Water parameters' },
    { name: 'Fish Health', icon: Heart, color: '#ef4444', subtext: 'Health monitoring' },
    { name: 'Feeding Log', icon: TrendingUp, color: '#f59e0b', subtext: 'Feed consumption' },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#0F172A]' : 'bg-gray-100'}`}>
      <nav className={`border-b px-8 py-4 flex items-center justify-between ${darkMode ? 'bg-[#1E3A5F] border-white/10' : 'bg-[#E0F2FE] border-blue-200'}`}>
        <div className="flex-1 flex items-center">
          {activeSection ? (
            <button onClick={() => setActiveSection(null)} className={`flex items-center gap-2 ${darkMode ? 'text-white/60 hover:text-white' : 'text-gray-800 hover:text-gray-900'}`}>
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="relative">
              <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
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
            {activeSection ? activeSection : 'FISH PROFILE'}
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
                <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{pondStats.total}</p>
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>Total Fish</p>
              </div>
              <div className={`rounded-xl p-4 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'}}>
                <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{pondStats.tilapia}</p>
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>Tilapia</p>
              </div>
              <div className={`rounded-xl p-4 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'}}>
                <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{pondStats.catfish}</p>
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>Catfish</p>
              </div>
              <div className={`rounded-xl p-4 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'}}>
                <p className={`text-3xl font-bold text-green-500`}>+{pondStats.thisMonth}</p>
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>New This Month</p>
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

            <div className="grid grid-cols-2 gap-8">
              <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'}}>
                <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Weekly Feeding (kg)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={feedingData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'} />
                      <XAxis dataKey="day" stroke="#666" fontSize={12} />
                      <YAxis stroke="#666" fontSize={12} />
                      <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1E293B' : 'white', borderRadius: '12px' }} />
                      <Bar dataKey="consumed" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'}}>
                <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Health Status</h3>
                <div className="space-y-4">
                  {healthData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ background: item.color }} />
                        <span className={darkMode ? 'text-white' : 'text-gray-800'}>{item.name}</span>
                      </div>
                      <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : activeSection === 'Water Quality' ? (
          <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'}}>
            <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Water Quality Parameters</h3>
            <table className="w-full">
              <thead>
                <tr className={`border-b ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
                  <th className={`text-left py-3 text-sm font-medium ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Parameter</th>
                  <th className={`text-left py-3 text-sm font-medium ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Current Value</th>
                  <th className={`text-left py-3 text-sm font-medium ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Ideal Range</th>
                  <th className={`text-left py-3 text-sm font-medium ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Status</th>
                </tr>
              </thead>
              <tbody>
                {waterQuality.map((param, index) => (
                  <tr key={index} className={`border-b ${darkMode ? 'border-white/10' : 'border-gray-100'}`}>
                    <td className={`py-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{param.parameter}</td>
                    <td className={`py-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{param.value}</td>
                    <td className={`py-3 ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>{param.range}</td>
                    <td className="py-3">
                      <span className={`px-3 py-1 rounded-full text-xs ${param.status === 'Excellent' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>{param.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : activeSection === 'Pond Overview' ? (
          <div className="grid grid-cols-3 gap-6">
            <div className={`rounded-xl p-6 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'}}>
              <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'} mb-2`}>Pond 1 - Tilapia</p>
              <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>1,500 fish</p>
              <p className="text-green-500 text-sm mt-2">Healthy</p>
            </div>
            <div className={`rounded-xl p-6 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'}}>
              <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'} mb-2`}>Pond 2 - Catfish</p>
              <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>1,200 fish</p>
              <p className="text-green-500 text-sm mt-2">Healthy</p>
            </div>
            <div className={`rounded-xl p-6 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'}}>
              <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'} mb-2`}>Pond 3 - Mixed</p>
              <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>800 fish</p>
              <p className="text-yellow-500 text-sm mt-2">Under Observation</p>
            </div>
          </div>
        ) : activeSection === 'Feeding Log' ? (
          <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'}}>
            <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Feeding Schedule</h3>
            <div className="space-y-3">
              {[{time: '6:00 AM', amount: '15 kg', status: 'completed'}, {time: '12:00 PM', amount: '15 kg', status: 'completed'}, {time: '6:00 PM', amount: '12 kg', status: 'pending'}].map((feed, i) => (
                <div key={i} className={`flex items-center justify-between p-4 rounded-lg border ${darkMode ? 'bg-white/5' : 'bg-black/2'}`} style={{borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'}}>
                  <span className={darkMode ? 'text-white' : 'text-gray-800'}>{feed.time}</span>
                  <span className={darkMode ? 'text-white' : 'text-gray-800'}>{feed.amount}</span>
                  <span className={`px-3 py-1 rounded-full text-xs ${feed.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{feed.status}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}

export default FishProfile;