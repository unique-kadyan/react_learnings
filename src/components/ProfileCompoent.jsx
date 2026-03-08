import React, { useState } from "react";
import {
  FaUserPlus,
  FaTrash,
  FaUser,
  FaEnvelope,
  FaHashtag,
} from "react-icons/fa";
function ProfileComponent() {
  const [profileData, setProfileData] = useState([]);

  const [userProfiles, setUserProfiles] = useState({
    name: "",
    age: 0,
    email: "",
  });
  const [emailError, setEmailError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [uniqueError, setUniqueError] = useState("");
  const handleRemove = (index) => {
    setProfileData(profileData.filter((_, i) => i !== index));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleAdd = () => {
    if (!userProfiles.age || userProfiles.age < 1) {
      setAgeError("Please enter a valid age.");
      return;
    }
    if (!validateEmail(userProfiles.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    const isDuplicate = profileData.some(
      (profile) =>
        // profile.name === userProfiles.name &&
        // profile.age === userProfiles.age &&
        profile.email === userProfiles.email,
    );
    if (isDuplicate) {
      setUniqueError(
        "User profile already exists. Please enter unique information.",
      );
      return;
    }
    setUniqueError("");
    setEmailError("");
    setAgeError("");
    setProfileData([...profileData, userProfiles]);
    setUserProfiles({ name: "", age: 0, email: "" });
  };
  const handleAgeinput = (e) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) {
      setAgeError("Please enter a valid age.");
      return;
    }
    setAgeError("");
    setUserProfiles({ ...userProfiles, age: value });
  };
  return (
    <div>
      <header className="App-header">
        <div>
          <h1>
            This is the practical use of the react js including components and
            state management with state hooks preserving the older data in
            memory
          </h1>
        </div>
      </header>
      <h2 background="lightgray" font="bold" fontSize="large">
        {" "}
        This is Profile Page
      </h2>
      <p>This is the profile component specially designed for user profiles.</p>
      <label>
        <FaUser /> Name
      </label>
      <input
        type="text"
        placeholder="Name"
        value={userProfiles.name}
        onChange={(e) =>
          setUserProfiles({ ...userProfiles, name: e.target.value })
        }
      />
      <label>
        <FaHashtag /> Age
      </label>
      <input
        type="number"
        placeholder="Age"
        value={userProfiles.age}
        onChange={handleAgeinput}
      />
      {ageError && <span style={{ color: "red" }}>{ageError}</span>}
      <label>
        <FaEnvelope /> Email
      </label>
      <input
        type="email"
        placeholder="Email"
        value={userProfiles.email}
        onChange={(e) => {
          const value = e.target.value;
          setUserProfiles({ ...userProfiles, email: value });
          setEmailError(
            validateEmail(value) ? "" : "Please enter a valid email address.",
          );
        }}
      />
      {emailError && <span style={{ color: "red" }}>{emailError}</span>}
      {uniqueError && <div style={{ color: "red" }}>{uniqueError}</div>}
      <button onClick={handleAdd}>
        <FaUserPlus /> Add Profile
      </button>

      {profileData.length > 0 && (
        <div>
          <h3>Profile Data:</h3>
          <ul style={{ maxHeight: "200px", overflowY: "auto" }}>
            {profileData.map((profile, index) => (
              <li key={index}>
                <FaUser /> <strong>{profile.name}</strong> - <FaHashtag />{" "}
                {profile.age} years old, <FaEnvelope /> {profile.email}
                <button onClick={() => handleRemove(index)}>
                  <FaTrash /> Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProfileComponent;
