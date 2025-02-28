"use client";
import React, { useMemo } from 'react';

interface Registration {
  timestamp?: string | Date;
  [key: string]: unknown;
}

interface RegistrationChartProps {
  registrations: Registration[];
}

interface DailyCount {
  date: string;
  count: number;
  total: number;
}

interface ChartData {
  dailyCounts: DailyCount[];
  maxCount: number;
  dates: string[];
}

const RegistrationChart: React.FC<RegistrationChartProps> = ({ registrations }) => {
  // Process registration data to get daily counts
  const chartData = useMemo<ChartData>(() => {
    // Filter out registrations without timestamps
    const validRegistrations = registrations.filter(reg => reg.timestamp);
    
    // Sort by date
    validRegistrations.sort((a, b) => 
      new Date(a.timestamp as string | Date).getTime() - new Date(b.timestamp as string | Date).getTime()
    );
    
    // Get the earliest and latest dates
    if (validRegistrations.length === 0) {
      return { dailyCounts: [], maxCount: 0, dates: [] };
    }
    
    const startDate = new Date(validRegistrations[0].timestamp as string | Date);
    const endDate = new Date();
    
    // Create an array of all dates between start and end
    const dates: Date[] = [];
    const currentDate = new Date(startDate);
    currentDate.setHours(0, 0, 0, 0);
    
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // Count registrations per day
    const dailyCounts = dates.map(date => {
      const dateString = date.toISOString().split('T')[0];
      const count = validRegistrations.filter(reg => {
        const regDate = new Date(reg.timestamp as string | Date);
        return regDate.toISOString().split('T')[0] === dateString;
      }).length;
      
      return {
        date: dateString,
        count,
      };
    });
    
    // Calculate cumulative totals
    let runningTotal = 0;
    const cumulativeCounts: DailyCount[] = dailyCounts.map(day => {
      runningTotal += day.count;
      return {
        ...day,
        total: runningTotal
      };
    });
    
    // Find max count for scaling
    const maxCount = Math.max(...cumulativeCounts.map(d => d.total), 1); // Ensure maxCount is at least 1 to avoid division by zero
    
    return { 
      dailyCounts: cumulativeCounts, 
      maxCount,
      dates: dates.map(d => d.toISOString().split('T')[0])
    };
  }, [registrations]);
  
  // If no data, show a message
  if (chartData.dailyCounts.length === 0) {
    return <div className="text-gray-400 p-4 text-center">No registration data available</div>;
  }
  
  // Only show every n-th label to prevent overcrowding
  const labelModulo = Math.max(1, Math.ceil(chartData.dates.length / 10));
  
  return (
    <div className="h-64 relative">
      {/* Y-axis */}
      <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between text-xs text-gray-400">
        <div>{chartData.maxCount}</div>
        <div>{Math.floor(chartData.maxCount / 2)}</div>
        <div>0</div>
      </div>
      
      {/* Chart area */}
      <div className="absolute left-10 right-0 top-0 bottom-16">
        {/* Horizontal grid lines */}
        <div className="h-1/2 border-b border-gray-700 w-full"></div>
        
        {/* Data visualization */}
        <svg className="w-full h-full" viewBox={`0 0 ${chartData.dailyCounts.length} 100`} preserveAspectRatio="none">
          {/* Daily registration bars */}
          {chartData.dailyCounts.map((day, index) => (
            <rect
              key={`bar-${index}`}
              x={index}
              y={100 - (day.count / chartData.maxCount * 100)}
              width={0.8}
              height={(day.count / chartData.maxCount * 100)}
              fill="rgba(59, 130, 246, 0.5)"
            />
          ))}
          
          {/* Cumulative line */}
          <polyline
            points={chartData.dailyCounts.map((day, index) => 
              `${index + 0.4},${100 - (day.total / chartData.maxCount * 100)}`
            ).join(' ')}
            fill="none"
            stroke="#10B981"
            strokeWidth="2"
          />
          
          {/* Dots on the line for each data point */}
          {chartData.dailyCounts.map((day, index) => (
            <circle
              key={`dot-${index}`}
              cx={index + 0.4}
              cy={100 - (day.total / chartData.maxCount * 100)}
              r="0.5"
              fill="#10B981"
            />
          ))}
        </svg>
      </div>
      
      {/* X-axis */}
      <div className="absolute left-10 right-0 bottom-0 h-16">
        <div className="flex justify-between text-xs text-gray-400 h-full">
          {chartData.dates.map((date, index) => (
            <div key={`label-${index}`} className={index % labelModulo === 0 ? "" : "invisible"}>
              <div className="h-2 border-l border-gray-700"></div>
              <div className="transform -rotate-45 origin-top-left mt-1 ml-1">
                {new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="absolute right-0 top-0 flex items-center text-xs">
        <div className="flex items-center mr-4">
          <div className="w-3 h-3 bg-blue-500 opacity-50 mr-1"></div>
          <span className="text-gray-300">Daily</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 mr-1"></div>
          <span className="text-gray-300">Cumulative</span>
        </div>
      </div>
    </div>
  );
};

export default RegistrationChart;