import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import * as math from 'mathjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Grapher = ({ expression }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    generateData();
  }, [expression]);

  const generateData = () => {
    try {
      const cleanExpr = expression.split('=')[0].trim() || '0';
      const xValues = math.range(-10, 10.5, 0.5).toArray();
      const yValues = xValues.map(x => {
        try {
          // If expression has x, evaluate with x. If not, evaluate as constant.
          return math.evaluate(cleanExpr, { x });
        } catch {
          return null;
        }
      });

      setChartData({
        labels: xValues,
        datasets: [
          {
            label: `f(x) = ${cleanExpr}`,
            data: yValues,
            borderColor: '#00f2fe',
            backgroundColor: 'rgba(0, 242, 254, 0.1)',
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 4,
          },
        ],
      });
    } catch (err) {
      // Ignore invalid expressions while typing
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(5, 11, 16, 0.9)',
        titleColor: '#00f2fe',
        bodyColor: '#fff',
        borderColor: '#00f2fe',
        borderWidth: 1,
      }
    },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#444', font: { size: 10 } } },
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#444', font: { size: 10 } } },
    },
  };

  return (
    <div className="flex flex-col h-full gap-4 min-h-[300px]">
      <div className="flex-1 bg-black/40 border border-white/5 rounded-xl p-4 relative min-h-0">
        {chartData.labels && chartData.labels.length > 0 ? (
          <div className="absolute inset-0 p-2">
            <Line options={options} data={chartData} />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-text-secondary opacity-30 italic text-xs">
            Invalid or incomplete function
          </div>
        )}
      </div>
      <div className="p-3 bg-white/5 rounded-lg border border-white/5">
         <p className="text-[10px] text-text-secondary uppercase tracking-[0.2em] mb-1">Current Function</p>
         <p className="text-accent font-mono text-sm uppercase truncate">{expression.split('=')[0].trim() || 'x^2'}</p>
      </div>
    </div>
  );
};

export default Grapher;
