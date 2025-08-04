import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Regions from "./pages/Regions";
import Video from "./pages/Video";
<<<<<<< Updated upstream

=======
import CityDetailPage from "./pages/CityDetailPage";
import Navbar from "./pages/Navbar";
import Statistics from "./pages/statistics"; // Import the Statistics page
>>>>>>> Stashed changes
function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/";

  return (
    <>
      {!hideNavbar && (
        <nav className="flex gap-4 p-4 bg-gray-200">
          <Link to="/home" className="cursor-pointer">Home</Link>
          <Link to="/regions" className="cursor-pointer">Regions</Link>
          <Link to="/video" className="cursor-pointer">Video</Link>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/regions" element={<Regions />} />
        <Route path="/video" element={<Video />} />
<<<<<<< Updated upstream
=======
        <Route path="/citydetailpage" element={<CityDetailPage />} />
        <Route path="/statistics" element={<Statistics />} />
>>>>>>> Stashed changes
      </Routes>
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}