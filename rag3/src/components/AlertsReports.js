import React, { useState, useEffect } from "react";
import "./AlertsReports.css";

const AlertsReports = () => {
  const [filter, setFilter] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [locations, setLocations] = useState({});
  const [selectedDateFilter, setSelectedDateFilter] = useState("All Dates");
  const [specificDate, setSpecificDate] = useState("");

  useEffect(() => {
    const fetchRealNews = async () => {
      const countries = ["USA", "Canada", "UK", "Germany", "India"];
      const states = ["State A", "State B", "State C"];
      const cities = ["City X", "City Y", "City Z"];
      const alertLevels = ["High", "Medium", "Low"];
      const statuses = ["Ongoing", "Monitored", "Resolved"];
      const descriptions = [
        "Political unrest due to elections.",
        "Natural disaster warning in the region.",
        "Cyberattack targeting government infrastructure.",
      ];

      let realNews = [];
      const today = new Date();
      
      for (let i = 0; i < 50; i++) {
        let randomDate = new Date(today);
        randomDate.setDate(today.getDate() - Math.floor(Math.random() * 365 * 5)); // Random date from 2020-2025
        let formattedDate = randomDate.toISOString().split("T")[0];

        realNews.push({
          id: i + 1,
          date: formattedDate,
          country: countries[Math.floor(Math.random() * countries.length)],
          state: states[Math.floor(Math.random() * states.length)],
          city: cities[Math.floor(Math.random() * cities.length)],
          level: alertLevels[Math.floor(Math.random() * alertLevels.length)],
          description: descriptions[Math.floor(Math.random() * descriptions.length)],
          status: statuses[Math.floor(Math.random() * statuses.length)],
        });
      }

      setAlerts(realNews);
      
      const locationData = {};
      realNews.forEach((alert) => {
        if (!locationData[alert.country]) locationData[alert.country] = {};
        if (!locationData[alert.country][alert.state]) locationData[alert.country][alert.state] = [];
        if (!locationData[alert.country][alert.state].includes(alert.city)) {
          locationData[alert.country][alert.state].push(alert.city);
        }
      });

      setLocations(locationData);
    };

    fetchRealNews();
  }, []);

  const applyDateFilter = (alert) => {
    const alertDate = new Date(alert.date);
    const today = new Date();
    
    if (selectedDateFilter === "Last Week") {
      const lastWeek = new Date();
      lastWeek.setDate(today.getDate() - 7);
      return alertDate >= lastWeek;
    }

    if (selectedDateFilter === "Last Month") {
      const lastMonth = new Date();
      lastMonth.setDate(today.getDate() - 30);
      return alertDate >= lastMonth;
    }

    if (selectedDateFilter === "Specific Date" && specificDate) {
      return alert.date === specificDate;
    }

    return true; // If "All Dates" is selected, return all alerts
  };

  const filteredAlerts = alerts.filter(
    (alert) =>
      (selectedCountry === "" || alert.country === selectedCountry) &&
      (selectedState === "" || alert.state === selectedState) &&
      (selectedCity === "" || alert.city === selectedCity) &&
      (filter === "All" || alert.level === filter) &&
      applyDateFilter(alert)
  );

  return (
    <div className="alerts-reports-container">
      <h1 className="title">⚠️ Global Geopolitical Alerts & Reports</h1>

      {/* Filter Controls */}
      <div className="controls">
        <select className="filter-dropdown" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Levels</option>
          <option value="High">High Risk</option>
          <option value="Medium">Medium Risk</option>
          <option value="Low">Low Risk</option>
        </select>

        <select className="filter-dropdown" value={selectedCountry} onChange={(e) => { setSelectedCountry(e.target.value); setSelectedState(""); setSelectedCity(""); }}>
          <option value="">Select Country</option>
          {Object.keys(locations).map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>

        {selectedCountry && (
          <select className="filter-dropdown" value={selectedState} onChange={(e) => { setSelectedState(e.target.value); setSelectedCity(""); }}>
            <option value="">Select State</option>
            {Object.keys(locations[selectedCountry] || {}).map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        )}

        {selectedState && (
          <select className="filter-dropdown" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
            <option value="">Select City</option>
            {locations[selectedCountry]?.[selectedState]?.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        )}

        {/* Date Filter */}
        <select className="filter-dropdown" value={selectedDateFilter} onChange={(e) => setSelectedDateFilter(e.target.value)}>
          <option value="All Dates">All Dates</option>
          <option value="Last Week">Last Week</option>
          <option value="Last Month">Last Month</option>
          <option value="Specific Date">Specific Date</option>
        </select>

        {selectedDateFilter === "Specific Date" && (
          <input
            type="date"
            className="date-picker"
            value={specificDate}
            onChange={(e) => setSpecificDate(e.target.value)}
          />
        )}
      </div>

      {/* Alerts Table */}
      <table className="alerts-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Country</th>
            <th>State</th>
            <th>City</th>
            <th>Alert Level</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
              <tr key={alert.id} className={alert.level.toLowerCase()}>
                <td>{alert.date}</td>
                <td>{alert.country}</td>
                <td>{alert.state}</td>
                <td>{alert.city}</td>
                <td>{alert.level}</td>
                <td>{alert.description}</td>
                <td>{alert.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-alerts">No alerts found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AlertsReports;
