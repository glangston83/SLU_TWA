import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Regions from "./pages/Regions";
import Video from "./pages/Video";

function App() {
  return (
    <Router>
      <nav className="flex gap-4 p-4 bg-gray-200">
        <Link to="/">Login</Link>
        <Link to="/home">Home</Link>
        <Link to="/regions">Regions</Link>
        <Link to="/video">Video</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/regions" element={<Regions />} />
         <Route path="/video" element={<Video />} />
      </Routes>
    </Router>
  );
}

export default App;
