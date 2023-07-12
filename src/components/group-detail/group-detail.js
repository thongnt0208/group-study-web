import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/group-detail.scss';
import 'primeflex/primeflex.css';
import Chat from '../chat/chat';
import { TabMenu } from 'primereact/tabmenu';
import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import DiscussionDetail from '../discussion-detail/discussion-detail';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { decodeToken } from 'react-jwt';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

const GroupDetail = () => {
   const { groupId } = useParams(); // Get the groupId parameter from the URL
   const [activeTab, setActiveTab] = useState('Member');
   const apiUrl = process.env.REACT_APP_API_URL;
   const [currentUser, setCurrentUser] = useState(null);

   const [showCreateDiscussionDialog, setShowCreateDiscussionDialog] =
      useState(false);
   const [newDiscussion, setNewDiscussion] = useState({
      discussionContent: '',
      discussionDocument: '',
      discussionImage: '',
   });

   const handleCreateDiscussion = () => {
      setShowCreateDiscussionDialog(true);
   };

   const handleSaveDiscussion = () => {
      const discussionsCopy = [...discussions];
      discussionsCopy.push(newDiscussion);
      setDiscussions(discussionsCopy); // Update discussions state
      setNewDiscussion({
         discussionContent: '',
         discussionDocument: '',
         discussionImage: '',
      });
      setShowCreateDiscussionDialog(false);
   };

   const handleCancelDiscussion = () => {
      setNewDiscussion({
         discussionContent: '',
         discussionDocument: '',
         discussionImage: '',
      });
      setShowCreateDiscussionDialog(false);
   };

   const [profiles, setProfiles] = useState([]);
   const [discussions, setDiscussions] = useState([]);
   const getGroupDetail = () => {
      const token = 'Bearer ' + localStorage.getItem('token');
      axios
         .get(`${apiUrl}/groups`, {
            headers: {
               'Authorization': token,
            },
            params: {
               'groupId': groupId,
            },
         })
         .then((group) => {
            console.log('GROUP DETAIL: ', group.data);

            getUsersInformation(group.data);
            getDiscussionInformation(group.data);

            // Decode JWT token
            console.log(token.replace('Bearer ', ''));
            const decodedToken = decodeToken(token.replace('Bearer ', ''));
            setCurrentUser(decodedToken);

            //check if current user joined this group?
            // getCurrentUser();
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const getUsersInformation = async (group) => {
      if (group != null) {
         const token = 'Bearer ' + localStorage.getItem('token');
         const promises = group.members.map((memberId) => {
            return axios
               .get(`${apiUrl}/users`, {
                  headers: {
                     Authorization: token,
                  },
                  params: {
                     profileId: memberId,
                  },
               })
               .then((response) => {
                  return response.data; // Return the user data from the Promise
               })
               .catch((err) => {
                  console.log(err);
                  return null; // Return null if there's an error
               });
         });

         const data = await Promise.all(promises);

         // Filter out any null values and update the profiles state
         const filteredData = data.filter((item) => item !== null);
         setProfiles(filteredData);
      }
   };

   const getDiscussionInformation = async (group) => {
      if (group != null) {
         const token = 'Bearer ' + localStorage.getItem('token');
         const promises = group.discussions.map((discussionId) => {
            return axios
               .get(`${apiUrl}/discussions/${discussionId}`, {
                  headers: {
                     Authorization: token,
                  },
               })
               .then((response) => {
                  return response.data; // Return the user data from the Promise
               })
               .catch((err) => {
                  console.log(err);
                  return null; // Return null if there's an error
               });
         });

         const data = await Promise.all(promises);

         // Filter out any null values and update the profiles state
         const filteredData = data.filter((item) => item !== null);
         setDiscussions(filteredData);
      }
   };

   useEffect(() => {
      getGroupDetail();
   }, []);

   const items = [
      { label: 'Member', icon: 'pi pi-fw pi-users' },
      { label: 'Discussion', icon: 'pi pi-fw pi-comments' },
   ];

   const handleTabChange = (event) => {
      setActiveTab(event.value.label);
   };

   const renderMembers = () => {
      return (
         <DataView
            value={profiles}
            itemTemplate={renderMemberItem}
            // paginator
            rows={5}
         />
      );
   };

   const [selectedDiscussion, setSelectedDiscussion] = useState(null);

   const renderDiscussions = () => {
      return (
         <React.Fragment>
            <DataView
               value={discussions}
               itemTemplate={renderDiscussionItem}
               // paginator
               rows={5}
            />
            <div className='create-discussion'>
               <Button
                  label='Create Discussion'
                  icon='pi pi-plus'
                  onClick={handleCreateDiscussion}
                  className='p-button-raised p-button-success'
               />
            </div>
            {renderCreateDiscussionDialog()}
         </React.Fragment>
      );
   };

   const renderCreateDiscussionDialog = () => {
      return (
         <Dialog
            header='Create Discussion'
            visible={showCreateDiscussionDialog}
            onHide={handleCancelDiscussion}
            modal
            style={{ width: '30vw' }}
            footer={
               <div>
                  <Button
                     label='Cancel'
                     className='p-button-text'
                     onClick={handleCancelDiscussion}
                  />
                  <Button
                     label='Save'
                     className='p-button-success'
                     onClick={handleSaveDiscussion}
                  />
               </div>
            }
         >
            <div className='p-fluid'>
               <div className='p-field'>
                  <label htmlFor='discussionTopic'>Discussion Content</label>
                  <InputText
                     id='discussionContent'
                     type='text'
                     value={newDiscussion.discussionContent}
                     onChange={(e) =>
                        setNewDiscussion({
                           ...newDiscussion,
                           discussionContent: e.target.value,
                        })
                     }
                  />
               </div>
               <div className='p-field'>
                  <label htmlFor='discussionContent'>Discussion Document</label>
                  <InputText
                     id='discussionDocument'
                     type='text'
                     value={newDiscussion.discussionDocument}
                     onChange={(e) =>
                        setNewDiscussion({
                           ...newDiscussion,
                           discussionDocument: e.target.value,
                        })
                     }
                  />
               </div>
               <div className='p-field'>
                  <label htmlFor='discussionContent'>Discussion Image</label>
                  <InputText
                     id='discussionImage'
                     type='text'
                     value={newDiscussion.discussionImage}
                     onChange={(e) =>
                        setNewDiscussion({
                           ...newDiscussion,
                           discussionImage: e.target.value,
                        })
                     }
                  />
               </div>
            </div>
         </Dialog>
      );
   };

   const renderMemberItem = (profile) => {
      return (
         <div className='col-12'>
            <div className='flex flex-column xl:flex-row xl:align-items-start p-4 gap-4'>
               <img
                  className='w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round'
                  src={profile.avatarLink}
                  alt={profile.name}
               />
               <div className='flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4'>
                  <div className='flex flex-column align-items-center sm:align-items-start gap-3'>
                     <div className='text-2xl font-bold text-900'>
                        {profile.name}
                     </div>
                     {/* <Rating value={product.rating} readOnly cancel={false}></Rating> */}
                     <div className='flex align-items-center gap-3'>
                        <span className='flex align-items-center gap-2'>
                           {/* <i className='pi pi-tag'></i> */}
                           <span className='font-semibold'>
                              {profile.email}
                           </span>
                        </span>
                        {/* <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag> */}
                     </div>
                  </div>
                  <div className='flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2'>
                     <span className='text-2xl font-semibold'>
                        <i
                           className='pi pi-user'
                           style={{ fontSize: '2.5rem' }}
                        ></i>
                     </span>
                     {/* <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button> */}
                  </div>
               </div>
            </div>
            {/* <div className='text-2 font-bold text-900'>
               Member Id: {groupId}
            </div> */}
         </div>
      );
   };

   const renderDiscussionItem = (discussion) => {
      const handleDiscussionClick = () => {
         setSelectedDiscussion(discussion);
      };

      return (
         <div className='col-12' onClick={handleDiscussionClick}>
            <div className='flex flex-column xl:flex-row xl:align-items-start p-4 gap-4 shadow-5 cursor-pointer transition-delay-200 transition-colors transition-duration-300 hover:surface-300 hover:text-gray-900'>
               <div className='flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4'>
                  <div className='flex flex-column align-items-center sm:align-items-start gap-3'>
                     <div className='text-2xl font-bold text-900'>
                        {discussion.content}
                     </div>
                     <div className='flex align-items-center gap-3'>
                        <span className='flex align-items-center gap-2'>
                           <i className='pi pi-pencil'></i>
                           <span className='font-semibold'>
                              {discussion.document}
                           </span>
                        </span>
                     </div>
                  </div>
                  <div className='flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2'>
                     <span className='text-2xl font-semibold'>
                        <i
                           className='pi pi-ellipsis-v'
                           style={{ fontSize: '2.5rem' }}
                        ></i>
                     </span>
                  </div>
               </div>
            </div>
         </div>
      );
   };

   const handleGoBack = () => {
      setSelectedDiscussion(null);
   };
   return (
      <div className='container'>
         <div className='group-detail'>
            <TabMenu
               model={items}
               activeItem={activeTab}
               onTabChange={handleTabChange}
            />
            {activeTab === 'Member' ? (
               renderMembers()
            ) : (
               <React.Fragment>
                  {selectedDiscussion ? (
                     <DiscussionDetail
                        discussion={selectedDiscussion}
                        onGoBack={handleGoBack}
                     />
                  ) : (
                     renderDiscussions()
                  )}
               </React.Fragment>
            )}
         </div>
         <div className='chat-form'>
            <Chat groupId={groupId}></Chat>
         </div>
      </div>
   );
};

GroupDetail.propTypes = {};

GroupDetail.defaultProps = {};

export default GroupDetail;
