import { HashRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navigacija";
import Stats from "./components/Statistika";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/mynumbers" element={<Stats />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
