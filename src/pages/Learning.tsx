import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Type, Bird, Trees, Package } from 'lucide-react';
import { useAppStore } from '../store';

const learningModules = [
  {
    id: 'alphabet',
    title: '字母学习',
    icon: Type,
    color: 'from-red-400 to-pink-500',
    path: '/learning/alphabet',
  },
  {
    id: 'animals',
    title: '认识动物',
    icon: Bird,
    color: 'from-yellow-400 to-orange-500',
    path: '/learning/animals',
  },
  {
    id: 'plants',
    title: '认识植物',
    icon: Trees,
    color: 'from-green-400 to-emerald-500',
    path: '/learning/plants',
  },
  {
    id: 'objects',
    title: '认识物品',
    icon: Package,
    color: 'from-blue-400 to-indigo-500',
    path: '/learning/objects',
  },
];

export default function Learning() {
  const navigate = useNavigate();
  const progress = useAppStore((state) => state.progress);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-lg">返回</span>
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            📚 互动学习
          </h1>
          <p className="text-gray-600">选择你想学习的内容</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {learningModules.map((module) => {
            const IconComponent = module.icon;
            const moduleProgress = progress.moduleProgress[module.id];
            const completion = moduleProgress
              ? Math.round((moduleProgress.completed / moduleProgress.total) * 100)
              : 0;

            return (
              <button
                key={module.id}
                onClick={() => navigate(module.path)}
                className={`bg-gradient-to-r ${module.color} text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 rounded-full p-3">
                      <IconComponent className="w-10 h-10" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-2xl font-bold">{module.title}</h3>
                      {moduleProgress && (
                        <p className="text-white/80 text-sm">
                          已完成 {moduleProgress.completed}/{moduleProgress.total}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{completion}%</div>
                  </div>
                </div>
                {moduleProgress && (
                  <div className="mt-4">
                    <div className="w-full bg-white/30 rounded-full h-3">
                      <div
                        className="bg-white h-3 rounded-full transition-all duration-500"
                        style={{ width: `${completion}%` }}
                      />
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
