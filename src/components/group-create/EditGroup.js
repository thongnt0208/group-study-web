import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

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
         <Button onClick={showDialog} className='p-button-success'>
            Update
         </Button>

         <Dialog
            visible={visible}
            onHide={hideDialog}
            modal
            style={{ width: '30vw' }}
            header='Update Group'
            className='p-fluid'
            footer={
               <div>
                  <Button
                     label='Close'
                     className='p-button-secondary'
                     onClick={hideDialog}
                  />
                  <Button
                     label='Update'
                     className='p-button-primary'
                     onClick={handleUpdate}
                     form='editmodal'
                  />
               </div>
            }
         >
            <form onSubmit={handleUpdate} id='editmodal'>
               <div className='p-field'>
                  <label htmlFor='groupTitle'>Group Title</label>
                  <InputText
                     id='groupTitle'
                     type='text'
                     value={groupTitle}
                     placeholder='Update Your Group Title'
                     onChange={(e) => setGroupTitle(e.target.value)}
                  />
               </div>
               <div className='p-field'>
                  <label htmlFor='groupSubTitle'>Group Cover Link</label>
                  <InputText
                     id='groupSubTitle'
                     type='text'
                     value={groupSubTitle}
                     placeholder='Update Your Group Title'
                     onChange={(e) => setGroupSubTitle(e.target.value)}
                  />
               </div>
            </form>
         </Dialog>
      </>
   );
}
