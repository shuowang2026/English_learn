export interface ModuleProgress {
  completed: number;
  total: number;
}

export interface UserProgress {
  totalLearningTime: number;
  completedModules: string[];
  moduleProgress: {
    [key: string]: ModuleProgress;
  };
  lastVisit: number;
}

export interface LearningItem {
  id: string;
  name: string;
  chinese: string;
  image: string;
}

export interface DialogueItem {
  id: string;
  speaker: string;
  text: string;
  translation: string;
}

export interface SpeakingScene {
  id: string;
  name: string;
  title: string;
  icon: string;
  dialogues: DialogueItem[];
}
