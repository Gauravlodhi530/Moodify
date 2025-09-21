// About.jsx

import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-card">
        <h1>About Our Project</h1>
        <p>
          This app uses <strong>face recognition and mood detection</strong> to
          recommend songs from our database. Simply allow camera access,
          capture your face, and enjoy music that matches your mood.
        </p>

        <h2>✨ Features</h2>
        <ul>
          <li>📷 Capture your face with camera permission</li>
          <li>😊 Detect your mood instantly</li>
          <li>🎵 Get personalized songs based on mood</li>
          <li>▶️ Play and enjoy music seamlessly</li>
          <li>🛠️ Admin can upload and manage song database easily</li>
        </ul>

        <h2>⚡ How It Works</h2>
        <ol>
          <li>Allow camera permission.</li>
          <li>Capture your face → App detects your mood.</li>
          <li>Song suggestions appear based on mood.</li>
          <li>Click play and enjoy!</li>
          <li>Admin can add new songs anytime.</li>
        </ol>
      </div>
    </div>
  );
};

export default About;
