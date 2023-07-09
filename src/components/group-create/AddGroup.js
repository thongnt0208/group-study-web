import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

const apiUrl = process.env.REACT_APP_API_URL;

export default function AddGroup(props) {
  const [name, setName] = useState("");
  const [coverLink, setCoverLink] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentUser = localStorage.getItem("currentUser");
    console.log("Current user: ", currentUser);
    const admin = JSON.parse(currentUser)._id;

    const formData = {
      name,
      admin,
      cover_link: coverLink,
      members: [admin],
      status: true,
    };

    const token = localStorage.getItem("token");
    console.log("HandleSubmit function called");

    fetch(`${apiUrl}/groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to post data");
      })
      .then((data) => {
        console.log("Data posted successfully:", data);
        handleClose();
        setName("");
        setCoverLink("");
        props.newGroup(name, admin);
        window.location.reload(); // Refresh the page
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Button
        severity="success"
        onClick={handleShow}
        className="p-button-secondary mb-3 md:mb-0"
      >
        +Add Group
      </Button>

      <Dialog
        visible={show}
        onHide={handleClose}
        header="Add Group"
        modal
        className="p-fluid"
        footer={
          <>
            <Button
              label="Close"
              className="p-button-text"
              onClick={handleClose}
            />
            <Button
              label="Add"
              className="p-button-success"
              onClick={handleSubmit}
            />
          </>
        }
      >
        <form id="editmodal" className="">
          <div className="p-field">
            <label htmlFor="groupTitle">Group Name:</label>
            <InputText
              id="groupTitle"
              placeholder="Enter Your Group Title"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="p-field">
            <label htmlFor="coverLink">Cover Link:</label>
            <InputText
              id="coverLink"
              placeholder="Enter Your Cover Link"
              value={coverLink}
              onChange={(e) => setCoverLink(e.target.value)}
              required
            />
          </div>
        </form>
      </Dialog>
    </>
  );
}
