import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface TimeAdjusterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function TimeAdjuster({ value, onChange, min = 1, max = 60 }: TimeAdjusterProps) {
  const handleChange = (newValue: number) => {
    if (newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-2">
      <button
        onClick={() => handleChange(value - 1)}
        className="p-1 hover:bg-white/10 rounded transition-colors"
        disabled={value <= min}
      >
        <Minus size={16} className="text-white/80" />
      </button>
      
      <input
        type="number"
        value={value}
        onChange={(e) => handleChange(parseInt(e.target.value, 10))}
        className="w-16 bg-transparent text-white text-center border border-white/20 rounded px-2 py-1"
        min={min}
        max={max}
      />
      
      <button
        onClick={() => handleChange(value + 1)}
        className="p-1 hover:bg-white/10 rounded transition-colors"
        disabled={value >= max}
      >
        <Plus size={16} className="text-white/80" />
      </button>
    </div>
  );
}