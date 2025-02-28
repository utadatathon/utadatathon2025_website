"use client";
import React, { useMemo } from 'react';

interface Registration {
  levelOfStudy?: string;
  [key: string]: unknown;
}

interface StudyLevelChartProps {
  registrations: Registration[];
}

interface LevelData {
  level: string;
  count: number;
  percentage: number;
}

// Define the expected study levels and their display order
const studyLevelOrder = [
  'Freshman',
  'Sophomore',
  'Junior',
  'Senior',
  'Graduate',
  'PhD',
  'Other'
];

const StudyLevelChart: React.FC<StudyLevelChartProps> = ({ registrations }) => {
  // Process study level data
  const studyLevelData = useMemo<LevelData[]>(() => {
    // Count registrations by study level
    const countsByLevel = registrations.reduce<Record<string, number>>((acc, reg) => {
      let level = reg.levelOfStudy || 'Unknown';
      
      // Group any unknown levels into "Other"
      if (!studyLevelOrder.includes(level)) {
        level = 'Other';
      }
      
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {});
    
    // Make sure all levels are represented even if zero
    const allLevels = studyLevelOrder.reduce<Record<string, number>>((acc, level) => {
      acc[level] = countsByLevel[level] || 0;
      return acc;
    }, {});
    
    // Convert to array for rendering
    const levelData = Object.entries(allLevels)
      .filter(([, count]) => count > 0) // Only include levels with data
      .map(([level, count]) => ({
        level,
        count,
        percentage: Math.round((count / registrations.length) * 100)
      }))
      // Sort according to predefined order
      .sort((a, b) => 
        studyLevelOrder.indexOf(a.level) - studyLevelOrder.indexOf(b.level)
      );
    
    return levelData;
  }, [registrations]);
  
  // If no data, show a message
  if (studyLevelData.length === 0) {
    return <div className="text-gray-400 p-4 text-center">No study level data available</div>;
  }
  
  // Define colors for different study levels
  const getLevelColor = (level: string): string => {
    switch (level) {
      case 'Freshman': return 'bg-green-400';
      case 'Sophomore': return 'bg-green-500';
      case 'Junior': return 'bg-green-600';
      case 'Senior': return 'bg-green-700';
      case 'Graduate': return 'bg-blue-500';
      case 'PhD': return 'bg-blue-700';
      default: return 'bg-gray-500';
    }
  };
  
  return (
    <div className="h-64">
      {/* Donut chart */}
      <div className="flex items-center justify-center h-3/4">
        <div className="relative w-40 h-40">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Create donut segments */}
            {(() => {
              let startAngle = 0;
              return studyLevelData.map((item) => {
                // Calculate angles for this segment
                const angle = 3.6 * item.percentage; // 3.6 degrees per percentage point
                const endAngle = startAngle + angle;
                
                // Calculate SVG path for arc
                const x1 = 50 + 40 * Math.cos((startAngle - 90) * Math.PI / 180);
                const y1 = 50 + 40 * Math.sin((startAngle - 90) * Math.PI / 180);
                const x2 = 50 + 40 * Math.cos((endAngle - 90) * Math.PI / 180);
                const y2 = 50 + 40 * Math.sin((endAngle - 90) * Math.PI / 180);
                
                // Determine if the arc should be drawn as the "long way" around the circle
                const largeArcFlag = angle > 180 ? 1 : 0;
                
                // Create SVG path
                const pathData = [
                  `M 50 50`,
                  `L ${x1} ${y1}`,
                  `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                  `Z`
                ].join(' ');
                
                // Store the end angle to use as the start for the next segment
                const returnValue = (
                  <path
                    key={item.level}
                    d={pathData}
                    fill={getLevelColor(item.level).replace('bg-', 'fill-')}
                    className={getLevelColor(item.level).replace('bg-', 'fill-')}
                    stroke="#374151"
                    strokeWidth="1"
                  />
                );
                
                startAngle = endAngle;
                return returnValue;
              });
            })()}
            
            {/* Center circle for donut effect */}
            <circle cx="50" cy="50" r="25" fill="#1F2937" />
          </svg>
          
          {/* Center text showing total */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <div className="text-2xl font-bold">{registrations.length}</div>
            <div className="text-xs text-gray-400">Students</div>
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
        {studyLevelData.map(item => (
          <div key={item.level} className="flex items-center text-sm">
            <div className={`w-3 h-3 ${getLevelColor(item.level)} rounded-sm mr-2`}></div>
            <div className="text-gray-300">{item.level}</div>
            <div className="ml-auto text-gray-400">{item.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyLevelChart;