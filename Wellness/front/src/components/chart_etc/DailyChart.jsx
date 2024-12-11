import React from "react";
import ChartComponent from "./ChartComponent";
import './chartComponent.css';
import './dailyChart.css';

const DailyChart = ({ labels, values }) => {

    const chartData = {
        labels: labels,
        datasets: [
          {
            label: "일별 검색량",
            data: values,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: (context) => {
                const chart = context.chart;
                const { ctx, chartArea } = chart;

                if (!chartArea) {
                    return null;
                }

                const gradient = ctx.createLinearGradient(
                    0,
                    chartArea.top,
                    0,
                    chartArea.bottom
                );
                gradient.addColorStop(0, "rgba(75, 192, 192, 0.8)");
                gradient.addColorStop(1, "rgba(75, 192, 192, 0)");
                return gradient;
            },
            borderWidth: 1,
            fill: true,
            pointRadius: 0,
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(75, 192, 192, 1)",
            tension: 0.4,
          }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true, 
            }   
        },
        interaction: {
            mode: "index",
            intersect: false,
        },
        scales: {
          x: {
            type: "category",
            grid: {
                display: true,
                color: "rgba(245, 245, 245, 0.2)",
                lineWidth: 1,
            },
            ticks: {
                color: "#F5F5F5"
            }
          },
          y: {
            grid: {
              display: true,
              color: "rgba(245, 245, 245, 0.2)",
              lineWidth: 1,
            },
            ticks: {
              color: "#F5F5F5",
              stepSize: 25
            },
            beginAtZero: true,
          }
        }
    };


    return (
      <div className="daily-chart">
        <ChartComponent data={chartData} options={options} />;
      </div>
    );
};

export default DailyChart;
