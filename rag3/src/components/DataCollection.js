import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DataCollection.css";

const DataCollection = () => {
  const [sources, setSources] = useState([""]);
  const navigate = useNavigate();

  const handleInputChange = (index, value) => {
    const updatedSources = [...sources];
    updatedSources[index] = value;
    setSources(updatedSources);
  };

  const handleSelect = (index) => {
    const selectedUrl = sources[index];
    if (selectedUrl.startsWith("https://")) {
      navigate("/ai-analysis", { state: { url: selectedUrl } });
    } else {
      alert("Please enter a valid URL!");
    }
  };

  const addSource = () => {
    setSources([...sources, ""]);
  };

  return (
    <div className="data-collection">
      <h2 className="title">News Early Warning Dashboard</h2>
      <div className="sources-container">
        {sources.map((source, index) => (
          <div key={index} className="source-input">
            <input
              type="text"
              value={source}
              onChange={(e) => handleInputChange(index, e.target.value)}
              placeholder={`Enter News URL ${index + 1}`}
            />
            <button className="select-button" onClick={() => handleSelect(index)}>
              Analyze
            </button>
          </div>
        ))}
      </div>
      <button className="add-source" onClick={addSource}>+ Add New Source</button>
    </div>
  );
};

export default DataCollection;
