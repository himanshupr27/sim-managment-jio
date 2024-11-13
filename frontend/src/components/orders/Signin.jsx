import React, { useEffect, useState } from 'react'
import "../../css/Orders.css";
import { RxCrossCircled } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import OtpInput from 'otp-input-react';
const Signin = () => {

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [phoneLabel, setPhoneLabel] = useState(false);
    const [OTP, setOTP] = useState("");
    const [generateOtp, setGenerateOtp] = useState(0);
    const [otpbox, setOtpbox] = useState(false);
    const [otpError, setOtpError] = useState(false);
    const [user, setUser] = useState({
        usersname: '',
        mobilenumber: ''
    });

    const handleInput = (e) => {
        const { name, value } = e.target || {};
        setUser(prevUser => ({
            ...prevUser,
            [name || 'mobilenumber']: value,
        }));
        setErrors(prevErrors => ({
            ...prevErrors,
            [name || 'mobilenumber']: value ? "" : "true"
        }));
    };

    const generateOtpCode = () => {
        const newOtp = Math.floor(100000 + Math.random() * 900000);
        setGenerateOtp(newOtp);
        alert(`The OTP for login is ${newOtp}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isNameValid = user.usersname.trim() !== '';
        const isPhoneValid = user.mobilenumber && user.mobilenumber.length > 2;

        setErrors({
            usersname: isNameValid ? "" : "true",
            mobilenumber: isPhoneValid ? "" : "true"
        });

        if (isNameValid && isPhoneValid) {
            generateOtpCode();
            setOtpbox(true);
        }
    };

    const handelVerifOtp = () => {
        if (Number(OTP) === generateOtp) {
            localStorage.setItem('pki-users', JSON.stringify(user));
            navigate('/sim/order/details');
        } else {
            setOtpError(true);
        }
    };

    return (
        <div className='signup'>
            <div className="signup-box">

                <div className="left-box">
                    <h1>Join over million of users who digitally sign documents</h1>
                    <form onSubmit={handleSubmit}>
                        <div className={`input-box ${errors.usersname ? 'errors-bar' : ''}`}>
                            <input id="usersname" type="text" name="usersname" required="required" value={user.usersname} onChange={handleInput} />
                            <label htmlFor="usersname">Your Name</label>
                        </div>
                        {errors.usersname && <span className="error-message"><RxCrossCircled />Enter Your Name</span>}
                        {/* mobile number Input */}
                        <div className={`input-box ${errors.mobilenumber ? 'errors-bar' : ''}`}>
                            {/* <input id="email" type="number" name="mobilenumber" required="required" value={user.mobilenumber} onChange={handleInput} /> */}

                            <PhoneInput className="phoneinput" country={"in"} 
                            name="mobilenumber"
                            value={user.mobilenumber}
                            onChange={(value) => handleInput({ target: { name: 'mobilenumber', value } })}
                            />

                            <label className={`phoneinput-label ${phoneLabel?'lable-above':''}`} htmlFor="mobilenumber" onClick={()=>{setPhoneLabel(true)}}>Your Mobile number</label>
                        </div>
                        {errors.mobilenumber && <span className="error-message"><RxCrossCircled />Enter Your Mobile Number</span>}
                        <p className='otp-para'>You will recieve an OTP on your number to verify your identity as per CCA guidelibnes</p>
                        <div className="buy-button-box">
                            <button className='buy-button' type='submit'>Proceed</button>
                        </div>
                    </form>
                </div>
                <div className="right-box">

                    <div className="steps-container">
                        <h2>
                            <span className="highlight">3 simple steps</span><br /> to get your PKI-SIM
                        </h2>
                        <div className="steps-list">
                            <div className='steps-number'>
                                <div className="step-badge">Step 1</div>

                                <div className="dotted-line"></div>

                                <div className="step-badge">Step 2</div>

                                <div className="dotted-line"></div>

                                <div className="step-badge">Step 3</div>
                            </div>
                            <div className='steps-details'>
                                <p>Complete your purchase online</p><br />
                                <p>Verify your identity through a completely online process in less than 5 minutes</p>
                                <p>Your PKI-SIM will be approved within 30 minutes and be ready for dispatch</p>
                            </div>
                        </div>
                        <p className="note">
                            <strong>Note:</strong> Your PKI-SIM is dispatched within 24 hours, and you can reach us 24x7 in case you need help with digital signature.
                        </p>
                    </div>
                </div>


            </div>
            {otpbox && (
                <div className="otp-box">
                    <div className="otp-container">
                        <h5>Please enter the OTP Sent to your entered Mobile number</h5>
                        <OtpInput 
                            className="otp-input" 
                            value={OTP} 
                            onChange={setOTP} 
                            autoFocus 
                            OTPLength={6} 
                            otpType="number" 
                            disabled={false} 
                            secure 
                        />
                        {otpError && <p className="error-message">Wrong OTP entered!</p>}
                        <button type='button' onClick={handelVerifOtp}>Verify OTP</button>
                        <span onClick={generateOtpCode}>Resend OTP</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Signin
