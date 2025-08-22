import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    duration: "",
  });

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = () => {
    axios
      .get("http://localhost:5000/sessions", { withCredentials: true })
      .then((res) => setSessions(res.data))
      .catch((err) => console.error("Error fetching sessions:", err));
  };

  const formatDuration = (minutes) => {
    if (!minutes || isNaN(minutes)) return "0 mins";
    if (minutes < 60) return `${minutes} min${minutes !== 1 ? "s" : ""}`;

    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;

    return mins > 0
      ? `${hrs} hr${hrs !== 1 ? "s" : ""} ${mins} min${mins !== 1 ? "s" : ""}`
      : `${hrs} hr${hrs !== 1 ? "s" : ""}`;
  };

  const handleEdit = (session) => {
    setEditingId(session._id);
    setFormData({
      title: session.title,
      description: session.description,
      date: session.date.slice(0, 10),
      duration: session.duration,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (id) => {
    try {
     await axios.put(
  `http://localhost:5000/sessions/${id}`,
  { 
    ...formData, 
    duration: Number(formData.duration), 
    date: new Date(formData.date) // ✅ FIX: convert string → Date
  },
  { withCredentials: true }
);

      toast.success("Session updated successfully!");
      setEditingId(null);
      fetchSessions();
    } catch (err) {
      console.error("Error updating session:", err);
      toast.error("Failed to update session");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ title: "", description: "", date: "", duration: "" });
  };

  return (
    <div className="mysessions-wrapper">
  <h2 className="mysessions-title">my Wellness Sessions</h2>

  {sessions.length === 0 ? (
    <p className="no-mysessions">No sessions found</p>
  ) : (
    <ul className="mysessions-grid">
      {sessions.map((s) => (
        <li key={s._id} className="mysession-card">
          {editingId === s._id ? (
            <>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="mysession-input"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="mysession-textarea"
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mysession-input"
              />
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Duration (minutes)"
                className="mysession-input"
              />
              <div className="mysession-btns">
                <button className="mysession-save-btn" onClick={() => handleSave(s._id)}>Save</button>
                <button className="mysession-cancel-btn" onClick={handleCancel}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <h3 className="mysession-title">{s.title}</h3>
              <p className="mysession-description">{s.description || "No description"}</p>
              <div className="mysession-meta">
                <span><strong>time:</strong> {formatDuration(s.duration)}</span>
                <span><strong>date:</strong> {new Date(s.date).toLocaleDateString()}</span>
                <span><strong>at:</strong> {new Date(s.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })}</span>
              </div>
              <button className="mysession-edit-btn" onClick={() => handleEdit(s)}>Edit</button>
            </>
          )}
        </li>
      ))}
    </ul>
  )}
</div>

  );
}
