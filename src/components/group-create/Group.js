import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

export default function Group(props) {
   const navigate = useNavigate();
   const navToDetail = () => {
      navigate(`/group-detail/${props.id}`)
   }
   const header = (
      <img
         alt='Card'
         src='https://primefaces.org/cdn/primereact/images/usercard.png'
      />
   );
   const footer = (
      <div className='flex flex-wrap justify-content-end gap-2'>
         <Button label='View Detail' id='btnGroupDetail' onClick={navToDetail}/>
         <Button
            id='btnGroupDelete'
            label='Delete'
            className='p-button-outlined p-button-secondary'
         />
      </div>
   );

   return (
      <div className='flex flex-column xl:flex-row xl:align-items-start p-4 gap-4'>
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
                  title={props.groupTitle}
                  subTitle={props.groupSubTitle}
                  description={props.groupDescription}
                  footer={footer}
                  header={header}
                  className='md:w-25rem surface-300'
               >
                  <p className='m-0'>
                     <h3>Description about this group:</h3>
                     {props.groupDescription}
                  </p>
               </Card>
            </div>
         </div>
      </div>
   );
}
