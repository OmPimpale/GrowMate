import React, { createContext, useContext, useState, useEffect } from 'react';
import { habitsAPI, habitLogsAPI } from '../services/api';
import { useAuth } from './AuthContext';

export interface Habit {
  id: string;
  title: string;
  description: string;
  frequency: 'DAILY' | 'WEEKLY';
  createdAt: string;
  color: string;
}

export interface HabitLog {
  id: string;
  habitId: string;
  date: string;
  completed: boolean;
}

interface HabitContextType {
  habits: Habit[];
  habitLogs: HabitLog[];
  loading: boolean;
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt'>) => Promise<void>;
  updateHabit: (id: string, habit: Partial<Habit>) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
  toggleHabitCompletion: (habitId: string, date: string) => Promise<void>;
  getHabitCompletion: (habitId: string, date: string) => boolean;
  getHabitStreak: (habitId: string) => number;
  refreshData: () => Promise<void>;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitLogs, setHabitLogs] = useState<HabitLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, loading: authLoading } = useAuth();

  const refreshData = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    try {
      const [habitsData, logsData] = await Promise.all([
        habitsAPI.getAll(),
        habitLogsAPI.getAll()
      ]);

      setHabits(habitsData.map((habit: any) => ({
        id: habit.id.toString(),
        title: habit.title,
        description: habit.description,
        frequency: habit.frequency,
        createdAt: habit.createdAt,
        color: habit.color
      })));

      setHabitLogs(logsData.map((log: any) => ({
        id: log.id.toString(),
        habitId: log.habitId.toString(),
        date: log.date,
        completed: log.completed
      })));
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      refreshData();
    }
  }, [isAuthenticated, authLoading]);

  const addHabit = async (habitData: Omit<Habit, 'id' | 'createdAt'>) => {
    try {
      const newHabit = await habitsAPI.create(habitData);
      setHabits(prev => [
        {
          id: newHabit.id.toString(),
          title: newHabit.title,
          description: newHabit.description,
          frequency: newHabit.frequency,
          createdAt: newHabit.createdAt,
          color: newHabit.color
        },
        ...prev
      ]);
    } catch (error) {
      console.error('Failed to add habit:', error);
      throw error;
    }
  };

  const updateHabit = async (id: string, habitData: Partial<Habit>) => {
    try {
      const updatedHabit = await habitsAPI.update(id, habitData);
      setHabits(prev => prev.map(habit => 
        habit.id === id ? {
          id: updatedHabit.id.toString(),
          title: updatedHabit.title,
          description: updatedHabit.description,
          frequency: updatedHabit.frequency,
          createdAt: updatedHabit.createdAt,
          color: updatedHabit.color
        } : habit
      ));
    } catch (error) {
      console.error('Failed to update habit:', error);
      throw error;
    }
  };

  const deleteHabit = async (id: string) => {
    try {
      await habitsAPI.delete(id);
      setHabits(prev => prev.filter(habit => habit.id !== id));
      setHabitLogs(prev => prev.filter(log => log.habitId !== id));
    } catch (error) {
      console.error('Failed to delete habit:', error);
      throw error;
    }
  };

  const toggleHabitCompletion = async (habitId: string, date: string) => {
    try {
      const response = await habitLogsAPI.toggle(habitId, date);
      
      const existingLogIndex = habitLogs.findIndex(log => 
        log.habitId === habitId && log.date === date
      );

      if (existingLogIndex >= 0) {
        setHabitLogs(prev => prev.map((log, index) =>
          index === existingLogIndex ? {
            ...log,
            completed: response.completed
          } : log
        ));
      } else {
        setHabitLogs(prev => [...prev, {
          id: response.id.toString(),
          habitId: response.habitId.toString(),
          date: response.date,
          completed: response.completed
        }]);
      }
    } catch (error) {
      console.error('Failed to toggle habit completion:', error);
      throw error;
    }
  };

  const getHabitCompletion = (habitId: string, date: string): boolean => {
    const log = habitLogs.find(log => 
      log.habitId === habitId && log.date === date
    );
    return log?.completed || false;
  };

  const getHabitStreak = (habitId: string): number => {
    const today = new Date();
    let streak = 0;
    let currentDate = new Date(today);

    while (true) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const isCompleted = getHabitCompletion(habitId, dateStr);
      
      if (isCompleted) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };

  return (
    <HabitContext.Provider value={{
      habits,
      habitLogs,
      loading,
      addHabit,
      updateHabit,
      deleteHabit,
      toggleHabitCompletion,
      getHabitCompletion,
      getHabitStreak,
      refreshData
    }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};