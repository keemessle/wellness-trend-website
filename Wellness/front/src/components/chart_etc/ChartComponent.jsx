import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    CategoryScale,
    Legend,
    Filler
} from "chart.js";



// Chart.js 요소를 등록
ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    CategoryScale,
    Legend,
    Filler
);

const ChartComponent = ({ data, options }) => {
    if (!data || data.datasets[0].data.length === 0) {
        return <p style={{ color: "#fff", textAlign: "center" }}>데이터가 없습니다.</p>;
    }

    return (
        <div className="chart-container">
            <Line data={data} options={options} />
        </div>
    );
};

export default ChartComponent;