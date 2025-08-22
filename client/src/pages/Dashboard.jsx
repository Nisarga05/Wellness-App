import React from "react";
import { Link } from "react-router-dom";
import AddSession from "./Addsessions";


export default function Layout({ children }) {
  return (
    <div>
      {/* Top box with heading */}
      <header className="Dbheader">
        <h1>ZenAura</h1>
      </header>

      {/* Fixed Add Session bar below heading */}
      <div className="Dbnav">
        <nav>
          <Link to="/publish">Add session</Link>
        </nav>
      </div>

      {/* Content area */}
      <main className="Dbcontent">{children}</main>
    </div>
  );
}
