import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

const apiUrl = process.env.REACT_APP_API_URL;

export default function AddGroup(props) {
  
  const [groupTitle, setGroupTitle] = useState("");
  const [groupSubTitle, setGroupSubTitle] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      groupTitle,
      groupSubTitle,
      groupDescription,
    };

    console.log("HandleSubmit function called");

    fetch(`${apiUrl}/groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
        setGroupTitle("");
        setGroupSubTitle("");
        setGroupDescription("");
        props.newGroup(groupTitle, groupTitle, groupDescription);
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
            <label htmlFor="groupTitle">Group Title:</label>
            <InputText
              id="groupTitle"
              placeholder="Enter Your Group Title"
              value={groupTitle}
              onChange={(e) => setGroupTitle(e.target.value)}
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="groupSubTitle">Group Sub Title:</label>
            <InputText
              id="groupSubTitle"
              placeholder="Enter Your Group Sub Title"
              value={groupSubTitle}
              onChange={(e) => setGroupSubTitle(e.target.value)}
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="groupDescription">Group Description:</label>
            <InputText
              id="groupDescription"
              placeholder="Enter Your Group Description"
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              required
            />
          </div>
        </form>
      </Dialog>
    </>
  );
}
