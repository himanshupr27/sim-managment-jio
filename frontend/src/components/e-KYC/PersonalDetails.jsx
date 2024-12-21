import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../css/PersonalDetailsKyc.css";
import { FaRecordVinyl } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import { RxCrossCircled } from "react-icons/rx";
import { TbArrowBadgeRightFilled } from "react-icons/tb";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { FaFile } from "react-icons/fa";

const PersonalDetails = () => {
  const navigate = useNavigate();
  const [userKycDetails, setUserKycDetails] = useState({
    pan: "",
    aadhar: "",
    pin: "",
    dob: "",
    gender: "",
    docpin: "",
    profilepic: { file: null, preview: "" },
    addresspic: { file: null, preview: "" },
    panpic: { file: null, preview: "" }
  });
  const [errors, setErrors] = useState({});
  const [personalDetailBlock, setPersonalDetailsBlock] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [verifiedPan, setVerifiedPan] = useState('');
  const [panIsValid, setPanIsValid] = useState();
  const [OTP, setOTP] = useState();
  const [generateOtp, setGenerateOtp] = useState();
  const [otpverified, setotpVerified] = useState(false);
  const [rePin, setRePin] = useState();
  const [verifyPin, setVerifyPin] = useState();

  useEffect(() => {
    setIsButtonDisabled(!(userKycDetails.pan && !errors.pan));
  }, [userKycDetails.pan, errors.pan]);

  const validatePan = (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const verifyPan = () => {
    const isValid = validatePan(userKycDetails.pan);
    setPanIsValid(isValid);
    if (isValid) {
      setVerifiedPan("<p class='above-line'>Your name is</p><h5>Him******** *****sad</h5>");
    } else {
      setVerifiedPan("<p class='error'>Please enter a valid PAN</p>");
    }
  };

  const sendAadharOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000);
    setGenerateOtp(newOtp);
    setotpVerified(false);
    alert(`The OTP for login is ${newOtp}`);

  }
  const verifyOtp = () => {
    if (OTP.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        otp: "Please enter the OTP.",
      }));
      setotpVerified(false);
      return;
    }

    if (Number(OTP) === generateOtp) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        otp: "",
      }));
      setotpVerified(true);
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        otp: "Invalid OTP. Please try again.",
      }));
    }
  };
  const verifyPIN = () => {
    if (userKycDetails.pin === rePin) {
      setVerifyPin(true);
      sendAadharOtp();
    }
    else {
      setVerifyPin(false);
    }
  }
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserKycDetails((prevUserKycDetails) => ({
      ...prevUserKycDetails,
      [name]: value,
    }));

    if (value === "") {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: "true"
      }));
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ""
      }));
    }

  }
  const handleFileInput = (e) => {
    const { name, files } = e.target; // Access the file input's name and files
    const file = files[0]; // Get the first uploaded file

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // Update state with both file object and preview URL
        setUserKycDetails((prev) => ({
          ...prev,
          [name]: { file: file, preview: event.target.result },
        }));
      };
      reader.readAsDataURL(file); // Read the file to get its data URL for preview
    }
  };

  return (
    <div className='personal-dt-box'>
      <div className="steppers">
        <ul>
          <li className={`${personalDetailBlock == 1 ? 'active' : ''} ${personalDetailBlock > 1 ? 'completed' : ''}`}>{personalDetailBlock > 1 ? <TiTick /> : personalDetailBlock == 1 ? <TbArrowBadgeRightFilled /> : <FaRecordVinyl />}CERTIFICATION DETAILS</li>
          <li className={`${personalDetailBlock == 2 ? 'active' : ''} ${personalDetailBlock > 2 ? 'completed' : ''}`}>{personalDetailBlock > 2 ? <TiTick /> : personalDetailBlock == 2 ? <TbArrowBadgeRightFilled /> : <FaRecordVinyl />}APPLICAT DETAILS</li>
          <li className={`${personalDetailBlock == 3 ? 'active' : ''} ${personalDetailBlock > 3 ? 'completed' : ''}`}>{personalDetailBlock > 3 ? <TiTick /> : personalDetailBlock == 3 ? <TbArrowBadgeRightFilled /> : <FaRecordVinyl />}UPLOAD FILES</li>
          <li className={`${personalDetailBlock == 4 ? 'active' : ''}`}>{personalDetailBlock == 4 ? <TbArrowBadgeRightFilled /> : <FaRecordVinyl />}AUTHENTICATE & ESIGN</li>
        </ul>
      </div>
      <div className="left-part">
        <div className={`personal-details ${personalDetailBlock == 1 ? '' : 'display-hidden'}`} id="pd-1">
          <h4 className={`personal-dt-heading`}>CERTIFICATION DETAILS</h4>
          <div className={`personal-content `}>
            <div className="list-flex">
              <table>
                <tr>
                  <td>Name</td>
                  <td>: <span className='text-bold'>Himanshu Prasad</span></td>
                </tr>
                <tr>
                  <td>Email ID</td>
                  <td> : <span className='text-bold'>hipr27052002@gmail.com</span></td>
                </tr>
                <tr>
                  <td>Phone No. &nbsp;</td>
                  <td> : <span className='text-bold'>7761057471</span> </td>
                </tr>
                <tr>
                  <td>DOB</td>
                  <td>: <span className='text-bold'>27/05/2002</span></td>
                </tr>
              </table>
              <table>
                <tr>
                  <td>Class Type&nbsp;</td>
                  <td>: <span className='text-bold'>Class 2</span></td>
                </tr>
                <tr>
                  <td>User Type</td>
                  <td> : <span className='text-bold'>Individal</span></td>
                </tr>
                <tr>
                  <td>SIM Type</td>
                  <td>: <span className='text-bold'>PKI-SIM</span> </td>
                </tr>
                <tr>
                  <td>Vadivdity</td>
                  <td>: <span className='text-bold'>2 Years</span></td>
                </tr>
              </table>
            </div>
          </div>
          <div className="btn-box" id='btn-pd-1'>
            <button className='next-btn' onClick={() => { setPersonalDetailsBlock(2) }}>Proceed</button>
          </div>
        </div>
        <div className={`personal-details ${personalDetailBlock == 2 ? '' : 'display-hidden'}`} id="pd-2">
          <h4 className={`personal-dt-heading `}>APPLICAT DETAILS</h4>
          <div className={`personal-content`}>
            <div className="pan-box">
              <div className="pan-verify">
                <div className='input-container'>
                  <div className={`input-box ${errors.pan ? 'errors-bar' : ''}`}>
                    <input id="pan" type="text" name="pan" required="required" value={userKycDetails.pan} maxLength={10} onChange={handleInput}
                    // disabled={panIsValid} 
                    />
                    <label htmlFor="pan">PAN *</label>
                  </div>
                  {errors.pan && <span className="error-message"><RxCrossCircled />Enter Your PAN</span>}
                </div>
                <button onClick={verifyPan} disabled={isButtonDisabled}>Verify</button>
              </div>
              {verifiedPan && <div
                className={`verified-pan-message ${panIsValid ? 'success' : 'error'}`}
                dangerouslySetInnerHTML={{ __html: verifiedPan }}
              />
              }
            </div>

            {panIsValid && <>
              <div className="dob-gender-box">
                <div className='input-container'>
                  <div className={`input-box ${errors.industry ? 'errors-bar' : ''}`}>
                    <select id="gender" name="gender" required="required" value={userKycDetails.gender} onChange={handleInput}>
                      <option></option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Others</option>
                    </select>
                    <label htmlFor="industry">Select Gender *</label>
                  </div>
                  {errors.gender && <span className="error-message"><RxCrossCircled />Select Gender</span>}
                </div>
                <div className='input-container'>
                  <div className={`input-box ${errors.dob ? 'errors-bar' : ''}`}>
                    <input id="dob" type="date" name="dob" required="required" value={userKycDetails.dob} onChange={handleInput} placeholder='k'
                    />
                    <label htmlFor="pan">Date Of Birth *</label>
                  </div>
                  {errors.pan && <span className="error-message"><RxCrossCircled />Enter Your Date Of Birth</span>}
                </div>
              </div>

              <div className="aadhar-box">
                <div className="aadhar-input-container">
                  <div className='input-container'>
                    <div className={`input-box ${errors.aadhar ? 'errors-bar' : ''}`}>
                      <input id="aadhar" type="number" name="aadhar" required="required" value={userKycDetails.aadhar} maxLength={12} onChange={handleInput}
                        onInput={(e) => {
                          e.target.value = e.target.value.slice(0, 12);
                        }} />
                      <label htmlFor="aadhar">AADHAR NUMBER *</label>
                    </div>
                    {errors.aadhar && <span className="error-message"><RxCrossCircled />Enter Your AADHAR NUMBER</span>}
                  </div>
                  <button onClick={sendAadharOtp}>Send OTP</button>
                </div>
                {generateOtp && <div className="aadhar-otp-container">
                  <div className='input-container'>
                    <div className={`input-box ${errors.otp ? 'errors-bar' : ''}`}>
                      <input id="otp" type="password" name="otp" required="required" value={OTP} maxLength={6} onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setOTP(value.slice(0, 6));
                      }} onInput={(e) => {
                        e.target.value = e.target.value.slice(0, 6);
                      }}
                      // disabled={otpverified}
                      />
                      <label htmlFor="otp">OTP *</label>
                    </div>
                    {errors.otp && <span className="error-message"><RxCrossCircled />{errors.otp}</span>}
                    {otpverified && <p style={{ "color": "green" }}><TiTick />OTP VERIFIED</p>}
                  </div>
                  <button onClick={verifyOtp} disabled={otpverified}>Verify OTP</button>
                </div>}

              </div>
            </>
            }
          </div>
          <div className="btn-box">
            <button className='back-btn' onClick={() => { setPersonalDetailsBlock(1) }}>Back</button>
            <button className='next-btn' disabled={!otpverified} onClick={() => {
              setPersonalDetailsBlock(3);
              setOTP("");
              setotpVerified(false);
            }}>Proceed</button>
          </div>
        </div>
        <div className={`personal-details ${personalDetailBlock == 3 ? '' : 'display-hidden'}`} id="pd-3">
          <h4 className='personal-dt-heading'>UPLOAD FILES</h4>
          <div className='personal-content'>
            <div>
              <div className="image-container">

                {/* Profile Pic Upload */}
                <label htmlFor="profile-upload" className="custom-file-upload">
                  Profile Pic <br />
                  <div
                    className="file-upload-container"
                    onClick={() => { document.querySelector('#profile-upload').click(); }}
                  >
                    <input
                      id="profile-upload"
                      name="profilepic"
                      type="file"
                      hidden
                      onChange={handleFileInput}
                    />
                    {userKycDetails.profilepic.preview ? (
                      <img src={userKycDetails.profilepic.preview} alt="Profile Pic" className="uploaded-preview" />
                    ) : (
                      <div className="file-container-content">
                        <MdCloudUpload />
                        <p>Browse The File</p>
                      </div>
                    )}
                  </div>
                  {userKycDetails.profilepic.file && <p><FaFile /> {userKycDetails.profilepic.file.name}<MdDelete
                    onClick={() => {
                      setUserKycDetails((prev) => ({
                        ...prev,
                        profilepic: { file: null, preview: "" },
                      }));
                    }}
                    style={{ cursor: "pointer", color: "red" }}
                  /></p>}
                </label>

                {/* PAN Upload */}
                <label htmlFor="pan-upload" className="custom-file-upload">
                  PAN <br />
                  <div
                    className="file-upload-container"
                    onClick={() => { document.querySelector('#pan-upload').click(); }}
                  >
                    <input
                      id="pan-upload"
                      name="panpic"
                      type="file"
                      hidden
                      onChange={handleFileInput}
                    />
                    {userKycDetails.panpic.preview ? (
                      <img src={userKycDetails.panpic.preview} alt="PAN Pic" className="uploaded-preview" />
                    ) : (
                      <div className="file-container-content">
                        <MdCloudUpload />
                        <p>Browse The File</p>
                      </div>
                    )}
                  </div>
                  {userKycDetails.panpic.file && <p><FaFile /> {userKycDetails.panpic.file.name}<MdDelete
                    onClick={() => {
                      setUserKycDetails((prev) => ({
                        ...prev,
                        panpic: { file: null, preview: "" },
                      }));
                    }}
                    style={{ cursor: "pointer", color: "red" }}
                  /></p>}
                </label>

              </div>


              <div className="image-container">
                <div className='input-container'>
                  <div className={`input-box ${errors.industry ? 'errors-bar' : ''}`}>
                    <select id="gender" name="gender" required="required" value={userKycDetails.gender} onChange={handleInput}>
                      <option></option>
                      <option>Aadhar</option>
                      <option>Electric bill</option>
                      <option>Rent</option>
                      <option>Bank Passbook</option>
                      <option>Voter ID</option>
                      <option>Driving Licience</option>
                      <option>PAN</option>
                      <option>Others</option>
                    </select>
                    <label htmlFor="industry">Select the address proof *</label>
                  </div>
                  {errors.gender && <span className="error-message"><RxCrossCircled />Select address proof</span>}
                </div>
                <div className="custom-file-upload">
                  <div
                    className="file-upload-container"
                    onClick={() => { document.querySelector('#address-upload').click(); }}
                  >
                    <input
                      id="address-upload"
                      name="addresspic"
                      type="file"
                      hidden
                      onChange={handleFileInput}
                    />
                    {userKycDetails.addresspic.preview ? (
                      <img src={userKycDetails.addresspic.preview} alt="Address Pic" className="uploaded-preview" />
                    ) : (
                      <div className="file-container-content">
                        <MdCloudUpload />
                        <p>Browse The File</p>
                      </div>
                    )}
                  </div>
                  {userKycDetails.addresspic.file && <p><FaFile /> {userKycDetails.addresspic.file.name}<MdDelete
                    onClick={() => {
                      setUserKycDetails((prev) => ({
                        ...prev,
                        addresspic: { file: null, preview: "" },
                      }));
                    }}
                    style={{ cursor: "pointer", color: "red" }}
                  /></p>}
                </div>
              </div>

            </div>
          </div>
          <div className="btn-box">
            <button className='back-btn' onClick={() => { setPersonalDetailsBlock(2) }}>Back</button>
            <button className='next-btn' onClick={() => { setPersonalDetailsBlock(4) }}>Proceed</button>
          </div>
        </div>
        <div className={`personal-details ${personalDetailBlock == 4 ? '' : 'display-hidden'}`} id="pd-4">
          <h4 className="personal-dt-heading">AUTHENTICATE & ESIGN</h4>
          <div className='personal-content '>
            <div className="signature-pin-container">
              <div className='input-container'>
                <div className={`input-box ${errors.otp ? 'errors-bar' : ''}`}>
                  <input id="pin" type="password" name="pin" required="required" value={userKycDetails.pin} maxLength={6} onChange={handleInput} onInput={(e) => {
                    e.target.value = e.target.value.slice(0, 6);
                  }} />
                  <label htmlFor="pin">PIN *</label>
                </div>
                {errors.pin && <span className="error-message"><RxCrossCircled />Enter PIN</span>}
              </div>
              <div className='input-container'>
                <div className={`input-box ${errors.otp ? 'errors-bar' : ''}`}>
                  <input id="otp" type="password" name="otp" required="required" value={rePin} maxLength={6} onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    setRePin(value.slice(0, 6));
                  }} onInput={(e) => {
                    e.target.value = e.target.value.slice(0, 6);
                  }} />
                  <label htmlFor="otp">OTP *</label>
                </div>
                {errors.otp && <span className="error-message"><RxCrossCircled />{errors.otp}</span>}
              </div>
              <button className='next-btn' onClick={verifyPIN}>Send OTP</button>
            </div>
            {!verifyPin && <p style={{ "color": "red" }}>PIN does not match</p>}
            <div className="pin-otp-container">
              <div className='input-container'>
                <div className={`input-box ${errors.otp ? 'errors-bar' : ''}`}>
                  <input id="otp" type="password" name="otp" required="required" value={OTP} maxLength={6} onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    setOTP(value.slice(0, 6));
                  }} onInput={(e) => {
                    e.target.value = e.target.value.slice(0, 6);
                  }} />
                  <label htmlFor="otp">OTP *</label>
                </div>
                {errors.otp && <span className="error-message"><RxCrossCircled />{errors.otp}</span>}
              </div>
              <button className='next-btn' onClick={verifyOtp}>Verify OTP</button>
            </div>
            {otpverified && <p style={{ "color": "green" }}><TiTick />OTP VERIFIED</p>}
          </div>
          <div className="btn-box">
            <button className='back-btn' onClick={() => { setPersonalDetailsBlock(3) }}>Back</button>
            <button className='next-btn' disabled={!otpverified} onClick={() => { navigate('/video-recording-kyc') }}>Submit</button>
          </div>
        </div>
      </div>
      <div className="right-part">
        <h5>NOTE</h5>
        <p className='sub-heading'>Instructions For Pan</p>
        <ul>
          <li><TiTick /></li>
          <li><TiTick /></li>
          <li><TiTick /></li>
          <li><TiTick /></li>
        </ul>
        <p className='sub-heading'>Instructions For Documents</p>
        <ul>
          <li><TiTick /></li>
          <li><TiTick /></li>
          <li><TiTick /></li>
          <li><TiTick /></li>
        </ul>

        <p className='it-act'>Section 71 of IT Act stipulates that if anyone makes a misrepresentation or suppresses any material fact from the CCA or CA for obtaining any DSC such person shall be punishable with imprisonment up to 2 years or with fine up to one lakh rupees or with both.</p>
      </div>
    </div>
  )
}

export default PersonalDetails
