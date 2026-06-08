import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Volume2, Mic, CheckCircle, ChevronRight } from 'lucide-react';
import { speakingScenes } from '../data';
import { useAppStore } from '../store';

export default function SpeakingPractice() {
  const { sceneId = 'greetings' } = useParams<{ sceneId: string }>();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const { updateLearningTime } = useAppStore();

  const scene = speakingScenes.find((s) => s.id === sceneId) || speakingScenes[0];
  const currentDialogue = scene.dialogues[currentIndex];

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

  const startRecording = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        const targetText = currentDialogue.text.toLowerCase();
        if (transcript.includes(targetText) || targetText.includes(transcript)) {
          markComplete();
          alert('太棒了！你说得很好！🎉');
        } else {
          alert('再试一次，你可以的！💪');
        }
      };

      recognition.onerror = (event: any) => {
        console.error('语音识别错误:', event);
        alert('语音识别暂时不可用，请检查浏览器麦克风权限设置');
      };

      recognition.start();
    } else {
      alert('抱歉，您的浏览器不支持语音识别功能');
    }
  };

  const markComplete = () => {
    const newCompleted = new Set(completed);
    newCompleted.add(currentDialogue.id);
    setCompleted(newCompleted);
  };

  const nextDialogue = () => {
    if (currentIndex < scene.dialogues.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevDialogue = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => navigate('/speaking')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-lg">返回</span>
        </button>

        <div className="text-center mb-6">
          <div className="text-5xl mb-2">{scene.icon}</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {scene.title}
          </h1>
          <p className="text-gray-600">
            第 {currentIndex + 1} / {scene.dialogues.length} 句
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="text-center mb-6">
            <div className="bg-purple-100 rounded-xl p-4 mb-4">
              <p className="text-sm text-purple-600 font-bold mb-1">
                {currentDialogue.speaker}
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {currentDialogue.text}
              </p>
            </div>
            <p className="text-xl text-gray-600">
              {currentDialogue.translation}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => speak(currentDialogue.text)}
              className="bg-gradient-to-r from-purple-400 to-indigo-500 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <Volume2 className="w-6 h-6" />
              听发音
            </button>
            <button
              onClick={startRecording}
              className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <Mic className="w-6 h-6" />
              跟读
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => {
              markComplete();
              nextDialogue();
            }}
            className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all flex items-center gap-2"
          >
            <CheckCircle className="w-6 h-6" />
            完成
          </button>
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={prevDialogue}
            disabled={currentIndex === 0}
            className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
          >
            上一句
          </button>
          <button
            onClick={nextDialogue}
            disabled={currentIndex === scene.dialogues.length - 1}
            className="flex-1 bg-gradient-to-r from-purple-400 to-indigo-500 text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            下一句
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            已完成 {completed.size}/{scene.dialogues.length}
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {scene.dialogues.map((dialogue, index) => (
              <div
                key={dialogue.id}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  completed.has(dialogue.id)
                    ? 'bg-green-400 text-white'
                    : index === currentIndex
                    ? 'bg-purple-400 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
