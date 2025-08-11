import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ProfileForm = () => {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    skills: "",
    github: "",
    projects: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/profile",
        {
          name: formData.name,
          skills: formData.skills.split(",").map((s) => s.trim()),
          github: formData.github,
          projects: formData.projects.split(",").map((p) => ({
            title: p.trim(),
            description: "",
            link: ""
          }))
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setMessage(res.data.message || "Profile saved!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error saving profile");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create / Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} /><br />
        <input type="text" name="skills" placeholder="Skills (comma separated)" onChange={handleChange} /><br />
        <input type="text" name="github" placeholder="GitHub link" onChange={handleChange} /><br />
        <input type="text" name="projects" placeholder="Projects (comma separated)" onChange={handleChange} /><br />
        <button type="submit">Save</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default ProfileForm;
