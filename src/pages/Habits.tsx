import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, CheckCircle2, Flame, Calendar } from 'lucide-react';
import Layout from '../components/Layout';
import { useHabits } from '../contexts/HabitContext';
import HabitModal from '../components/HabitModal';
import toast from 'react-hot-toast'; // Import toast
import DashboardFooter from './DashboardFooter';

const Habits: React.FC = () => {
  const { habits, deleteHabit, toggleHabitCompletion, getHabitCompletion, getHabitStreak } = useHabits();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<string | null>(null);

  const today = new Date().toISOString().split('T')[0];

  const handleToggleComplete = (habitId: string) => {
    toggleHabitCompletion(habitId, today);
  };

  const handleEdit = (habitId: string) => {
    setEditingHabit(habitId);
    setIsModalOpen(true);
  };

  const handleDelete = (habitId: string) => {
    toast.custom((t) => (
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 dark:ring-gray-700`}
      >
        <div className="flex-1 p-4">
          <div className="flex items-center"> {/* Changed to items-center */}
            <div className="flex-shrink-0"> {/* Removed pt-0.5 */}
              <Trash2 className="h-6 w-6 text-red-500 mr-3" aria-hidden="true" /> {/* Added mr-3 */}
            </div>
            <div className="flex-1"> {/* Removed ml-3 */}
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Confirm Deletion
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this habit?
              </p>
            </div>
          </div>
        </div>
        {/* Buttons Section */}
        <div className="flex flex-col border-l border-gray-200 dark:border-gray-700"> {/* Changed to flex-col */}
          <button
            onClick={() => {
              try {
                deleteHabit(habitId);
                toast.success('Habit deleted successfully!'); // Success toast after confirmed deletion
                toast.dismiss(t.id); // Dismiss the confirmation toast
              } catch (error) {
                console.error('Error deleting habit:', error);
                toast.error('Failed to delete habit.'); // Error toast after failed deletion
                toast.dismiss(t.id); // Dismiss the confirmation toast
              }
            }}
            className="w-full border-b border-gray-200 dark:border-gray-700 rounded-none p-3 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)} // Dismiss the toast on cancel
            className="w-full border-transparent rounded-none p-3 flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    ), {
      duration: Infinity, // Keep the toast open until dismissed
      position: 'top-center', // You can adjust the position
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingHabit(null);
  };

  return (
    <>
      <Layout>
        <div className="p-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="my-10"
          >
            <div className="text-center lg:text-start lg:flex items-center justify-between mb-5">
              <div>
                <h1 className="text-4xl font-bold font-poppins text-dark-slate dark:text-white mb-2">
                  My Habits
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 text-inter mb-5 lg:mb-0 opacity-90">
                  Manage and track your daily habits
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-deep-purple text-white px-6 py-3 rounded-tr-lg rounded-bl-lg hover:bg-purple-800 transition-colors font-medium flex items-center text-inter mx-auto"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Habit
              </button>
            </div>
          </motion.div>

          {habits.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center py-20"
            >
              <div className="bg-white dark:bg-gray-800 rounded-tr-2xl rounded-bl-2xl p-12 shadow-lg max-w-md mx-auto">
                <Calendar className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-4 font-poppins">
                  No habits yet
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6 text-inter">
                  Start building better habits today! Click the button below to create your first habit.
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-deep-purple text-white px-8 py-3 rounded-tr-xl rounded-bl-xl hover:bg-purple-800 transition-colors font-medium text-inter"
                >
                  Create Your First Habit
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {habits.map((habit, index) => {
                const isCompleted = getHabitCompletion(habit.id, today);
                const streak = getHabitStreak(habit.id);

                return (
                  <motion.div
                    key={habit.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-tr-2xl rounded-bl-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: habit.color }}
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(habit.id)}
                          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(habit.id)} // Call handleDelete with the custom toast confirmation
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 font-poppins">
                      {habit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm text-inter">
                      {habit.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-tr-xl rounded-bl-xl text-inter">
                        {habit.frequency}
                      </span>
                      {streak > 0 && (
                        <div className="flex items-center text-orange-500">
                          <Flame className="w-4 h-4 mr-1" />
                          <span className="text-sm font-medium text-inter">{streak} days</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleToggleComplete(habit.id)}
                      className={`w-full py-3 rounded-tr-xl rounded-bl-xl font-medium transition-all flex items-center justify-center text-inter ${isCompleted
                          ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                    >
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      {isCompleted ? 'Completed Today' : 'Mark as Complete'}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Habit Modal */}
          <HabitModal
            isOpen={isModalOpen}
            onClose={closeModal}
            editingHabitId={editingHabit}
          />
        </div>
      </Layout>
      <DashboardFooter />
    </>
  );
};

export default Habits;