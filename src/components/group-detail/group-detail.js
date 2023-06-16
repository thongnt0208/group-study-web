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

const GroupDetail = () => {
   const [activeTab, setActiveTab] = useState('Member');

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

   const renderMemberItem = (profile) => {
      return (
         <div className='col-12'>
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
      return (
         <div className='col-12'>
            <div className='flex flex-column xl:flex-row xl:align-items-start p-4 gap-4'>
               <div className='flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4'>
                  <div className='flex flex-column align-items-center sm:align-items-start gap-3'>
                     <div className='text-2xl font-bold text-900'>
                        {discussion.discussionTopic}
                     </div>
                     {/* <Rating value={product.rating} readOnly cancel={false}></Rating> */}
                     <div className='flex align-items-center gap-3'>
                        <span className='flex align-items-center gap-2'>
                           <i className='pi pi-pencil'></i>
                           <span className='font-semibold'>
                              {discussion.discussionContent}
                           </span>
                        </span>
                        {/* <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag> */}
                     </div>
                  </div>
                  <div className='flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2'>
                     <span className='text-2xl font-semibold'>
                        <i
                           className='pi pi-ellipsis-v'
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

   return (
      <div className='container'>
         <div className='group-detail'>
            <TabMenu
               model={items}
               activeItem={activeTab}
               onTabChange={handleTabChange}
            />
            {activeTab === 'Member' ? renderMembers() : renderDiscussions()}
         </div>
         <div className='chat-form'>
            <Chat></Chat>
         </div>
      </div>
   );
};

GroupDetail.propTypes = {};

GroupDetail.defaultProps = {};

export default GroupDetail;

// import React, { useState, useEffect } from 'react';
// import { ProductService } from './service/ProductService';
// import { Button } from 'primereact/button';
// import { DataView } from 'primereact/dataview';
// import { Rating } from 'primereact/rating';
// import { Tag } from 'primereact/tag';

// export default function PaginationDemo() {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         ProductService.getProducts().then((data) => setProducts(data));
//     }, []);

//     const getSeverity = (product) => {
//         switch (product.inventoryStatus) {
//             case 'INSTOCK':
//                 return 'success';

//             case 'LOWSTOCK':
//                 return 'warning';

//             case 'OUTOFSTOCK':
//                 return 'danger';

//             default:
//                 return null;
//         }
//     };

//     const itemTemplate = (product) => {
//         return (
//             <div className="col-12">
//                 <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
//                     <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.name} />
//                     <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
//                         <div className="flex flex-column align-items-center sm:align-items-start gap-3">
//                             <div className="text-2xl font-bold text-900">{product.name}</div>
//                             <Rating value={product.rating} readOnly cancel={false}></Rating>
//                             <div className="flex align-items-center gap-3">
//                                 <span className="flex align-items-center gap-2">
//                                     <i className="pi pi-tag"></i>
//                                     <span className="font-semibold">{product.category}</span>
//                                 </span>
//                                 <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
//                             </div>
//                         </div>
//                         <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
//                             <span className="text-2xl font-semibold">${product.price}</span>
//                             <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     };

//     return (
//         <div className="card">
//             <DataView value={products} itemTemplate={itemTemplate} paginator rows={5} />
//         </div>
//     )
// }
