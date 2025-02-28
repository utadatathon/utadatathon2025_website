"use client";
import React, { useMemo } from 'react';

interface Registration {
  timestamp?: string | Date;
  email?: string;
  schoolName?: string;
  levelOfStudy?: string;
  fieldOfStudy?: string;
  [key: string]: unknown;
}

interface DashboardStatsProps {
  data: Registration[];
}

interface StatsData {
  totalRegistrations: number;
  uniqueSchoolsCount: number;
  newRegistrationsThisWeek: number;
  newRegistrationsThisMonth: number;
  mostCommonLevel: string;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ data }) => {
  const stats = useMemo<StatsData>(() => {
    // Total registrations
    const totalRegistrations = data.length;
    
    // Schools represented
    const uniqueSchools = new Set<string>();
    data.forEach(reg => {
      if (reg.schoolName) {
        uniqueSchools.add(reg.schoolName);
      }
    });
    
    // Registration growth over time
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);
    
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setDate(today.getDate() - 30);
    
    const newRegistrationsThisWeek = data.filter(reg => {
      if (!reg.timestamp) return false;
      const regDate = new Date(reg.timestamp);
      return regDate >= oneWeekAgo;
    }).length;
    
    const newRegistrationsThisMonth = data.filter(reg => {
      if (!reg.timestamp) return false;
      const regDate = new Date(reg.timestamp);
      return regDate >= oneMonthAgo;
    }).length;
    
    // Study level breakdown
    const studyLevels = data.reduce<Record<string, number>>((acc, reg) => {
      const level = reg.levelOfStudy || 'Unknown';
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {});
    
    // Sort study levels by count
    const sortedLevels = Object.entries(studyLevels)
      .sort((a, b) => b[1] - a[1]);
    
    // Most common level of study
    const mostCommonLevel = sortedLevels.length > 0 ? sortedLevels[0][0] : 'None';
    
    return {
      totalRegistrations,
      uniqueSchoolsCount: uniqueSchools.size,
      newRegistrationsThisWeek,
      newRegistrationsThisMonth,
      mostCommonLevel
    };
  }, [data]);
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <div className="bg-gradient-to-br from-blue-800 to-blue-900 p-4 rounded-lg">
        <h4 className="text-blue-300 text-sm font-medium mb-1">Total Registrations</h4>
        <div className="text-white text-2xl font-bold">{stats.totalRegistrations}</div>
      </div>
      
      <div className="bg-gradient-to-br from-purple-800 to-purple-900 p-4 rounded-lg">
        <h4 className="text-purple-300 text-sm font-medium mb-1">Schools Represented</h4>
        <div className="text-white text-2xl font-bold">{stats.uniqueSchoolsCount}</div>
      </div>
      
      <div className="bg-gradient-to-br from-green-800 to-green-900 p-4 rounded-lg">
        <h4 className="text-green-300 text-sm font-medium mb-1">New This Week</h4>
        <div className="text-white text-2xl font-bold">{stats.newRegistrationsThisWeek}</div>
      </div>
      
      <div className="bg-gradient-to-br from-yellow-700 to-yellow-800 p-4 rounded-lg">
        <h4 className="text-yellow-300 text-sm font-medium mb-1">New This Month</h4>
        <div className="text-white text-2xl font-bold">{stats.newRegistrationsThisMonth}</div>
      </div>
      
      <div className="bg-gradient-to-br from-red-800 to-red-900 p-4 rounded-lg">
        <h4 className="text-red-300 text-sm font-medium mb-1">Top Study Level</h4>
        <div className="text-white text-2xl font-bold truncate" title={stats.mostCommonLevel}>
          {stats.mostCommonLevel}
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;