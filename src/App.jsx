import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navigacija";
import Stats from "./components/Statistika";

function App() {
  return (
    <BrowserRouter basename="/kinors">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/mynumbers" element={<Stats />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
