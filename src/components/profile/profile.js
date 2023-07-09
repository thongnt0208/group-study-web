import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import "../../styles/profile.scss";
import { Image } from "primereact/image";
import { Button } from "primereact/button";

const apiUrl = process.env.REACT_APP_API_URL;

const ProfilePage = () => {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [currentUser, setCurrentUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(
      decodeToken(localStorage.getItem("token").replace("Bearer ", ""))
    );
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchProfileData();
    }
  }, [currentUser]);

  const fetchProfileData = async () => {
    try {
      const profileId = currentUser._id;
      const response = await fetch(`${apiUrl}/users?profileId=${profileId}`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setProfile(data);
          console.log(data);
        } else {
          console.error("Empty profile data");
        }
      } else {
        console.error("Failed to fetch profile data");
      }
    } catch (error) {
      console.error("Error while fetching profile data:", error);
    }
  };

  const handleDeleteProfile = () => {
    const profileId = currentUser._id;

    fetch(`${apiUrl}/users?profileId=${profileId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: false }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Profile deleted successfully", data);
        localStorage.removeItem("token");
        navigate("/"); // Redirect to logout page
      })
      .catch((error) => {
        console.error("Failed to delete profile", error);
      });
  };

  return (
    <div className="profile">
      <div className="profile-card">
        <Image src="logo192.png" alt="Profile" className="profile-picture" />
        <div className="profile-details">
          <h1>{profile.username}</h1>
          <h3>Email: {profile.email}</h3>
        </div>
        <div className="profile-configuration flex flex-wrap">
          <Link to="/edit-profile">
            <Button
              className="btnEdit"
              label="Edit Profile"
              icon="pi pi-spin pi-cog"
              link
            />
          </Link>
          <Button
            className="btnDelete"
            label="Delete Profile"
            icon="pi pi-spin pi-times-circle"
            onClick={handleDeleteProfile}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
