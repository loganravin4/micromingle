import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage/homepage";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import Tinder from "./pages/Tinder/Tinder";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/tinder" element={<Tinder />} />
      </Routes>
    </div>
  );
}

export default App;
