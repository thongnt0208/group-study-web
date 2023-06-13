import React from "react";
import '../../styles/profile.scss';
import PropTypes from 'prop-types';

import { InputText } from 'primereact/inputtext';
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { FileUpload } from 'primereact/fileupload';

const EditProfilePage = () => {
    const profile = {
      name: "John Doe",
      email: "danghoanganh36@gmail.com",
    };
  
    return (
      <div className="edit-profile">
        <div className="edit-profile-card">
          <Image
            src="logo192.png"
            alt="Profile"
            className="profile-picture"
          />
          <form className="edit-profile-details">

            <span className="input-new-name p-float-label">
              <InputText className="p-inputtext-lg" placeholder={profile.name} id="new-name"/>
              <label htmlFor="new-name">New name: </label>
            </span>

            <span className="input-new-email p-float-label">
              <InputText className="p-inputtext-lg" placeholder={profile.email} id="new-email"/>
              <label htmlFor="new-email">New email: </label>
            </span>

            <span className="input-new-avatar">
              <FileUpload className="uploadAva" name="demo[]" url={'/api/upload'} multiple accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0">Drag and drop files to here to upload new avatar file.</p>} />
            </span>

          </form>
          <div className="btn-save">
            <Button className="btnSave" label="Save" icon="pi pi-spin pi-sync" />
          </div>  
        </div>
      </div>
    );
  };
  
  EditProfilePage.propTypes = {};

  EditProfilePage.defaultProps = {};

  export default EditProfilePage;

  
