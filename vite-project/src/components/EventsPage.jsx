import React from 'react';
import { Calendar, Trophy, Users, MessageCircle, ArrowRight, Code, Award } from 'lucide-react';
import { motion } from "framer-motion";

const EventsPage = () => {
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
      gradient: "from-orange-400 to-purple-500"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-400 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">

        {/* Welcome Section */}
        <h1 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-orange-600 via-purple-800 to-pink-600 text-transparent bg-clip-text">
          Welcome to the Events Page
        </h1>

        {/* Leaderboard Section */}
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <Award className="mr-2 text-yellow-500" /> Leaderboard
        </h2>
        <motion.div
          className="bg-gradient-to-br from-black to-purple-950 rounded-xl p-6 shadow-lg mb-16 hover:scale-105 transition-transform duration-300 ease-in-out"
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

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`bg-gradient-to-br ${feature.gradient} rounded-xl p-6 shadow-lg hover:scale-105 transition-all duration-300 ease-in-out`}
              variants={cardVariants}
            >
              <div className="flex items-center mb-4">
                <feature.icon className="w-12 h-12 text-white mr-4" />
                <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
              </div>
              <p className="text-white">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
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
  );
};

export default EventsPage;
