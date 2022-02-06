import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './SidebarChat.css'
import axios from 'axios'
import {Link} from 'react-router-dom'

const SidebarChat = ({addNewChat,name,id}) => {
    const [seed, setseed] = useState("");
    useEffect(() => {
      setseed(Math.floor(Math.random()*7000))
    }, []);
    const createChat = async () => {
        const roomName = prompt("Pease enter name for group");
        if (roomName)
        {
            try {
                await axios.post("http://localhost:5000/group/create", {
                    groupName:roomName
                })
            }
            catch(err) {
                console.log(err);
            }


       }
    }

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
        <div className='sidebarChat'>
            <Avatar
                src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
            />
            <div className='sidebarChat__info'>
                <h2>{name}</h2>

            </div>
            </div>
            </Link>
    ) : (
            <div className='sidebarChat' onClick={createChat}><h2>Add new chat</h2></div>
  )
};

export default SidebarChat;
