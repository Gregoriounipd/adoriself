import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-dark font-medium">
          Step {current} di {total}
        </span>
        <span className="text-sm text-gold font-semibold">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-beige border border-gold rounded-full h-2 overflow-hidden">
        <div
          className="bg-gold h-full transition-all duration-300 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
