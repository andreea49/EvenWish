import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom"
import LogIn from './components/LogIn/LogIn';
import Register from './components/Register/Register';
import Calendar from './components/Calendar/Calendar';
import { useState } from 'react'
import Profile from './components/Account/Profile';
import AddEvent from './components/Event/AddEvent';
import ShowConnections from './components/Connections/ShowConnections';
import ShowConnReqs from './components/Connections/ShowConnReqs';
import ShowEvents from './components/Event/ShowEvents';
import Event from './components/Event/Event';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem("username"));

  function login(username) {
    setLoggedInUser(username)
  }

  function logout() {
    localStorage.removeItem("username")
    setLoggedInUser(null)
  }

  function PrivateRoute({ children }) {
    return loggedInUser === null ? <Navigate to="/login" /> : children;
  }

  return (
    <>
      <NavBar loggedinUser={loggedInUser} onLogout={logout} />
      <Router>
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/login" element={<LogIn onLogIn={login} />} />
          <Route path="/register" element={<Register />} />

          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/connections" element={<PrivateRoute><ShowConnections /></PrivateRoute>} />
          <Route path="/connreqs" element={<PrivateRoute><ShowConnReqs /></PrivateRoute>} />

          <Route path="/addEvent" element={<PrivateRoute><AddEvent /></PrivateRoute>} />
          <Route path="/events" element={<PrivateRoute><ShowEvents /></PrivateRoute>} />
          <Route path="/event" element={<PrivateRoute><Event /></PrivateRoute>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
