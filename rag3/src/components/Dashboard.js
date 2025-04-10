import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./Dashboard.css";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [news, setNews] = useState([]);
  const [activePanel, setActivePanel] = useState("Live News Feed");
  const [aiSummary, setAiSummary] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const NEWS_API_KEY = "pub_788677aa36735d8282ee66b9146090ddf3d0f";
  const GEMINI_API_KEY = "AIzaSyCgz-p2aVMhAfPapKiuqpPk5fSU1mczYg";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          `https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&language=en`
        );
        const data = await res.json();
        const articles = data.results || [];

        const stabilityKeywords = [
          "war", "protest", "riot", "coup", "terror", "attack", "violence",
          "political crisis", "government collapse", "military", "conflict",
          "strike", "unrest", "corruption", "economic crisis", "inflation",
          "currency devaluation", "emergency", "refugee", "sanction", "massacre"
        ];

        const filteredArticles = articles.filter((article) =>
          stabilityKeywords.some((keyword) =>
            (article.title + " " + article.description).toLowerCase().includes(keyword)
          )
        );

        const topRelevantNews = [
          ...filteredArticles,
          ...articles.filter((a) => !filteredArticles.includes(a))
        ].slice(0, 8);

        setNews(topRelevantNews);

        const alertKeywords = [
          "alert", "emergency", "warning", "disaster", "evacuate", "flood", "fire", "storm"
        ];

        const filteredAlerts = articles.filter((article) =>
          alertKeywords.some((keyword) =>
            (article.title + " " + article.description).toLowerCase().includes(keyword)
          )
        );

        setAlerts(filteredAlerts.length > 0 ? filteredAlerts.slice(0, 8) : topRelevantNews.slice(0, 3));

        generateAISummary(topRelevantNews);
      } catch (error) {
        console.error("Failed to fetch news:", error);
        setNews([]);
        setAiSummary([]);
        setAlerts([]);
      }
    };

    fetchNews();
  }, []);

  const generateAISummary = async (articles) => {
    const prompt = `Summarize the following headlines that may affect a country's stability:\n\n${articles
      .map((a, i) => `${i + 1}. ${a.title}`).join("\n")}`;

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      );

      const json = await res.json();
      const output = json.candidates?.[0]?.content?.parts?.[0]?.text || "";

      const bulletPoints = output
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.startsWith("•") || line.startsWith("-") || /^\d+\./.test(line));

      if (bulletPoints.length > 0) {
        setAiSummary(bulletPoints);
      } else if (output) {
        setAiSummary([output]);
      } else {
        const fallback = articles.map((a, i) => `${i + 1}. ${a.title}`);
        setAiSummary(["AI Summary unavailable. Headlines:\n", ...fallback]);
      }
    } catch (err) {
      console.error("Gemini API error:", err);
      setAiSummary(["❌ AI Summary could not be generated."]);
    }
  };

  const countryArticleMap = news.reduce((acc, article) => {
    const code = article.country || "unknown";
    acc[code] = (acc[code] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(countryArticleMap).map(code => code.toUpperCase()),
    datasets: [
      {
        label: "No. of Articles per Country",
        data: Object.values(countryArticleMap),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderRadius: 4,
      }
    ]
  };

  const chartOptions = {
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { title: { display: true, text: "Country Code" } },
      y: { title: { display: true, text: "Articles" }, beginAtZero: true }
    }
  };

  const alertRatioData = {
    labels: ["Alert-Related Articles", "Other Articles"],
    datasets: [
      {
        data: [alerts.length, news.length - alerts.length],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverOffset: 6
      }
    ]
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">🌍 Global News Dashboard</h1>

      <div className="dashboard-controls">
        <p>🛑 Showing 8 news headlines that may affect national/global stability</p>
      </div>

      <div className="dashboard-panel-buttons">
        {["Live News Feed", "AI-Analysis Summary", "Recent Alerts Panel"].map(
          (panel) => (
            <button
              key={panel}
              className={`dashboard-button ${activePanel === panel ? "dashboard-active" : ""}`}
              onClick={() => setActivePanel(panel)}
            >
              {panel}
            </button>
          )
        )}
      </div>

      <div className="dashboard-panel-content">
        {activePanel === "Live News Feed" && (
          <div className="dashboard-news-feed">
            {news.length > 0 ? (
              news.map((article, idx) => (
                <div className="dashboard-news-card" key={idx}>
                  <h3>{article.title}</h3>
                  <p>{article.description?.slice(0, 100)}...</p>
                  <a href={article.link} target="_blank" rel="noopener noreferrer">Read More →</a>
                </div>
              ))
            ) : (
              <p>Loading filtered stability-related news...</p>
            )}
          </div>
        )}

        {activePanel === "AI-Analysis Summary" && (
          <div className="dashboard-ai-panel">
            <h2>🧠 AI Summary: Global Stability Snapshot</h2>
            <p className="ai-summary-intro">
              Here's a professional summary of the top global or national threats based on current news:
            </p>
            <ul className="ai-summary-list">
              {aiSummary.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>

            <h3>📊 Country-wise Article Count</h3>
            <div style={{ maxWidth: "700px", margin: "0 auto", padding: "1rem" }}>
              <Bar data={chartData} options={chartOptions} />
            </div>

            <h3>🧮 Alert vs Non-Alert News Ratio</h3>
            <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1rem" }}>
              <Pie data={alertRatioData} options={{ plugins: { legend: { position: 'bottom' } } }} />
            </div>
          </div>
        )}

        {activePanel === "Recent Alerts Panel" && (
          <div className="dashboard-alert-panel">
            <h2>🚨 Recent Alerts</h2>
            {alerts.length > 0 ? (
              alerts.map((alert, idx) => (
                <div className="dashboard-alert-card" key={idx}>
                  <h4>{alert.title}</h4>
                  <p>{alert.description?.slice(0, 100)}...</p>
                  <a href={alert.link} target="_blank" rel="noopener noreferrer">Read More →</a>
                </div>
              ))
            ) : (
              <div className="dashboard-alert-card">
                <h4>✅ No recent emergency alerts</h4>
                <p>Everything seems stable for now. Stay updated by following the news.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

