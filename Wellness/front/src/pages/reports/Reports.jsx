import React, { useEffect, useState } from "react";
import axios from "axios";
import './reports.css';

import PuffLoader from "react-spinners/PuffLoader";

const Reports = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/articles")
      .then((response) => {
        console.log("크롤링 데이터:", response.data);
        setArticles(response.data)
    })
    .catch((error) => console.error("Error fetching articles:", error));
  }, []);


  if (articles.length === 0) {
    return (
      <div className="reports-empty">
        <div className="reports-empty-description">
            <PuffLoader size={80}/>
            <h1>서비스 준비중입니다.</h1>
            <p>현재 데이터를 준비 중입니다.<br />추후에 더 나은 서비스로 찾아뵙겠습니다.</p>

            <div className="work-description">
              <p>작업 일시: 2024.12.12 ~ 2024.12.31</p>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reports">
        <div className="reports-title">
            <h1>Wellness Articles</h1>
            <p>with Vogue</p>
        </div>
        <div className="reports-container">
            {articles.map((article, index) => (
                <div key={index}>
                    <a href={article.link} target="_blank" rel="noopener noreferrer">
                        <img src={article.imageUrl} alt={article.title} className="report-image" />
                        <div className="report-content">
                            <h3>{article.title}</h3>
                            <p>{article.date}</p>
                        </div>
                    </a>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Reports;
