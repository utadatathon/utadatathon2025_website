"use client";
import React, { useMemo } from "react";
import '../admin-styles.css';

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
    data.forEach((reg) => {
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

    const newRegistrationsThisWeek = data.filter((reg) => {
      if (!reg.timestamp) return false;
      const regDate = new Date(reg.timestamp);
      return regDate >= oneWeekAgo;
    }).length;

    const newRegistrationsThisMonth = data.filter((reg) => {
      if (!reg.timestamp) return false;
      const regDate = new Date(reg.timestamp);
      return regDate >= oneMonthAgo;
    }).length;

    // Study level breakdown
    const studyLevels = data.reduce<Record<string, number>>((acc, reg) => {
      const level = reg.levelOfStudy || "Unknown";
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {});

    // Sort study levels by count
    const sortedLevels = Object.entries(studyLevels).sort(
      (a, b) => b[1] - a[1]
    );

    // Most common level of study
    const mostCommonLevel =
      sortedLevels.length > 0 ? sortedLevels[0][0] : "None";

    return {
      totalRegistrations,
      uniqueSchoolsCount: uniqueSchools.size,
      newRegistrationsThisWeek,
      newRegistrationsThisMonth,
      mostCommonLevel,
    };
  }, [data]);

  return (
    <div className="dashboard-stats">
      <div className="stat-card stat-blue">
        <h4 className="stat-title">Total Registrations</h4>
        <div className="stat-value">{stats.totalRegistrations}</div>
      </div>

      <div className="stat-card stat-purple">
        <h4 className="stat-title">Schools Represented</h4>
        <div className="stat-value">{stats.uniqueSchoolsCount}</div>
      </div>

      <div className="stat-card stat-green">
        <h4 className="stat-title">New This Week</h4>
        <div className="stat-value">{stats.newRegistrationsThisWeek}</div>
      </div>

      <div className="stat-card stat-yellow">
        <h4 className="stat-title">New This Month</h4>
        <div className="stat-value">{stats.newRegistrationsThisMonth}</div>
      </div>

      <div className="stat-card stat-red">
        <h4 className="stat-title">Top Study Level</h4>
        <div className="stat-value truncate" title={stats.mostCommonLevel}>
          {stats.mostCommonLevel}
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
