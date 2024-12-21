import React from 'react';
import Home from './components/page/Home';
import Navbar  from './components/page/Navbar';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/user/Login';
import Navbar2 from './components/page/Navbar2';
import Path from './components/page/Path';
import Footer from './components/page/Footer';
import AdminDashboard from './components/admin/AdminDashboard';
import UserDashboard from"./components/user/UserDashboard";
import UserProfileInfo from"./components/user/UserProfileInfo";
import Loader from './components/layouts/Loader';
import UserPrivateroute from "./components/privateroutes/UserPrivateroute";
import OrderLogin from './components/orders/OrderLogin.jsx';
import OrderDetails from './components/orders/OrderDetails.jsx';
import PaymentSucess from './components/orders/PymentSucess.jsx';
import Recording from './components/e-KYC/Recording.jsx';
import PersonalDetails from './components/e-KYC/PersonalDetails.jsx';
import TrackOrder from './components/orders/TrackOrder.jsx';

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar /><Navbar2/><Path/><Home /><Footer/></>,
    },
    {
      path: "/bussiness/user/login",
      element: <><Navbar/><Login/><Footer/></>,
    },
    {
      path: "/loader",
      element: <><Navbar /><Loader /></>,
    },
    {
      path: "/payment_sucessfull",
      element: <><Navbar /><PaymentSucess/><Footer/></>,
    },
    {
      path: "/bussiness/user/signup",
      element: <><Navbar/><Login/><Footer/></>,
    },
    {
      path: '/user',
      element: <UserPrivateroute />,
      children: [
        {
          path: 'dashboard',  
          element: <><Navbar /><UserDashboard /><Footer /></>,
        },
        {
          path: 'profile-info',  
          element: <><Navbar /><UserProfileInfo /><Footer /></>,
        },
        {
          path: 'admin',  
          element: <><AdminDashboard/></>,
        },
      ],
    },
    {
      path: "/video-recording-kyc",
      element: <><Navbar/><Recording/><Footer/></>,
    },
    {
      path: "/e-kyc",
      element: <><Navbar/><PersonalDetails/><Footer/></>,
    },
    {
      path: "/track-order",
      element: <><Navbar/><TrackOrder/><Footer/></>,
    },
    {
      path: "/sim/order",
      element: <><Navbar/><OrderLogin/><Footer/></>,
    },
    {
      path: "/sim/order/details",
      element: <><Navbar/><OrderDetails/><Footer/></>,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      </>

  )
}

export default App
