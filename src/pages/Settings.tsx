import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Download, Shield, SquarePen, X } from 'lucide-react'; // Removed Camera
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useHabits } from '../contexts/HabitContext';
import toast from 'react-hot-toast';
import userImg from "../images/user.jpg"
import Footer from './Footer';

const Settings: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const { habits, habitLogs } = useHabits();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [showConfirm, setShowConfirm] = useState(false);

  // Update state when user data changes (e.g., after updateUser)
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      // Removed image state update
    }
  }, [user]);

  // Removed handleImageChange function

  const handleSave = async () => {
    try {
      const userDataToUpdate: { name?: string } = {}; // Simplified type

      // Only include name if it has changed
      if (name !== user?.name) {
        userDataToUpdate.name = name;
      }

      // Removed image-related logic

      // Only call updateUser if there are changes to save
      if (Object.keys(userDataToUpdate).length > 0) {
        await updateUser(userDataToUpdate); // updateUser now only expects name
        toast.success('User updated successfully!');
        setIsEditing(false);
      } else {
        setIsEditing(false); // Close editing if no changes were made
      }

    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user.');
    }
  };

  const exportData = () => {
    const data = {
      habits,
      habitLogs,
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `growmate-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAllData = () => {
    localStorage.removeItem('habits');
    localStorage.removeItem('habitLogs');
    toast.success("All data cleared!");
    window.location.reload();
  };

  return (
    <>
      <Layout>
        <div className="p-5 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="my-10 text-center lg:text-start"
          >
            <h1 className="text-4xl font-bold font-poppins text-dark-slate dark:text-white mb-2">
              Settings
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 text-inter opacity-90">
              Customize your GrowMate experience
            </p>
          </motion.div>

          <div className="space-y-8">
            {/* Profile Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-tr-2xl rounded-bl-2xl p-6 shadow-lg"
            >
              <div className="relative flex items-center mb-6">
                <button onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? (
                    <X
                      size={38}
                      className="absolute right-3 top-3 text-deep-purple dark:text-purple-400 p-2 rounded-full hover:bg-purple-200 dark:hover:bg-gray-200 duration-300"
                    />
                  ) : (
                    <SquarePen
                      size={38}
                      className="absolute right-3 top-3 text-deep-purple dark:text-purple-400 p-2 rounded-full hover:bg-purple-200 dark:hover:bg-gray-200 duration-300"
                    />
                  )}
                </button>
                <img
                  className="rounded-full w-16 mr-4"
                  src={userImg}
                  alt="user"
                  loading="lazy"
                />
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  User Profile
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-inter">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-tr-xl rounded-bl-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-inter">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-tr-xl rounded-bl-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                  />
                </div>
                <div className="text-end">
                  {isEditing && (
                    <button
                      onClick={handleSave}
                      className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-tr-lg rounded-bl-lg hover:bg-purple-600 transition-colors"
                    >
                      Save Changes
                    </button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Appearance Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-tr-2xl rounded-bl-2xl p-6 shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-tr-lg rounded-bl-lg mr-4">
                  {darkMode ? (
                    <Moon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <Sun className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  )}
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  Appearance
                </h2>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    Dark Mode
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-inter">
                    Switch between light and dark themes
                  </p>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    darkMode ? "bg-purple-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      darkMode ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </motion.div>

            {/* Data Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-tr-2xl rounded-bl-2xl p-6 shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-tr-md rounded-bl-md mr-4">
                  <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  Data Management
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-tr-2xl rounded-bl-2xl">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">
                      Export Data
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-inter">
                      Download your habits and progress data
                    </p>
                  </div>
                  <button
                    onClick={exportData}
                    className="flex items-center px-4 py-2 bg-emerald-500 text-white rounded-tr-lg rounded-bl-lg hover:bg-emerald-600 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2 text-inter" />
                    Export
                  </button>
                </div>
                {/* <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900 rounded-tr-2xl rounded-bl-2xl">
                  <div>
                    <h3 className="font-medium text-red-800 dark:text-red-200">
                      Clear All Data
                    </h3>
                    <p className="text-sm text-red-600 dark:text-red-400 text-inter">
                      Permanently delete all your habits and progress data
                    </p>
                  </div>
                  <button
                    onClick={() => setShowConfirm(true)}
                    className="flex items-center px-4 py-2 bg-red-500 text-white rounded-tr-lg rounded-bl-lg hover:bg-red-600 transition-colors text-inter"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Data
                  </button>
                </div> */}
              </div>
            </motion.div>

            {/* Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-tr-2xl rounded-bl-2xl p-6 shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                Your Statistics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 text-inter">
                    {habits.length}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-inter">
                    Total Habits
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 text-inter">
                    {habitLogs.filter((log) => log.completed).length}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-inter">
                    Completed Sessions
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 text-inter">
                    {new Set(habitLogs.map((log) => log.date)).size}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-inter">
                    Active Days
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Confirmation Modal */}
        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-sm w-full"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Confirm Clear Data
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                Are you sure you want to clear all your data? <br />
                <span className="text-red-500 font-medium">
                  This action cannot be undone.
                </span>
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    clearAllData();
                    setShowConfirm(false);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Yes, Clear
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </Layout>
      {/* <Footer /> */}
    </>
  );
};

export default Settings;