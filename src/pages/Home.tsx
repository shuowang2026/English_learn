import { useNavigate } from 'react-router-dom';
import { BookOpen, Mic, TrendingUp } from 'lucide-react';
import { useAppStore } from '../store';

const menuItems = [
  {
    id: 'learning',
    title: '互动学习',
    icon: BookOpen,
    color: 'from-blue-400 to-blue-600',
    path: '/learning',
  },
  {
    id: 'speaking',
    title: '口语跟读',
    icon: Mic,
    color: 'from-orange-400 to-orange-600',
    path: '/speaking',
  },
  {
    id: 'progress',
    title: '学习进度',
    icon: TrendingUp,
    color: 'from-green-400 to-green-600',
    path: '/progress',
  },
];

export default function Home() {
  const navigate = useNavigate();
  const progress = useAppStore((state) => state.progress);

  const totalItems = Object.values(progress.moduleProgress).reduce(
    (sum, p) => sum + p.total,
    0
  );
  const completedItems = Object.values(progress.moduleProgress).reduce(
    (sum, p) => sum + p.completed,
    0
  );
  const completionPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-3">
            🌟 快乐学英语 🌟
          </h1>
          <p className="text-gray-600 text-lg">让学习充满乐趣！</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            📊 学习进度
          </h2>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>完成度</span>
              <span className="font-bold text-blue-600">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-600">
                {Math.floor(progress.totalLearningTime / 60)}
              </div>
              <div className="text-sm text-gray-600">学习分钟</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-green-600">
                {progress.completedModules.length}
              </div>
              <div className="text-sm text-gray-600">完成模块</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`bg-gradient-to-r ${item.color} text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-4`}
              >
                <div className="bg-white/20 rounded-full p-3">
                  <IconComponent className="w-12 h-12" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="text-white/80 text-sm">点击开始学习</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
