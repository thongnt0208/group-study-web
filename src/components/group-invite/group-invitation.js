import React, { useState } from "react";
import '../../styles/group-invite.scss'
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { Editor } from "primereact/editor";
        

const InvitationPage = () =>{

  const items = [
    {
        label: 'File',
        icon: 'pi pi-fw pi-file',
        items: [
            {
                label: 'New',
                icon: 'pi pi-fw pi-plus',
                items: [
                    {
                        label: 'Bookmark',
                        icon: 'pi pi-fw pi-bookmark'
                    },
                    {
                        label: 'Video',
                        icon: 'pi pi-fw pi-video'
                    },

                ]
            },
            {
                label: 'Delete',
                icon: 'pi pi-fw pi-trash'
            },
            {
                separator: true
            },
            {
                label: 'Export',
                icon: 'pi pi-fw pi-external-link'
            }
        ]
    },
    {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
            {
                label: 'Left',
                icon: 'pi pi-fw pi-align-left'
            },
            {
                label: 'Right',
                icon: 'pi pi-fw pi-align-right'
            },
            {
                label: 'Center',
                icon: 'pi pi-fw pi-align-center'
            },
            {
                label: 'Justify',
                icon: 'pi pi-fw pi-align-justify'
            },

        ]
    },
    {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
            {
                label: 'New',
                icon: 'pi pi-fw pi-user-plus',

            },
            {
                label: 'Delete',
                icon: 'pi pi-fw pi-user-minus',

            },
            
        ]
    },
    {
        label: 'Events',
        icon: 'pi pi-fw pi-calendar',
        items: [
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    {
                        label: 'Save',
                        icon: 'pi pi-fw pi-calendar-plus'
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-fw pi-calendar-minus'
                    }
                ]
            },
            {
                label: 'Archive',
                icon: 'pi pi-fw pi-calendar-times',
                items: [
                    {
                        label: 'Remove',
                        icon: 'pi pi-fw pi-calendar-minus'
                    }
                ]
            }
        ]
    },
    {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off'
    }
];

const start = <img alt="logo" src="logo_notext.png" height="40" className="mr-2"></img>;
const [text, setText] = useState('');

return (
    <div className="invitation-page">
      <form className="invitationForm">
  
        <h2>Invitation</h2>

        <span className="input-receiver p-float-label">
            <InputText id="sendTo"/>
            <label htmlFor="sendTo">To: </label>
        </span>

        <span className="input-title p-float-label">
            <InputText id="title" />
            <label htmlFor="title">Title: </label>
        </span>

        {/* <Menubar className="menu-bar" model={items} start={start}  /> */}

        <span className="input-content">
            {/* <InputTextarea placeholder="Content" id="content" rows={15} cols={100} /> */}
            <Editor className="editor-content" value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '320px' }} />
        </span>
        <div className="btnSend">
            <Button type="submit" label="Send" />
        </div>

      </form>


    </div>
    
  );
};

export default InvitationPage;

        



