import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

export default function Group(props) {
   const header = (
      <img
         alt='Card'
         src='https://primefaces.org/cdn/primereact/images/usercard.png'
      />
   );
   const footer = (
      <div className='flex flex-wrap justify-content-end gap-2'>
         <Button label='Save' icon='pi pi-check' />
         <Button
            label='Cancel'
            icon='pi pi-times'
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
                  footer={footer}
                  header={header}
                  className='md:w-25rem surface-300'
               >
                  <p className='m-0'>
                     <h3>Discription about this group:</h3>
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                     Inventore sed consequuntur error repudiandae numquam
                  </p>
               </Card>
            </div>
         </div>
      </div>
   );
}
