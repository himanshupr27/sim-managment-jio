import React, { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import RecordRTC from "recordrtc";
import "../../css/Recording.css";

const Videorecording = () => {
  const webcamRef = useRef(null); 
  const mediaRecorderRef = useRef(null); 
  const [recording, setRecording] = useState(false); 
  const [recordedChunks, setRecordedChunks] = useState([]); 
  const [previewSrc, setPreviewSrc] = useState(null); 
  const [userData,setUserData]=useState(JSON.parse(localStorage.getItem('pki-users')));
  const [code,setCode]=useState();
  

useEffect(()=>{
  function generateRandomFourDigitNumber() {
    setCode(Math.floor(1000 + Math.random() * 9000));
}

generateRandomFourDigitNumber();
},[])

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
      setRecordedChunks([blob]);
      const previewURL = URL.createObjectURL(blob);
      setPreviewSrc(previewURL); 
    });
  }, []);

  
  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = `${userData.usersname}-video-ekyc-${code}.webm`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }, [recordedChunks]);

  return (
    <>
      <div className="vk-left-part">
        {/* Webcam */}
        <Webcam
          audio={true}
          muted={true}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            facingMode: "user",
          }}
        />
      </div>
      <div className="vk-right-part">
        <h6>Follow the steps below to record the video</h6>
        <ul>
          <li>
            <span>Read</span> I am {userData.usersname}, and my code for this video KYC is {code}
          </li>
          <li>
            <span>Show</span> Aadhar
          </li>
          <li>
            <span>Show</span> PAN
          </li>
        </ul>
        <div>
          {!recording ? (
            <button className="start-btn" onClick={handleStartCaptureClick}>
              Start Recording
            </button>
          ) : (
            <button className="stop-btn" onClick={handleStopCaptureClick}>
              Stop Recording
            </button>
          )}
          {recordedChunks && recordedChunks.length > 0 && (
            <button className="save-btn" onClick={handleDownload}>
              Save Video
            </button>
          )}
        </div>
        {/* Preview Recorded Video */}
        {previewSrc && (
          <div>
            <h6>Preview:</h6>
            <video
              src={previewSrc}
              controls
              muted 
              style={{ width: "100%" }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Videorecording;
