import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './SystemSettings.css'; // Import CSS

const SystemSettings = () => {
  const [selectedSection, setSelectedSection] = useState('ai-parameters'); // Default section
  const [notifications, setNotifications] = useState({
    email: false,
    sms: false,
    push: false,
    systemAlerts: false,
  });

  const navigate = useNavigate();  // Initialize useNavigate

  const handleCheckboxChange = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <div className="settings-container">
      {/* Sidebar Navigation */}
      <aside className="settings-sidebar">
        <ul>
          <li>
            <button 
              className={selectedSection === 'ai-parameters' ? 'active' : ''}
              onClick={() => setSelectedSection('ai-parameters')}
            >
              AI Parameters
            </button>
          </li>
          <li>
            <button 
              className={selectedSection === 'security-settings' ? 'active' : ''}
              onClick={() => setSelectedSection('security-settings')}
            >
              Security Settings
            </button>
          </li>
          <li>
            <button 
              className={selectedSection === 'notifications' ? 'active' : ''}
              onClick={() => setSelectedSection('notifications')}
            >
              Notification Preferences
            </button>
          </li>
          <li>
            <button 
              className={selectedSection === 'early-warning' ? 'active' : ''}
              onClick={() => setSelectedSection('early-warning')}
            >
              Early Warning Dashboard
            </button>
          </li>
          <li>
            <button 
              className={selectedSection === 'alert-settings' ? 'active' : ''}
              onClick={() => setSelectedSection('alert-settings')}
            >
              Alert Settings
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="settings-content">
        {selectedSection === 'ai-parameters' && (
          <section id="ai-parameters">
            <h3>AI Parameters</h3>
            <label>Sentiment Analysis Threshold:</label>
            <input type="range" min="0" max="100" />
            <label>Data Collection Frequency:</label>
            <select>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
            <label>AI Model Update Interval:</label>
            <select>
              <option>Automatic</option>
              <option>Manual</option>
            </select>
          </section>
        )}

        {selectedSection === 'security-settings' && (
          <section id="security-settings">
            <h3>Security Settings</h3>
            <label className="checkbox-container">
              <input type="checkbox" />
              <span>Enable 2FA Authentication</span>
            </label>
            <label>Whitelisted IP:</label>
            <input type="text" placeholder="Enter Whitelisted IP" />
            <label>Session Timeout:</label>
            <select>
              <option>15 Minutes</option>
              <option>30 Minutes</option>
              <option>1 Hour</option>
            </select>
          </section>
        )}

        {selectedSection === 'notifications' && (
          <section id="notifications">
            <h3>Notification Preferences</h3>
            <div className="checkbox-container">
              <label>
                <input 
                  type="checkbox" 
                  checked={notifications.email} 
                  onChange={() => handleCheckboxChange('email')}
                />
                Email Notifications
              </label>
            </div>
            <div className="checkbox-container">
              <label>
                <input 
                  type="checkbox" 
                  checked={notifications.sms} 
                  onChange={() => handleCheckboxChange('sms')}
                />
                SMS Notifications
              </label>
            </div>
            <div className="checkbox-container">
              <label>
                <input 
                  type="checkbox" 
                  checked={notifications.push} 
                  onChange={() => handleCheckboxChange('push')}
                />
                Push Notifications
              </label>
            </div>
            <div className="checkbox-container">
              <label>
                <input 
                  type="checkbox" 
                  checked={notifications.systemAlerts} 
                  onChange={() => handleCheckboxChange('systemAlerts')}
                />
                System Alerts
              </label>
            </div>
          </section>
        )}

        {selectedSection === 'early-warning' && (
          <section id="early-warning">
            <h3>Early Warning Dashboard</h3>
            <label className="checkbox-container">
              <input type="checkbox" />
              <span>Enable Early Warnings</span>
            </label>
            <label>Threshold Limit:</label>
            <input type="number" min="1" max="100" />
            <label>Notification Method:</label>
            <select>
              <option>Email</option>
              <option>SMS</option>
              <option>Push Notification</option>
            </select>
            <label>Response Time Monitoring:</label>
            <select>
              <option>Immediate</option>
              <option>5 Minutes</option>
              <option>10 Minutes</option>
            </select>
          </section>
        )}

        {selectedSection === 'alert-settings' && (
          <section id="alert-settings">
            <h3>Alert Settings</h3>
            <label className="checkbox-container">
              <input type="checkbox" />
              <span>Enable Critical Alerts</span>
            </label>
            <label>Alert Sound:</label>
            <select>
              <option>Beep</option>
              <option>Chime</option>
              <option>Silent</option>
            </select>
            <label>Alert Frequency:</label>
            <select>
              <option>Instant</option>
              <option>Every 10 Minutes</option>
              <option>Hourly</option>
            </select>
            <label>Notification Type:</label>
            <select>
              <option>Popup</option>
              <option>Email</option>
              <option>SMS</option>
            </select>
          </section>
        )}

        {/* Go to Homepage Button */}
        <button 
          className="go-homepage-button" 
          onClick={() => navigate('/')}  // Use navigate() for redirection
        >
          Go to Homepage
        </button>

      </main>
    </div>
  );
};

export default SystemSettings;

