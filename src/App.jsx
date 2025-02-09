import { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import About from "./components/About";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navigacija";
import Stats from "./components/Statistika";


function App() {
  const [language, setLanguage] = useState(localStorage.getItem("kino-language") || "en");
  return (
    <HashRouter>
      <Navbar setLanguage={setLanguage} language={language} />
      <Routes>
        <Route path="/" element={<Homepage language={language}/>} />
        <Route path="/mynumbers" element={<Stats language={language}/>} />
        <Route path="kino" element={<About language={language}/>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
