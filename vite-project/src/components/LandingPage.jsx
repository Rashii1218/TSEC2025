// import { useState } from "react";
// import {
//   Calendar,
//   Trophy,
//   Users,
//   Clock,
//   Star,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import NavBar from './Navbar'
// import About from "./About";

// const LandingPage = () => {
//   const [selectedCard, setSelectedCard] = useState(null);
 

//   const upcomingHackathons = [
//     {
//       title: "AI Innovation Challenge",
//       date: "Feb 15-17, 2025",
//       participants: 250,
//       status: "Registration Open",
//       prize: "$5000",
//       difficulty: "Advanced",
//       skills: ["AI/ML", "Python", "Data Science"],
//     },
//     {
//       title: "Web3 Builders Hack",
//       date: "Mar 1-3, 2025",
//       participants: 180,
//       status: "Coming Soon",
//       prize: "$3000",
//       difficulty: "Intermediate",
//       skills: ["Blockchain", "Solidity", "JavaScript"],
//     },
//   ];

//   const pastHackathons = [
//     {
//       title: "Data Science Sprint",
//       date: "Jan 5-7, 2025",
//       participants: 300,
//       winners: ["Team Alpha", "Digital Ninjas", "Tech Titans"],
//       difficulty: "Advanced",
//       skills: ["Python", "Data Analysis", "Machine Learning"],
//     },
//   ];

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.5,
//         duration: 0.8,
//       },
//     },
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//     hover: { scale: 1.05, transition: { duration: 0.3 } },
//   };

//   const fadeInVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { duration: 1 } },
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-purple-400 to-black text-white">
//       {/* Top accent */}
//       <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-purple-400 to-orange-400" />

//       {/* Navbar */}
//       <NavBar/>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 py-16">
//         {/* Hero Section */}
//         <motion.div
//           className="text-center mb-16"
//           initial="hidden"
//           animate="visible"
//           variants={fadeInVariants}
//         >
//           <h1 className="text-6xl font-bold bg-gradient-to-r from-orange-600 via-purple-800 to-pink-600 text-transparent bg-clip-text">
//             Build. Compete. Innovate.
//           </h1>
//           <p className="text-purple-100 text-xl font-bold max-w-2xl mx-auto">
//             Join the world&apos;s most exciting virtual hackathons and showcase your
//             skills to global tech leaders.
//           </p>
//         </motion.div>

//         {/* Upcoming Hackathons */}
//         <motion.div
//           className="mb-16"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           variants={containerVariants}
//         >
//           <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
//             <Calendar className="mr-2 text-orange-400" /> Upcoming Hackathons
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {upcomingHackathons.map((hack, index) => (
//               <motion.div
//                 key={hack.title}
//                 className={`bg-gradient-to-br from-black to-purple-950 rounded-xl p-6 border border-purple-800 shadow-lg cursor-pointer`}
//                 variants={cardVariants}
//                 whileHover="hover"
//                 onClick={() =>
//                   setSelectedCard(selectedCard === index ? null : index)
//                 }
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <h3 className="text-xl font-bold text-white">{hack.title}</h3>
//                   <span className="bg-gradient-to-r from-orange-400 to-purple-500 text-white px-3 py-1 rounded-full text-sm shadow-lg">
//                     {hack.status}
//                   </span>
//                 </div>
//                 <div className="space-y-3 text-purple-300">
//                   <p className="flex items-center">
//                     <Clock className="w-4 h-4 mr-2 text-orange-400" />{" "}
//                     {hack.date}
//                   </p>
//                   <p className="flex items-center">
//                     <Users className="w-4 h-4 mr-2 text-orange-400" />{" "}
//                     {hack.participants} participants
//                   </p>
//                   <p className="flex items-center">
//                     <Trophy className="w-4 h-4 mr-2 text-orange-400" /> Prize
//                     Pool: {hack.prize}
//                   </p>
//                   <p className="flex items-center">
//                     <Star className="w-4 h-4 mr-2 text-orange-400" />{" "}
//                     {hack.difficulty}
//                   </p>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {hack.skills.map((skill) => (
//                       <span
//                         key={skill}
//                         className="bg-gradient-to-r from-black to-purple-800 text-purple-200 px-3 py-1 rounded-full text-sm border border-purple-700"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Past Hackathons */}
//         <motion.div
//           className="mb-16"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           variants={containerVariants}
//         >
//           <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
//             <Trophy className="mr-2 text-orange-400" /> Past Hackathons
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {pastHackathons.map((hack) => (
//               <motion.div
//                 key={hack.title}
//                 className="bg-gradient-to-br from-black to-purple-950 rounded-xl p-6 border border-purple-800 shadow-lg cursor-pointer"
//                 variants={cardVariants}
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <h3 className="text-xl font-bold text-white">{hack.title}</h3>
//                   <span className="bg-gradient-to-r from-purple-700 to-purple-900 text-purple-200 px-3 py-1 rounded-full text-sm shadow-lg">
//                     Completed
//                   </span>
//                 </div>
//                 <div className="space-y-3 text-purple-300">
//                   <p className="flex items-center">
//                     <Clock className="w-4 h-4 mr-2 text-orange-400" />{" "}
//                     {hack.date}
//                   </p>
//                   <p className="flex items-center">
//                     <Users className="w-4 h-4 mr-2 text-orange-400" />{" "}
//                     {hack.participants} participants
//                   </p>
//                   <p className="flex items-center">
//                     <Star className="w-4 h-4 mr-2 text-orange-400" />{" "}
//                     {hack.difficulty}
//                   </p>
//                   <p>
//                     <strong>Winners:</strong> {hack.winners.join(", ")}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//       <About />
//     </div>
//   );
// };

// export default LandingPage;




// import { useState, useEffect } from "react";
// import { Calendar, Trophy, Users, Clock, Star } from "lucide-react";
// import { motion } from "framer-motion";
// import NavBar from "./Navbar";
// import About from "./About";
// import axios from "axios";

// const LandingPage = () => {
//   const [upcomingHackathons, setUpcomingHackathons] = useState([]);
//   const [pastHackathons, setPastHackathons] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch data from backend
//   useEffect(() => {
//     const fetchHackathons = async () => {
//       try {
//         const response = await axios.get("/api/hackathons");
//         setUpcomingHackathons(response.data.upcoming);
//         setPastHackathons(response.data.past);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch hackathon data.");
//         setLoading(false);
//       }
//     };

//     fetchHackathons();
//   }, []);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.5,
//         duration: 0.8,
//       },
//     },
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//     hover: { scale: 1.05, transition: { duration: 0.3 } },
//   };

//   const fadeInVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { duration: 1 } },
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white">
//         Loading hackathons...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-red-400">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-purple-400 to-black text-white">
//       {/* Top accent */}
//       <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-purple-400 to-orange-400" />

//       {/* Navbar */}
//       <NavBar />

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 py-16">
//         {/* Hero Section */}
//         <motion.div
//           className="text-center mb-16"
//           initial="hidden"
//           animate="visible"
//           variants={fadeInVariants}
//         >
//           <h1 className="text-6xl font-bold bg-gradient-to-r from-orange-600 via-purple-800 to-pink-600 text-transparent bg-clip-text">
//             Build. Compete. Innovate.
//           </h1>
//           <p className="text-purple-100 text-xl font-bold max-w-2xl mx-auto">
//             Join the world&apos;s most exciting virtual hackathons and showcase your
//             skills to global tech leaders.
//           </p>
//         </motion.div>

//         {/* Upcoming Hackathons */}
//         <motion.div
//           className="mb-16"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           variants={containerVariants}
//         >
//           <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
//             <Calendar className="mr-2 text-orange-400" /> Upcoming Hackathons
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {upcomingHackathons.map((hack, index) => (
//               <motion.div
//                 key={hack.title}
//                 className={`bg-gradient-to-br from-black to-purple-950 rounded-xl p-6 border border-purple-800 shadow-lg cursor-pointer`}
//                 variants={cardVariants}
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <h3 className="text-xl font-bold text-white">{hack.title}</h3>
//                   <span className="bg-gradient-to-r from-orange-400 to-purple-500 text-white px-3 py-1 rounded-full text-sm shadow-lg">
//                     {hack.status}
//                   </span>
//                 </div>
//                 <div className="space-y-3 text-purple-300">
//                   <p className="flex items-center">
//                     <Clock className="w-4 h-4 mr-2 text-orange-400" />{" "}
//                     {hack.date}
//                   </p>
//                   <p className="flex items-center">
//                     <Users className="w-4 h-4 mr-2 text-orange-400" />{" "}
//                     {hack.participants} participants
//                   </p>
//                   <p className="flex items-center">
//                     <Trophy className="w-4 h-4 mr-2 text-orange-400" /> Prize
//                     Pool: {hack.prize}
//                   </p>
//                   <p className="flex items-center">
//                     <Star className="w-4 h-4 mr-2 text-orange-400" />{" "}
//                     {hack.difficulty}
//                   </p>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {hack.skills || hack.skills.map((skill) => (
//                       <span
//                         key={skill}
//                         className="bg-gradient-to-r from-black to-purple-800 text-purple-200 px-3 py-1 rounded-full text-sm border border-purple-700"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Past Hackathons */}
//         <motion.div
//           className="mb-16"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           variants={containerVariants}
//         >
//           <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
//             <Trophy className="mr-2 text-orange-400" /> Past Hackathons
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {pastHackathons.map((hack) => (
//               <motion.div
//                 key={hack.title}
//                 className="bg-gradient-to-br from-black to-purple-950 rounded-xl p-6 border border-purple-800 shadow-lg"
//                 variants={cardVariants}
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <h3 className="text-xl font-bold text-white">{hack.title}</h3>
//                   <span className="bg-gradient-to-r from-purple-700 to-purple-900 text-purple-200 px-3 py-1 rounded-full text-sm shadow-lg">
//                     Completed
//                   </span>
//                 </div>
//                 <div className="space-y-3 text-purple-300">
//                   <p className="flex items-center">
//                     <Clock className="w-4 h-4 mr-2 text-orange-400" />{" "}
//                     {hack.date}
//                   </p>
//                   <p className="flex items-center">
//                     <Users className="w-4 h-4 mr-2 text-orange-400" />{" "}
//                     {hack.participants} participants
//                   </p>
//                   <p className="flex items-center">
//                     <Star className="w-4 h-4 mr-2 text-orange-400" />{" "}
//                     {hack.difficulty}
//                   </p>
//                   <p>
//                     <strong>Winners:</strong> {hack.winners.join(", ")}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//       <About />
//     </div>
//   );
// };

// export default LandingPage;
import { useState, useEffect } from "react";
import { Calendar, Trophy, Users, Clock, Star } from "lucide-react";
import { motion } from "framer-motion";
import NavBar from "./Navbar";
import About from "./About";
import axios from "axios";

const LandingPage = () => {
  const [upcomingHackathons, setUpcomingHackathons] = useState([]);
  const [pastHackathons, setPastHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from backend
  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const upcomingResponse = await axios.get("http://localhost:3000/api/hackathons/upcoming");
        const pastResponse = await axios.get("http://localhost:3000/api/hackathons/past");
        setUpcomingHackathons(upcomingResponse.data || []);
        setPastHackathons(pastResponse.data || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch hackathon data.");
        setLoading(false);
      }
    };

    fetchHackathons();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        duration: 0.8,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading hackathons...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-400 to-black text-white">
      {/* Top accent */}
      <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-purple-400 to-orange-400" />

      {/* Navbar */}
      <NavBar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-orange-600 via-purple-800 to-pink-600 text-transparent bg-clip-text">
            Build. Compete. Innovate.
          </h1>
          <p className="text-purple-100 text-xl font-bold max-w-2xl mx-auto">
            Join the world&apos;s most exciting virtual hackathons and showcase your
            skills to global tech leaders.
          </p>
        </motion.div>

        {/* Upcoming Hackathons */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <Calendar className="mr-2 text-orange-400" /> Upcoming Hackathons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingHackathons.map((hack, index) => (
              <motion.div
                key={hack.title}
                className={`bg-gradient-to-br from-black to-purple-950 rounded-xl p-6 border border-purple-800 shadow-lg cursor-pointer`}
                variants={cardVariants}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{hack.title}</h3>
                  <span className="bg-gradient-to-r from-orange-400 to-purple-500 text-white px-3 py-1 rounded-full text-sm shadow-lg">
                    {hack.status}
                  </span>
                </div>
                <div className="space-y-3 text-purple-300">
                  <p className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-orange-400" />{" "}
                    {hack.date}
                  </p>
                  <p className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-orange-400" />{" "}
                    {hack.participants} participants
                  </p>
                  <p className="flex items-center">
                    <Trophy className="w-4 h-4 mr-2 text-orange-400" /> Prize
                    Pool: {hack.prize}
                  </p>
                  <p className="flex items-center">
                    <Star className="w-4 h-4 mr-2 text-orange-400" />{" "}
                    {hack.difficulty}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {hack.skills && hack.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-gradient-to-r from-black to-purple-800 text-purple-200 px-3 py-1 rounded-full text-sm border border-purple-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Past Hackathons */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <Trophy className="mr-2 text-orange-400" /> Past Hackathons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastHackathons.map((hack) => (
              <motion.div
                key={hack.title}
                className="bg-gradient-to-br from-black to-purple-950 rounded-xl p-6 border border-purple-800 shadow-lg"
                variants={cardVariants}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{hack.title}</h3>
                  <span className="bg-gradient-to-r from-purple-700 to-purple-900 text-purple-200 px-3 py-1 rounded-full text-sm shadow-lg">
                    Completed
                  </span>
                </div>
                <div className="space-y-3 text-purple-300">
                  <p className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-orange-400" />{" "}
                    {hack.date}
                  </p>
                  <p className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-orange-400" />{" "}
                    {hack.participants} participants
                  </p>
                  <p className="flex items-center">
                    <Star className="w-4 h-4 mr-2 text-orange-400" />{" "}
                    {hack.difficulty}
                  </p>
                  <p>
                    <strong>Winners:</strong> {hack.winners.join(", ")}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <About />
    </div>
  );
};

export default LandingPage;