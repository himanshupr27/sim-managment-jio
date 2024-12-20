import React, { useRef, useState } from 'react';
import "../../css/Recording.css";;
import Videorecording from './Videorecording';
const Recording = () => {

  const [activeVideoRecording, setActiveVideoRecording] = useState(false);


  return (
    <div className='video-kyc-container'>
      <h3 className='video-heading'>Welcome to video kyc</h3>
      <h6 className='video-heading video-application-id'>Application Id: 987654321</h6>
    <div className={`video-kyc-box ${activeVideoRecording?'display-hidden':''}`}>
      <div className='vk-left-part'>
        <video src='../video/KYC1.mp4' controls></video>
      </div>
      <div className='vk-right-part'>
        <h6>Follow the steps below to record the video</h6>

        <div className="steps">
          <span>Read</span>
          <p>I am Iris, and my code for this video kyc is 1001</p>
        </div>
        <div className="steps">
          <span>Show</span>
          <p>Aadhar</p>
        </div>
        <div className="steps">
        <span>Show</span>
        <p>Pan</p>
        </div>
        
        <button className='btn' onClick={()=>{setActiveVideoRecording(true)}}>Proceed to video recording</button>
      </div>
    </div>
    <div className={`video-kyc-box ${activeVideoRecording ? "" : "display-hidden"}`}>
                <Videorecording/>
            </div>
        </div>
  )
}

export default Recording
