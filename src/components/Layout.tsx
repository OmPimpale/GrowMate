import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Target, BarChart3, Settings, LogOut, Moon, Sun, Shrub } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import LayoutNav from './LayoutNav';
import toast from 'react-hot-toast'; // Import toast

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!'); // <-- Add success toast here
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Habits', path: '/habits', icon: Target },
    { name: 'Progress', path: '/progress', icon: BarChart3 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      <LayoutNav />
      <div className={`&{darkMode? '':'bg-gradient-to-tl from-soft-lavender to-white'} flex mt-[76.8px] pb-8`}>
        {/* Sidebar */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="w-64 bg-white dark:bg-gray-800 shadow-lg lg:flex flex-col hidden rounded-lg"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <Link to="/" className="text-2xl font-bold font-poppins text-deep-purple dark:text-purple-400 flex items-center">
              GrowMate <Shrub className="ml-[2px] text-green-500 rotate-[15deg]" size={34} />
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-200 mt-1 font-inter">
              Welcome back, <strong className='text-dark-slate dark:text-white'>{user?.name} !</strong>
            </p>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center p-3 rounded-tr-lg rounded-bl-lg transition-colors font-inter ${isActive
                        ? 'bg-purple-100 dark:bg-purple-900 text-deep-purple dark:text-purple-300'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    <span className="font-medium font-inter">{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={toggleDarkMode}
              className="flex items-center w-full p-3 rounded-tr-xl rounded-bl-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mb-2"
            >
              {darkMode ? <Sun className="w-5 h-5 mr-3" /> : <Moon className="w-5 h-5 mr-3" />}
              <span className="font-medium font-inter">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-3 rounded-tr-xl rounded-bl-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span className="font-medium font-inter">Logout</span>
            </button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;