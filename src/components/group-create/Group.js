import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditGroup from './EditGroup';

export default function Group(props) {
   const navigate = useNavigate();
   const navToDetail = () => {
      navigate(`/group-detail/${props.id}`);
   };
   const header = (
      <img
         alt='Card'
         src={
            props.coverLink == ''
               ? 'https://primefaces.org/cdn/primereact/images/usercard.png'
               : props.coverLink
         }
         // src={'https://primefaces.org/cdn/primereact/images/usercard.png'}
         style={{
            width: '100%',
            height: '225px',
            'border-radius': '6px 6px 0 0',
         }}
      />
   );
   const footer = (
      <div className='flex flex-wrap justify-content-end gap-2'>
         <Button
            label='View Detail'
            id='btnGroupDetail'
            onClick={navToDetail}
         />
         {props.currentUserId === props.adminId ? (
            <span>
               {props.editGroup}

               <Button
                  id='btnGroupDelete'
                  label='Delete'
                  className='p-button-outlined p-button-secondary ml-2'
               />
            </span>
         ) : (
            <></>
         )}
      </div>
   );

   const [admin, setAdmin] = useState(['']);

   const apiUrl = process.env.REACT_APP_API_URL;

   let findAdmin = () => {
      let adminId = props.adminId;
      const token = 'Bearer ' + localStorage.getItem('token');
      axios
         .get(`${apiUrl}/users`, {
            headers: {
               'Authorization': token,
            },
            params: {
               'profileId': adminId,
            },
         })
         .then((admin) => {
            setAdmin(admin.data);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   useEffect(() => {
      findAdmin();
      console.log('this group admin: ', admin);
   }, []);

   const formattedCreatedAt = new Date(admin.createdAt).toLocaleDateString(
      'en-GB',
      {
         day: '2-digit',
         month: '2-digit',
         year: 'numeric',
      }
   );

   const cardTitleStyle = {
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
   };

   return (
      <div className='flex flex-column xl:flex-row xl:align-items-start p-2 gap-4'>
         <div className='card flex justify-content-center'>
            <div
               className='p-col-12 p-md-4 p-lg-3 p-grid p-nogutter'
               responsiveLayout='stack'
               layout='vertical'
               rows={4}
               columns={1}
               gap='2rem'
            >
               <Card
                  // title={props.groupTitle}
                  title={<div style={cardTitleStyle}>{props.groupTitle}</div>}
                  footer={footer}
                  header={header}
                  className='md:w-28rem surface-300'
                  style={{
                     minHeight: '32rem',
                     height: '100%',
                  }}
               >
                  <p className='m-0'>
                     {props.groupDescription}
                     Created by: {admin.name}
                  </p>
                  <p className='m-0'>at {formattedCreatedAt}</p>
               </Card>
            </div>
         </div>
      </div>
   );
}
