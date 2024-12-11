import React from "react";
import './agesChart.css'
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);


const AgesChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>Loading age chart...</p>;
  }

  // 비율 데이터 정렬 (내림차순)
  const sortedData = [...data].sort((a, b) => b.ratio - a.ratio);
  const labels = sortedData.map((item) => item.ageGroup);
  const values = sortedData.map((item) => item.ratio);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
            "rgba(255, 99, 132, 0.6)", // 10대: 빨간색
            "rgba(54, 162, 235, 0.6)", // 20대: 파란색
            "rgba(255, 206, 86, 0.6)", // 30대: 노란색
            "rgba(75, 192, 192, 0.6)", // 40대: 녹색
            "rgba(148, 129, 255, 0.6)", // 50대: 보라색
            "rgba(255, 159, 64, 0.6)",  // 60대 이상: 주황색
        ],
        borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(148, 129, 255, 1)",
            "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "50%",
    plugins: {
        legend: {
            position: "right",
            labels: {
              font: {
                size: 11, // 폰트 크기 (작게 설정)
              },
              boxWidth: 15, // 범례 박스 크기
              padding: 10, // 범례와 텍스트 간 간격
            },
        },
        tooltip: {
            callbacks: {
                label: function (context) {
                    const value = context.raw;
                    return `${context.label}: ${value}%`;
                },
            },
        },
    },
  };

  return (
    <div className="ages-chart">
      <Doughnut data={chartData} options={options}/>
    </div>
  );
};

export default AgesChart;
