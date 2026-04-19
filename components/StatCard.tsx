import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: LucideIcon;
  color: string;
  trend?: 'up' | 'down' | 'stable';
  subtitle?: string;
}

export default function StatCard({
  title,
  value,
  unit,
  icon: Icon,
  color,
  trend,
  subtitle,
}: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
  };

  const selectedColor = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-gray-900">
              {typeof value === 'number' ? value.toFixed(2) : value}
            </h3>
            <span className="text-lg font-medium text-gray-500">{unit}</span>
          </div>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-2">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg border ${selectedColor}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      
      {trend && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1 text-xs">
            {trend === 'up' && (
              <>
                <span className="text-green-600">↑</span>
                <span className="text-gray-600">Trending up</span>
              </>
            )}
            {trend === 'down' && (
              <>
                <span className="text-red-600">↓</span>
                <span className="text-gray-600">Trending down</span>
              </>
            )}
            {trend === 'stable' && (
              <>
                <span className="text-gray-400">→</span>
                <span className="text-gray-600">Stable</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
