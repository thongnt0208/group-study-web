import React, { useState } from 'react';
import Group from '../components/Group';
import { v4 as uuidv4 } from 'uuid';
import AddGroup from '../components/AddGroup';
import EditGroup from '../components/EditGroup';

export default function Groups() {
   const [groups, setGroups] = useState([
      {
         id: 1,
         groupTitle: 'Group0',
         groupSubTitle: 'Sub Title',
      },
      {
         id: 2,
         groupTitle: 'Group2',
         groupSubTitle: 'Sub Title',
      },
      {
         id: 3,
         groupTitle: 'Group3',
         groupSubTitle: 'Sub Title',
      },
      {
         id: 4,
         groupTitle: 'Group4',
         groupSubTitle: 'Sub Title',
      },
   ]);

   function updateGroup(id, newGroupTitle, newGroupSubTitle) {
      const updatedGroups = groups.map((group) => {
         if (id == group.id) {
            return {
               ...group,
               groupTitle: newGroupTitle,
               groupSubTitle: newGroupSubTitle,
            };
         }
         return group;
      });
      setGroups(updatedGroups);
   }

   function newGroup(groupTitle, groupSubTitle) {
      const newGroup = {
         id: uuidv4(),
         groupTitle: groupTitle,
         groupSubTitle: groupSubTitle,
      };
      setGroups([...groups, newGroup]);
   }

   const showGroups = true;
   return (
      <div className='p-d-flex'>
         {showGroups ? (
            <>
               <div className='card flex flex-wrap justify-content-center gap-3'>
                  {groups.map((group) => {
                     const editGroup = (
                        <EditGroup
                           id={group.id}
                           groupTitle={group.groupTitle}
                           groupSubTitle={group.groupSubTitle}
                           updateGroup={updateGroup}
                        />
                     );
                     return (
                        <Group
                           key={group.id}
                           id={group.id}
                           groupTitle={group.groupTitle}
                           groupSubTitle={group.groupSubTitle}
                           editGroup={editGroup}
                        />
                     );
                  })}
               </div>
               <AddGroup newGroup={newGroup} />
            </>
         ) : (
            <p>You cannnot see Groups</p>
         )}
      </div>
   );
}
