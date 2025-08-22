import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">ZenAura</div>
      <div className="navbar-links">
        <Link className="nav-link" to="/publish">Add session</Link>
        <Link className="nav-link" to="/sessions">Sessions</Link>
        <Link className="nav-link" to="/my-sessions">my-sessions</Link>
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/login">Login</Link>
        <Link className="nav-link" to="/signup">Signup</Link>

        
        
      </div>
    </nav>
  );
};

export default Navbar;
