import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "../../CSS/AdminDashboard.css";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserList from './UserList';
import SimList from './SimList';


const AdminDashboard = () => {
 
  var userName = useSelector(((state)=>state.auth.user.usersName));
  userName =userName.charAt(0).toUpperCase() +userName.slice(1); 

  const [userCollapse, setUserCollapse] = useState(false);
  const [simCollapse, setSimCollapse] = useState(true);
  const [ordersCollapse, setOrdersCollapse] = useState(true);
  const [content,setContent]= useState(1);
 



  return (
    <div className='admin-dashboard'>
      <div className="admin-nav-bar">
      <h2>Welcome Admin</h2>
      <div class="nav-item dropdown logdedin">
                  <a class="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-fill me-3" viewBox="0 0 16 16" >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                    </svg>
                    {userName}
                    </a>
                  <ul class="dropdown-menu">
                    <li><Link class="dropdown-item" to="/user/profile-info">My Profile</Link></li>
                    <li><hr class="dropdown-divider m-0" /></li>
                    <li><Link class="dropdown-item logout" to="/login" onClick={() => { dispatch(logOut()) }}>Logout</Link></li>
                  </ul>
                </div>
      </div>
      <div className="admin-dashboard-container">

        <div className="side-nav-panel">

          <ul className='side-nav-content'>

            <li className={`${userCollapse ? '' : 'backgd-color'}`} >
              <span onClick={() => { setUserCollapse(!userCollapse) }}>
              <FaAngleDown className={`${userCollapse ? 'arrow-rotate' : 'noarrow-rotate'}`} /> Users
              </span>
              <ul className={`side-nav-content-details ${userCollapse ? 'collappse' : ''}`}>
                <li className={`${content ===1 ?'content-selected':''}`} onClick={()=>{setContent(1)}}>Show All Users</li>
              </ul>
            </li>


            <li className={`${simCollapse ? '' : 'backgd-color'}`} >
             <span onClick={() => { setSimCollapse(!simCollapse) }}><FaAngleDown className={`${simCollapse ? 'arrow-rotate' : 'noarrow-rotate'}`} /> SIM's
              </span> 
              <ul className={`side-nav-content-details ${(simCollapse && (content !== 2 ||content !== 3||content !== 4 || content !== 5) )? 'collappse' : ''}`}>
                <li className={`${content ===2 ?'content-selected':''}`} onClick={()=>{setContent(2)}}>Avaliable SIM,s</li>
                <li className={`${content ===3 ?'content-selected':''}`} onClick={()=>{setContent(3)}}>Active SIM,s</li>
                <li className={`${content ===4 ?'content-selected':''}`} onClick={()=>{setContent(4)}}>Inactive SIM,s</li>
                <li className={`${content ===5 ?'content-selected':''}`} onClick={()=>{setContent(5)}}>All SIM,s</li>
              </ul>
            </li>


            <li className={`${ordersCollapse ? '' : 'backgd-color'}`} >
              <span onClick={() => { setOrdersCollapse(!ordersCollapse) }}><FaAngleDown className={`${ordersCollapse ? 'arrow-rotate' : 'noarrow-rotate'}`}/> 
              Orders's</span>
              <ul className={`side-nav-content-details ${(ordersCollapse && (content !== 6 ||content !== 7||content !== 8)) ? 'collappse' : ''}`}>
                <li className={`${content ===6 ?'content-selected':''}`} onClick={()=>{setContent(6)}}>Pending Orders</li>
                <li className={`${content ===7 ?'content-selected':''}`} onClick={()=>{setContent(7)}}>Dilevered Orders</li>
                <li className={`${content ===8 ?'content-selected':''}`} onClick={()=>{setContent(8)}}>Orders Under Process</li>
              </ul>
              </li>
          </ul>

        </div>

        {/* content */}
        <div className='admin-content'>
          {content === 1? <UserList/>:<></>}
          {content === 2? <SimList contentType={content} />:null}
          {content === 3? <SimList contentType={content} />:null}
          {content === 4? <SimList contentType={content} />:null}
          {content === 5? <SimList contentType={content} />:null}
          {content === 6? <UserList/>:<></>}
          {content === 7? <UserList/>:<></>}
          {content === 8? <UserList/>:<></>}
          

        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
