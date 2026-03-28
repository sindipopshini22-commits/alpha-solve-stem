import React, { useState, useEffect } from 'react';
import * as math from 'mathjs';
import { Play, HelpCircle, CheckCircle2 } from 'lucide-react';

const MathSolver = ({ equation, setEquation, triggerSolve }) => {
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (triggerSolve > 0) solveEquation();
  }, [triggerSolve]);

  const solveEquation = () => {
    try {
      setError(null);
      if (!equation.trim()) return;

      if (equation.includes('=')) {
        const sides = equation.split('=');
        const left = sides[0].trim();
        const right = sides[1].trim();
        
        // Improved linear solver logic for ax + b = c
        // 1. Parse coefficients
        const xMatch = left.match(/(-?\d*\.?\d*)x/);
        const coeff = xMatch ? (xMatch[1] === '' ? 1 : (xMatch[1] === '-' ? -1 : parseFloat(xMatch[1]))) : 0;
        
        // 2. Find constant on left by replacing ax with 0
        const constLeftStr = left.replace(xMatch ? xMatch[0] : '', '0').replace(/\s/g, '');
        const constLeft = math.evaluate(constLeftStr || '0');
        const constRight = math.evaluate(right);

        if (coeff !== 0) {
           const finalX = (constRight - constLeft) / coeff;
           setSteps([
             { desc: "Original Equation", val: `${left} = ${right}` },
             { desc: "Subtract constant from both sides", val: `${coeff}x = ${constRight} - (${constLeft})` },
             { desc: "Simplify", val: `${coeff}x = ${constRight - constLeft}` },
             { desc: "Divide by coefficient", val: `x = (${constRight - constLeft}) / ${coeff}` },
             { desc: "Final Result", val: `x = ${finalX}` }
           ]);
           setResult(`x = ${finalX}`);
        } else {
           throw new Error("No variable 'x' found to solve for.");
        }
      } else {
        const res = math.evaluate(equation);
        setResult(res);
        setSteps([
          { desc: "Input Expression", val: equation },
          { desc: "Order of Operations (PEMDAS)", val: "Simplifying grouping, exponents, multiplication, etc." },
          { desc: "Computed Result", val: res.toString() }
        ]);
      }
    } catch (err) {
      setError("Error: " + (err.message || "Invalid expression."));
      setResult(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input 
            type="text" 
            className="input-glass text-sm py-3" 
            placeholder="e.g. 2x + 10 = 20"
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && solveEquation()}
          />
          <button onClick={solveEquation} className="btn-primary py-2 px-4 flex items-center gap-2 text-xs">
            <Play size={14} /> SOLVE
          </button>
        </div>
        {error && <p className="text-accent text-[10px] uppercase tracking-widest mt-1">{error}</p>}
      </div>

      {result !== null && (
        <div className="animate-fade-in space-y-3">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="space-y-3">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-3 items-start group">
                  <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/20 flex items-center justify-center text-accent text-[10px] font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-text-secondary text-[10px] uppercase tracking-wider">{step.desc}</p>
                    <p className="text-sm font-mono text-white mt-0.5">{step.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-gradient-to-r from-accent/5 to-primary/5 border border-accent/20">
            <p className="text-[10px] text-text-secondary uppercase tracking-widest">Final Result</p>
            <p className="text-2xl font-bold text-accent truncate">
              {result}
            </p>
          </div>
        </div>
      )}
      
      {!result && !error && (
        <div className="flex flex-col items-center justify-center py-10 opacity-20">
          <HelpCircle size={48} className="mb-2" />
          <p className="text-sm tracking-widest uppercase">Awaiting Input</p>
        </div>
      )}
    </div>
  );
};

export default MathSolver;
