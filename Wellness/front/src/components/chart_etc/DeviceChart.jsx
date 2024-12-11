import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import "./deviceChart.css";

// Chart.js 요소 등록
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DeviceChart = ({ data }) => {
    if (!data || !data.pc || !data.mo) {
        return <p style={{ textAlign: "center", color: "#fff" }}>데이터가 없습니다.</p>;
    }

    const pcValues = data.pc.map((item) => item.ratio);
    const moValues = data.mo.map((item) => item.ratio);

    const chartData = {
        labels: ["PC", "Mobile"],
        datasets: [
            {
                label: "검색 환경별 검색률",
                data: [pcValues, moValues],
                backgroundColor: ["rgba(29, 29, 29, 1)", "rgba(29, 29, 29, 1)"],
                borderColor: ["rgba(29, 29, 29, 1)", "rgba(29, 29, 29, 1)"],
                borderWidth: 1,
                borderRadius: {
                    topLeft: 0,
                    topRight: 0,
                    bottomLeft: 10, // 하단 둥글게 설정
                    bottomRight: 10, // 하단 둥글게 설정
                },
                borderSkipped: "top",
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top", 
                labels: {
                    color: "#fff", 
                },
            },
            tooltip: {
                enabled: true, 
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: "#fff"
                },
            },
            y: {
                grid: {
                    color: "rgba(255, 255, 255, 0.2)",
                },
                ticks: {
                    color: "#fff", 
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="device-chart">
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default DeviceChart;
