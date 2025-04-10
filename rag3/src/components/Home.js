import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home">
      {/* Image Background */}
      <video autoPlay loop muted className="background-video">
  <source src="/try2.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

      {/* Text over Image */}
      <h1>Welcome</h1>
    </div>
  );
}

export default Home;
