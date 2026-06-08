import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeft, Volume2, CheckCircle, RotateCcw, Play } from 'lucide-react';
import { alphabet } from '../data';
import { useAppStore } from '../store';

const CANVAS_W = 280;
const CANVAS_H = 240;
const STROKE_COLOR = '#94a3b8';
const STROKE_WIDTH = 8;
const ANIM_STROKE_COLOR = '#ef4444';
const ANIM_STROKE_WIDTH = 10;
const DONE_STROKE_COLOR = '#22c55e';
const NUM_CIRCLES = '\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469';

export default function AlphabetLearning() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const guideCanvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [currentStroke, setCurrentStroke] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { updateModuleProgress, updateLearningTime } = useAppStore();

  const currentLetter = alphabet[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      updateLearningTime(1);
    }, 1000);
    return () => clearInterval(timer);
  }, [updateLearningTime]);

  // Reset when letter changes
  useEffect(() => {
    animRef.current = false;
    setIsAnimating(false);
    if (canvasRef.current) {
      clearCanvas(canvasRef.current);
    }
    setCurrentStroke(0);
    drawGuide();
  }, [currentIndex]);

  // --- Canvas helpers ---

  const clearCanvas = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // 辅助线
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 4]);
    // 中线
    ctx.beginPath();
    ctx.moveTo(0, CANVAS_H / 2);
    ctx.lineTo(CANVAS_W, CANVAS_H / 2);
    ctx.stroke();
    // 竖中线
    ctx.beginPath();
    ctx.moveTo(CANVAS_W / 2, 0);
    ctx.lineTo(CANVAS_W / 2, CANVAS_H);
    ctx.stroke();
    ctx.setLineDash([]);
  };

  const drawStrokePath = (
    ctx: CanvasRenderingContext2D,
    stroke: { x: number; y: number }[],
    color: string,
    width: number,
    dashed: boolean
  ) => {
    if (stroke.length < 2) return;
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.setLineDash(dashed ? [10, 8] : []);
    ctx.beginPath();
    ctx.moveTo(stroke[0].x, stroke[0].y);
    for (let i = 1; i < stroke.length; i++) {
      ctx.lineTo(stroke[i].x, stroke[i].y);
    }
    ctx.stroke();
    ctx.setLineDash([]);
  };

  const drawStrokeNumber = (
    ctx: CanvasRenderingContext2D,
    stroke: { x: number; y: number }[],
    idx: number
  ) => {
    if (stroke.length < 1) return;
    const start = stroke[0];
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(NUM_CIRCLES[idx] || String(idx + 1), start.x, start.y - 4);
  };

  const drawStrokeArrow = (ctx: CanvasRenderingContext2D, stroke: { x: number; y: number }[]) => {
    if (stroke.length < 2) return;
    const end = stroke[stroke.length - 1];
    const prev = stroke[stroke.length - 2];
    const angle = Math.atan2(end.y - prev.y, end.x - prev.x);
    const size = 10;
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.moveTo(end.x, end.y);
    ctx.lineTo(end.x - size * Math.cos(angle - Math.PI / 6), end.y - size * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(end.x - size * Math.cos(angle + Math.PI / 6), end.y - size * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
  };

  // --- 笔顺提示画布 ---

  const drawGuide = useCallback(() => {
    const canvas = guideCanvasRef.current;
    if (!canvas) return;
    clearCanvas(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    currentLetter.strokes.forEach((stroke, idx) => {
      drawStrokePath(ctx, stroke, STROKE_COLOR, STROKE_WIDTH, true);
      drawStrokeNumber(ctx, stroke, idx);
      drawStrokeArrow(ctx, stroke);
    });
  }, [currentLetter]);

  // --- 动画演示 ---

  const animateStroke = async () => {
    if (isAnimating || animRef.current) return;
    animRef.current = true;
    setIsAnimating(true);

    const canvas = guideCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const strokes = currentLetter.strokes;
    const totalDuration = 600;
    const intervalMs = 20;
    const steps = Math.ceil(totalDuration / intervalMs);

    // 先展示完整引导 800ms
    await new Promise(r => setTimeout(r, 800));

    for (let si = 0; si < strokes.length; si++) {
      const stroke = strokes[si];
      if (stroke.length < 2) {
        // 单点笔画也画一下
        clearCanvas(canvas);
        for (let pi = 0; pi < si; pi++) {
          drawStrokePath(ctx, strokes[pi], DONE_STROKE_COLOR, STROKE_WIDTH, false);
        }
        await new Promise(r => setTimeout(r, 300));
        continue;
      }

      for (let step = 0; step <= steps; step++) {
        if (!animRef.current) return;
        await new Promise(r => setTimeout(r, intervalMs));

        clearCanvas(canvas);

        // 已完成笔画 — 纯绿色，无序号无箭头
        for (let pi = 0; pi < si; pi++) {
          drawStrokePath(ctx, strokes[pi], DONE_STROKE_COLOR, STROKE_WIDTH, false);
        }

        // 未完成笔画 — 淡虚线提示
        for (let fi = si + 1; fi < strokes.length; fi++) {
          drawStrokePath(ctx, strokes[fi], '#cbd5e1', STROKE_WIDTH - 2, true);
        }

        // 当前动画笔画
        const progress = step / steps;
        const totalPts = stroke.length;
        const dist = (totalPts - 1) * progress;
        const seg = Math.floor(dist);
        const segP = dist - seg;

        ctx.strokeStyle = ANIM_STROKE_COLOR;
        ctx.lineWidth = ANIM_STROKE_WIDTH;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(stroke[0].x, stroke[0].y);

        for (let i = 1; i <= seg && i < stroke.length; i++) {
          ctx.lineTo(stroke[i].x, stroke[i].y);
        }
        if (seg < stroke.length - 1 && segP > 0) {
          const from = stroke[seg];
          const to = stroke[seg + 1];
          ctx.lineTo(from.x + (to.x - from.x) * segP, from.y + (to.y - from.y) * segP);
        }
        ctx.stroke();

        // 笔尖圆点
        if (progress > 0.02) {
          const fDist = (totalPts - 1) * Math.min(progress, 1);
          const fSeg = Math.floor(fDist);
          const fP = fDist - fSeg;
          let px: number, py: number;
          if (fSeg >= stroke.length - 1) {
            px = stroke[stroke.length - 1].x;
            py = stroke[stroke.length - 1].y;
          } else {
            px = stroke[fSeg].x + (stroke[fSeg + 1].x - stroke[fSeg].x) * fP;
            py = stroke[fSeg].y + (stroke[fSeg + 1].y - stroke[fSeg].y) * fP;
          }
          ctx.fillStyle = ANIM_STROKE_COLOR;
          ctx.beginPath();
          ctx.arc(px, py, 7, 0, Math.PI * 2);
          ctx.fill();
        }

        // 当前笔画序号提示
        ctx.fillStyle = ANIM_STROKE_COLOR;
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(NUM_CIRCLES[si] || String(si + 1), 8, 20);
      }

      // 笔画完成 — 绿色固化
      clearCanvas(canvas);
      for (let pi = 0; pi <= si; pi++) {
        drawStrokePath(ctx, strokes[pi], DONE_STROKE_COLOR, STROKE_WIDTH, false);
      }
      // 剩余笔画仍显示虚线
      for (let fi = si + 1; fi < strokes.length; fi++) {
        drawStrokePath(ctx, strokes[fi], STROKE_COLOR, STROKE_WIDTH, true);
        drawStrokeNumber(ctx, strokes[fi], fi);
        drawStrokeArrow(ctx, strokes[fi]);
      }

      await new Promise(r => setTimeout(r, 200));
    }

    // 全部完成 — 恢复标准引导视图
    drawGuide();
    animRef.current = false;
    setIsAnimating(false);
  };

  // --- 发音 ---

  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('抱歉，您的浏览器不支持语音功能');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.6;
    utterance.pitch = 1.1;
    utterance.volume = 1.0;
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.includes('en'));
    if (englishVoice) utterance.voice = englishVoice;
    window.speechSynthesis.speak(utterance);
  };

  // --- 写字画布 ---

  const getCanvasCoordinates = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const coords = getCanvasCoordinates(e, canvas);
    setIsDrawing(true);
    ctx.strokeStyle = '#4A90E2';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const coords = getCanvasCoordinates(e, canvas);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (currentStroke < currentLetter.strokes.length - 1) {
      setCurrentStroke(currentStroke + 1);
    }
  };

  const handleClear = () => {
    if (canvasRef.current) {
      clearCanvas(canvasRef.current);
      // 在写字画布上叠加笔顺引导，方便描红
      drawGuideOnCanvas(canvasRef.current);
    }
    setCurrentStroke(0);
  };

  // 在写字画布上绘制淡色引导
  const drawGuideOnCanvas = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    currentLetter.strokes.forEach((stroke, idx) => {
      if (stroke.length < 2) return;
      ctx.strokeStyle = '#d1d5db';
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      for (let i = 1; i < stroke.length; i++) {
        ctx.lineTo(stroke[i].x, stroke[i].y);
      }
      ctx.stroke();
      ctx.setLineDash([]);
      // 序号
      ctx.fillStyle = '#9ca3af';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(NUM_CIRCLES[idx] || String(idx + 1), stroke[0].x, stroke[0].y - 4);
    });
  };

  // --- 导航 ---

  const markComplete = () => {
    const newCompleted = new Set(completed);
    newCompleted.add(currentLetter.id);
    setCompleted(newCompleted);
    updateModuleProgress('alphabet', newCompleted.size, alphabet.length);
  };

  const nextLetter = () => {
    if (currentIndex < alphabet.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const prevLetter = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  // --- 字母网格快速选择 ---
  const letters = alphabet.map(a => a.uppercase);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-pink-100 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* 返回 */}
        <button
          onClick={() => navigate('/learning')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-base">返回</span>
        </button>

        {/* 标题 */}
        <div className="text-center mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
            🔤 字母学习
          </h1>
          <p className="text-gray-500 text-sm">
            第 {currentIndex + 1} / {alphabet.length} 个字母
            {completed.size > 0 && (
              <span className="ml-2 text-green-600 font-medium">已完成 {completed.size} 个</span>
            )}
          </p>
        </div>

        {/* 字母卡片 */}
        <div className="bg-white rounded-3xl shadow-xl p-5 mb-5">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 md:gap-6 mb-3">
              <span className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
                {currentLetter.uppercase}
              </span>
              <span className="text-2xl md:text-3xl font-bold text-gray-400">
                {currentLetter.lowercase}
              </span>
            </div>
            <div className="text-base font-semibold text-purple-600 mb-3">
              {currentLetter.phonetic}
            </div>
            <button
              onClick={() => speak(currentLetter.uppercase)}
              className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
            >
              <Volume2 className="w-4 h-4" />
              听发音
            </button>
          </div>
        </div>

        {/* 笔顺提示 + 写一写 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          {/* 笔顺提示 */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-lg p-5 border-4 border-green-200">
            <h3 className="text-lg font-bold text-green-800 mb-3 text-center flex items-center justify-center gap-2">
              <span>🖌️</span> 笔顺提示
            </h3>
            <canvas
              ref={guideCanvasRef}
              width={CANVAS_W}
              height={CANVAS_H}
              className="border-4 border-green-300 rounded-xl mx-auto bg-white shadow-inner block"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            <div className="flex justify-center mt-3">
              <button
                onClick={animateStroke}
                disabled={isAnimating}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-2.5 rounded-full font-bold hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 text-sm"
              >
                <Play className="w-4 h-4" />
                演示笔顺
              </button>
            </div>
            <p className="text-center text-xs text-green-600 mt-2 font-medium">
              按 ①②③… 顺序书写
            </p>
          </div>

          {/* 写一写 */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl shadow-lg p-5 border-4 border-blue-200">
            <h3 className="text-lg font-bold text-blue-800 mb-3 text-center flex items-center justify-center gap-2">
              <span>✏️</span> 写一写
            </h3>
            <canvas
              ref={canvasRef}
              width={CANVAS_W}
              height={CANVAS_H}
              className="border-4 border-blue-300 rounded-xl mx-auto cursor-crosshair bg-white shadow-inner touch-none block"
              style={{ maxWidth: '100%', height: 'auto' }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
            <div className="flex justify-center mt-3">
              <button
                onClick={handleClear}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-5 py-2.5 rounded-full font-bold hover:shadow-lg transition-all flex items-center gap-2 text-sm"
              >
                <RotateCcw className="w-4 h-4" />
                重写
              </button>
            </div>
            <p className="text-center text-xs text-blue-600 mt-2 font-medium">
              在方框内描红或书写字母
            </p>
          </div>
        </div>

        {/* 字母快速导航 */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-5">
          <h3 className="text-sm font-bold text-gray-600 mb-3 text-center">📝 字母选择</h3>
          <div className="grid grid-cols-13 gap-1">
            {letters.map((letter) => {
              const idx = letters.indexOf(letter);
              const isActive = idx === currentIndex;
              const isDone = completed.has(letter);
              return (
                <button
                  key={letter}
                  onClick={() => setCurrentIndex(idx)}
                  className={`
                    relative aspect-square rounded-lg text-sm font-bold transition-all duration-200
                    flex items-center justify-center
                    ${isActive
                      ? 'bg-gradient-to-br from-red-400 to-pink-500 text-white shadow-md scale-110'
                      : isDone
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                    }
                  `}
                >
                  {letter}
                  {isDone && !isActive && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 完成按钮 */}
        <div className="flex justify-center gap-3 mb-4">
          <button
            onClick={() => { markComplete(); nextLetter(); }}
            className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-7 py-3 rounded-xl font-bold text-base hover:shadow-lg transition-all flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            完成，下一个
          </button>
        </div>

        {/* 上下导航 */}
        <div className="flex justify-between gap-3">
          <button
            onClick={prevLetter}
            disabled={currentIndex === 0}
            className="flex-1 bg-white text-gray-700 py-3 rounded-xl font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors border-2 border-gray-200"
          >
            ← 上一个
          </button>
          <button
            onClick={nextLetter}
            disabled={currentIndex === alphabet.length - 1}
            className="flex-1 bg-gradient-to-r from-red-400 to-pink-500 text-white py-3 rounded-xl font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
          >
            下一个 →
          </button>
        </div>
      </div>
    </div>
  );
}
