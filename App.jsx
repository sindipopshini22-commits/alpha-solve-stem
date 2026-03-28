import React, { useState, useEffect } from 'react';
import { Calculator, Camera, BarChart3, GraduationCap, MessageSquare, Sparkles } from 'lucide-react';
import MathSolver from './components/MathSolver';
import OCRInput from './components/OCRInput';
import Grapher from './components/Grapher';
import QuizSystem from './components/QuizSystem';
import AIExplainer from './components/AIExplainer';

function App() {
  const [activeTab, setActiveTab] = useState('calc');
  const [equation, setEquation] = useState('');
  const [triggerSolve, setTriggerSolve] = useState(0);

  const handleKeyClick = (key) => {
    if (key === 'clear') setEquation('');
    else if (key === 'enter') setTriggerSolve(prev => prev + 1);
    else {
      let val = key;
      if (key === '×') val = '*';
      if (key === '÷') val = '/';
      setEquation(prev => prev + val);
    }
  };

  const renderView = () => {
    switch (activeTab) {
      case 'calc':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:h-full">
            <div className="flex flex-col gap-6 h-full min-h-[400px]">
               <div className="glass-card p-6 flex-1 overflow-y-auto">
                 <h2 className="text-xs font-bold text-text-secondary uppercase tracking-[0.2em] mb-4">Step-by-Step Solution</h2>
                 <MathSolver equation={equation} setEquation={setEquation} triggerSolve={triggerSolve} />
               </div>
               <div className="glass-card p-4">
                 <h2 className="text-xs font-bold text-text-secondary uppercase tracking-[0.2em] mb-2">Algebra Input</h2>
                 <Keypad onKeyClick={handleKeyClick} />
               </div>
            </div>
            <div className="glass-card p-6 overflow-hidden flex flex-col min-h-[400px]">
              <h2 className="text-xs font-bold text-text-secondary uppercase tracking-[0.2em] mb-4">Graphing View</h2>
              <Grapher expression={equation.split('=')[0] || 'x^2'} />
            </div>
          </div>
        );
      case 'ocr': return <div className="glass-card p-8 h-full"><OCRInput /></div>;
      case 'quiz': return <div className="glass-card p-8 h-full overflow-y-auto"><QuizSystem /></div>;
      case 'chat': return <div className="glass-card p-8 h-full"><AIExplainer /></div>;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="px-8 py-4 flex items-center justify-between border-b border-white/5 bg-black/20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
             <Sparkles size={20} className="text-black" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">ALPHA SOLVE</h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <NavLink active={activeTab === 'calc'} onClick={() => setActiveTab('calc')} label="CALCULATOR" />
          <NavLink active={activeTab === 'ocr'} onClick={() => setActiveTab('ocr')} label="PHOTO" />
          <NavLink active={activeTab === 'quiz'} onClick={() => setActiveTab('quiz')} label="QUIZ" />
          <NavLink active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} label="STUDY GUIDE" />
        </nav>

        <div className="flex items-center gap-4">
           <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
           <span className="text-xs font-bold opacity-50 uppercase tracking-widest">System Online</span>
        </div>
      </header>

      <main className="flex-1 p-6 overflow-y-auto">
         {renderView()}
      </main>

      <footer className="p-4 border-t border-white/5 bg-black/40 flex justify-center gap-4">
        <ToolbarButton active={activeTab === 'calc'} onClick={() => setActiveTab('calc')} icon={<Calculator size={20} />} label="SOLVE" />
        <ToolbarButton active={activeTab === 'ocr'} onClick={() => setActiveTab('ocr')} icon={<Camera size={20} />} label="PHOTO INPUT" />
        <ToolbarButton active={activeTab === 'calc'} onClick={() => setActiveTab('calc')} icon={<BarChart3 size={20} />} label="GRAPH" />
        <ToolbarButton active={activeTab === 'quiz'} onClick={() => setActiveTab('quiz')} icon={<GraduationCap size={20} />} label="QUIZ" />
      </footer>
    </div>
  );
}

function NavLink({ active, onClick, label }) {
  return (
    <button onClick={onClick} className={`text-xs font-bold tracking-[0.2em] transition-all ${active ? 'text-accent border-b-2 border-accent pb-1' : 'opacity-40 hover:opacity-100'}`}>{label}</button>
  );
}

function ToolbarButton({ active, onClick, icon, label }) {
  return (
    <button onClick={onClick} className={`btn-icon ${active ? 'active' : ''}`}>
      {icon}
      <span className="text-[10px] font-bold tracking-widest mt-1">{label}</span>
    </button>
  );
}

function Keypad({ onKeyClick }) {
  const keys = [
    '1', '2', '3', '÷', '(', ')',
    '4', '5', '6', '×', 'sin', 'cos',
    '7', '8', '9', '-', 'x', '^',
    '0', '.', '=', 'clear', 'enter'
  ];
  
  return (
    <div className="keypad-grid mt-2">
      {keys.map(k => (
        <button 
          key={k} 
          onClick={() => onKeyClick(k)}
          className={`key-btn ${k === 'enter' ? 'primary col-span-2' : ''} ${k === 'clear' ? 'opacity-50' : ''}`}
        >
          {k}
        </button>
      ))}
    </div>
  );
}

export default App;
