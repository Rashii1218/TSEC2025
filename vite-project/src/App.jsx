import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import AboutPage from "./components/About";
import LoginPage from "./login/login";
import EventsPage from "./components/EventsPage";
import Team from "./team/Team";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import DocumentEditor from "./Document";
import VideoCall from "./VideoCall";
const App = () => {
 


  return (
    <>
      <DocumentEditor />
    </>
  );
};

export default App;
