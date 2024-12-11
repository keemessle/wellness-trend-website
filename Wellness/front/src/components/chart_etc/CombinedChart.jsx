import React from "react";
import ChartComponent from "./ChartComponent";
import './chartComponent.css';
import './combinedChart.css';

const CombinedLineChart = ({ dailyLabels, dailyValues, monthlyLabels, monthlyValues }) => {

    const chartData = {
        labels: dailyLabels,
        datasets: [
            {
                label: "일별 검색량",
                data: dailyValues,
                borderColor: "rgba(75, 192, 192, 1)", 
                backgroundColor: "rgba(75, 192, 192, 0.3)",
                borderWidth: 1,
                fill: true,
                tension: 0,
                pointRadius: 0,
                yAxisID: "y", 
                xAxisID: "x-daily", 
            },
            {
                label: "월별 검색량",
                data: monthlyValues,
                borderColor: "rgba(204, 234, 119, 1)", 
                backgroundColor: "rgba(204, 234, 119, 0.3)",
                borderWidth: 1,
                fill: true,
                tension: 0,
                pointRadius: 0,
                yAxisID: "y",
                xAxisID: "x-monthly", 
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "top",
                labels: {
                    color: "#F5F5F5",
                },
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            y: {
                type: "linear",
                position: "left",
                ticks: {
                    color: "#F5F5F5",
                    stepSize: 50,
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.1)",
                },
            },
            "x-daily": {
                type: "category",
                position: "bottom",
                labels: dailyLabels,
                grid: {
                    color: "rgba(255, 255, 255, 0.1)",
                },
                ticks: {
                    color: "#fff",
                },
            },
            "x-monthly": {
                type: "category",
                position: "top",
                reverse: true,
                labels: monthlyLabels,
                ticks: {
                    color: "#F5F5F5",
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.1)",
                }
            }
        },
    };

    return (
        <div className="combined-chart">
            <ChartComponent data={chartData} options={options} />;
        </div>
    );
};

export default CombinedLineChart;
