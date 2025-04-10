import React from "react";
import "./AI.css";

function AIAnalysis() {
  return (
    <div className="ai-analysis-container">
      <div className="ai-header">
        <h1>🚨 AI News Analysis Report</h1>
        <h2>🔍 Topic: Maharashtra Protest</h2>
      </div>

      <div className="ai-content">
        {/* Left Column */}
        <div className="ai-left-section">
          <div className="ai-card ai-summary">
            <h3>📌 Summary</h3>
            <p>
              The ongoing protests in Maharashtra have intensified as various groups take to the streets, 
              demanding political and economic reforms. Protesters are raising concerns over unemployment, 
              reservation policies, and governance issues. The government has urged for dialogue, but tensions remain high.
            </p>
          </div>

          <div className="ai-card ai-sentiment">
            <h3>📊 Sentiment Analysis</h3>
            <p><strong>Overall Sentiment:</strong> <span className="ai-negative">🔴 Negative</span></p>
            <p><strong>Key Emotions Detected:</strong> Anger, Frustration, Concern</p>
          </div>

          <div className="ai-card ai-authenticity">
            <h3>✅ Authenticity Score</h3>
            <p>82% (Based on credibility indicators and AI-driven fact-checking)</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="ai-right-section">
          <div className="ai-card ai-highlights">
            <h3>📢 Key Highlights</h3>
            <ul>
              <li>✔️ Large-scale protests in major cities like Mumbai, Pune, and Nagpur</li>
              <li>✔️ Police deployed to maintain order, but clashes reported</li>
              <li>✔️ Opposition parties supporting the protestors’ demands</li>
              <li>✔️ Government's assurance of addressing grievances</li>
            </ul>
          </div>

          <div className="ai-card ai-impact">
            <h3>🌎 Impact & Implications</h3>
            <ul>
              <li>🔹 Possible disruptions in transportation and public services</li>
              <li>🔹 Political pressure on the state government to respond</li>
            </ul>
          </div>

          <div className="ai-card ai-recommendations">
            <h3>📜 Recommendations</h3>
            <ul>
              <li>📌 Stay updated via verified news sources.</li>
              <li>📌 Follow government advisories if traveling in protest-affected areas.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIAnalysis;
