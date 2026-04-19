import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { HistoricalDataPoint } from '@/lib/types';

interface ChartCardProps {
  data: HistoricalDataPoint[];
  title: string;
  dataKeys: {
    key: keyof HistoricalDataPoint;
    name: string;
    color: string;
  }[];
}

export default function ChartCard({ data, title, dataKeys }: ChartCardProps) {
  // 1. State untuk menangani Hydration Error (Next.js fix)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 2. Format jam untuk sumbu X (Hanya Jam:Menit)
  const formatXAxis = (timestamp: number) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false // Pakai format 24 jam biar lebih "IOT"
    });
  };

  // 3. Custom tooltip agar lebih cantik
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const pointData = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-xl border border-gray-100">
          <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-wider">
            {new Date(pointData.timestamp).toLocaleString('id-ID', {
              day: '2-digit',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <p className="text-sm font-semibold text-gray-700">
                {entry.name}: <span className="text-gray-900">{entry.value.toFixed(2)}</span>
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Jangan render grafik di server-side untuk menghindari mismatch
  if (!isMounted) return <div className="h-80 bg-gray-50 animate-pulse rounded-xl" />;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-bold">
          LIVE
        </span>
      </div>
      
      {data.length === 0 ? (
        <div className="h-80 flex flex-col items-center justify-center text-gray-400">
           <div className="animate-bounce mb-2">📊</div>
           <p className="text-sm">Menunggu data dari sensor...</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatXAxis}
              stroke="#9ca3af"
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              minTickGap={30}
            />
            <YAxis 
              stroke="#9ca3af" 
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              iconType="circle"
              wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 'bold' }} 
            />
            {dataKeys.map((item) => (
              <Line
                key={item.key}
                type="monotone"
                dataKey={item.key}
                stroke={item.color}
                strokeWidth={3} // Garis lebih tebal biar tegas
                name={item.name}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
                animationDuration={1000}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}