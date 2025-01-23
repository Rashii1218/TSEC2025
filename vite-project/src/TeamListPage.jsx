// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './TeamListPage.css';

// function TeamListPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const hackathonTitle = new URLSearchParams(location.search).get('hackathon');

//   const teams = [
//     { 
//       name: "Team Alpha", 
//       members: ["Alice", "Bob"], 
//       project: "AI Assistant",
//       description: "An AI-powered personal assistant for daily tasks"
//     },
//     { 
//       name: "Team Beta", 
//       members: ["Charlie", "Dave"], 
//       project: "Blockchain Voting",
//       description: "Secure digital voting platform using blockchain"
//     },
//   ];

//   const [feedbackData, setFeedbackData] = useState(
//     teams.map((team) => ({
//       teamName: team.name,
//       innovation: '',
//       creativity: '',
//       ux: '',
//       businessPotential: '',
//       feedback: '',
//     }))
//   );

//   const handleChange = (index, field, value) => {
//     const updatedFeedbackData = [...feedbackData];
//     updatedFeedbackData[index][field] = value;
//     setFeedbackData(updatedFeedbackData);
//   };

//   const handleSubmit = (index) => {
//     const submittedData = feedbackData[index];
    
//     // Validate scores
//     const scores = ['innovation', 'creativity', 'ux', 'businessPotential'];
//     const isValid = scores.every(score => {
//       const value = Number(submittedData[score]);
//       return !isNaN(value) && value >= 0 && value <= 10;
//     });

//     if (!isValid) {
//       alert('Please ensure all scores are between 0 and 10');
//       return;
//     }

//     if (!submittedData.feedback.trim()) {
//       alert('Please provide feedback before submitting');
//       return;
//     }

//     console.log(`Feedback for ${submittedData.teamName}:`, submittedData);
//     alert(`Feedback submitted for ${submittedData.teamName}`);
//     navigate(-1);
//   };

//   const getTeamAvatar = (name) => {
//     return name.split(' ').map(word => word[0]).join('').toUpperCase();
//   };

//   return (
//     <div className="team-list-page">
//       <div className="page-header">
//         <h1>{hackathonTitle}</h1>
//         <p>Provide your feedback and scoring for each participating team</p>
//       </div>
      
//       <div className="feedback-table-container">
//         <table className="feedback-table">
//           <thead>
//             <tr>
//               <th>Team</th>
//               <th>Innovation</th>
//               <th>Creativity</th>
//               <th>UX</th>
//               <th>Business</th>
//               <th>Feedback</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {feedbackData.map((data, index) => {
//               const team = teams.find(t => t.name === data.teamName);
              
//               return (
//                 <tr key={data.teamName}>
//                   <td>
//                     <div className="team-name-cell">
//                       <div className="team-avatar">
//                         {getTeamAvatar(data.teamName)}
//                       </div>
//                       <div>
//                         <div style={{ fontWeight: 500 }}>{data.teamName}</div>
//                         <div style={{ fontSize: '0.8rem', color: '#718096' }}>
//                           {team?.project}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td>
//                     <input
//                       type="number"
//                       className="input-score"
//                       placeholder="0-10"
//                       value={data.innovation}
//                       onChange={(e) => handleChange(index, 'innovation', e.target.value)}
//                       max={10}
//                       min={0}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="number"
//                       className="input-score"
//                       placeholder="0-10"
//                       value={data.creativity}
//                       onChange={(e) => handleChange(index, 'creativity', e.target.value)}
//                       max={10}
//                       min={0}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="number"
//                       className="input-score"
//                       placeholder="0-10"
//                       value={data.ux}
//                       onChange={(e) => handleChange(index, 'ux', e.target.value)}
//                       max={10}
//                       min={0}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="number"
//                       className="input-score"
//                       placeholder="0-10"
//                       value={data.businessPotential}
//                       onChange={(e) => handleChange(index, 'businessPotential', e.target.value)}
//                       max={10}
//                       min={0}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       className="input-feedback"
//                       placeholder="Provide detailed feedback"
//                       value={data.feedback}
//                       onChange={(e) => handleChange(index, 'feedback', e.target.value)}
//                     />
//                   </td>
//                   <td>
//                     <button 
//                       className="submit-button"
//                       onClick={() => handleSubmit(index)}
//                     >
//                       Submit
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default TeamListPage;



import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TeamListPage.css';

function TeamListPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const hackathonTitle = new URLSearchParams(location.search).get('hackathon');

  const teams = [
    { 
      name: "Team Alpha", 
      members: ["Alice", "Bob"], 
      project: "AI Assistant",
      description: "An AI-powered personal assistant for daily tasks"
    },
    { 
      name: "Team Beta", 
      members: ["Charlie", "Dave"], 
      project: "Blockchain Voting",
      description: "Secure digital voting platform using blockchain"
    },
  ];

  const [feedbackData, setFeedbackData] = useState(
    teams.map((team) => ({
      teamName: team.name,
      members: team.members,
      project: team.project,
      description: team.description,
      innovation: '',
      creativity: '',
      ux: '',
      businessPotential: '',
      feedback: '',
    }))
  );

  const handleChange = (index, field, value) => {
    const updatedFeedbackData = [...feedbackData];
    updatedFeedbackData[index][field] = value;
    setFeedbackData(updatedFeedbackData);
  };

  const handleSubmit = async (index) => {
    const submittedData = feedbackData[index];

    // Validate scores
    const scores = ['innovation', 'creativity', 'ux', 'businessPotential'];
    const isValid = scores.every(score => {
      const value = Number(submittedData[score]);
      return !isNaN(value) && value >= 0 && value <= 10;
    });

    if (!isValid) {
      alert('Please ensure all scores are between 0 and 10');
      return;
    }

    if (!submittedData.feedback.trim()) {
      alert('Please provide feedback before submitting');
      return;
    }

    try {
      // Send feedback data to backend
      const response = await axios.post('http://localhost:3000/api/teams/feedback', submittedData);
      if (response.status === 200) {
        alert(`Feedback submitted for ${submittedData.teamName}`);
        navigate(-1);
      } else {
        alert('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('An error occurred while submitting feedback');
    }
  };

  const getTeamAvatar = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  return (
    <div className="team-list-page">
      <div className="page-header">
        <h1>{hackathonTitle}</h1>
        <p>Provide your feedback and scoring for each participating team</p>
      </div>
      
      <div className="feedback-table-container">
        <table className="feedback-table">
          <thead>
            <tr>
              <th>Team</th>
              <th>Innovation</th>
              <th>Creativity</th>
              <th>UX</th>
              <th>Business</th>
              <th>Feedback</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {feedbackData.map((data, index) => (
              <tr key={data.teamName}>
                <td>
                  <div className="team-name-cell">
                    <div className="team-avatar">
                      {getTeamAvatar(data.teamName)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 500 }}>{data.teamName}</div>
                      <div style={{ fontSize: '0.8rem', color: '#718096' }}>
                        {data.project}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <input
                    type="number"
                    className="input-score"
                    placeholder="0-10"
                    value={data.innovation}
                    onChange={(e) => handleChange(index, 'innovation', e.target.value)}
                    max={10}
                    min={0}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="input-score"
                    placeholder="0-10"
                    value={data.creativity}
                    onChange={(e) => handleChange(index, 'creativity', e.target.value)}
                    max={10}
                    min={0}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="input-score"
                    placeholder="0-10"
                    value={data.ux}
                    onChange={(e) => handleChange(index, 'ux', e.target.value)}
                    max={10}
                    min={0}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="input-score"
                    placeholder="0-10"
                    value={data.businessPotential}
                    onChange={(e) => handleChange(index, 'businessPotential', e.target.value)}
                    max={10}
                    min={0}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="input-feedback"
                    placeholder="Provide detailed feedback"
                    value={data.feedback}
                    onChange={(e) => handleChange(index, 'feedback', e.target.value)}
                  />
                </td>
                <td>
                  <button 
                    className="submit-button"
                    onClick={() => handleSubmit(index)}
                  >
                    Submit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeamListPage;
