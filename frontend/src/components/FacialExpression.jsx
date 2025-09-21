import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import "./facialExpression.css";
import axios from "axios";

export default function FacialExpression({ setSongs }) {
  const videoRef = useRef();
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);

  // Use a single state for the button message to manage all states
  const [buttonMessage, setButtonMessage] = useState("Loading AI Models...");

  useEffect(() => {
    const setupFaceAPI = async () => {
      try {
        const MODEL_URL = "/models";
        // Update the message while loading
        setButtonMessage("Loading AI Models...");
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]);
        setModelsLoaded(true);
        // Success message after models are loaded
        setButtonMessage("Detect Mood");

        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          })
          .catch((err) => {
            console.error("Error accessing webcam: ", err);
            // Error message if camera access is denied
            setButtonMessage("Camera access denied. Please allow it.");
            alert("Camera access is required. Please allow it and refresh the page.");
          });
      } catch (error) {
        console.error("Error loading models:", error);
        // Error message if models fail to load
        setButtonMessage("Failed to load models. Try again.");
        alert("Failed to load AI models. Please refresh and try again.");
      }
    };

    setupFaceAPI();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const detectMood = async () => {
    if (!modelsLoaded || !videoRef.current) {
      alert("AI Models or camera not ready. Please wait a moment and try again.");
      return;
    }

    // Update button message to show detection is in progress
    setButtonMessage("Please Wait...");
    setIsDetecting(true);

    try {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      if (!detections?.length) {
        console.log("No face detected");
        // Error message if no face is detected
        setButtonMessage("No face detected. Try again.");
        return;
      }
      
      const expressions = detections[0].expressions;
      const dominantExpression = Object.keys(expressions).reduce((a, b) =>
        expressions[a] > expressions[b] ? a : b
      );

      console.log(`Detected mood: ${dominantExpression}`);
      
      try {
        const response = await axios.get(`http://localhost:3000/songs?mood=${dominantExpression}`);
        setSongs(response.data.songs);
        // Success message after songs are fetched
        setButtonMessage("Enjoy the songs! 👇");
      } catch (err) {
        console.error("Could not fetch songs for this mood.", err);
        // Error message if fetching songs fails
        setButtonMessage("Failed to fetch songs. Try again.");
        alert("Sorry, we couldn't fetch songs for your current mood. Please try again.");
      }
    } catch (detectError) {
      console.error("Error during face detection:", detectError);
      // General error message for detection failure
      setButtonMessage("Detection failed. Try again.");
      alert("An error occurred during face detection. Please try again.");
    } finally {
      setIsDetecting(false);
      // Reset the button message back to "Detect Mood" after a brief delay
      // This is for better user experience after a successful detection
      setTimeout(() => {
        setButtonMessage("Detect Mood");
      }, 5000);
    }
  };

  return (
    <div className="mood-element">
      <h1>Moodify Player</h1>
      <video ref={videoRef} autoPlay muted className="user-video-feed" />
      <button
        onClick={detectMood}
        className="detect-mood-button"
        disabled={isDetecting || !modelsLoaded}
      >
        {buttonMessage}
      </button>
    </div>
  );
}