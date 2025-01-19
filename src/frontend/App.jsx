import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./homepage";
import UserDashboard from "./UserDashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
