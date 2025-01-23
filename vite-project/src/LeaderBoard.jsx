import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Leaderboard.css';

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hackathonTitle = localStorage.getItem('selectedHackathon');

//   useEffect(() => {
//     const fetchLeaderboard = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/api/leaderboard/${encodeURIComponent(hackathonTitle)}`);
//         setLeaderboardData(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch leaderboard');
//         setLoading(false);
//       }
//     };

//     if (hackathonTitle) {
//       fetchLeaderboard();
//     }
//   }, [hackathonTitle]);

//   const getScoreColor = (score) => {
//     if (score >= 8) return 'gold-score';
//     if (score >= 6) return 'silver-score';
//     if (score >= 4) return 'bronze-score';
//     return 'low-score';
//   };


useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        console.log(`Fetching leaderboard data for hackathon: ${hackathonTitle}`);
  
        const response = await axios.get(
          `http://localhost:3000/api/leaderboard/${encodeURIComponent(hackathonTitle)}`
        );
  
        console.log(`Leaderboard data received:`, response.data);
  
        setLeaderboardData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching leaderboard data:', err.message);
        setError('Failed to fetch leaderboard');
        setLoading(false);
      }
    };
  
    if (hackathonTitle) {
      console.log(`Hackathon title found in localStorage: ${hackathonTitle}`);
      fetchLeaderboard();
    } else {
      console.warn('No hackathon title found in localStorage.');
    }
  }, [hackathonTitle]);
  
  const getScoreColor = (score) => {
    console.log(`Determining score color for score: ${score}`);
    if (score >= 8) {
      console.log('Score color: gold-score');
      return 'gold-score';
    }
    if (score >= 6) {
      console.log('Score color: silver-score');
      return 'silver-score';
    }
    if (score >= 4) {
      console.log('Score color: bronze-score');
      return 'bronze-score';
    }
    console.log('Score color: low-score');
    return 'low-score';
  };
  
  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        Loading leaderboard...
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="leaderboard-container">
      <h1>{hackathonTitle} Leaderboard</h1>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team</th>
            <th>Members</th>
            <th>Innovation</th>
            <th>Creativity</th>
            <th>UX</th>
            <th>Business Potential</th>
            <th>Total Score</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((team) => (
            <tr key={team.teamName}>
              <td>{team.rank}</td>
              <td>{team.teamName}</td>
              <td>
                {team.teamMembers.map((member) => (
                  <div key={member.email}>{member.name}</div>
                ))}
              </td>
              <td className={getScoreColor(team.innovation)}>{team.innovation}</td>
              <td className={getScoreColor(team.creativity)}>{team.creativity}</td>
              <td className={getScoreColor(team.ux)}>{team.ux}</td>
              <td className={getScoreColor(team.businessPotential)}>{team.businessPotential}</td>
              <td className={`total-score ${getScoreColor(team.averageScore)}`}>
                {team.totalScore.toFixed(2)}
              </td>
              <td>{team.feedback}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;