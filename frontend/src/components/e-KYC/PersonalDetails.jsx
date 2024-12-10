import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import "../../css/PersonalDetailsKyc.css";

const PersonalDetails = () => {
    const navigate = useNavigate();
    const[userKycDetails, setUserKycDetails]=useState({
        pan:"",
        aadhar:"",
        pin:"",
        docpin:"",
        profilepic:"",
        aadharfrontpic:"",
        aadharbackpic:"",
        panpic:""
    });
    const[personalDetailBlock,setPersonalDetailsBlock]=useState(1);
  return (
    <div className='personal-dt-box'>
      <div className="left-part">
        <div className={`personal-details`} id="pd-1">
          <div className={`personal-dt-heading ${personalDetailBlock > 1 ?'personal-dt-heading-completed':''}`}>
            <div className='heading'><h5>1</h5><h4>CERTIFICATION DETAILS</h4></div>
            <button className={`change-btn ${personalDetailBlock > 1 ?'':'display-hidden'}`} onClick={()=>{setPersonalDetailsBlock(1)}}>CHANGE</button>
          </div>
            <div className={`personal-content ${personalDetailBlock == 1?'':'display-hidden'}`}>
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
            <div className="btn-box">
            <button className='next-btn' onClick={()=>{setPersonalDetailsBlock(2)}}>Proceed</button>
            </div>
            </div>
        </div>
        <div className={`personal-details`} id="pd-2">
        <div className={`personal-dt-heading ${personalDetailBlock > 2 ?'personal-dt-heading-completed':''}`}>
            <h4><span>2</span>APPLICAT DETAILS</h4>
            <button className={`change-btn ${personalDetailBlock > 2 ?'':'display-hidden'}`} onClick={()=>{setPersonalDetailsBlock(2)}}>CHANGE</button>
          </div>
        <div className={`personal-content ${personalDetailBlock == 2?'':'display-hidden'}`}>
        <table>
          <tr>
            <td>PAN</td>
            <td><input type='text'/></td>
          </tr>
          <tr>
            <td>AADHAR</td>
            <td><input type='text'/></td>
            <td><button className='next-btn'>Send OTP</button></td>

          </tr>
          <tr>
            <td>OTP</td>
            <td><input type='text'/></td>
            <td><button className='next-btn'>Verify OTP</button></td>
          </tr>
        </table>
        <div className="btn-box">
            <button className='next-btn' onClick={()=>{setPersonalDetailsBlock(3)}}>Proceed</button>
            </div>
        </div>
        </div>
        <div className={`personal-details`} id="pd-3">
        <div className={`personal-dt-heading ${personalDetailBlock > 3 ?'personal-dt-heading-completed':''}`}>
            <h4><span>3</span>UPLOAD FILES</h4>
            <button className={`change-btn ${personalDetailBlock > 3 ?'':'display-hidden'}`} onClick={()=>{setPersonalDetailsBlock(3)}}>CHANGE</button>
          </div>
            <div className={`personal-content ${personalDetailBlock == 3?'':'display-hidden'}`}>
              <div>
               <label for="">Profile Pic<br/>
               <input type='file'/>
               </label>

               <label for="">PAN<br/>
               <input type='file'/>
               </label>

                <label>Address Proof<br/>
                <select>
                  <option>Select the address proff</option>
                  <option>Aadhar</option>
                  <option>Electric bill</option>
                  <option>Rent</option>
                  <option>Bank Passbook</option>
                  <option>Voter ID</option>
                  <option>Driving Licience</option>
                  <option>PAN</option>
                  <option>Others</option>
                </select>
                <input type="file" name="" id="" /></label>

            </div>
            <div className="btn-box">
            <button className='next-btn' onClick={()=>{setPersonalDetailsBlock(4)}}>Proceed</button>
            </div>
            </div>
        </div>
        <div className={`personal-details`} id="pd-4">
            <div className="personal-dt-heading">
            <h4><span>4</span>AUTHENTICATE & ESIGN</h4>
          </div>
            <div className={`personal-content ${personalDetailBlock == 4?'':'display-hidden'}`}>
            <lable>
           Signature PIN 
           <input type='number'/> 
           <input type='number'/>
           <button>SEND OTP</button>
          </lable>
          <label>
           OTP <input type='number'/> <button>Verify OTP</button>
          </label>
            <div className="btn-box">
            <button className='next-btn' onClick={()=>{navigate('/video-recording-kyc')}}>Submit</button>
            </div>
            </div>
        </div>
      </div>
      <div className="right-part">
        <strong>soon</strong>
      </div>
    </div>
  )
}

export default PersonalDetails
