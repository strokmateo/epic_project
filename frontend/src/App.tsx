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
import BattleScreen from "./pages/battlescreen/BattleScreen";
import { AuthProvider } from "./context/AuthContext";
import BattleScreenRW from "./pages/battlescreen/BattleScreenRW";

function App() {
    return (
        <AuthProvider>
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
                    <Route path="/battle-screen" element={<BattleScreen />} />
                    <Route
                        path="/battle-screen-rw"
                        element={<BattleScreenRW />}
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
