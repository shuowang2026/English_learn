import { create } from 'zustand';
import { UserProgress } from './types';

interface AppState {
  progress: UserProgress;
  loadProgress: () => void;
  saveProgress: () => void;
  updateLearningTime: (seconds: number) => void;
  updateModuleProgress: (moduleId: string, completed: number, total: number) => void;
  completeModule: (moduleId: string) => void;
}

const initialProgress: UserProgress = {
  totalLearningTime: 0,
  completedModules: [],
  moduleProgress: {
    alphabet: { completed: 0, total: 26 },
    animals: { completed: 0, total: 20 },
    plants: { completed: 0, total: 15 },
    objects: { completed: 0, total: 18 },
  },
  lastVisit: Date.now(),
};

export const useAppStore = create<AppState>((set, get) => ({
  progress: initialProgress,
  
  loadProgress: () => {
    try {
      const saved = localStorage.getItem('kidsEnglishProgress');
      if (saved) {
        set({ progress: JSON.parse(saved) });
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
    }
  },
  
  saveProgress: () => {
    try {
      const { progress } = get();
      localStorage.setItem('kidsEnglishProgress', JSON.stringify(progress));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  },
  
  updateLearningTime: (seconds: number) => {
    set((state) => ({
      progress: {
        ...state.progress,
        totalLearningTime: state.progress.totalLearningTime + seconds,
        lastVisit: Date.now(),
      },
    }));
    get().saveProgress();
  },
  
  updateModuleProgress: (moduleId: string, completed: number, total: number) => {
    set((state) => ({
      progress: {
        ...state.progress,
        moduleProgress: {
          ...state.progress.moduleProgress,
          [moduleId]: { completed, total },
        },
        lastVisit: Date.now(),
      },
    }));
    get().saveProgress();
  },
  
  completeModule: (moduleId: string) => {
    set((state) => ({
      progress: {
        ...state.progress,
        completedModules: state.progress.completedModules.includes(moduleId)
          ? state.progress.completedModules
          : [...state.progress.completedModules, moduleId],
        lastVisit: Date.now(),
      },
    }));
    get().saveProgress();
  },
}));
