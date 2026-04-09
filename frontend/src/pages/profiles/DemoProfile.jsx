import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sprout, Sun, Moon, ArrowLeft, Users, DollarSign, Calendar, MapPin, ClipboardList, LogOut, UserPlus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function DemoProfile() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const currentUser = {
    name: 'Demo',
    email: 'demonstration@redhill.com',
    role: 'Demo Manager',
    avatar: 'DM'
  };

  const handleLogout = () => navigate('/login');
  const handleSwitchAccount = () => navigate('/login');
  const handleCloseSystem = () => navigate('/logout');

  const stats = {
    totalVisitors: 156,
    thisMonth: 28,
    revenue: 'KSh 312,000',
    avgRating: 4.8
  };

  const bookings = [
    { id: 1, name: 'John Smith', group: '5', type: 'Sheep & Fish', date: '2026-04-10', time: '9:00 AM', paid: 'KSh 15,000', status: 'Confirmed' },
    { id: 2, name: 'Mary Johnson', group: '3', type: 'Vegetables Only', date: '2026-04-11', time: '10:00 AM', paid: 'KSh 9,000', status: 'Confirmed' },
    { id: 3, name: 'Peter Wilson', group: '8', type: 'Full Tour', date: '2026-04-12', time: '8:00 AM', paid: 'KSh 24,000', status: 'Pending' },
    { id: 4, name: 'Sarah Davis', group: '4', type: 'Fish & Vegetables', date: '2026-04-13', time: '11:00 AM', paid: 'KSh 12,000', status: 'Confirmed' },
    { id: 5, name: 'James Brown', group: '6', type: 'Sheep Only', date: '2026-04-14', time: '9:00 AM', paid: 'KSh 18,000', status: 'Confirmed' },
    { id: 6, name: 'Emily White', group: '2', type: 'Full Tour', date: '2026-04-15', time: '2:00 PM', paid: 'KSh 6,000', status: 'Pending' },
  ];

  const demoTypes = [
    { name: 'Sheep Farming', booked: 45, price: 'KSh 3,000/person' },
    { name: 'Fish/Aquaculture', booked: 38, price: 'KSh 3,000/person' },
    { name: 'Vegetable Farming', booked: 42, price: 'KSh 3,000/person' },
    { name: 'Full Tour', booked: 31, price: 'KSh 5,000/person' },
  ];

  const monthlyData = [
    { month: 'Jan', visitors: 28, revenue: 56000 },
    { month: 'Feb', visitors: 32, revenue: 64000 },
    { month: 'Mar', visitors: 45, revenue: 90000 },
    { month: 'Apr', visitors: 51, revenue: 102000 },
  ];

  const sections = [
    { name: 'Bookings', icon: Calendar, color: '#3b82f6', subtext: 'Visitor bookings' },
    { name: 'Demo Types', icon: MapPin, color: '#22c55e', subtext: 'What to show' },
    { name: 'Revenue', icon: DollarSign, color: '#f59e0b', subtext: 'Payment tracking' },
    { name: 'Feedback', icon: Users, color: '#8b5cf6', subtext: 'Visitor reviews' },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#0F172A]' : 'bg-gray-100'}`}>
      <nav className={`border-b px-8 py-4 flex items-center justify-between ${darkMode ? 'bg-[#4C1D95] border-white/10' : 'bg-[#F3E8FF] border-purple-200'}`}>
        <div className="flex-1 flex items-center">
          {activeSection ? (
            <button onClick={() => setActiveSection(null)} className={`flex items-center gap-2 ${darkMode ? 'text-white/60 hover:text-white' : 'text-gray-800 hover:text-gray-900'}`}>
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="relative">
              <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
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
            {activeSection ? activeSection : 'DEMONSTRATION FARM'}
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
                <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{stats.totalVisitors}</p>
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>Total Visitors</p>
              </div>
              <div className={`rounded-xl p-4 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'}}>
                <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{stats.thisMonth}</p>
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>This Month</p>
              </div>
              <div className={`rounded-xl p-4 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'}}>
                <p className={`text-3xl font-bold text-green-500`}>{stats.revenue}</p>
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>Total Revenue</p>
              </div>
              <div className={`rounded-xl p-4 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'}}>
                <p className={`text-3xl font-bold text-yellow-500`}>{stats.avgRating} ★</p>
                <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>Avg Rating</p>
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
              <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Upcoming Bookings</h3>
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
                    <th className={`text-left py-3 text-sm font-medium ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Visitor</th>
                    <th className={`text-left py-3 text-sm font-medium ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Group</th>
                    <th className={`text-left py-3 text-sm font-medium ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Demo Type</th>
                    <th className={`text-left py-3 text-sm font-medium ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Date & Time</th>
                    <th className={`text-left py-3 text-sm font-medium ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Paid</th>
                    <th className={`text-left py-3 text-sm font-medium ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className={`border-b ${darkMode ? 'border-white/10' : 'border-gray-100'}`}>
                      <td className={`py-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{booking.name}</td>
                      <td className={`py-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{booking.group} people</td>
                      <td className={`py-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{booking.type}</td>
                      <td className={`py-3 ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>{booking.date} {booking.time}</td>
                      <td className={`py-3 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>{booking.paid}</td>
                      <td className="py-3">
                        <span className={`px-3 py-1 rounded-full text-xs ${booking.status === 'Confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : activeSection === 'Demo Types' ? (
          <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'}}>
            <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Demonstration Types</h3>
            <div className="grid grid-cols-2 gap-6">
              {demoTypes.map((demo, index) => (
                <div key={index} className={`p-6 rounded-xl border ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`} style={{borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'}}>
                  <h4 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{demo.name}</h4>
                  <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'} mb-4`}>Price: {demo.price}</p>
                  <div className="flex items-center justify-between">
                    <span className={darkMode ? 'text-white' : 'text-gray-800'}>Booked: {demo.booked} times</span>
                    <span className={`px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400`}>Popular</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeSection === 'Revenue' ? (
          <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'}}>
            <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Monthly Revenue</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'} />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1E293B' : 'white', borderRadius: '12px' }} />
                  <Bar dataKey="revenue" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : activeSection === 'Feedback' ? (
          <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`} style={{borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'}}>
            <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Recent Visitor Feedback</h3>
            <div className="space-y-4">
              {[
                { name: 'John Smith', rating: 5, comment: 'Amazing experience! Learned so much about sheep farming.' },
                { name: 'Mary Johnson', rating: 5, comment: 'The vegetable demo was very informative. Highly recommended!' },
                { name: 'Peter Wilson', rating: 4, comment: 'Great tour, would love to come back for the fish demonstration.' },
              ].map((feedback, index) => (
                <div key={index} className={`p-4 rounded-lg border ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`} style={{borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5'}}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{feedback.name}</span>
                    <span className="text-yellow-500">{'★'.repeat(feedback.rating)}</span>
                  </div>
                  <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>{feedback.comment}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}

export default DemoProfile;