import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';

interface StatusBadgeProps {
  isConnected: boolean;
  lastUpdate: number | null;
}

export default function StatusBadge({ isConnected, lastUpdate }: StatusBadgeProps) {
  const getTimeDifference = () => {
    if (!lastUpdate) return 'Never';
    
    const now = Date.now();
    const diff = Math.floor((now - lastUpdate) / 1000); // in seconds
    
    if (diff < 5) return 'Baru saja';
    if (diff < 60) return `${diff} detik lalu`;
    if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
    return `${Math.floor(diff / 3600)} jam lalu`;
  };

  return (
    <div className={`
      inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
      ${isConnected 
        ? 'bg-green-50 text-green-700 border border-green-200' 
        : 'bg-red-50 text-red-700 border border-red-200'
      }
    `}>
      {isConnected ? (
        <>
          <Wifi className="w-4 h-4" />
          <span>Terhubung</span>
        </>
      ) : (
        <>
          <WifiOff className="w-4 h-4" />
          <span>Terputus</span>
        </>
      )}
      <span className="text-xs opacity-75">• {getTimeDifference()}</span>
    </div>
  );
}
