import React from 'react';
import { motion } from 'framer-motion';
import { Target, Calendar, Flame, TrendingUp, CheckCircle2, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useHabits } from '../contexts/HabitContext';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { habits, getHabitCompletion, getHabitStreak } = useHabits();
  const { user } = useAuth();

  const today = new Date().toISOString().split('T')[0];
  const completedToday = habits.filter(habit => getHabitCompletion(habit.id, today)).length;
  const totalStreaks = habits.reduce((sum, habit) => sum + getHabitStreak(habit.id), 0);
  const averageStreak = habits.length > 0 ? Math.round(totalStreaks / habits.length) : 0;

  const motivationalMessages = [
    "Every small step counts towards your bigger goals!",
    "Consistency is the key to lasting change.",
    "You're building the future you want, one habit at a time.",
    "Progress, not perfection, is what matters most.",
    "Your habits today create your tomorrow."
  ];

  const todaysMessage = motivationalMessages[new Date().getDay() % motivationalMessages.length];

  const stats = [
    {
      icon: Target,
      label: 'Active Habits',
      value: habits.length,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: CheckCircle2,
      label: 'Completed Today',
      value: completedToday,
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      icon: Flame,
      label: 'Current Streaks',
      value: totalStreaks,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      icon: TrendingUp,
      label: 'Average Streak',
      value: averageStreak,
      color: 'bg-blue-100 text-blue-600'
    }
  ];

  return (
    <Layout>
      <div className="p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold font-poppins text-gray-800 dark:text-white mb-2">
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {user?.name}!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {todaysMessage}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Today's Habits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold font-poppins text-gray-800 dark:text-white">
              Today's Habits
            </h2>
            <Link
              to="/habits"
              className="bg-deep-purple text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition-colors font-medium flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Habit
            </Link>
          </div>

          {habits.length === 0 ? (
            <div className="text-center py-12">
              <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                No habits yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Start building better habits today!
              </p>
              <Link
                to="/habits"
                className="bg-deep-purple text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition-colors font-medium"
              >
                Create Your First Habit
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {habits.slice(0, 5).map((habit) => {
                const isCompleted = getHabitCompletion(habit.id, today);
                const streak = getHabitStreak(habit.id);

                return (
                  <div
                    key={habit.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div
                        className="w-4 h-4 rounded-full mr-4"
                        style={{ backgroundColor: habit.color }}
                      />
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-white">
                          {habit.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {habit.frequency} • {streak} day streak
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {streak > 0 && (
                        <div className="flex items-center mr-4">
                          <Flame className="w-4 h-4 text-orange-500 mr-1" />
                          <span className="text-sm font-medium text-orange-500">
                            {streak}
                          </span>
                        </div>
                      )}
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          isCompleted
                            ? 'bg-emerald-500'
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        {isCompleted && (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              {habits.length > 5 && (
                <Link
                  to="/habits"
                  className="block text-center text-deep-purple hover:text-purple-800 font-medium mt-4"
                >
                  View all {habits.length} habits →
                </Link>
              )}
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Link
            to="/habits"
            className="bg-gradient-to-r from-deep-purple to-purple-600 text-white p-6 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            <Target className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Manage Habits</h3>
            <p className="text-purple-100 text-sm">
              Create, edit, and organize your habits
            </p>
          </Link>

          <Link
            to="/progress"
            className="bg-gradient-to-r from-teal to-blue-500 text-white p-6 rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all transform hover:scale-105"
          >
            <TrendingUp className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-semibold mb-2">View Progress</h3>
            <p className="text-blue-100 text-sm">
              Track your progress with visual charts
            </p>
          </Link>

          <Link
            to="/settings"
            className="bg-gradient-to-r from-emerald-500 to-green-500 text-white p-6 rounded-xl hover:from-green-500 hover:to-green-600 transition-all transform hover:scale-105"
          >
            <Calendar className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Settings</h3>
            <p className="text-green-100 text-sm">
              Customize your experience
            </p>
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Dashboard;