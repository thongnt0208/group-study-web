import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

export default function EditGroup(props) {
  const [groupTitle, setGroupTitle] = useState(props.groupTitle);
  const [groupSubTitle, setGroupSubTitle] = useState(props.groupSubTitle);
  const [visible, setVisible] = useState(false);

  const hideDialog = () => {
    setVisible(false);
  };

  const showDialog = () => {
    setVisible(true);
  };

  const handleUpdate = (e) => {
    hideDialog();
    e.preventDefault();
    props.updateEmployee(props.id, groupTitle, groupSubTitle);
  };

  return (
    <>
      <Button onClick={showDialog} className="">
        Update
      </Button>

      <Dialog
        visible={visible}
        onHide={hideDialog}
        modal
        style={{ width: '30vw' }}
        header="Update Group"
        footer={
          <div>
            <Button label="Close" className="" onClick={hideDialog} />
            <Button
              label="Update"
              className=""
              onClick={handleUpdate}
              form="editmodal"
            />
          </div>
        }
      >
        <form onSubmit={handleUpdate} id="editmodal" className="">
          <div className="">
            <div className="" htmlFor="groupTitle">
              <label>Group Title</label>
            </div>
            <div className="">
              <input
                className=""
                id="groupTitle"
                type="text"
                value={groupTitle}
                onChange={(e) => setGroupTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="">
            <div className="" htmlFor="groupSubTitle">
              <label>Group Sub Title</label>
            </div>
            <div className="">
              <input
                className=""
                id="groupSubTitle"
                type="text"
                value={groupSubTitle}
                onChange={(e) => setGroupSubTitle(e.target.value)}
              />
            </div>
          </div>
        </form>
      </Dialog>
    </>
  );
}
