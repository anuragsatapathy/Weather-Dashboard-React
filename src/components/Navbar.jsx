import { Link, useLocation } from "react-router-dom";


export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <h1 className="logo">🌤️ Weather Dashboard</h1>
      <div className="links">
        <Link className={location.pathname === "/" ? "active" : ""} to="/">Home</Link>
        <Link className={location.pathname === "/saved" ? "active" : ""} to="/saved">Saved</Link>
      </div>
    </nav>
  );
}
