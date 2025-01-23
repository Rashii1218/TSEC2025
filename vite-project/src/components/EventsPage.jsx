import React, { useState } from 'react';
import { Calendar, Trophy, Users, MessageCircle, Code, Award, ArrowRight, ClipboardCheck, Box } from 'lucide-react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const EventsPage = () => {
  const [iframeVisible, setIframeVisible] = useState(false);
  const [registerFormVisible, setRegisterFormVisible] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState([{ name: '', email: '' }]);

  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.5, duration: 0.8 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const features = [
    {
      title: "Team Formation",
      description: "Find your perfect match and build your dream team",
      icon: Users,
      gradient: "from-orange-400 to-purple-500",
      onClick: () => setIframeVisible(true)
    },
    {
      title: "AI Assistant",
      description: "Get help with coding and project management",
      icon: MessageCircle,
      gradient: "from-purple-400 to-pink-500"
    },
    {
      title: "Project Showcases",
      description: "Participate in coding challenges and improve your skills",
      icon: Code,
      gradient: "from-green-400 to-blue-500"
    },
    {
      title: "Register",
      description: "Register your team to participate in the event",
      icon: ClipboardCheck,
      gradient: "from-red-400 to-yellow-500",
      onClick: () => setRegisterFormVisible(true)
    },
    {
      title: "Collaboration Workspace",
      description: "Collaborate with your team in a shared workspace",
      icon: Box,
      gradient: "from-blue-500 to-green-500",
      onClick: () => navigate('/document')
    }
  ];

  const timelinePhases = [
    { phase: "Phase 1", date: "2023-11-01" },
    { phase: "Phase 2", date: "2023-12-01" },
    { phase: "Phase 3", date: "2024-01-01" },
  ];

  const leaderboard = [
    { name: "Team A", points: 100 },
    { name: "Team B", points: 85 },
    { name: "Team C", points: 70 },
    { name: "Team D", points: 55 },
  ];

  const isPhaseElapsed = (date) => {
    const currentDate = new Date();
    const phaseDate = new Date(date);
    return currentDate > phaseDate;
  };

  const handleAddMember = () => {
    setTeamMembers([...teamMembers, { name: '', email: '' }]);
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index][field] = value;
    setTeamMembers(updatedMembers);
  };

  const handleRemoveMember = (index) => {
    const updatedMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updatedMembers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');
    const hackathonId = "Hackathon 1";

    const teamData = { teamName, teamMembers, userId, hackathonId };

    try {
      const response = await fetch('http://localhost:3000/api/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teamData),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Team registered successfully!');
        setTeamName('');
        setTeamMembers([{ name: '', email: '' }]);
        setRegisterFormVisible(false);
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred while registering the team.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-400 to-black text-white">
      <Navbar/>
      {!iframeVisible && !registerFormVisible && (
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-orange-600 via-purple-800 to-pink-600 text-transparent bg-clip-text">
            HACKATHON 1
          </h1>
          <div className="mb-16">
    <video
    autoPlay
      controls
      className="w-full h-auto rounded-lg shadow-lg"
      poster="your-thumbnail.jpg" // Optional: Add a thumbnail if the video isn't playing
    >
      <source src="/hack_vid.mp4" type="video/mp4" />
   
    
    </video>
  </div>
          <p className="text-lg text-center mb-16">
            Join us for an exciting hackathon filled with challenges, workshops, and networking opportunities. Showcase your skills, build innovative solutions, and compete for amazing prizes!
          </p>

          {/* Leaderboard Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white flex items-center mb-4">
              <Award className="mr-2 text-yellow-500" /> Leaderboard
            </h2>
            <motion.div
              className="bg-gradient-to-br from-black to-purple-950 rounded-xl p-6 shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="space-y-4">
                {leaderboard.map((team, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-white hover:bg-purple-400 p-2 rounded-md transition-all duration-300 ease-in-out"
                  >
                    <div className="text-lg font-semibold">{team.name}</div>
                    <div className="text-lg font-semibold">{team.points} pts</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Features Section */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-br ${feature.gradient} rounded-xl p-6 shadow-lg hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer`}
                variants={cardVariants}
                onClick={feature.onClick || null}
              >
                <div className="flex items-center mb-4">
                  <feature.icon className="w-12 h-12 text-white mr-4" />
                  <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                </div>
                <p className="text-white">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Timeline Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white flex items-center mb-4">
              <Calendar className="mr-2 text-orange-400" /> Timeline
            </h2>
            <motion.div
              className="bg-gradient-to-br from-black to-purple-950 rounded-xl p-8 border border-purple-800 shadow-lg"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="relative">
                {timelinePhases.map((item) => {
                  const elapsed = isPhaseElapsed(item.date);
                  return (
                    <div key={item.phase} className="relative pl-8 pb-8 last:pb-0">
                      <div className={`absolute left-0 top-0 h-full w-px ${elapsed ? "bg-gray-500" : "bg-gradient-to-b from-orange-400 to-purple-500"}`} />
                      <div className={`absolute left-[-4px] top-2 w-2 h-2 rounded-full ${elapsed ? "bg-gray-500" : "bg-orange-400"}`} />
                      <div className="group">
                        <h3 className={`text-xl font-bold ${elapsed ? "text-gray-500" : "text-white"} mb-1 group-hover:text-orange-400 transition-colors`}>
                          {item.phase}
                        </h3>
                        <p className="text-purple-300">{item.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Registration Form */}
      {registerFormVisible && (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-black">
          <form
            onSubmit={handleSubmit}
            className="bg-gradient-to-br from-purple-800 to-black rounded-lg p-8 space-y-4 shadow-lg text-white w-full max-w-lg"
          >
            <h2 className="text-3xl font-bold text-center mb-4">Register Your Team</h2>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Team Name"
              className="w-full px-4 py-3 rounded-md bg-black border border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            {teamMembers.map((member, index) => (
              <div key={index} className="space-y-3">
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                  placeholder={`Member ${index + 1} Name`}
                  className="w-full px-4 py-3 rounded-md bg-black border border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
                <input
                  type="email"
                  value={member.email}
                  onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                  placeholder={`Member ${index + 1} Email`}
                  className="w-full px-4 py-3 rounded-md bg-black border border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(index)}
                    className="w-full px-4 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
                  >
                    Remove Member
                  </button>
                )}
              </div>
            ))}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleAddMember}
                className="flex-1 px-4 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all"
              >
                + Add Member
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-all"
              >
                Register Team
              </button>
            </div>
            <button
              type="button"
              onClick={() => setRegisterFormVisible(false)}
              className="text-white underline mt-4 hover:text-gray-400"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Iframe Section */}
      {iframeVisible && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <iframe
            src="http://localhost:8501"
            title="Team Formation"
            className="w-full h-full border-0"
          />
          <button
            onClick={() => setIframeVisible(false)}
            className="absolute top-4 right-4 text-white text-3xl bg-red-500 p-2 rounded-full"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default EventsPage;