import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './JudgeDashboard.css';

function JudgeDashboard() {
  const navigate = useNavigate();
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/hackathons/upcoming');
        const formattedHackathons = response.data.map(hackathon => ({
          title: hackathon.title,
          dates: hackathon.date,
          participants: hackathon.participants,
          prizePool: hackathon.prize,
          level: hackathon.difficulty,
          tracks: hackathon.skills,
          status: hackathon.status
        }));
        
        setHackathons(formattedHackathons);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch hackathons');
        setLoading(false);
      }
    };

    fetchHackathons();
  }, []);

  const handleNavigate = (hackathonTitle) => {
    navigate(`/teams?hackathon=${encodeURIComponent(hackathonTitle)}`);
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        Loading hackathons...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        {error}
      </div>
    );
  }

  return (
    <div className="App">
      <header>
        <h1>HackCentral</h1>
        <nav>
          <ul>
            <li>About</li>
            <li>Hackathons</li>
            <li>Leaderboard</li>
            <li>Sign Up</li>
          </ul>
        </nav>
      </header>
      
      <div className="hero">
        <h2>Build. Compete. Innovate.</h2>
        <p>Join the world's most exciting virtual hackathons and showcase your skills to global tech leaders.</p>
      </div>
      
      <h2>Upcoming Hackathons</h2>
      <div className="hackathon-list">
        {hackathons.map((hackathon) => (
          <div className="hackathon-card" key={hackathon.title}>
            <h3>{hackathon.title}</h3>
            <div className="details">
              <p><strong>Dates:</strong> {hackathon.dates}</p>
              <p><strong>Participants:</strong> {hackathon.participants}</p>
              <p><strong>Prize Pool:</strong> {hackathon.prizePool}</p>
              <p><strong>Level:</strong> {hackathon.level}</p>
            </div>
            <div className="tracks">
              <h4>Tracks:</h4>
              <ul>
                {hackathon.tracks.map((track) => (
                  <li key={track}>{track}</li>
                ))}
              </ul>
            </div>
            <div
              className="status"
              onClick={() => handleNavigate(hackathon.title)}
            >
              {hackathon.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JudgeDashboard;