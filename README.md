
<h1 align="center" style="color:#3b82f6;">🎵 Moodify: Facial Expression-Based Music Recommendation 🎵</h1>

<p align="center" style="color:#6366f1; font-size:1.1em;">Moodify is a web application that uses facial expression recognition to recommend songs that match your mood. Built with React for the frontend and Node.js/Express for the backend, it leverages face-api.js and TensorFlow.js for real-time mood detection via webcam.</p>

<h2 style="color:#22d3ee;">✨ Features</h2>

- 😊 Real-time mood detection using your webcam
- 🎶 Song recommendations based on detected mood
- 🛠️ Admin interface to upload new songs
- 📱 Responsive and modern UI

<h2 style="color:#f59e42;">🛠️ Tech Stack</h2>

- <b>Frontend:</b> React, Vite, face-api.js, TensorFlow.js, CSS
- <b>Backend:</b> Node.js, Express, MongoDB, Multer, ImageKit

<h2 style="color:#10b981;">🚀 Getting Started</h2>

<h3 style="color:#f43f5e;">🔧 Prerequisites</h3>
- Node.js (v18+ recommended)
- npm or yarn

<h3 style="color:#f43f5e;">⚡ Installation</h3>

1. <b>Clone the repository:</b>
   ```sh
   git clone <your-repo-url>
   cd facialExpression project
   ```

2. <b>Install dependencies:</b>
   - For frontend:
     ```sh
     cd frontend
     npm install
     ```
   - For backend:
     ```sh
     cd ../backend
     npm install
     ```

3. <b>Set up environment variables:</b>
   - Configure your ImageKit and MongoDB credentials in the backend as needed.

4. <b>Run the application:</b>
   - Start the backend server:
     ```sh
     node server.js
     ```
   - Start the frontend dev server:
     ```sh
     cd ../frontend
     npm run dev
     ```
   - Visit `http://localhost:5173` in your browser.

<h2 style="color:#a855f7;">📁 Folder Structure</h2>
<pre>
backend/
  server.js
  src/
    models/
    routes/
    services/
frontend/
  src/
    components/
    public/models/  # face-api.js models
</pre>

<h2 style="color:#facc15;">🧑‍💻 Usage</h2>
1. Allow camera access when prompted.
2. Click <b>Detect Mood</b> to analyze your facial expression.
3. Receive song recommendations based on your mood.
4. Admins can upload new songs via the upload form.

<h2 style="color:#38bdf8;">🧩 Model Files</h2>
Place all required face-api.js model files in <code>frontend/public/models/</code>.

<h2 style="color:#ef4444;">📄 License</h2>
This project is for educational purposes.
