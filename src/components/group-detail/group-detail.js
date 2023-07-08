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

const GroupDetail = () => {
   const { groupId } = useParams(); // Get the groupId parameter from the URL
   const [ activeTab, setActiveTab ] = useState( 'Member' );

   const items = [
      { label: 'Member', icon: 'pi pi-fw pi-users' },
      { label: 'Discussion', icon: 'pi pi-fw pi-comments' },
   ];

   const profiles = [
      {
         name: 'John Doe',
         email: 'abc1@gmail.com',
      },
      {
         name: 'John Wick',
         email: 'abc2@gmail.com',
      },
   ];

   const discussions = [
      {
         discussionTopic: 'This is a discussion 1',
         discussionContent: 'Discussion content 1',
      },
      {
         discussionTopic: 'This is a discussion 2',
         discussionContent: 'Discussion content 2',
      },

      {
         discussionTopic: 'This is a discussion 3',
         discussionContent: 'Discussion content 3',
      },
      {
         discussionTopic: 'This is a discussion 4',
         discussionContent: 'Discussion content 4',
      },
      {
         discussionTopic: 'This is a discussion 5',
         discussionContent: 'Discussion content 5',
      },
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
         <DataView
            value={discussions}
            itemTemplate={renderDiscussionItem}
            // paginator
            rows={5}
         />
      );
   };

   const renderMemberItem = ( profile ) => {
      return (
         <div className='col-12'>
            {groupId}
            <div className='flex flex-column xl:flex-row xl:align-items-start p-4 gap-4'>
               <img
                  className='w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round'
                  src='logo_notext.png'
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
                           <i className='pi pi-tag'></i>
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
                        {discussion.discussionTopic}
                     </div>
                     <div className='flex align-items-center gap-3'>
                        <span className='flex align-items-center gap-2'>
                           <i className='pi pi-pencil'></i>
                           <span className='font-semibold'>
                              {discussion.discussionContent}
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
      setSelectedDiscussion( null );
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
