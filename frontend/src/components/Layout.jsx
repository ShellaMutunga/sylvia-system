import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sun, Moon, Sprout, Menu, X } from 'lucide-react';

function Layout() {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { label: 'Dashboard', active: true },
    { label: 'Operations', active: false },
    { label: 'Sales', active: false },
    { label: 'Employees', active: false },
    { label: 'Accounting', active: false },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#1a1a1a]' : 'bg-gray-100'} transition-colors duration-300`}>
      <nav className={`${darkMode ? 'bg-[#2d2d2d]' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} px-6 py-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#22c55e] flex items-center justify-center">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <span className={`text-xl font-light tracking-wider ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Sylvia
          </span>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full ${darkMode ? 'bg-[#3d3d3d] text-yellow-400' : 'bg-gray-200 text-gray-600'} transition-all`}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </nav>

      <div className="flex">
        <aside className={`${darkMode ? 'bg-[#2d2d2d]' : 'bg-white'} ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 w-64 border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-transform pt-20 md:pt-0`}>
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href="#"
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                  item.active
                    ? 'bg-[#22c55e] text-white'
                    : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6 pt-20 md:pt-6">
          <Outlet context={{ darkMode }} />
        </main>
      </div>
    </div>
  );
}

export default Layout;