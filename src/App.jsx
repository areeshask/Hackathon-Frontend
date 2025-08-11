import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import ProfileForm from "./components/ProfileForm";
import ProfilePreview from "./components/ProfilePreview";

function App() {
  return (
    <AuthProvider>
      <Router>
        <nav style={{ padding: "10px", background: "#eee" }}>
          <Link to="/register" style={{ marginRight: "10px" }}>Register</Link>
          <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
          <Link to="/profile" style={{ marginRight: "10px" }}>Edit Profile</Link>
          <Link to="/preview">Preview</Link>
        </nav>

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfileForm />} />
          <Route path="/preview" element={<ProfilePreview />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

