import React, { useState } from 'react';
import './YourProfile.css';

const YourProfile = () => {
  const [profile, setProfile] = useState({
    firstName: 'Shreya',
    lastName: 'Sharma',
    dob: '1998-05-20',
    mobile: '9876543210',
    email: 'shreya@example.com',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setIsEditing(false); // Save and close edit mode
    setMessage('Changes saved successfully!');
  };

  const handleEditClick = () => {
    setIsEditing(true); // Enable edit mode
    setMessage(''); // Clear previous messages
  };


  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      <div className="profile-details">
        <div className="profile-item">
          <strong>First Name:</strong>
          {isEditing ? (
            <input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
            />
          ) : (
            <span>{profile.firstName}</span>
          )}
        </div>

        <div className="profile-item">
          <strong>Last Name:</strong>
          {isEditing ? (
            <input
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
            />
          ) : (
            <span>{profile.lastName}</span>
          )}
        </div>

        <div className="profile-item">
          <strong>Date of Birth:</strong>
          {isEditing ? (
            <input
              type="date"
              name="dob"
              value={profile.dob}
              onChange={handleChange}
            />
          ) : (
            <span>{profile.dob}</span>
          )}
        </div>

        <div className="profile-item">
          <strong>Mobile Number:</strong>
          {isEditing ? (
            <input
              type="tel"
              name="mobile"
              value={profile.mobile}
              onChange={handleChange}
            />
          ) : (
            <span>{profile.mobile}</span>
          )}
        </div>

        <div className="profile-item">
          <strong>Email Address:</strong>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />
          ) : (
            <span>{profile.email}</span>
          )}
        </div>
      </div>

      {isEditing ? (
        <>
          <button onClick={handleSave} className="save-btn">
            Save Changes
          </button>
        </>
      ) : (
        <button onClick={handleEditClick} className="edit-btn">
          Click here to edit
        </button>
      )}

      {message && <p className="success-message">{message}</p>}
    </div>
  );
};

export default YourProfile;
