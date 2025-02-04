import { HashRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navigacija";
import Stats from "./components/Statistika";
import About from "./components/About";
import { useEffect, useState } from "react";


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
