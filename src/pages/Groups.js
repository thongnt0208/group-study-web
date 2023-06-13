import React, { useState } from 'react';
import Group from '../components/group-create/Group';
import { v4 as uuidv4 } from 'uuid';
import AddGroup from '../components/group-create/AddGroup';
import EditGroup from '../components/group-create/EditGroup';

export default function Groups() {
   const [groups, setGroups] = useState([
      {
         id: 1,
         groupTitle: 'Group0',
         groupSubTitle: 'Sub Title',
         groupDescription:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam',
      },
      {
         id: 2,
         groupTitle: 'Group2',
         groupSubTitle: 'Sub Title',
         groupDescription:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam',
      },
      {
         id: 3,
         groupTitle: 'Group3',
         groupSubTitle: 'Sub Title',
         groupDescription:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam',
      },
      {
         id: 4,
         groupTitle: 'Group4',
         groupSubTitle: 'Sub Title',
         groupDescription:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam',
      },
   ]);

   function updateGroup(
      id,
      newGroupTitle,
      newGroupSubTitle,
      newGroupDescription
   ) {
      const updatedGroups = groups.map((group) => {
         if (id == group.id) {
            return {
               ...group,
               groupTitle: newGroupTitle,
               groupSubTitle: newGroupSubTitle,
               groupDescription: newGroupDescription,
            };
         }
         return group;
      });
      setGroups(updatedGroups);
   }

   function newGroup(groupTitle, groupSubTitle, groupDescription) {
      const newGroup = {
         id: uuidv4(),
         groupTitle: groupTitle,
         groupSubTitle: groupSubTitle,
         groupDescription: groupDescription,
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
                           groupDescription={group.groupDescription}
                           updateGroup={updateGroup}
                        />
                     );
                     return (
                        <Group
                           key={group.id}
                           id={group.id}
                           groupTitle={group.groupTitle}
                           groupSubTitle={group.groupSubTitle}
                           groupDescription={group.groupDescription}
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
