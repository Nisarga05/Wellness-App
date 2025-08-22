import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function AddSession() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    description: "",
    date: "",
    duration: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  const { title, description, date, duration } = data;
  const formattedDate = new Date(date).toISOString();

  console.log("Sending data:", {
    title,
    description,
    date: formattedDate,
    duration: Number(duration)
  });

  try {
    const { data: response } = await axios.post(
      "http://localhost:5000/my-sessions/publish",
      {
        title,
        description,
        date: formattedDate,
        duration: Number(duration)
      },
      { withCredentials: true }
    );

    if (response.error) {
      toast.error(response.error);
    } else {
      setData({ title: "", description: "", date: "", duration: "" });
      toast.success("Session added successfully");
      navigate("/dashboard");
    }
  } catch (error) {
    // Enhanced error logging
    console.error("Full error details:", error);
    
    if (error.response) {
      // Server responded with error status
      console.error("Server response data:", error.response.data);
      console.error("Server response status:", error.response.status);
      console.error("Server response headers:", error.response.headers);
      
      // Show specific error message from server if available
      if (error.response.data && error.response.data.message) {
        toast.error(`Server error: ${error.response.data.message}`);
      } else {
        toast.error(`Server error: ${error.response.status} - Bad Request`);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received:", error.request);
      toast.error("No response from server. Check if server is running.");
    } else {
      // Something else happened
      console.error("Error message:", error.message);
      toast.error("Something went wrong. Please try again.");
    }
  }
};


  return (
  <div className="add-session-wrapper">
    <div className="add-session-card">
      <h2>Add New Session</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={data.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={data.description}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          value={data.date}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (minutes)"
          value={data.duration}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Session</button>
      </form>
    </div>
  </div>
);


}
