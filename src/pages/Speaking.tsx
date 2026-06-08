import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { speakingScenes } from '../data';

export default function Speaking() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-6">
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
            🎤 口语跟读
          </h1>
          <p className="text-gray-600">选择场景练习对话</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {speakingScenes.map((scene) => (
            <button
              key={scene.id}
              onClick={() => navigate(`/speaking/${scene.id}`)}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-left"
            >
              <div className="flex items-center gap-4">
                <div className="text-5xl">{scene.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {scene.title}
                  </h3>
                  <p className="text-gray-600">
                    {scene.dialogues.length} 句对话
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
