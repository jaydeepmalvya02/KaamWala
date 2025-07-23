
import './App.css'
import Navbar from './components/Navbar';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import {Route,Routes} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import UserList from './pages/UserList';
import Bookings from './pages/Bookings';
import BuddyList from './pages/BuddyList';
import { useContext } from 'react';
import { AdminContext } from './context/AdminContext';
import Profile from './pages/Profile';
function App() {
  const {aToken} =useContext(AdminContext)
 
  return (
    <>
      <ToastContainer />
      <Navbar />
      {!aToken ? (
        <Login />
      ) : (
        <div>
          <Routes>
            <Route path="/" index element={<Dashboard />}></Route>
            <Route path="dashboard" element={<Dashboard />}></Route>
            <Route path="users-list" element={<UserList />}></Route>
            <Route path="bookings" element={<Bookings />}></Route>
            <Route path="buddies-list" element={<BuddyList />}></Route>
            <Route path="profile" element={<Profile />}></Route>
          </Routes>
        </div>
      )}
    </>
  );
}

export default App

