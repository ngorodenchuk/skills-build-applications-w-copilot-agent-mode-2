import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function NavBar() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-heart-pulse-fill me-2"></i>
          OctoFit Tracker
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/users')}`} to="/users">
                <i className="bi bi-person-circle me-1"></i>
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/teams')}`} to="/teams">
                <i className="bi bi-people me-1"></i>
                Teams
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/activities')}`} to="/activities">
                <i className="bi bi-activity me-1"></i>
                Activities
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/workouts')}`} to="/workouts">
                <i className="bi bi-clipboard-heart me-1"></i>
                Workouts
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/leaderboard')}`} to="/leaderboard">
                <i className="bi bi-trophy me-1"></i>
                Leaderboard
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />

        <Routes>
          <Route path="/" element={
            <div className="container mt-5">
              <div className="welcome-section">
                <h1>
                  <i className="bi bi-heart-pulse-fill me-3"></i>
                  Welcome to OctoFit Tracker
                </h1>
                <p className="lead mt-4">
                  Track your fitness activities, compete with your team, and achieve your goals!
                </p>
                <div className="row mt-5">
                  <div className="col-md-4 mb-3">
                    <div className="card">
                      <div className="card-body text-center">
                        <i className="bi bi-activity display-4 text-primary"></i>
                        <h5 className="card-title mt-3">Track Activities</h5>
                        <p className="card-text">Log your daily fitness activities and monitor your progress</p>
                        <Link to="/activities" className="btn btn-primary">
                          View Activities
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="card">
                      <div className="card-body text-center">
                        <i className="bi bi-people display-4 text-success"></i>
                        <h5 className="card-title mt-3">Join Teams</h5>
                        <p className="card-text">Collaborate with others and compete as a team</p>
                        <Link to="/teams" className="btn btn-success">
                          View Teams
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="card">
                      <div className="card-body text-center">
                        <i className="bi bi-trophy display-4 text-warning"></i>
                        <h5 className="card-title mt-3">Compete</h5>
                        <p className="card-text">Check the leaderboard and see how you rank</p>
                        <Link to="/leaderboard" className="btn btn-warning">
                          View Leaderboard
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
