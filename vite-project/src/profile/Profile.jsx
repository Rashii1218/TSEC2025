import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentProfile = () => {
  const navigate = useNavigate();

  const profileData = {
    name: 'Alex Rodriguez',
    institution: 'Tech University',
    major: 'Computer Science',
    graduationYear: 2025,
    badges: [
      { name: 'Hackathon Winner', color: 'bg-purple-500' },
      { name: 'Dean\'s List', color: 'bg-blue-500' },
      { name: 'Research Assistant', color: 'bg-green-500' }
    ],
    progress: {
      courses: 75,
      internships: 2,
      projects: 5
    }
  };

  const streakData = [
    { day: 'Mon', study: 3 },
    { day: 'Tue', study: 4 },
    { day: 'Wed', study: 5 },
    { day: 'Thu', study: 4 },
    { day: 'Fri', study: 3 },
    { day: 'Sat', study: 2 },
    { day: 'Sun', study: 1 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-400 p-6 text-white flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{profileData.name}</h1>
            <p className="text-xl">{profileData.institution}</p>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50"
          >
            Explore Events
          </button>
        </div>

        {/* Profile Details */}
        <div className="p-6 grid grid-cols-3 gap-6">
          {/* Personal Info */}
          <div className="col-span-1 bg-purple-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-purple-700">Details</h2>
            <div className="space-y-2">
              <p><strong>Major:</strong> {profileData.major}</p>
              <p><strong>Graduation:</strong> {profileData.graduationYear}</p>
            </div>
          </div>

          {/* Badges */}
          <div className="col-span-1 bg-purple-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-purple-700">Badges</h2>
            <div className="space-y-2">
              {profileData.badges.map((badge, index) => (
                <div 
                  key={index} 
                  className={`${badge.color} text-white px-3 py-1 rounded-full inline-block mr-2`}
                >
                  {badge.name}
                </div>
              ))}
            </div>
          </div>

          {/* Progress */}
          <div className="col-span-1 bg-purple-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-purple-700">Progress</h2>
            <div className="space-y-2">
              <p>Courses Completed: {profileData.progress.courses}%</p>
              <p>Internships: {profileData.progress.internships}</p>
              <p>Projects: {profileData.progress.projects}</p>
            </div>
          </div>

          {/* Streak Graph */}
          <div className="col-span-3 bg-purple-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-purple-700">Weekly Study Streak</h2>
            <div className="flex justify-between">
              {streakData.map((day, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center"
                >
                  <div 
                    style={{ height: `${day.study * 20}px` }} 
                    className="w-6 bg-purple-500 mb-2"
                  ></div>
                  <span>{day.day}</span>
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



