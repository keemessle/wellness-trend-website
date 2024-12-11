import React from "react";
import './genderChart.css'
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const GenderChart = ({ data }) => {
    // 데이터가 없을 경우 기본값 설정
    if (!data || !data.male || !data.female || data.male.length === 0 || data.female.length === 0) {
        return <p>데이터를 불러오는 중이거나 데이터가 없습니다.</p>;
    }

    // 남성 검색 비율 평균 계산
    const maleAverage =
        data.male.reduce((sum, item) => sum + (item.ratio || 0), 0) / data.male.length;

    // 여성 검색 비율 평균 계산
    const femaleAverage =
        data.female.reduce((sum, item) => sum + (item.ratio || 0), 0) / data.female.length;

    
        

    // 차트 데이터
    const chartData = {
        labels: ["남성", "여성"], // 범례 설정
        datasets: [
            {
                data: [maleAverage, femaleAverage], // 평균 비율 데이터
                backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"], // 남성: 파란색, 여성: 빨간색
                borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"], // 경계 색상
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "right",
                labels: {
                    font: {
                      size: 11, // 폰트 크기 (작게 설정)
                    },
                    boxWidth: 25, // 범례 박스 크기
                    padding: 10, // 범례와 텍스트 간 간격
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.raw;
                        return `${context.label}: ${value.toFixed(2)}%`; // 소수점 2자리 표시
                    },
                },
            },
        },
    };

    return (
        <div className="gender-chart">
            <Pie data={chartData} options={options} />
        </div>

    );
};

export default GenderChart;
