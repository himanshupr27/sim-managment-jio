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

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar /><Navbar2/><Path/><Home /></>,
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
      path: "/bussiness/user/signup",
      element: <><Navbar/><Login/></>,
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
    },]);
  return (
    <>
      <RouterProvider router={router} />
      </>

  )
}

export default App
