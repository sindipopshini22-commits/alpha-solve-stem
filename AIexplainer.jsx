import React, { useState } from 'react';
import { Send, Sparkles, User, Bot } from 'lucide-react';

const AIExplainer = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! I am your STEM Vision AI. Ask me anything about mathematics, physics, or the solution provided.' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    // Simulated AI Response logic
    setTimeout(() => {
      let botResponse = "That's a great question! Based on scientific principles, what we're looking at involves...";
      if (input.toLowerCase().includes('derivative')) {
        botResponse = "A derivative measures how a function changes as its input changes. In calculus, it's the slope of the tangent line at a point.";
      } else if (input.toLowerCase().includes('gravity')) {
        botResponse = "Gravity is a fundamental force that attracts objects with mass. On Earth, the acceleration is approximately 9.81 m/s².";
      }
      
      setMessages([...newMessages, { role: 'bot', text: botResponse }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[600px] border border-white/10 rounded-2xl overflow-hidden bg-black/20">
      <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="text-primary w-5 h-5" />
          <span className="font-bold">STEM Assistant</span>
        </div>
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div className={`max-w-[80%] p-4 rounded-2xl flex gap-3 ${
              msg.role === 'user' 
                ? 'bg-primary/20 border border-primary/30 rounded-tr-none' 
                : 'bg-white/5 border border-white/10 rounded-tl-none'
            }`}>
              <div className="mt-1">
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} className="text-secondary" />}
              </div>
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white/5 border-t border-white/10">
        <div className="flex gap-2">
          <input 
            type="text" 
            className="input-glass text-sm" 
            placeholder="Ask for an explanation..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend} className="btn-primary p-3 rounded-xl">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIExplainer;
