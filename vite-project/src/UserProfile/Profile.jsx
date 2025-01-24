import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUniversity, FaGraduationCap, FaBookOpen, FaProjectDiagram, FaArrowRight, FaMedal } from 'react-icons/fa';

const StudentProfile = () => {
  const navigate = useNavigate();

  const profileData = {
    name: 'Alex Rodriguez',
    institution: 'Tech University',
    major: 'Computer Science',
    graduationYear: 2025,
    avatar: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Alex', // Dynamic avatar
    badges: [
      { 
        name: 'Hackathon Winner', 
        icon: '🏆',
        color: 'from-purple-500 to-purple-600',
        description: 'Won first place in University Hackathon 2024'
      },
      { 
        name: 'Dean\'s List', 
        icon: '📚',
        color: 'from-blue-500 to-blue-600',
        description: 'Maintained exceptional academic performance'
      },
      { 
        name: 'Research Assistant', 
        icon: '🔬',
        color: 'from-green-500 to-green-600',
        description: 'Contributing to AI research project'
      },
      { 
        name: 'Current Student', 
        icon: '🎓',
        color: 'from-yellow-500 to-yellow-600',
        description: 'Active student of Tech University'
      }
    ],
    progress: {
      courses: 75,
      internships: 2,
      projects: 5
    }
  };

  const streakData = [
    { day: 'Jan', study: 3 },
    { day: 'Feb', study: 4 },
    { day: 'Mar', study: 5 },
    { day: 'Apr', study: 4 },
    { day: 'May', study: 3 },
    { day: 'Jun', study: 2 },
    { day: 'Jul', study: 1 }
  ];

  const leaderboardData = [
    { name: 'Rhea Chopra', institution: 'Global Tech', points: 1200, medal: '🥇' },
    { name: 'Michael Smith', institution: 'Innovation Institute', points: 1100, medal: '🥈' },
    { name: 'Rohan Shah', institution: 'Future Academy', points: 1000, medal: '🥉' },
    { name: 'Alex Rodriguez', institution: 'Tech University', points: 950, medal: '' },
    { name: 'Tanya', institution: 'Pioneer College', points: 900, medal: '' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white p-6">
      <div className="w-full bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Header with Avatar */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-400 p-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <img 
                src={profileData.avatar} 
                alt="Profile" 
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />
              <div>
                <h1 className="text-3xl font-bold mb-2">{profileData.name}</h1>
                <p className="text-xl flex items-center opacity-90">
                  <FaUniversity className="mr-2" />{profileData.institution}
                </p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-purple-50 
                       flex items-center transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Explore Events <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Personal Info */}
          <div className="col-span-1 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-purple-100">
            <h2 className="text-xl font-semibold mb-4 text-purple-700 flex items-center">
              <FaGraduationCap className="mr-2" />Details
            </h2>
            <div className="space-y-3">
              <p className="flex justify-between items-center">
                <span className="text-gray-600">Major:</span>
                <span className="font-medium">{profileData.major}</span>
              </p>
              <p className="flex justify-between items-center">
                <span className="text-gray-600">Graduation:</span>
                <span className="font-medium">{profileData.graduationYear}</span>
              </p>
            </div>
          </div>

          {/* Badges */}
          <div className="col-span-1 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-purple-100">
            <h2 className="text-xl font-semibold mb-4 text-purple-700 flex items-center">
              Achievements
            </h2>
            <div className="space-y-4">
              {profileData.badges.map((badge, index) => (
                <div 
                  key={index}
                  className={`flex items-center p-3 rounded-lg bg-gradient-to-r ${badge.color} transform hover:scale-105 transition-all duration-300`}
                >
                  <span className="text-2xl mr-3">{badge.icon}</span>
                  <div className="text-white">
                    <div className="font-semibold">{badge.name}</div>
                    <div className="text-xs opacity-90">{badge.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress */}
          <div className="col-span-1 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-purple-100">
            <h2 className="text-xl font-semibold mb-4 text-purple-700 flex items-center">
              <FaBookOpen className="mr-2" />Progress
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Progress for next level</span>
                  <span className="font-medium">{profileData.progress.courses}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${profileData.progress.courses}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Internships</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                  {profileData.progress.internships}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Projects</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                  {profileData.progress.projects}
                </span>
              </div>
            </div>
          </div>

          {/* Streak Graph */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-purple-100">
            <h2 className="text-xl font-semibold mb-6 text-purple-700 flex items-center">
              <FaProjectDiagram className="mr-2" />Yearly Stats
            </h2>
            <div className="flex justify-between items-end h-48">
              {streakData.map((day, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    style={{ height: `${day.study * 20}px` }} 
                    className="w-12 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg 
                             hover:from-purple-500 hover:to-purple-300 transition-all duration-300 
                             transform hover:scale-105"
                  />
                  <span className="mt-2 text-gray-600 font-medium">{day.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Global Leaderboard */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-purple-100">
            <h2 className="text-xl font-semibold mb-6 text-purple-700 flex items-center">
              <FaMedal className="mr-2" />Global Leaderboard
            </h2>
            <div className="space-y-4">
              {leaderboardData.map((user, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl font-semibold">{user.medal}</span>
                    <div>
                      <div className="font-medium text-gray-800">{user.name}</div>
                      <div className="text-sm text-gray-600">{user.institution}</div>
                    </div>
                  </div>
                  <div className="text-purple-700 font-semibold">{user.points} pts</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import {
//   FaUniversity,
//   FaGraduationCap,
//   FaBookOpen,
//   FaProjectDiagram,
//   FaArrowRight,
//   FaMedal,
// } from 'react-icons/fa';

// const StudentProfile = () => {
//   const navigate = useNavigate();
//   const [teamData, setTeamData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTeamData = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/teams'); // Replace with your API endpoint
//         setTeamData(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchTeamData();
//   }, []);

//   if (loading) {
//     return <div className="text-center">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500">Error: {error}</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white p-6">
//       <div className="w-full bg-white shadow-2xl rounded-2xl overflow-hidden">
//         {/* Header with Avatar */}
//         <div className="bg-gradient-to-r from-purple-600 to-purple-400 p-8 text-white">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-6">
//               <img
//                 src="https://api.dicebear.com/6.x/adventurer/svg?seed=Alex" // Replace with dynamic avatar logic if needed
//                 alt="Profile"
//                 className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
//               />
//               <div>
//                 <h1 className="text-3xl font-bold mb-2">Alex Rodriguez</h1>
//                 <p className="text-xl flex items-center opacity-90">
//                   <FaUniversity className="mr-2" />
//                   Tech University
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={() => navigate('/')}
//               className="px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-purple-50 
//                        flex items-center transition-all duration-300 shadow-md hover:shadow-lg"
//             >
//               Explore Events <FaArrowRight className="ml-2" />
//             </button>
//           </div>
//         </div>

//         {/* Team Section */}
//         <div className="p-8">
//           <h2 className="text-2xl font-semibold text-purple-700 mb-6">Your Teams</h2>
//           <div className="space-y-4">
//             {teamData.length > 0 ? (
//               teamData.map((team) => (
//                 <div
//                   key={team._id}
//                   className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
//                 >
//                   <h3 className="text-xl font-medium text-gray-800">{team.teamName}</h3>
//                   <p className="text-gray-600">
//                     Hackathon ID: <span className="font-semibold">{team.hackathonId}</span>
//                   </p>
//                   <p className="text-gray-600">
//                     Registered: <span className="font-semibold">{team.isRegistered ? 'Yes' : 'No'}</span>
//                   </p>
//                   <div className="mt-2">
//                     <h4 className="text-gray-800 font-medium">Team Members:</h4>
//                     <ul className="list-disc list-inside text-gray-600">
//                       {team.teamMembers.map((member, index) => (
//                         <li key={index}>
//                           {member.name} - {member.email}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-600">You are not part of any team yet.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentProfile;
