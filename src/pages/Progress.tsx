import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useAppStore } from '../store';

export default function Progress() {
  const navigate = useNavigate();
  const { progress, loadProgress } = useAppStore();

  const modules = [
    { id: 'alphabet', name: '字母学习', icon: '🔤', color: 'from-red-400 to-pink-500' },
    { id: 'animals', name: '认识动物', icon: '🐾', color: 'from-yellow-400 to-orange-500' },
    { id: 'plants', name: '认识植物', icon: '🌿', color: 'from-green-400 to-emerald-500' },
    { id: 'objects', name: '认识物品', icon: '🎁', color: 'from-blue-400 to-indigo-500' },
  ];

  const totalItems = Object.values(progress.moduleProgress).reduce(
    (sum, p) => sum + p.total,
    0
  );
  const completedItems = Object.values(progress.moduleProgress).reduce(
    (sum, p) => sum + p.completed,
    0
  );
  const completionPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const resetProgress = () => {
    if (confirm('确定要重置所有学习进度吗？')) {
      localStorage.removeItem('kidsEnglishProgress');
      loadProgress();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) {
      return `${mins} 分钟 ${secs} 秒`;
    }
    return `${secs} 秒`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 p-6">
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
            📊 学习进度
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            总体进度
          </h2>
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>完成度</span>
              <span className="font-bold text-green-600">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-green-400 to-teal-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">
                {formatTime(progress.totalLearningTime)}
              </div>
              <div className="text-sm text-gray-600">学习时长</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-600">
                {completedItems}/{totalItems}
              </div>
              <div className="text-sm text-gray-600">已完成内容</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            各模块进度
          </h2>
          <div className="space-y-4">
            {modules.map((module) => {
              const moduleProgress = progress.moduleProgress[module.id];
              const percentage = moduleProgress
                ? Math.round((moduleProgress.completed / moduleProgress.total) * 100)
                : 0;

              return (
                <div key={module.id} className="flex items-center gap-4">
                  <div className="text-3xl">{module.icon}</div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-bold text-gray-700">{module.name}</span>
                      <span className="text-gray-600">
                        {moduleProgress?.completed}/{moduleProgress?.total}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`bg-gradient-to-r ${module.color} h-3 rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={resetProgress}
          className="w-full bg-red-100 text-red-600 py-4 rounded-xl font-bold hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
        >
          <Trash2 className="w-5 h-5" />
          重置学习进度
        </button>
      </div>
    </div>
  );
}
