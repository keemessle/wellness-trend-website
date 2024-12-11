import React, { useEffect, useState } from "react";
import axios from "axios";
import './widgetTop.css';

import GenderChart from "../../chart_etc/GenderChart";
import AgesChart from "../../chart_etc/AgesChart";
import DeviceChart from "../../chart_etc/DeviceChart";


const WidgetTop = ({ keyword }) => {
    const [deviceData, setDeviceData] = useState(null);
    const [genderData, setGenderData] = useState(null);
    const [agesData, setAgesData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    const calculateDateRange = (timeUnit) => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");

        if (timeUnit === "date") {
            return { 
                startDate: `${year}-${month}-01`, 
                endDate: `${year}-${month}-${day}` 
            };
        }
    };
        
    const fetchTrendData = async (timeUnit, type, value) => {
        if (!keyword || keyword.trim() === "") {
            console.error("유효하지 않은 검색어:", keyword);
            setError("검색어를 입력하세요.");
            return null; 
        }

        const { startDate, endDate } = calculateDateRange(timeUnit);
        console.log(`timeUnit: ${timeUnit}, startDate: ${startDate}, endDate: ${endDate}`);

        const requestData = {
            startDate,
            endDate,
            timeUnit,
            keywordGroups: [
                { 
                    groupName: "trend", 
                    keywords: [keyword]
                }
            ],
            ...(type === "device" ? { device: value } : {}),
            ...(type === "gender" ? { gender: value } : {}),
            ...(type === "age" ? { ages: value } : {}),
        };

        // // 요청 데이터 로그 -> 잘됨
        // console.log("Request Data:", requestData);

        try {
            const response = await axios.post("/api/trend", requestData, {
                headers: { "Content-Type": "application/json" }
            });    
            
            // // 응답 데이터 로그 -> 잘됨
            // console.log("API Response:", response.data);

            return response.data?.results || []; // API 응답 결과 반환

        } catch (err) {
            console.error("데이터 요청 실패:", err);
            return [];
        }
    };
  
  
    // 데이터 요청 및 처리
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // 로딩 시작

            try {
                // 디바이스 데이터 요청
                const pcResponse = await fetchTrendData("date", "device", "pc");
                const moResponse = await fetchTrendData("date", "device", "mo");
                if (pcResponse && moResponse) {
                    const pcData = pcResponse[0]?.data.map((item) => ({
                        date: item.period,
                        ratio: item.ratio,
                    }));
                    const moData = moResponse[0]?.data.map((item) => ({
                        date: item.period,
                        ratio: item.ratio,
                    }))
                    setDeviceData ({
                        pc: pcData,
                        mo: moData
                    })
                } 


                // 성별 데이터 요청
                const maleResponse = await fetchTrendData("date", "gender", "m");
                const femaleResponse = await fetchTrendData("date", "gender", "f");
                if (maleResponse && femaleResponse) {
                    const maleData = maleResponse[0]?.data.map((item) => ({
                        date: item.period,
                        ratio: item.ratio,
                    }));
                    const femaleData = femaleResponse[0]?.data.map((item) => ({
                        date: item.period,
                        ratio: item.ratio,
                    }));
                    setGenderData({
                        male: maleData,
                        female: femaleData,
                    });
                }


                // 연령별 데이터 요청
                const age10Response = await fetchTrendData("date", "age", ["1", "2"]);
                const age20Response = await fetchTrendData("date", "age", ["3", "4"]);
                const age30Response = await fetchTrendData("date", "age", ["5", "6"]);
                const age40Response = await fetchTrendData("date", "age", ["7", "8"]);
                const age50Response = await fetchTrendData("date", "age", ["9", "10"]);
                const age60Response = await fetchTrendData("date", "age", ["11"]);
                
                
                // 데이터 가공
                const ageResponses = [
                    { ageGroup: "10대", response: age10Response },
                    { ageGroup: "20대", response: age20Response },
                    { ageGroup: "30대", response: age30Response },
                    { ageGroup: "40대", response: age40Response },
                    { ageGroup: "50대", response: age50Response },
                    { ageGroup: "60대 이상", response: age60Response },
                ];
                
                const ageData = ageResponses.map(({ ageGroup, response }) => {
                    const total = response[0]?.data.reduce((sum, item) => {                        
                        if (item.ratio) return sum + item.ratio;
                            return sum;
                    }, 0) || 0; // 기본값 처리

                    return { ageGroup, total };
                });

                const totalSum = ageData.reduce((sum, group) => sum + group.total, 0) || 1;
                const ageRatioData = ageData.map((group) => ({
                    ageGroup: group.ageGroup,
                    ratio: totalSum > 0 ? ((group.total / totalSum) * 100).toFixed(2) : "0.00", 
                }));                
            setAgesData(ageRatioData);                    

            } catch (err) {
                console.error("데이터 요청 실패: ", err);
                setError("데이터 요청에 실패했습니다.");
            } finally {
                setIsLoading(false); // 로딩 종료
            }          
        };
   
        fetchData();
    }, [keyword]);

    console.log("Device Data:", deviceData);
    console.log("Gender Data:", genderData);
    console.log("Ages Data:", agesData);

    if (error) { return <p className="error-message">{error}</p>; }

    if (isLoading) { return <p className="loading-message">데이터를 불러오는 중입니다...</p>; }
    
    return (
        <div className="top-chart">
            <div className="bar-chart">
                    <span className="chart-title">검색환경별 검색률</span>
                    <DeviceChart data={deviceData} />
            </div>

            <div className="pie-chart">
                <span className="chart-title">성별 검색률</span>
                <GenderChart data={genderData} />
            </div>
        
            <div className="doughnut-chart">
                <span className="chart-title">연령별 검색률</span>
                <AgesChart data={agesData} />
            </div>
        </div>
    );

};
        

export default WidgetTop;
