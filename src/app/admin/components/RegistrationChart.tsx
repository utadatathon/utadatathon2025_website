"use client";
import React from "react";
import '../admin-styles.css';

import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(
  () => import('react-apexcharts'),
  { ssr: false }
);

interface Registration {
  timestamp?: string | Date;
  [key: string]: unknown;
}

interface RegistrationChartProps {
  registrations: Registration[];
}

const RegistrationChart: React.FC<RegistrationChartProps> = ({ registrations }) => {
  // Process registration data
  const chartData = React.useMemo(() => {
    const validRegistrations = registrations.filter((reg) => reg.timestamp);
    if (validRegistrations.length === 0) return null;

    const dailyCounts = validRegistrations.reduce((acc, reg) => {
      const date = new Date(reg.timestamp as string).toISOString().split("T")[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    let runningTotal = 0;
    const data = Object.entries(dailyCounts)
      .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
      .map(([date, count]) => {
        runningTotal += count;
        return { date, count, total: runningTotal };
      });

    return {
      dates: data.map((d) => d.date),
      dailyCounts: data.map((d) => d.count),
      cumulativeCounts: data.map((d) => d.total),
    };
  }, [registrations]);

  if (!chartData) {
    return <div className="chart-empty">No registration data available</div>;
  }

  // Chart options
  const options = {
    chart: {
      type: "line" as const,
      toolbar: {
        show: false,
        style: {
          fontSize: "14px",
          colors: "#000000",
        },
      },
      zoom: { enabled: true },
    },
    stroke: { width: [0, 3] }, 
    colors: ["#4299e1", "#48bb78"], 
    xaxis: {
      categories: chartData.dates,
      labels: { style: { colors: "#D1D5DB" } },
      title: { text: "Date", style: { color: "#D1D5DB" } },
    },
    yaxis: [
      {
        title: { text: "Daily Registrations", style: { color: "#4299e1" } },
        labels: { style: { colors: "#4299e1" } },
      },
      {
        opposite: true,
        title: { text: "Cumulative Registrations", style: { color: "#48bb78" } },
        labels: { style: { colors: "#48bb78" } },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      theme: "dark",
    },
    legend: {
      position: "top" as const,
      labels: { colors: "#D1D5DB" },
    },
  };

  const series = [
    {
      name: "Daily Registrations",
      type: "column",
      data: chartData.dailyCounts,
    },
    {
      name: "Cumulative Registrations",
      type: "line",
      data: chartData.cumulativeCounts,
    },
  ];

  return (
    <div className="registration-chart">
      {/* <h3 className="chart-title">Registration Trends</h3> */}
      <ReactApexChart options={options} series={series} type="line" height={550} />
    </div>
  );
};

export default RegistrationChart;
