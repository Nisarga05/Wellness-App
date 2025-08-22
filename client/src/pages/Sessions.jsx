import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Sessions() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/sessions", { withCredentials: true })
      .then((res) => {
        console.log("Fetched sessions:", res.data);
        setSessions(res.data);
      })
      .catch((err) => {
        console.error("Error fetching sessions:", err);
      });
  }, []);

  const formatDuration = (minutes) => {
  if (!minutes || isNaN(minutes)) return "0 mins";
  if (minutes < 60) return `${minutes} min${minutes !== 1 ? "s" : ""}`;

  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return mins > 0
    ? `${hrs} hr${hrs !== 1 ? "s" : ""} ${mins} min${mins !== 1 ? "s" : ""}`
    : `${hrs} hr${hrs !== 1 ? "s" : ""}`;
};

  return (
    <div className="sessions-wrapper">
      <h2 className="sessions-title">All Wellness Sessions</h2>

      {sessions.length === 0 ? (
        <p className="no-sessions">No sessions found</p>
      ) : (
        <ul className="sessions-list">
          {sessions.map((s) => (
            <li key={s._id} className="session-card">
              <h3 className="session-title">{s.title}</h3>
              <p className="session-description">{s.description || "No description"}</p>
             
              <div className="session-meta">
                <span><strong>time:</strong> {formatDuration(s.duration)}</span>
              <span><strong>date:</strong> {new Date(s.date).toLocaleDateString()}</span>
              <span><strong>at:</strong> {new Date(s.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })}</span>
                </div>



              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
