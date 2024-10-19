import React, { useState, useEffect } from "react";
import "../static/profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    profilePicture: "",
    bio: "",
  });

  useEffect(() => {
    const mockUser = {
      name: "John Doe",
      email: "johndoe@example.com",
      profilePicture: "https://via.placeholder.com/150",
      bio: "This is a sample bio.",
    };
    setUser(mockUser);
  }, []);

  return (
    <div className="profile">
      <div className="profile-picture">
        <img src={user.profilePicture} alt={user.name} />
      </div>
      <div className="profile-info">
        <h1>{user.name}</h1>
        <p>{user.email}</p>
        <p>{user.bio}</p>
        <button>Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
