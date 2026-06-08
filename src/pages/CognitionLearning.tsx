import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Volume2, CheckCircle, ChevronRight } from 'lucide-react';
import { animals, plants, objects } from '../data';
import { useAppStore } from '../store';

const dataMap = {
  animals,
  plants,
  objects,
};

const titles = {
  animals: '🐾 认识动物',
  plants: '🌿 认识植物',
  objects: '🎁 认识物品',
};

export default function CognitionLearning() {
  const { type = 'animals' } = useParams<{ type: 'animals' | 'plants' | 'objects' }>();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const { updateModuleProgress, updateLearningTime } = useAppStore();

  const data = dataMap[type] || animals;
  const currentItem = data[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      updateLearningTime(1);
    }, 1000);
    return () => clearInterval(timer);
  }, [updateLearningTime]);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      // 停止之前的语音
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.6; // 放慢速度，便于跟读
      utterance.pitch = 1.1; // 提高音调，更适合儿童
      utterance.volume = 1.0;
      
      // 获取可用的语音
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(voice => voice.lang.includes('en'));
      if (englishVoice) {
        utterance.voice = englishVoice;
      }
      
      window.speechSynthesis.speak(utterance);
      
      // 添加错误处理
      utterance.onerror = (event) => {
        console.error('语音合成错误:', event);
        alert('发音功能暂时不可用，请检查浏览器设置');
      };
    } else {
      alert('抱歉，您的浏览器不支持语音功能');
    }
  };

  const markComplete = () => {
    const newCompleted = new Set(completed);
    newCompleted.add(currentItem.id);
    setCompleted(newCompleted);
    updateModuleProgress(type, newCompleted.size, data.length);
  };

  const nextItem = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevItem = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-6">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => navigate('/learning')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-lg">返回</span>
        </button>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {titles[type]}
          </h1>
          <p className="text-gray-600">
            第 {currentIndex + 1} / {data.length} 个
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 text-center">
          <div className="text-9xl mb-6">{currentItem.image}</div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            {currentItem.name}
          </h2>
          <p className="text-2xl text-gray-600 mb-6">{currentItem.chinese}</p>
          <button
            onClick={() => speak(currentItem.name)}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-3 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <Volume2 className="w-6 h-6" />
            听发音
          </button>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => {
              markComplete();
              nextItem();
            }}
            className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all flex items-center gap-2"
          >
            <CheckCircle className="w-6 h-6" />
            学会了
          </button>
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={prevItem}
            disabled={currentIndex === 0}
            className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
          >
            上一个
          </button>
          <button
            onClick={nextItem}
            disabled={currentIndex === data.length - 1}
            className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            下一个
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            已学会 {completed.size}/{data.length}
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {data.map((item, index) => (
              <div
                key={item.id}
                className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
                  completed.has(item.id)
                    ? 'bg-green-100 border-2 border-green-400'
                    : index === currentIndex
                    ? 'bg-yellow-100 border-2 border-yellow-400'
                    : 'bg-gray-100'
                }`}
              >
                {item.image || item.name[0]}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
