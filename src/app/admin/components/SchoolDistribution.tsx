"use client";
import React, { useMemo } from 'react';
import '../admin-styles.css';

interface Registration {
  schoolName?: string;
  [key: string]: unknown;
}

interface SchoolDistributionProps {
  registrations: Registration[];
}

interface SchoolData {
  name: string;
  count: number;
  percentage: number;
}

const SchoolDistribution: React.FC<SchoolDistributionProps> = ({ registrations }) => {
  const schoolData = useMemo<SchoolData[]>(() => {
    const schoolCounts = registrations.reduce<Record<string, number>>((acc, reg) => {
      const school = reg.schoolName || 'Unknown';
      acc[school] = (acc[school] || 0) + 1;
      return acc;
    }, {});

    const sortedSchools = Object.entries(schoolCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({
        name,
        count,
        percentage: Math.round((count / registrations.length) * 100)
      }));

    const topSchools = sortedSchools.slice(0, 5);
    
    if (sortedSchools.length > 5) {
      const otherCount = sortedSchools.slice(5).reduce((sum, school) => sum + school.count, 0);
      topSchools.push({
        name: 'Other Schools',
        count: otherCount,
        percentage: Math.round((otherCount / registrations.length) * 100)
      });
    }
    
    return topSchools;
  }, [registrations]);

  const colors = [
    'school-bar-blue',
    'school-bar-purple',
    'school-bar-green',
    'school-bar-yellow',
    'school-bar-red',
    'school-bar-gray'
  ];

  if (schoolData.length === 0) {
    return <div className="school-empty-state">No school data available</div>;
  }

  return (
    <div className="school-distribution">
      <h3 className="school-distribution-title">School Distribution</h3>
      <div className="school-list">
        {schoolData.map((school, index) => (
          <div key={school.name} className="school-item">
            <div className="school-header">
              <span className="school-name" title={school.name}>
                {school.name}
              </span>
              <span className="school-stats">
                {school.count} ({school.percentage}%)
              </span>
            </div>
            <div className="progress-container">
              <div 
                className={`progress-bar ${colors[index % colors.length]}`}
                style={{ width: `${school.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchoolDistribution;
