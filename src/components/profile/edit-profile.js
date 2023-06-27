import React, { useState, useEffect } from "react";
import "../../styles/profile.scss";
import PropTypes from "prop-types";

import { InputText } from "primereact/inputtext";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";

const EditProfilePage = () => {

  const [profile, setProfile] = useState({name: "", email: ""});

  useEffect(() => {
    fetchProfileData();
  }, [])

  const fetchProfileData = async () => {
    try {
      const profileId = "6496bae0c48fe87ef3bcbc3d";
      const response = await fetch(`http://localhost:3000/users/view-profile?profileId=${profileId}`); // Change the API endpoint URL accordingly
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        console.log(data);
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
    formData.append("name", newName);
    formData.append("email", newEmail);
    formData.append("avatar", avatarFile);

    fetch("http://localhost:3000/users/edit-profile", {
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
    // <div className="edit-profile">
    //   <div className="edit-profile-card">
    //     <Image src="logo192.png" alt="Profile" className="profile-picture" />
    //     <form className="edit-profile-details">
    //       <span className="input-new-name p-float-label">
    //         <InputText
    //           className="p-inputtext-lg"
    //           placeholder={profile.name}
    //           id="new-name"
    //         />
    //         <label htmlFor="new-name">New name: </label>
    //       </span>

    //       <span className="input-new-email p-float-label">
    //         <InputText
    //           className="p-inputtext-lg"
    //           placeholder={profile.email}
    //           id="new-email"
    //         />
    //         <label htmlFor="new-email">New email: </label>
    //       </span>

    //       <span className="input-new-avatar">
    //         <FileUpload
    //           className="uploadAva"
    //           name="demo[]"
    //           url={"/api/upload"}
    //           multiple
    //           accept="image/*"
    //           maxFileSize={1000000}
    //           emptyTemplate={
    //             <p className="m-0">
    //               Drag and drop files to here to upload new avatar file.
    //             </p>
    //           }
    //         />
    //       </span>
    //     </form>
    //     <div className="btn-save">
    //       <Button className="btnSave" label="Save" icon="pi pi-spin pi-sync" />
    //     </div>
    //   </div>
    // </div>

    <div className="edit-profile">
      <div className="edit-profile-card">
        <Image
          src="logo192.png"
          alt="Profile"
          className="profile-picture"
        />
        <form className="edit-profile-details" onSubmit={handleSubmit}>
          <span className="input-new-name p-float-label">
            <InputText
              className="p-inputtext-lg"
              value={newName}
              onChange={handleNameChange}
              id="new-name"
            />
            <label htmlFor="new-name">New name:</label>
          </span>

          <span className="input-new-email p-float-label">
            <InputText
              className="p-inputtext-lg"
              value={newEmail}
              onChange={handleEmailChange}
              id="new-email"
            />
            <label htmlFor="new-email">New email:</label>
          </span>

          <span className="input-new-avatar">
            <FileUpload
              className="uploadAva"
              name="avatar"
              url={'/api/upload-avatar'}
              mode="basic"
              accept="image/*"
              maxFileSize={1000000}
              chooseLabel="Select Avatar"
              uploadLabel="Upload"
              cancelLabel="Cancel"
              emptyTemplate={<p className="m-0">Drag and drop files here to upload a new avatar.</p>}
              onUpload={handleFileUpload}
            />
          </span>
          <Button className="btnSave" label="Save" icon="pi pi-spin pi-sync" type="submit" />
        </form>
      </div>
    </div>
  );
};

EditProfilePage.propTypes = {};

EditProfilePage.defaultProps = {};

export default EditProfilePage;
