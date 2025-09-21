"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import "./UploadSongForm.css";

const UploadSongForm = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [mood, setMood] = useState("");
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const moodOptions = [
    "neutral",
    "happy",
    "sad",
    "angry",
    "fearful",
    "disgusted",
    "surprised",
  ];
  const moodIcons = {
    neutral: "😐",
    happy: "😊",
    sad: "😢",
    angry: "😠",
    fearful: "😨",
    disgusted: "🤢",
    surprised: "😮",
  };

  // Auto-dismiss notifications after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications((prev) =>
        prev.filter((notification) => Date.now() - notification.id < 5000)
      );
    }, 5000);

    return () => clearTimeout(timer);
  }, [notifications]);

  const addNotification = (type, title, message) => {
    const id = Date.now();
    const newNotification = {
      id,
      type,
      title,
      message,
      timestamp: Date.now(),
    };
    setNotifications((prev) => [...prev, newNotification]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !artist || !mood || !audio) {
      addNotification("error", "Validation Error", "Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("mood", mood);
    formData.append("audio", audio);

    try {
      setLoading(true);

      await axios.post("http://localhost:3000/songs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      addNotification("success", "Success!", "Song uploaded successfully!");
      setTitle("");
      setArtist("");
      setMood("");
      setAudio(null);
    } catch (error) {
      addNotification("error", "Upload Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setAudio(file);
  };

  const handleMoodSelect = (selectedMood) => {
    setMood(selectedMood);
  };

  return (
    <>
      {/* Popup Notifications */}
      <div className="notification-container">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification-popup ${notification.type}`}
          >
            <div className={`notification-icon ${notification.type}`}>
              {notification.type === "success" ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              )}
            </div>

            <div className="notification-content">
              <div className="notification-title">{notification.title}</div>
              <div className="notification-message">{notification.message}</div>
            </div>

            <button
              className="notification-close"
              onClick={() => removeNotification(notification.id)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>

            <div className="notification-progress"></div>
          </div>
        ))}
      </div>
      <div className="song">
        {/* Upload Form */}
        <div className="upload-song-container">
          <form onSubmit={handleSubmit} className="upload-song-form">
            <h2 className="upload-song-title">Upload Your Song</h2>

            <div className="form-group">
              <input
                type="text"
                placeholder="Song Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Artist Name"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-input" style={{ cursor: "pointer" }}>
                Select Mood
              </label>
              <div className="mood-selector">
                {moodOptions.map((moodOption) => (
                  <div
                    key={moodOption}
                    className={`mood-option ${
                      mood === moodOption ? "selected" : ""
                    }`}
                    onClick={() => handleMoodSelect(moodOption)}
                  >
                    <span className="emoji">{moodIcons[moodOption]}</span>
                    <span className="text">{moodOption}</span>{" "}
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <div className="file-input-wrapper">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  required
                  className="file-input"
                  id="audio-file"
                />
                <label
                  htmlFor="audio-file"
                  className={`file-input-label ${audio ? "file-selected" : ""}`}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  {audio ? audio.name : "Choose Audio File"}
                </label>
              </div>
            </div>

            <button type="submit" disabled={loading} className="upload-button">
              {loading && <span className="loading-spinner"></span>}
              {loading ? "Uploading..." : "Upload Song"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadSongForm;
