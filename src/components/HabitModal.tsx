import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target } from 'lucide-react';
import { useHabits } from '../contexts/HabitContext';

interface HabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingHabitId?: string | null;
}

const HabitModal: React.FC<HabitModalProps> = ({ isOpen, onClose, editingHabitId }) => {
  const { habits, addHabit, updateHabit } = useHabits();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState<'DAILY' | 'WEEKLY'>('DAILY');
  const [color, setColor] = useState('#4C1D95');

  const colors = [
    '#4C1D95', // Deep Purple
    '#0EA5E9', // Teal
    '#F97316', // Orange
    '#10B981', // Emerald
    '#F43F5E', // Rose
    '#6366F1', // Indigo
    '#8B5CF6', // Violet
    '#06B6D4', // Cyan
    '#84CC16', // Lime
    '#F59E0B', // Amber
  ];

  useEffect(() => {
    if (editingHabitId) {
      const habit = habits.find(h => h.id === editingHabitId);
      if (habit) {
        setTitle(habit.title);
        setDescription(habit.description);
        setFrequency(habit.frequency);
        setColor(habit.color);
      }
    } else {
      setTitle('');
      setDescription('');
      setFrequency('DAILY');
      setColor('#4C1D95');
    }
  }, [editingHabitId, habits]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    const habitData = {
      title: title.trim(),
      description: description.trim(),
      frequency,
      color
    };

    if (editingHabitId) {
      updateHabit(editingHabitId, habitData);
    } else {
      addHabit(habitData);
    }

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md relative z-10 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-deep-purple rounded-full flex items-center justify-center mr-3">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold font-poppins text-gray-800 dark:text-white">
                  {editingHabitId ? 'Edit Habit' : 'New Habit'}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Habit Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-deep-purple focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  placeholder="e.g., Read for 30 minutes"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-deep-purple focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  placeholder="Add a description to help you remember why this habit matters..."
                />
              </div>

              <div>
                <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Frequency
                </label>
                <select
                  id="frequency"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value as 'DAILY' | 'WEEKLY')}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-deep-purple focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                >
                  <option value="DAILY">Daily</option>
                  <option value="WEEKLY">Weekly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Color
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {colors.map((colorOption) => (
                    <button
                      key={colorOption}
                      type="button"
                      onClick={() => setColor(colorOption)}
                      className={`w-10 h-10 rounded-full transition-all ${
                        color === colorOption
                          ? 'ring-4 ring-offset-2 ring-gray-400 dark:ring-gray-300'
                          : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: colorOption }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-deep-purple text-white rounded-lg hover:bg-purple-800 transition-colors font-medium"
                >
                  {editingHabitId ? 'Update Habit' : 'Create Habit'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default HabitModal;