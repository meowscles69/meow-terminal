import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, CartesianGrid } from 'recharts';

interface BondingCurveChartProps {
  progress: number; // 0 to 100
}

const generateCurveData = () => {
  const data = [];
  for (let i = 0; i <= 100; i += 2) {
    const price = 0.000001 * Math.pow(1.06, i); 
    data.push({
      progress: i,
      price: price
    });
  }
  return data;
};

export const BondingCurveChart: React.FC<BondingCurveChartProps> = ({ progress }) => {
  const data = React.useMemo(() => generateCurveData(), []);
  
  return (
    <div className="h-80 w-full bg-neu-base dark:bg-neu-dark-base rounded-[30px] p-6 shadow-neu dark:shadow-neu-dark relative overflow-hidden transition-colors duration-300">
        <div className="flex justify-between mb-4 z-10 relative">
            <h3 className="text-xs font-extrabold text-neu-muted dark:text-neu-dark-muted tracking-widest uppercase">Price Action</h3>
        </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ec4899" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" strokeOpacity={0.2} vertical={false} />
          <XAxis 
            dataKey="progress" 
            hide 
          />
          <YAxis 
            hide 
            domain={['dataMin', 'auto']} 
          />
          <Tooltip 
            contentStyle={{ 
                backgroundColor: '#262A33', // Default to dark style for tooltip as it looks cool
                border: 'none', 
                borderRadius: '12px',
                boxShadow: '4px 4px 8px #1a1d23, -4px -4px 8px #323844',
                color: '#E2E8F0',
                fontWeight: 'bold'
            }}
            itemStyle={{ color: '#ec4899' }}
            formatter={(value: number) => [`${value.toFixed(8)} SOL`, 'Price']}
            labelFormatter={(label) => `Curve: ${label}%`}
          />
          <ReferenceLine x={100} stroke="#10b981" label={{ value: "RAYDIUM", fill: "#10b981", fontSize: 10, fontWeight: 'bold' }} strokeDasharray="3 3" />
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke="#ec4899" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorPrice)" 
          />
        </AreaChart>
      </ResponsiveContainer>
      
      <div className="absolute bottom-6 left-6 right-6">
        <div className="relative h-3 w-full bg-neu-base dark:bg-neu-dark-base shadow-neu-pressed dark:shadow-neu-dark-pressed rounded-full overflow-hidden">
            <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-momo-400 to-purple-500 transition-all duration-500"
                style={{ width: `${Math.min(100, progress)}%` }}
            ></div>
        </div>
      </div>
    </div>
  );
};