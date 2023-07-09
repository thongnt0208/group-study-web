import React, { useState, useEffect } from "react";
import "../../styles/profile.scss";

import { InputText } from "primereact/inputtext";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Link } from "react-router-dom";
import { decodeToken } from "react-jwt";

const apiUrl = process.env.REACT_APP_API_URL;

const EditProfilePage = () => {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = decodeToken(token);
    setCurrentUser(decodedToken);
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchProfile();
    }
  }, [currentUser]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${apiUrl}/users?profileId=${currentUser._id}`);
      if (response.ok) {
        const data = await response.json();
        if (Object.keys(data).length !== 0) {
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

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleFileUpload = (event) => {
    const file = event.files[0];
    setAvatarFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform API request to update the profile using the new data and avatar file
    // Example code: You can modify this based on your backend implementation
    const formData = new FormData();
    formData.append("profileId", currentUser._id);
    formData.append("name", newName || profile.name);
    formData.append("email", newEmail || profile.email);
    formData.append("avatarLink", avatarFile);

    fetch(`${apiUrl}/users/edit-profile?profileId=${currentUser._id}`, {
      method: "PATCH",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Profile updated successfully", data);
        // Handle success case
      })
      .catch((error) => {
        console.error("Failed to update profile", error);
        // Handle error case
      });
  };

  return (
    <div className="edit-profile">
      <div className="edit-profile-card">
        <Image src="logo192.png" alt="Profile" className="profile-picture" />
        <form
          className="edit-profile-details"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <span className="input-new-name p-float-label">
            <InputText
              className="p-inputtext-lg"
              value={newName}
              onChange={handleNameChange}
              id="new-name"
              placeholder={profile.name}
            />
            <label htmlFor="new-name">New name:</label>
          </span>

          <span className="input-new-email p-float-label">
            <InputText
              className="p-inputtext-lg"
              value={newEmail}
              onChange={handleEmailChange}
              id="new-email"
              placeholder={profile.email}
            />
            <label htmlFor="new-email">New email:</label>
          </span>

          <span className="input-new-avatar">
            <FileUpload
              className="uploadAva"
              name="avatar"
              url={"/api/upload-avatar"}
              mode="basic"
              accept="image/*"
              maxFileSize={1000000}
              chooseLabel="Select Avatar"
              uploadLabel="Upload"
              cancelLabel="Cancel"
              emptyTemplate={
                <p className="m-0">
                  Drag and drop files here to upload a new avatar.
                </p>
              }
              onUpload={handleFileUpload}
            />
          </span>
          <Link to="/profile">
            <Button
              className="btnSave"
              label="Save"
              icon="pi pi-spin pi-sync"
              type="submit"
              link
            />
          </Link>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
