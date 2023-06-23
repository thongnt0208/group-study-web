import React, { useState, useEffect } from "react";
import '../../styles/profile.scss';
import PropTypes from 'prop-types';

import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";



const ProfilePage = () => {
  const [profile, setProfile] = useState({name: "", email: ""});

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3000/users");
  //       const data = await response.json();
  //       if (Array.isArray(data) && data.length > 0) {
  //         setProfile(data[0]);
  //       }
  //     } catch (error) {
  //       console.log("Error fetching:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  

  return (
    <div className="profile">
      <div className="profile-card">
        <Image
          src="logo192.png"
          alt="Profile"
          className="profile-picture"
        />
        <div className="profile-details">
          <h1>{profile.name}</h1>
          <h3>Email: {profile.username}@gmail.com</h3>
        </div>
        <div className="profile-configuration flex flex-wrap">
          <Link to="/edit-profile">
            <Button className="btnEdit" label="Edit Profile" icon="pi pi-spin pi-cog" link/>
          </Link>
          <Button className="btnDelete" label="Delete Profile" icon="pi pi-spin pi-times-circle" />
        </div>
      </div>
    </div>
  );
};


ProfilePage.propTypes = {};

ProfilePage.defaultProps = {};

export default ProfilePage;

        