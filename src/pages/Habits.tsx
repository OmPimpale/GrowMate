import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, CheckCircle2, Flame, Calendar } from 'lucide-react';
import Layout from '../components/Layout';
import { useHabits } from '../contexts/HabitContext';
import HabitModal from '../components/HabitModal';

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
    if (window.confirm('Are you sure you want to delete this habit?')) {
      deleteHabit(habitId);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingHabit(null);
  };

  return (
    <Layout>
      <div className="p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold font-poppins text-gray-800 dark:text-white mb-2">
                My Habits
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Manage and track your daily habits
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-deep-purple text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition-colors font-medium flex items-center"
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
            <div className="bg-white dark:bg-gray-800 rounded-xl p-12 shadow-lg max-w-md mx-auto">
              <Calendar className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-4">
                No habits yet
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Start building better habits today! Click the button below to create your first habit.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-deep-purple text-white px-8 py-3 rounded-lg hover:bg-purple-800 transition-colors font-medium"
              >
                Create Your First Habit
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {habits.map((habit, index) => {
              const isCompleted = getHabitCompletion(habit.id, today);
              const streak = getHabitStreak(habit.id);

              return (
                <motion.div
                  key={habit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
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
                        onClick={() => handleDelete(habit.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {habit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                    {habit.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                      {habit.frequency}
                    </span>
                    {streak > 0 && (
                      <div className="flex items-center text-orange-500">
                        <Flame className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">{streak} days</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleToggleComplete(habit.id)}
                    className={`w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center ${
                      isCompleted
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
  );
};

export default Habits;