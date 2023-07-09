import React, { useState, useEffect } from 'react';
import Group from '../components/group-create/Group';
import { v4 as uuidv4 } from 'uuid';
import AddGroup from '../components/group-create/AddGroup';
import EditGroup from '../components/group-create/EditGroup';
import axios from 'axios';
import { isExpired, decodeToken } from "react-jwt";



export default function Groups() {
   const apiUrl = process.env.REACT_APP_API_URL;
   const [groups, setGroups] = useState([]);
   const [currentUser, setCurrentUser] = useState(null);
   const [showGroups, setShowGroups] = useState(false);

   //Log out the current user object everywhen the user changes
   useEffect(() => {
      console.log('Current user ne: ', currentUser);
   }, [currentUser]);

   // Get groups list from API
   let getGroupsList = () => {
      const token = 'Bearer ' + localStorage.getItem('token');
      axios
         .get(`${apiUrl}/groups`, {
            headers: {
               'Authorization': token
            }
         })
         .then((groups) => {
            console.log(groups.data);
            setGroups(groups.data);

            // Decode JWT token
            console.log(token.replace('Bearer ', ''));
            const decodedToken = decodeToken(token.replace('Bearer ', ''));
            setCurrentUser(decodedToken);

            setShowGroups(true);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   useEffect(() => {
      getGroupsList(); // Call the function when the component mounts
   }, []);

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
                           key={group._id}
                           id={group._id}
                           groupTitle={group.name}
                           groupDescription={group.groupDescription}
                           adminId={group.admin}
                           createdAt={group.createdAt}
                           coverLink={group.cover_link}
                           editGroup={editGroup}
                        />
                     );
                  })}
               </div>
               <AddGroup newGroup={newGroup} />
            </>
         ) : (
            <p>You can not see Groups, please login again</p>
         )}
      </div>
   );
}
