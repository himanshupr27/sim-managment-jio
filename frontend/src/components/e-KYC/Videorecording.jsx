import React, { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import RecordRTC from "recordrtc";
import {useNavigate } from 'react-router-dom';
import "../../css/Recording.css";

const Videorecording = () => {
  const navigate = useNavigate();
  const webcamRef = useRef(null); 
  const mediaRecorderRef = useRef(null); 
  const [recording, setRecording] = useState(false); 
  const [recordedChunks, setRecordedChunks] = useState([]); 
  const [previewSrc, setPreviewSrc] = useState(null); 
  const [videoBlob, setVideoBlob] = useState(null); 
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("pki-users")));
  const [code, setCode] = useState();

  function generateRandomFourDigitNumber() {
    setCode(Math.floor(1000 + Math.random() * 9000));
  }
  useEffect(() => {
    generateRandomFourDigitNumber();
  }, []);

  const handleDataAvailable = useCallback(
    (data) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStartCaptureClick = useCallback(() => {
    setRecording(true);
    mediaRecorderRef.current = RecordRTC(webcamRef.current.stream, {
      type: "video",
      mimeType: "video/webm",
      disableLogs: true,
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });
    mediaRecorderRef.current.startRecording();
    mediaRecorderRef.current.ondataavailable = handleDataAvailable;
  }, [webcamRef, handleDataAvailable]);

  const handleStopCaptureClick = useCallback(() => {
    setRecording(false);
    mediaRecorderRef.current.stopRecording(() => {
      const blob = mediaRecorderRef.current.getBlob();
      setVideoBlob(blob); 
      const previewURL = URL.createObjectURL(blob);
      setPreviewSrc(previewURL); 
    });
  }, []);

  const handleReRecord = useCallback(() => {
    setPreviewSrc(null); 
    setVideoBlob(null); 
    setRecordedChunks([]); 
    generateRandomFourDigitNumber();
  }, []);

  const handleSubmit = useCallback(() => {
    if (!videoBlob) {
      alert("Please record a video before submitting!");
      return;
    }
    const formData = new FormData();
    formData.append("video", new File([videoBlob], `${userData.usersname}-video-ekyc-${code}.webm`, { type: "video/webm" }));
    formData.append("username", userData.usersname);
    formData.append("code", code);
    console.log(formData);
    navigate('/track-order');

  }, [videoBlob, userData, code]);

  return (
    <>
      <div className="vk-left-part">
        {!previewSrc ? (
          <Webcam
            audio={true}
            muted={true}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: "user",
            }}
          />
        ) : (
          <video
            src={previewSrc}
            controls
            style={{ width: "100%" }}
          />
        )}
      </div>
      <div className="vk-right-part">
        <h6>Follow the steps below to record the video</h6>

        <div className="steps">
          <span>Read</span>
          <p>I am {userData.usersname}, and my code for this video KYC is {code}</p>
        </div>
        <div className="steps">
          <span>Show</span>
          <p>Aadhar</p>
        </div>
        <div className="steps">
        <span>Show</span>
        <p>Pan</p>
        </div>
        <div>
          {!recording && !previewSrc && (
            <button className="btn" onClick={handleStartCaptureClick}>
              Start Recording
            </button>
          )}
          {recording && (
            <button className="btn stop-btn" onClick={handleStopCaptureClick}>
              Stop Recording
            </button>
          )}
          {previewSrc && (
            <>
              <button className="btn re-record-btn" onClick={handleReRecord}>
                Re-record
              </button>
              <button className="btn submit-btn" onClick={handleSubmit}>
                Submit Video
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Videorecording;
