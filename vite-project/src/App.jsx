// //import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LandingPage from "./components/LandingPage";
// import AboutPage from "./components/About";
// import LoginPage from "./login/login";
// import EventsPage from "./components/EventsPage";

// import Team from "./team/Team";
// <<<<<<< Updated upstream
// import "@blocknote/core/fonts/inter.css";
// import { BlockNoteView } from "@blocknote/mantine";
// import "@blocknote/mantine/style.css";
// import { useCreateBlockNote } from "@blocknote/react";
// import Video from "./components/Video";
// >>>>>>> 000efb3e0baee382cec88341f56f4a1a13357d0f
// import DocumentEditor from "./Document";
// const App = () => {
//    return (
//     <>
// <<<<<<< HEAD
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/about" element={<AboutPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/events" element={<EventsPage />} />
//       </Routes>
//     </Router>
//       <DocumentEditor />
// =======
//       <DocumentEditor/>
//       <Video/>
// >>>>>>> 000efb3e0baee382cec88341f56f4a1a13357d0f
//     </>
// =======
// import { useState } from 'react'
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import LandingPage from "./components/LandingPage";
// import AboutPage from "./components/About";
// import LoginPage from "./login/login";
// import EventsPage from "./components/EventsPage";
// import JudgeDashboard from './JudgeDashboard';
// import TeamListPage from './TeamListPage';

// const App = () => {
  
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/judgedashboard" element={<JudgeDashboard />} />
//         <Route path="*" element={<Navigate to="/" />} />
//         <Route path="/teams" element={<TeamListPage />} />
//         <Route path="/about" element={<AboutPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/events" element={<EventsPage />} />
//         <Route path="/events/team" element={<Team />} />
//       </Routes>
//     </Router>
//     <DocumentEditor/>
//     <Video/>000efb3e0baee382cec88341f56f4a1a13357d0f
//   );
// };

// export default App;

//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import AboutPage from "./components/About";
import LoginPage from "./login/login";
import EventsPage from "./components/EventsPage";
import Team from "./team/Team";
import Video from "./components/Video";
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DocumentEditor from './Document';
import LiveForum from "./components/Mentor";
import JudgeDashboard from './JudgeDashboard';
import TeamListPage from './TeamListPage';
import Profile from './UserProfile/Profile';
import TeamForm from "./team/Register";
import StudentProfile from "./profile/Profile";

import TeamDetails from "./TimeSchedule";
import ODashboard from "./organizer/ODashboard";
import Leaderboard from "./LeaderBoard";
import CommitHistory from "./Version";


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/events" element={<EventsPage />} />
        
        <Route path="/events/team" element={<Team />} />
        <Route path="/judgedashboard" element={<JudgeDashboard />} />
        <Route path="/teams" element={<TeamListPage />} />
        <Route path="/mentor" element={<LiveForum />} />
        
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/register" element={<TeamForm />} />
        <Route path="/profile" element={<StudentProfile/>} />
        <Route path="/document" element={<DocumentEditor />} />
        <Route path="/mentor" element={<LiveForum />} />
        <Route path="/schedule" element={<TeamDetails />} />
        <Route path="/video" element={<Video />} />
        <Route path="/organizer" element={<ODashboard />} />
        <Route path="/event" element={<EventsPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/track" element={<CommitHistory owner="Rashii1218" repo="TsecRubix25" />} />
      </Routes>
    </Router>
  );
};

export default App;
