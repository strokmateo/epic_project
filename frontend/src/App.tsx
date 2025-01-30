import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import HomePage from "./pages/home/HomePage";
import Map from "./pages/map/map";
import TownHall from "./pages/houses/TownHall";
import Tavern from "./pages/houses/Tavern";
import Alley from "./pages/houses/Alley";
import WizardHut from "./pages/houses/WizardHut";
import Leaderboard from "./pages/leaderboard/Leaderboard";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/map" element={<Map />} />
                <Route path="/town-hall" element={<TownHall />} />
                <Route path="/tavern" element={<Tavern />} />
                <Route path="/alley" element={<Alley />} />
                <Route path="/wizard-hut" element={<WizardHut />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
        </Router>
    );
}

export default App;
