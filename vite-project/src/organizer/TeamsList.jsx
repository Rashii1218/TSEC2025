// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import './TeamList.css'; // Updated CSS file for improved styling

// function TeamList() {
//   const location = useLocation();
//   const hackathonTitle = new URLSearchParams(location.search).get('hackathon'); // Get hackathon title from URL

//   const [teams, setTeams] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTeams = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/api/teams/${hackathonTitle}`);
//         setTeams(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch teams');
//         setLoading(false);
//       }
//     };

//     if (hackathonTitle) {
//       fetchTeams();
//     }
//   }, [hackathonTitle]);

//   const getTeamAvatar = (name) => {
//     return name.split(' ').map((word) => word[0]).join('').toUpperCase();
//   };

//   if (loading) {
//     return (
//       <div className="loading-spinner">
//         <div className="spinner"></div>
//         Loading teams...
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="error-message">{error}</div>;
//   }

//   return (
//     <div className="team-list-page">
//       <div className="page-header">
//         <h1>{hackathonTitle}</h1>
//         <p>Participating Teams</p>
//       </div>

//       <div className="team-list-container">
//         <ul className="team-list">
//           {teams.map((team) => (
//             <li key={team.teamName} className="team-item">
//               <div className="team-avatar">{getTeamAvatar(team.teamName)}</div>
//               <span className="team-name">{team.teamName}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default TeamList;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './TeamList.css';

function TeamList() {
  const location = useLocation();
  const hackathonTitle = new URLSearchParams(location.search).get('hackathon');

  const [teams, setTeams] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch teams
        const teamsResponse = await axios.get(`http://localhost:3000/api/teams/${hackathonTitle}`);
        setTeams(teamsResponse.data);

        // Fetch event details to get mentors
        const eventResponse = await axios.get(`http://localhost:3000/api/event/${hackathonTitle}`);
        setMentors(eventResponse.data.mentors || []);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    if (hackathonTitle) {
      fetchData();
    }
  }, [hackathonTitle]);

  const getTeamAvatar = (name) => {
    return name.split(' ').map((word) => word[0]).join('').toUpperCase();
  };

  const handleMentorAssignmentWithTime = async (teamName, mentorName, mentorEmail, scheduleTime) => {
    if (!scheduleTime) {
      alert('Please enter a schedule time for the mentor assignment.');
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:3000/api/teams/${teamName}/mentor`, 
        {
          mentorName,
          mentorEmail,
          scheduleTime
        }
      );

      // Fetch updated team data after successful mentor assignment
      const updatedTeam = response.data;
      setTeams(teams.map(team => 
        team.teamName === teamName 
          ? { 
              ...team, 
              assignedMentor: { mentorName, mentorEmail }, 
              scheduleTime: scheduleTime 
            }
          : team
      ));

    } catch (err) {
      console.error('Failed to assign mentor', err.response ? err.response.data : err);
      alert('Failed to assign mentor: ' + (err.response?.data?.message || err.message));
    }
  };

  // State to track schedule time for each team
  const handleScheduleTimeChange = (teamName, scheduleTime) => {
    setTeams(teams.map(team => 
      team.teamName === teamName 
        ? { ...team, scheduleTime } 
        : team
    ));
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        Loading teams...
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="team-list-page">
      <div className="page-header">
        <h1>{hackathonTitle}</h1>
        <p>Participating Teams</p>
      </div>

      <div className="team-list-container">
        <ul className="team-list">
          {teams.map((team) => (
            <li key={team._id} className="team-item">
              <div className="team-avatar">{getTeamAvatar(team.teamName)}</div>
              <span className="team-name">{team.teamName}</span>

              {/* Mentor Assignment Dropdown */}
              <div className="mentor-assignment">
                <select 
                  onChange={(e) => {
                    const [mentorName, mentorEmail] = e.target.value.split('|');
                    handleMentorAssignmentWithTime(
                      team.teamName,  // Use teamName instead of teamId
                      mentorName, 
                      mentorEmail, 
                      team.scheduleTime || new Date().toISOString() // Use the team's scheduleTime or default to now
                    );
                  }}
                  defaultValue=""
                >
                  <option value="" disabled>Assign Mentor</option>
                  {mentors.map((mentor) => (
                    <option 
                      key={mentor._id} 
                      value={`${mentor.name}|${mentor.email}`}
                    >
                      {mentor.name} ({mentor.email})
                    </option>
                  ))}
                </select>

                {/* Add a time input for schedule time */}
                <input 
                  type="datetime-local" 
                  value={team.scheduleTime || ""} // Set the schedule time for each team
                  onChange={(e) => handleScheduleTimeChange(team.teamName, e.target.value)} 
                  placeholder="Select Schedule Time" 
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TeamList;
