"use client";
import React, { useMemo } from 'react';
import '../admin-styles.css';

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
  const studyLevelData = useMemo<LevelData[]>(() => {
    const countsByLevel = registrations.reduce<Record<string, number>>((acc, reg) => {
      let level = reg.levelOfStudy || 'Unknown';
      if (!studyLevelOrder.includes(level)) level = 'Other';
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {});

    const allLevels = studyLevelOrder.reduce<Record<string, number>>((acc, level) => {
      acc[level] = countsByLevel[level] || 0;
      return acc;
    }, {});

    return Object.entries(allLevels)
      .filter(([, count]) => count > 0)
      .map(([level, count]) => ({
        level,
        count,
        percentage: Math.round((count / registrations.length) * 100)
      }))
      .sort((a, b) => studyLevelOrder.indexOf(a.level) - studyLevelOrder.indexOf(b.level));
  }, [registrations]);

  if (studyLevelData.length === 0) {
    return <div className="chart-empty">No study level data available</div>;
  }

  return (
    <div className="study-level-chart">
      <div className="chart-container">
        <div className="donut-chart">
          <svg viewBox="0 0 100 100">
            {(() => {
              let startAngle = 0;
              return studyLevelData.map((item) => {
                const angle = 3.6 * item.percentage;
                const endAngle = startAngle + angle;
                const x1 = 50 + 40 * Math.cos((startAngle - 90) * Math.PI / 180);
                const y1 = 50 + 40 * Math.sin((startAngle - 90) * Math.PI / 180);
                const x2 = 50 + 40 * Math.cos((endAngle - 90) * Math.PI / 180);
                const y2 = 50 + 40 * Math.sin((endAngle - 90) * Math.PI / 180);
                const largeArcFlag = angle > 180 ? 1 : 0;
                const pathData = [
                  `M 50 50`,
                  `L ${x1} ${y1}`,
                  `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                  `Z`
                ].join(' ');

                const segment = (
                  <path
                    key={item.level}
                    d={pathData}
                    className={`fill-${item.level.toLowerCase()}`}
                    stroke="#374151"
                    strokeWidth="1"
                  />
                );

                startAngle = endAngle;
                return segment;
              });
            })()}
            <circle cx="50" cy="50" r="25" className="fill-gray-800" />
          </svg>
          <div className="donut-center">
            <div className="total-count">{registrations.length}</div>
            <div className="total-label">Students</div>
          </div>
        </div>
      </div>
      <div className="level-legend">
        {studyLevelData.map(item => (
          <div key={item.level} className="legend-item">
            <div className={`legend-color bg-${item.level.toLowerCase()}`}></div>
            <span className="legend-label">{item.level}</span>
            <span className="legend-count">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyLevelChart;
