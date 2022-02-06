import { Avatar, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './Chat.css';
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@mui/icons-material'
import axios from 'axios'
import { useStateValue } from '../ContextApi/StateProvider' 
import {useParams} from 'react-router-dom'
import Pusher from 'pusher-js'

const Chat = () => {
    const [seed, setseed] = useState("");
    const [roomname, setroomname] = useState("");
    const [updatedat, setupdatedat] = useState("");
    const [messages, setmessages] = useState([]);
    const [input, setinput] = useState("");
    const [{user}] = useStateValue();
    const {roomId}=useParams()

    
    useEffect(() => {
        if (roomId) {
            axios.get(`http://localhost:5000/room/${roomId}`).then((response) => {
                setroomname(response.data.name);
                setupdatedat(response.data.updatedAt)
            })
            axios.get(`http://localhost:5000/messages/${roomId}`).then((response) => {
                setmessages(response.data)
            })
        }
    },[roomId])

    useEffect(() => {
      setseed(Math.floor(Math.random()*7000))
    }, []);


    
    useEffect(() => {
           const pusher = new Pusher('56fc8ad686887feca24c', {
      cluster: 'ap2'
           });
        var channel = pusher.subscribe('messages');
    channel.bind('inserted', function(message) {
      setmessages((prevMessages)=>[...prevMessages,message])
    });
    },[])



    const sendMessage = async (e) => {
        e.preventDefault();
        console.log(input);
        if (!input) {
            return
        }
        await axios.post("http://localhost:5000/messages/new", {
            message: input,
            name: user.displayName,
            timestamp: new Date(),
            uid: user.uid,
            roomId:roomId,
        })
        setinput("")
    }
    
    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar
                src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
                />
                <div className='chat__headerInfo'>
                    <h3>{roomname ? roomname : "user"}</h3>
                    <p>
                        {updatedat ? `Last updated at ${new Date(updatedat).toString().slice(0, 21)}` : "last seen"} </p>
                </div>
                <div className='chat__headerRight'>
                    <IconButton>
                           <SearchOutlined/>                
                    </IconButton>
                    <IconButton>
                           <AttachFile/>                
                    </IconButton>
                    <IconButton>
                           <MoreVert/>                
                    </IconButton>
                </div>
            </div>
            {roomname && <div className='chat__body'>
                {
                    messages.map((message, index) => (
                        <p className={`chat__message ${message.uid===user.uid && "chat__receiver"}`} key={index}>
                            <span className='chat__name'>{message.name}</span>
                            {message.message}
                    <span className='chat__timestamp'>
                        {new Date(message.timestamp).toString().slice(0,25)}
                    </span>
                </p>
                    ))
                }
                
               
            </div>}
            {roomname && <div className='chat__footer'>
                <InsertEmoticon />
                    <form>
                    <input placeholder='Type a message' onChange={(e) => setinput(e.target.value)} value={input} />
                    <button className='btn' onClick={sendMessage}></button>
                    </form>
                
            </div>}
        </div>
  )
};

export default Chat;
