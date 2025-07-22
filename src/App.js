import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Regions from "./pages/Regions";
import Video from "./pages/Video";
import CityDetailPage from "./pages/CityDetailPage";
import Navbar from "./pages/Navbar";

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/"; // hide navbar on login route

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/regions" element={<Regions />} />
        <Route path="/video" element={<Video />} />
        <Route path="/citydetailpage" element={<CityDetailPage />} />
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
