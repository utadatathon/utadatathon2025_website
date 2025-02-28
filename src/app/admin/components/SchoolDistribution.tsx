"use client";
import React, { useMemo } from 'react';

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
  // Process school data
  const schoolData = useMemo<SchoolData[]>(() => {
    // Count registrations by school
    const schoolCounts = registrations.reduce<Record<string, number>>((acc, reg) => {
      const school = reg.schoolName || 'Unknown';
      acc[school] = (acc[school] || 0) + 1;
      return acc;
    }, {});
    
    // Convert to array and sort by count
    const sortedSchools = Object.entries(schoolCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({
        name,
        count,
        percentage: Math.round((count / registrations.length) * 100)
      }));
    
    // Get top schools and group the rest as "Other"
    const topSchools = sortedSchools.slice(0, 5);
    
    if (sortedSchools.length > 5) {
      const otherSchools = sortedSchools.slice(5);
      const otherCount = otherSchools.reduce((sum, school) => sum + school.count, 0);
      
      topSchools.push({
        name: 'Other Schools',
        count: otherCount,
        percentage: Math.round((otherCount / registrations.length) * 100)
      });
    }
    
    return topSchools;
  }, [registrations]);
  
  // Generate colors for the bars
  const colors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-gray-500',
  ];
  
  if (schoolData.length === 0) {
    return <div className="text-gray-400 p-4 text-center">No school data available</div>;
  }
  
  return (
    <div className="space-y-4">
      {schoolData.map((school, index) => (
        <div key={school.name} className="space-y-1">
          <div className="flex justify-between items-center text-sm">
            <div className="truncate text-gray-300" title={school.name}>
              {school.name}
            </div>
            <div className="text-gray-400">
              {school.count} ({school.percentage}%)
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div 
              className={`${colors[index % colors.length]} h-2.5 rounded-full`} 
              style={{ width: `${school.percentage}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SchoolDistribution;