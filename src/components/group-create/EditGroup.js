import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

export default function EditGroup(props) {
   const [groupTitle, setGroupTitle] = useState(props.groupTitle);
   const [groupSubTitle, setGroupSubTitle] = useState(props.groupSubTitle);
   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   return (
      <>
         <button onClick={handleShow} className=''>
            Update
         </button>

         <Modal
            show={show}
            onHide={handleClose}
            backdrop='static'
            keyboard={false}
         >
            <Modal.Header closeButton>
               <Modal.Title>Update Group</Modal.Title>
            </Modal.Header>

            <Modal.Body>
               <form
                  onSubmit={(e) => {
                     handleClose();
                     e.preventDefault();
                     props.updateEmployee(props.id, groupTitle, groupSubTitle);
                  }}
                  id='editmodal'
                  className=''
               >
                  <div className=''>
                     <div className='' for='groupTitle'>
                        <label>Group Title</label>
                     </div>
                     <div className=''>
                        <input
                           className=''
                           id='groupTitle'
                           type='text'
                           value={groupTitle}
                           onChange={(e) => {
                              setGroupTitle(e.target.value);
                           }}
                        />
                     </div>
                  </div>
                  <div className=''>
                     <div className='' for='groupTitle'>
                        <label>Group Sub Title</label>
                     </div>
                     <div className=''>
                        <input
                           className=''
                           id='groupSubTitle'
                           type='text'
                           value={groupSubTitle}
                           onChange={(e) => {
                              setGroupSubTitle(e.target.value);
                           }}
                        />
                     </div>
                  </div>
               </form>
            </Modal.Body>
            <Modal.Footer>
               <button className='' onClick={handleClose}>
                  Close
               </button>
               <button className='' form='editmodal'>
                  Update
               </button>
            </Modal.Footer>
         </Modal>
      </>
   );
}
