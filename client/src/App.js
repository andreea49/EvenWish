import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom"
import LogIn from './components/LogIn/LogIn';
import Register from './components/Register/Register';
import CalendarFeed from './components/Calendar/CalendarFeed';
import { useState } from 'react'
import Profile from './components/Account/Profile';
import AddEvent from './components/Event/AddEvent';

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
          <Route path="/" element={<CalendarFeed />} />
          <Route path="/login" element={<LogIn onLogIn={login} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />

          <Route path="/addEvent" element={
            <PrivateRoute>
              <AddEvent />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
