import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Learning from './pages/Learning';
import AlphabetLearning from './pages/AlphabetLearning';
import CognitionLearning from './pages/CognitionLearning';
import Speaking from './pages/Speaking';
import SpeakingPractice from './pages/SpeakingPractice';
import Progress from './pages/Progress';
import { useAppStore } from './store';

export default function App() {
  const loadProgress = useAppStore((state) => state.loadProgress);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/learning/alphabet" element={<AlphabetLearning />} />
        <Route path="/learning/:type" element={<CognitionLearning />} />
        <Route path="/speaking" element={<Speaking />} />
        <Route path="/speaking/:sceneId" element={<SpeakingPractice />} />
        <Route path="/progress" element={<Progress />} />
      </Routes>
    </Router>
  );
}
