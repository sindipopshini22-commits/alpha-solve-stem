import React, { useState } from 'react';
import { Target, Star, RefreshCw, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

const QuizSystem = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const questions = [
    {
      q: "What is the derivative of x^2?",
      options: ["x", "2x", "x^3", "2x^2"],
      answer: "2x"
    },
    {
      q: "If 2x + 5 = 15, what is x?",
      options: ["5", "10", "2.5", "5"],
      answer: "5"
    },
    {
      q: "What is the square root of 144?",
      options: ["10", "12", "14", "16"],
      answer: "12"
    },
    {
      q: "Acceleration due to gravity on Earth is approx:",
      options: ["8.9 m/s²", "9.8 m/s²", "10.2 m/s²", "7.5 m/s²"],
      answer: "9.8 m/s²"
    }
  ];

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer(null);
      } else {
        setShowScore(true);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#9b59b6', '#3498db', '#00f2fe']
        });
      }
    }, 800);
  };

  const restart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      {showScore ? (
        <div className="text-center space-y-8 animate-fade-in">
          <div className="relative inline-block">
             <Trophy size={120} className="text-yellow-500 mx-auto" />
             <Star className="absolute top-0 right-0 text-yellow-300 animate-bounce" />
          </div>
          <h2 className="text-4xl font-bold">Quiz Complete!</h2>
          <p className="text-2xl text-text-secondary">You scored <span className="text-primary font-bold">{score}</span> out of {questions.length}</p>
          <div className="w-full bg-white/5 rounded-full h-4 overflow-hidden">
             <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${(score/questions.length)*100}%` }}></div>
          </div>
          <button onClick={restart} className="btn-primary flex items-center gap-2 mx-auto">
            <RefreshCw size={20} /> Try Again
          </button>
        </div>
      ) : (
        <div className="space-y-8 animate-fade-in">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-text-secondary uppercase">Question {currentQuestion + 1} of {questions.length}</span>
            <div className="flex items-center gap-2">
              <Star size={16} className="text-yellow-500" />
              <span className="font-bold">Score: {score}</span>
            </div>
          </div>
          
          <div className="p-8 glass-panel border-primary/20 bg-primary/5">
            <h3 className="text-2xl font-bold">{questions[currentQuestion].q}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions[currentQuestion].options.map((option, idx) => (
              <button 
                key={idx}
                onClick={() => handleAnswer(option)}
                className={`p-6 rounded-2xl text-lg font-semibold transition-all duration-200 border text-left ${
                  selectedAnswer === option 
                    ? (option === questions[currentQuestion].answer ? 'bg-green-500/20 border-green-500' : 'bg-accent/20 border-accent')
                    : 'glass-panel border-white/10 hover:border-primary/50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizSystem;
