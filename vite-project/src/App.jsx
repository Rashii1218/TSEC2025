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

const App = () => {
  // Create a new BlockNote editor instance
  const initialContent = [
    { type: "paragraph", content: [{ type: "text", text: "Welcome to BlockNote Editor!" }] },
  ];

  const editor = useCreateBlockNote({
    initialContent: initialContent,
    defaultStyles: true, // Use default styles for the editor
    uploadFile: async (file) => {
      // Handle file upload (e.g., images)
      return "/path/to/uploaded/file"; // Return the file URL
    },
    animations: true, // Enable animations
    theme: "light", // Set editor theme to light
    formattingToolbar: true, // Enable formatting toolbar
    emojiPicker: true, // Enable emoji picker
  });

  // Log the initial content to the console (before returning JSX)
  console.log(initialContent); 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/team" element={<Team />} />
      </Routes>

      {/* Renders the BlockNote editor instance */}
      <h1>BlockNote Editor Example</h1>
      <BlockNoteView editor={editor} editable={true} />
    </Router>
  );
};

export default App;
