import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ProfilePreview = () => {
  const { token } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile", err);
      }
    };
    fetchProfile();
  }, [token]);

  if (!profile) return <p>No profile found</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{profile.name}</h2>
      <p>Skills: {profile.skills.join(", ")}</p>
      <p>GitHub: <a href={profile.github} target="_blank" rel="noreferrer">{profile.github}</a></p>
      <h3>Projects:</h3>
      <ul>
        {profile.projects.map((p, i) => (
          <li key={i}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePreview;
