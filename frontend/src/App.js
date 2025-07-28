import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './UserContext';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Meteo from './pages/Meteo';
import { Weather, MapWithLocation } from './components';
import Profil from './pages/Profil';
import AgroGuard from './pages/AgroGuard';
import AgroLayout from './pages/AgroLayout';
import Cultures from './components/Cultures';
import Calendriers from './components/Calendriers';
import Taches from './components/Taches';

// Crée un composant Agro si besoin
function Agro() {
  return <div style={{ color: "#fff" }}>Page Agro</div>;
}

function App() {
  return (
    <UserProvider>
      <Router>
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <div style={{ flex: 1, height: '100vh' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/meteo" element={<Meteo />} />
              <Route path="/profil" element={<Profil />} />
              {/* Protection de l'accès à Agro */}
              <Route path="/agro" element={<AgroGuard />}>
                <Route element={<AgroLayout />}>
                  {/* Redirection par défaut vers /agro/cultures */}
                  <Route index element={<Navigate to="cultures" replace />} />
                  <Route path="cultures" element={<Cultures />} />
                  <Route path="calendriers" element={<Calendriers />} />
                  <Route path="taches" element={<Taches />} />
                </Route>
              </Route>
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;