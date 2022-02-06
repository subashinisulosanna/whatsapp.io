import { Avatar, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useStateValue } from '../ContextApi/StateProvider';
import './Sidebar.css';
import { Chat, DonutLarge, MoreVert, SearchOutlined } from '@mui/icons-material'
import SidebarChat from '../SidebarChat/SidebarChat';
import axios from 'axios';
import Pusher from 'pusher-js'


const Sidebar = () => {
    const [{ user }] = useStateValue();

    const [rooms, setrooms] = useState([]);
    

    useEffect(() => {
        axios.get("http://localhost:5000/all/rooms").then((response) => {
            setrooms(response.data);
        })
    }, [])
    console.log(rooms)

    useEffect(() => {
           const pusher = new Pusher('56fc8ad686887feca24c', {
      cluster: 'ap2'
           });
        var channel = pusher.subscribe('rooms');
    channel.bind('inserted', function(room) {
      setrooms((prevRooms)=>[...prevRooms,room])
    });
    },[])

    return (
        <div className='sidebar'>
            <div className='sidebar__header'>
                <IconButton>
                    <Avatar src={user.photoURL} />
                </IconButton>
                <div className='sidebar__headerRight'>
                    <IconButton>
                        <DonutLarge/>
                    </IconButton>
                    <IconButton>
                        <Chat/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className='sidebar__search'>
                <div className='sidebar__searchContainer'>
                    <SearchOutlined/>
                    <input placeholder='search or start new chat'></input>
                </div>
            </div>
            <div className='sidebar__chats'>
                <SidebarChat addNewChat />
                {
                    rooms.map((room) => {
                        return <SidebarChat key={room._id} id={room._id} name={room.name}  />
                    })
                }
                
                {/* <SidebarChat />
                <SidebarChat />
                <SidebarChat /> */}
                
            </div>
        </div>
  )
};

export default Sidebar;
