
import React from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className="stats-card">
      <div className="flex items-center justify-between mb-4">
        <div className="text-gray-500 font-medium">{title}</div>
        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
};

export default StatCard;
