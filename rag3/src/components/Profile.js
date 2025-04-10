import React from 'react';
import './Profile.css';
import YourProfile from './YourProfile';

const Profile = () => {
    return (
        <div className="profile-page">
            {/* Profile Header */}
            <div className="profile-header">
                <div className="profile-pic">
                    <img src="/p.jpg.jpg" alt="Profile Pic" />
                </div>
                <h3 className="profile-name">Shreya Sharma</h3>
            </div>

            {/* Profile Content - "Your Profile" Section */}
            <div className="profile-details-container">
                <div className="content">
                    <YourProfile />
                </div>
            </div>
        </div>
    );
};

export default Profile;
