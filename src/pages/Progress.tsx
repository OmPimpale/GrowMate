import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Calendar, TrendingUp, Filter } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Layout from '../components/Layout';
import { useHabits } from '../contexts/HabitContext';

const Progress: React.FC = () => {
  const { habits, habitLogs, getHabitStreak } = useHabits();
  const [selectedHabit, setSelectedHabit] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  // Generate data for the charts
  const generateChartData = () => {
    const today = new Date();
    const days = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 365;
    const data = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      let completedCount = 0;
      let totalCount = 0;

      if (selectedHabit === 'all') {
        totalCount = habits.length;
        completedCount = habits.filter(habit => 
          habitLogs.some(log => log.habitId === habit.id && log.date === dateStr && log.completed)
        ).length;
      } else {
        totalCount = 1;
        completedCount = habitLogs.some(log => 
          log.habitId === selectedHabit && log.date === dateStr && log.completed
        ) ? 1 : 0;
      }

      data.push({
        date: dateStr,
        completed: completedCount,
        total: totalCount,
        percentage: totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0,
        label: date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric',
          ...(timeRange === 'year' && { year: '2-digit' })
        })
      });
    }

    return data;
  };

  const chartData = generateChartData();

  const habitStats = habits.map(habit => ({
    id: habit.id,
    title: habit.title,
    color: habit.color,
    streak: getHabitStreak(habit.id),
    completionRate: (() => {
      const totalDays = 30; // Last 30 days
      const completedDays = habitLogs.filter(log => {
        const logDate = new Date(log.date);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return log.habitId === habit.id && 
               log.completed && 
               logDate >= thirtyDaysAgo;
      }).length;
      return Math.round((completedDays / totalDays) * 100);
    })()
  }));

  const overallStats = {
    totalHabits: habits.length,
    activeStreaks: habitStats.filter(stat => stat.streak > 0).length,
    longestStreak: Math.max(...habitStats.map(stat => stat.streak), 0),
    averageCompletion: habitStats.length > 0 
      ? Math.round(habitStats.reduce((sum, stat) => sum + stat.completionRate, 0) / habitStats.length)
      : 0
  };

  return (
    <Layout>
      <div className="p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold font-poppins text-gray-800 dark:text-white mb-2">
            Progress Analytics
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-inter">
            Track your habit completion trends and insights
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-inter">
                Habit
              </label>
              <select
                value={selectedHabit}
                onChange={(e) => setSelectedHabit(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-deep-purple focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                <option value="all">All Habits</option>
                {habits.map(habit => (
                  <option key={habit.id} value={habit.id}>
                    {habit.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-inter">
                Time Range
              </label>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as 'week' | 'month' | 'year')}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-deep-purple focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                <option value="week">Last 7 days</option>
                <option value="month">Last 30 days</option>
                <option value="year">Last 365 days</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-inter">
                  Total Habits
                </p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white text-inter">
                  {overallStats.totalHabits}
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-inter">
                  Active Streaks
                </p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white text-inter">
                  {overallStats.activeStreaks}
                </p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-inter">
                  Longest Streak
                </p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white text-inter">
                  {overallStats.longestStreak}
                </p>
              </div>
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                <Calendar className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-inter">
                  Avg. Completion
                </p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white text-inter">
                  {overallStats.averageCompletion}%
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Filter className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Completion Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              Completion Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="label" 
                  className="text-gray-600 dark:text-gray-400"
                  fontSize={12}
                />
                <YAxis 
                  className="text-gray-600 dark:text-gray-400"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="percentage" 
                  stroke="#4C1D95" 
                  strokeWidth={3}
                  dot={{ fill: '#4C1D95', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#4C1D95', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Habit Performance Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              Habit Performance (30 days)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={habitStats}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="title" 
                  className="text-gray-600 dark:text-gray-400"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  className="text-gray-600 dark:text-gray-400"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="completionRate" 
                  fill="#0EA5E9"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Habit Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
            Habit Details
          </h3>
          <div className="space-y-4">
            {habitStats.map((stat) => (
              <div key={stat.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full mr-4"
                    style={{ backgroundColor: stat.color }}
                  />
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-white">
                      {stat.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-inter">
                      {stat.streak} day streak
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-800 dark:text-white text-inter">
                    {stat.completionRate}%
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-inter">
                    completion rate
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Progress;